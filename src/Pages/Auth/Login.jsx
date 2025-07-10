import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import logo from "../../assets/logoimage-removebg-preview.png";
import sideImage from "../../assets/newspaper-background-concept.jpg";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login data:", data);
    
  };

  return (
    <div className="flex w-full max-w-sm mx-auto overflow-hidden rounded-lg shadow-lg lg:max-w-4xl my-10 bg-white/90 dark:bg-gray-800/90shadow-xl backdrop-blur-md transition-all duration-300 hover:ring-4 hover:ring-blue-500/50 hover:shadow-blue-500/30">
     
      <div
        className="hidden bg-cover lg:block lg:w-1/2"
        style={{
          backgroundImage: `url(${sideImage})`,
        }}
      ></div>

    
      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        
        <div className="flex justify-center mx-auto mb-4">
          <img className="w-auto" src={logo} alt="Logo" />
        </div>

        <p className="text-xl text-center text-gray-600 dark:text-gray-200 mb-4">
          Welcome back!
        </p>

        
        <button
          className="flex items-center justify-center w-full px-4 py-2 mb-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
        >
            <span className="mx-3 w-5">
                      <FcGoogle/>
                    </span>
          <span className="font-bold">Sign in with Google</span>
        </button>

       
        <div className="flex items-center justify-between my-4">
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
          <span className="text-xs text-center text-gray-500 uppercase dark:text-gray-400">
            or login with email
          </span>
          <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
        </div>

  
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
     
          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm text-gray-600 dark:text-gray-200"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="example@email.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="password"
                className="text-sm text-gray-600 dark:text-gray-200"
              >
                Password
              </label>
              <Link
                to="/reset-password"
                className="text-xs text-blue-500 hover:underline dark:text-blue-400"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              className="w-full px-4 py-2 mt-1 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

        
          <div>
            <button
              type="submit"
              className="w-full px-6 py-3 text-sm font-medium text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300"
            >
              Sign In
            </button>
          </div>
        </form>

 
        <div className="flex items-center justify-between mt-6">
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          <Link
            to="/register"
            className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >
            or sign up
          </Link>
          <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
};

export default Login;
