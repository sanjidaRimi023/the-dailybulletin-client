import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { FaUser, FaEnvelope, FaPen, FaCamera, FaSpinner, FaSave } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosInstance from "../../../Hooks/useAxios"

const UserProfile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
    const [previewImage, setPreviewImage] = useState(user?.photoURL);
    const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;


  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      displayName: user?.displayName || '',
      bio: user?.bio || '',
      photo: null,
    },
  });

  useEffect(() => {
    reset({
      displayName: user?.displayName || '',
      bio: user?.bio || '',
      photo: null,
    });
    setPreviewImage(user?.photoURL);
  }, [isEditing, user, reset]);

 const onSubmit = async (data) => {
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
      bio: data.bio,
      photoURL,
    });

    if (res.data?.success) {
      toast.success("Profile updated successfully!");
      updateUser(res.data.updatedUser); 
      setIsEditing(false);
    } else {
      toast.error("Failed to update profile.");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong.");
  }
};

  const handleCancel = () => {
    setIsEditing(false);
  };

  const InputGroup = ({ label, name, register, errors, icon, ...props }) => (
    <div>
      <label htmlFor={name} className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
        {label}
      </label>
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">{icon}</span>
        <input
          id={name}
          {...register(name)}
          {...props}
          className={`w-full pl-10 pr-4 py-2 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
            errors[name] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
          }`}
        />
      </div>
      {errors[name] && <p className="text-xs text-red-500 mt-1">{errors[name].message}</p>}
    </div>
  );

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 min-h-screen p-6">
      <div className="max-w-4xl mx-auto shadow-xl rounded-3xl overflow-hidden bg-white dark:bg-gray-900">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">Update your account information</p>
            </div>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-md"
              >
                <FaPen /> Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <img
                  className="h-36 w-36 rounded-full object-cover ring-4 ring-indigo-200 dark:ring-gray-700"
                  src={previewImage || 'https://via.placeholder.com/150'}
                  alt="Profile"
                />
                {isEditing && (
                  <Controller
                    name="photo"
                    control={control}
                    render={({ field }) => (
                      <label htmlFor="photo-upload" className="absolute -bottom-3 -right-3 bg-blue-600 p-3 rounded-full cursor-pointer hover:bg-blue-700 transition shadow-lg">
                        <FaCamera className="text-white h-5 w-5" />
                        <input
                          id="photo-upload"
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            field.onChange(e.target.files);
                            if (e.target.files[0]) {
                              setPreviewImage(URL.createObjectURL(e.target.files[0]));
                            }
                          }}
                        />
                      </label>
                    )}
                  />
                )}
              </div>
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800 dark:text-white">{user?.displayName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{user?.email}</p>
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
                {...register('displayName', {
                  required: 'Display name is required.',
                  minLength: { value: 3, message: 'Minimum 3 characters required.' },
                })}
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

              <div>
                <label htmlFor="bio" className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows="4"
                  disabled={!isEditing}
                  {...register('bio', {
                    maxLength: { value: 200, message: 'Bio cannot exceed 200 characters.' },
                  })}
                  className={`w-full p-3 border rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 transition-all ${
                    errors.bio ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500'
                  }`}
                ></textarea>
                {errors.bio && <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>}
              </div>

              {isEditing && (
                <div className="flex justify-end gap-4 pt-6">
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
                    {isSubmitting ? <FaSpinner className="animate-spin" /> : <FaSave />} {isSubmitting ? 'Saving...' : 'Save'}
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
