import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";

import {
  FaUser,
  FaEnvelope,
  FaPen,
  FaCamera,
  FaSpinner,
  FaSave,
  FaLock,
  FaBookOpen,
} from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";
import axiosInstance from "../../../Hooks/useAxios";
import useAuth from "../../../Hooks/useAuth";

const TabButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
      active
        ? "bg-indigo-600 text-white shadow-md"
        : "text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
    }`}
  >
    {children}
  </button>
);

const UserProfile = () => {
  const { user, updateUser, updateUserPassword } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [previewImage, setPreviewImage] = useState(user?.photoURL);
  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

  const [readingHistory, setReadingHistory] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: { displayName: user?.displayName || "", photo: null },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors, isSubmitting: isPasswordSubmitting },
    reset: resetPassword,
    watch: watchPassword,
  } = useForm();

  useEffect(() => {
    if (user) {
      reset({ displayName: user.displayName || "" });
      setPreviewImage(user.photoURL);
    }
  }, [isEditing, user, reset]);

  useEffect(() => {
    if (activeTab === "history") {
      const fetchHistory = async () => {
        setHistoryLoading(true);
        try {
          setTimeout(() => {
            setReadingHistory([
              {
                id: 1,
                title: "The Rise of AI in Modern Journalism",
                readAt: "2024-07-23",
              },
              {
                id: 2,
                title: "Global Economic Outlook for 2025",
                readAt: "2024-07-22",
              },
            ]);
            setHistoryLoading(false);
          }, 1000);
        } catch (err) {
          console.log(err);
          toast.error("Could not load reading history.");
          setHistoryLoading(false);
        }
      };
      fetchHistory();
    }
  }, [activeTab, user]);

  const onProfileSubmit = async (data) => {
    try {
      let photoURL = user?.photoURL;
      if (data.photo && data.photo[0]) {
        const formData = new FormData();
        formData.append("file", data.photo[0]);
        formData.append("upload_preset", upload_preset);
        formData.append("cloud_name", cloud_name);
        const cloudRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
          formData
        );
        photoURL = cloudRes.data.secure_url;
      }
      const res = await axiosInstance.patch(`/users/${user.uid}`, {
        displayName: data.displayName,
        photoURL,
      });
      if (res.data?.success) {
        toast.success("Profile updated successfully!");
        updateUser({ ...res.data.updatedUser, photoURL });
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong.");
    }
  };

  const onPasswordChangeSubmit = async (data) => {
    try {
      await updateUserPassword(data.currentPassword, data.newPassword);
      toast.success("Password updated successfully!");
      resetPassword();
    } catch (error) {
      console.error("Password change error:", error);
      if (error.code === "auth/wrong-password") {
        toast.error("Your current password is not correct. Please try again.");
      } else {
        toast.error(error.message || "Failed to change password.");
      }
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    reset({ displayName: user.displayName || "" });
    setPreviewImage(user.photoURL);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-6">
      <div className="max-w-4xl mx-auto shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                Account Settings
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Manage your account details and preferences
              </p>
            </div>
            <div className="flex space-x-2 mt-4 sm:mt-0 border border-gray-200 dark:border-gray-700 p-1 rounded-xl">
              <TabButton
                active={activeTab === "profile"}
                onClick={() => setActiveTab("profile")}
              >
                Profile
              </TabButton>
              <TabButton
                active={activeTab === "security"}
                onClick={() => setActiveTab("security")}
              >
                Security
              </TabButton>

              <TabButton
                active={activeTab === "history"}
                onClick={() => setActiveTab("history")}
              >
                History
              </TabButton>
            </div>
          </div>

          {activeTab === "profile" && (
            <form
              onSubmit={handleSubmit(onProfileSubmit)}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <img
                    className="h-36 w-36 rounded-full object-cover ring-4 ring-indigo-200 dark:ring-gray-700"
                    src={previewImage || "https://via.placeholder.com/150"}
                    alt="Profile"
                  />
                  {isEditing && (
                    <Controller
                      name="photo"
                      control={control}
                      render={({ field }) => (
                        <label
                          htmlFor="photo-upload"
                          className="absolute -bottom-3 -right-3 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg"
                        >
                          <FaCamera className="text-white h-5 w-5" />
                          <input
                            id="photo-upload"
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                              if (e.target.files[0]) {
                                setPreviewImage(
                                  URL.createObjectURL(e.target.files[0])
                                );
                              }
                            }}
                          />
                        </label>
                      )}
                    />
                  )}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                    {user?.displayName}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {user?.email}
                  </p>
                </div>
              </div>
              <div className="lg:col-span-2 space-y-6">
                <InputGroup
                  label="Display Name"
                  name="displayName"
                  type="text"
                  disabled={!isEditing}
                  icon={<FaUser className="text-gray-400" />}
                  register={register}
                  errors={errors}
                  rules={{
                    required: "Display name is required.",
                    minLength: {
                      value: 3,
                      message: "Minimum 3 characters required.",
                    },
                  }}
                />
                <InputGroup
                  label="Email"
                  name="email"
                  type="email"
                  disabled={true}
                  icon={<FaEnvelope className="text-gray-400" />}
                  value={user?.email}
                  readOnly
                  register={() => {}}
                  errors={{}}
                />
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
                  >
                    <FaPen /> Edit Profile
                  </button>
                ) : (
                  <div className="flex justify-end gap-4 pt-4">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaSave />
                      )}{" "}
                      {isSubmitting ? "Saving..." : "Save"}
                    </button>
                  </div>
                )}
              </div>
            </form>
          )}

          {activeTab === "security" && (
            <div className="max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                Change Password
              </h3>
              <form
                onSubmit={handlePasswordSubmit(onPasswordChangeSubmit)}
                className="space-y-6"
              >
                <InputGroup
                  label="Current Password"
                  name="currentPassword"
                  type="password"
                  icon={<FaLock className="text-gray-400" />}
                  register={registerPassword}
                  errors={passwordErrors}
                  rules={{ required: "Current password is required." }}
                />

                <InputGroup
                  label="New Password"
                  name="newPassword"
                  type="password"
                  icon={<FaLock className="text-gray-400" />}
                  register={registerPassword}
                  errors={passwordErrors}
                  rules={{
                    required: "New password is required.",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters.",
                    },
                  }}
                />
                <InputGroup
                  label="Confirm New Password"
                  name="confirmPassword"
                  type="password"
                  icon={<FaLock className="text-gray-400" />}
                  register={registerPassword}
                  errors={passwordErrors}
                  rules={{
                    required: "Please confirm your password.",
                    validate: (value) =>
                      value === watchPassword("newPassword") ||
                      "The passwords do not match.",
                  }}
                />
                <button
                  type="submit"
                  disabled={isPasswordSubmitting}
                  className="w-full px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isPasswordSubmitting ? (
                    <FaSpinner className="animate-spin" />
                  ) : (
                    <FaSave />
                  )}{" "}
                  {isPasswordSubmitting ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          )}

          {activeTab === "history" && (
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-3">
                <FaBookOpen /> Reading History
              </h3>
              {historyLoading ? (
                <div className="flex justify-center items-center h-40">
                  {" "}
                  <FaSpinner className="animate-spin text-3xl text-indigo-500" />{" "}
                </div>
              ) : readingHistory.length > 0 ? (
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {readingHistory.map((item) => (
                    <li key={item.id} className="py-4">
                      <p className="font-semibold text-gray-800 dark:text-white">
                        {item.title}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Read on: {new Date(item.readAt).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-gray-500 dark:text-gray-400 py-10">
                  You have no reading history yet.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({
  label,
  name,
  register,
  errors,
  icon,
  rules = {},
  ...props
}) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1"
    >
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        {icon}
      </span>
      <input
        id={name}
        {...register(name, rules)}
        {...props}
        className={`w-full pl-10 pr-4 py-2 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
          errors[name]
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 dark:border-gray-600 focus:ring-blue-500"
        }`}
      />
    </div>
    {errors[name] && (
      <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>
    )}
  </div>
);

export default UserProfile;
