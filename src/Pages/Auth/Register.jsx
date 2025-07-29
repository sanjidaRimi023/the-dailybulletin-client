import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import AuthButton from "../../Components/Ui/auth-button";
import useAxios from "../../Hooks/useAxios";
import useAuth from "../../Hooks/useAuth";
import sideImage from "../../assets/newspaper-background-concept.jpg";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUserProfile, googleLogin } = useAuth();
  const axiosInstance = useAxios();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";

  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState("");
  const [uploading, setUploading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const cloud_name = import.meta.env.VITE_CLOUD_NAME;
  const upload_preset = import.meta.env.VITE_CLOUD_PRESET;

  const uploadImageToCloudinary = async (imageFile) => {
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", upload_preset);
    formData.append("cloud_name", cloud_name);
    setUploading(true);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await res.json();
    setUploading(false);
    return data.secure_url;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(URL.createObjectURL(file));
      const url = await uploadImageToCloudinary(file);
      setProfilePicture(url);
    } else {
      console.log("Please upload a valid image file");
    }
  };

  const onSubmit = async (data) => {
    if (!profilePicture) {
      toast.warn("Please upload a profile image.");
      return;
    }

    try {
      const res = await createUser(data.email, data.password);
      console.log(res);
      const userInfo = {
        email: data.email,
        role: "user",
        photoURL: profilePicture,
        isPremium: false,
        created_at: new Date().toISOString(),
        last_login: new Date().toISOString(),
      };

      await axiosInstance.post("/users", userInfo);
      await updateUserProfile({
        displayName: data.name,
        photoURL: profilePicture,
      });

      toast.success("Account created successfully!");
      navigate(from);
    } catch (error) {
      toast.error(`Registration failed: ${error.message}`);
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const result = await googleLogin();
      const loggedUser = result.user;

      const userCheck = await axiosInstance.get(`/users/${loggedUser.email}`);
      if (!userCheck?.data?._id) {
        const userInfo = {
          email: loggedUser.email,
          role: "user",
          photoURL: loggedUser.photoURL,
          isPremium: false,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };
        await axiosInstance.post("/users", userInfo);
      }

      toast.success("Successfully signed in with Google");
      navigate(from);
    } catch (error) {
      toast.error(`Google Sign-in failed: ${error.message}`);
    }
  };

  return (
    <div
      data-aos="zoom-in"
      className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl my-10 bg-white/90 dark:bg-gray-800/90 hover:shadow-xl backdrop-blur-md transition-all duration-300"
    >

      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{ backgroundImage: `url(${sideImage})` }}
      ></div>


      <form
        data-aos="zoom-in"
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-6 py-8 md:px-8 lg:w-1/2"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white">
          Create{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Your Account
          </span>{" "}
          & Join the{" "}
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Community
          </span>
          !
        </h2>

        
        <div className="flex justify-center my-5">
          <label htmlFor="image-upload" className="cursor-pointer">
            <img
              src={
                selectedImage ||
                "https://i.ibb.co/xKJF9LBf/image-upload-icon.png"
              }
              alt="Profile"
              className="w-20 h-20 object-cover rounded-full border-4 border-blue-600 hover:scale-105 transition-all duration-300"
            />
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        <div className="mb-4 relative">
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            placeholder="Name"
            className="w-full py-3 px-4 pl-11 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute top-4 left-3 text-gray-400">
            <FaUser />
          </span>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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

        <div className="mb-4 relative">
          <input
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full py-3 px-4 pl-11 pr-11 bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 border rounded-lg dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute top-3 left-3 text-gray-400">
            <RiLockPasswordFill />
          </span>
          <span
            className="absolute top-3 right-3 text-gray-400 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </span>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <AuthButton
          text={uploading ? "Uploading..." : "Register"}
          disabled={uploading}
          type="submit"
          className="w-full"
        />

        <div className="flex items-center my-4">
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
          <span className="px-4 text-sm text-gray-500 dark:text-gray-400">or</span>
          <div className="flex-grow h-px bg-gray-300 dark:bg-gray-600"></div>
        </div>

        <button
  onClick={handleGoogleRegister}
  type="button"
  className="w-full flex items-center justify-center gap-3 py-2 px-5 border border-indigo-300 dark:border-gray-600 bg-white dark:bg-gray-900 hover:shadow-md dark:hover:shadow-lg transition-all duration-200 rounded-full text-gray-700 dark:text-gray-200 font-semibold"
>
  <FcGoogle className="text-2xl" />
  <span>Sign up with Google</span>
</button>


        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="underline font-bold text-blue-600">
            Log in
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
