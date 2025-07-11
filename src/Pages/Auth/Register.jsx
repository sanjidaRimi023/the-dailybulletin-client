/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logoimage-removebg-preview.png";
import { FaCameraRetro, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import sideImage from "../../assets/newspaper-background-concept.jpg";
import useAuth from "../../Hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import CreativeButton from "../../Components/Ui/CreativeButton";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [imagePreview, setImagePreview] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [upload, setUpload] = useState(false);

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);
    setUpload(true);

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      if (data.secure_url) {
        setUpload(false);
        return data.secure_url;
      } else {
        throw new Error("Cloudinary upload failed");
      }
    } catch (error) {
      toast.error("Image upload failed");
      console.log(error);
      setUpload(false);
      return null;
    }
  };

  const onSubmit = async (data) => {
    if (!profilePicture) {
      toast.warn("Please wait until the image is uploaded.");
      return;
    }

    try {
      const res = await createUser(data.email, data.password);
      console.log(res);
      await updateUserProfile(data.username, profilePicture);
      toast.success("Profile updated successfully!");
      navigate(from);
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];

    if (!file) {
      toast.error("No file selected.");
      return;
    }

    if (!file.type.startsWith("image")) {
      toast.error("Please upload a valid image file.");
      return;
    }

    setImagePreview(URL.createObjectURL(file));
    const url = await uploadImageToCloudinary(file);
    if (url) {
      setProfilePicture(url);
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-4"
      style={{ backgroundImage: `url(${sideImage})` }}
    >
      <motion.form
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-md bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Logo" />
        </div>

        {/* Username */}
        <div className="mb-4 relative">
          <input
            {...register("username", { required: "Username is required" })}
            type="text"
            placeholder="Username"
            className="w-full py-3 px-4 pl-11 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute top-4 left-3 text-gray-400">
            <FaUser />
          </span>
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">
              {errors.username.message}
            </p>
          )}
        </div>

        {/* Profile Image Upload */}
        <label
          htmlFor="profilePhoto"
          className="flex items-center justify-center px-4 py-3 mb-4 text-center bg-white border-2 border-dashed rounded-lg cursor-pointer dark:border-gray-600 dark:bg-gray-900"
        >
          <span className="text-gray-400 mr-2">
            <FaCameraRetro />
          </span>
          <span className="text-gray-400">Upload Profile Photo</span>
        </label>
        <input
          id="profilePhoto"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-4"
          >
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-30 object-cover mx-auto"
            />
          </motion.div>
        )}

        {/* Email */}
        <div className="mb-4 relative">
          <input
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            type="email"
            placeholder="Email address"
            className="w-full py-3 px-4 pl-11 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute top-4 left-3 text-gray-400">
            <MdEmail />
          </span>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4 relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type="password"
            placeholder="Password"
            className="w-full py-3 px-4 pl-11 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute top-3 left-3 text-gray-400">
            <RiLockPasswordFill />
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full" disabled={upload}>
          <CreativeButton text={upload ? "Uploading..." : "Register"} />
        </button>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline font-bold text-blue-600">
            Log in
          </Link>
        </p>
      </motion.form>
    </motion.section>
  );
};

export default Register;
