import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import sideImage from "../../assets/newspaper-background-concept.jpg";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../Hooks/useAuth";
import { toast } from "react-toastify";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AuthButton from "../../Components/Ui/auth-button";
import useAxios from "../../Hooks/useAxios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { loginUser, googleLogin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/";
  const axiosInstance = useAxios();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await loginUser(data?.email, data?.password);
      console.log(res);

      // Optional: Store JWT token if using backend auth
      // const tokenRes = await axiosInstance.post("/jwt", { email: data?.email });
      // localStorage.setItem("access-token", tokenRes.data.token);

      toast.success("Login successful!");
      navigate(from);
    } catch (error) {
      toast.error("Invalid email or password!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleBtn = () => {
    googleLogin()
      .then(async (result) => {
        const user = result.user;

        const userInfo = {
          email: user.email,
          role: "user",
          photoURL: user.photoURL,
          created_at: new Date().toISOString(),
          last_login: new Date().toISOString(),
        };

        const userRes = await axiosInstance.post("/users", userInfo);
        console.log(userRes);
        // Optional: Save JWT
        // const tokenRes = await axiosInstance.post("/jwt", { email: user.email });
        // localStorage.setItem("access-token", tokenRes.data.token);

        navigate(from);
        toast.success("Signed in with Google!");
      })
      .catch((error) => {
        toast.error("Google sign-in failed. Try again.");
        console.log(error);
      });
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

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2 className="text-3xl my-4 font-bold text-center text-gray-800 dark:text-white">
            <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Welcome
            </span>{" "}
            back
          </h2>
          <p className="text-sm text-center my-2 text-gray-600 dark:text-gray-300">
            Glad to see you again. Let's get you back in!
          </p>

          <button
            onClick={handleGoogleBtn}
            disabled={loading}
            className="flex items-center justify-center w-full px-4 py-2 mb-4 text-gray-600 transition-colors duration-300 transform border rounded-lg dark:border-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 disabled:opacity-50"
          >
            <span className="mx-3 w-5">
              <FcGoogle />
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
              <AuthButton
                type="submit"
                text={loading ? "Logging in..." : "Login"}
                disabled={loading}
              />
            </div>
          </form>

          <div className="flex flex-col items-center justify-between mt-6">
            <span>
              Don't have an account?{" "}
              <Link
                state={{ from }}
                to="/register"
                className="underline font-bold text-blue-600"
              >
                Register
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
