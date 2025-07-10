import React, { useState } from "react";
import { useForm } from "react-hook-form";
import logo from "../../assets/logoimage-removebg-preview.png";
import { FaCameraRetro, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import sideImage from "../../assets/newspaper-background-concept.jpg";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState(null);


  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
      <section className="bg-white dark:bg-gray-900 min-h-screen flex items-center justify-center px-6"  style={{ backgroundImage: `url(${sideImage})` }}>
         
      <form
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
            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
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
          <input
            {...register("profilePhoto")}
            id="profilePhoto"
            type="file"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
        {imagePreview && (
          <div className="mb-4">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-full h-30 object-cover mx-auto"
            />
          </div>
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
          <span className="absolute top-3 left-3 text-gray-400"><RiLockPasswordFill /></span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

      

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 px-6 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition"
        >
          Sign Up
        </button>

        {/* Login Redirect */}
        <p className="mt-4 text-center text-sm text-blue-500 dark:text-blue-400">
          Already have an account? <a href="#" className="underline">Log in</a>
        </p>
      </form>
    </section>
  );
};

export default Register;
