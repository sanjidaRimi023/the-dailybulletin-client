import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `https://daily-bulletin-server.vercel.app`,
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
