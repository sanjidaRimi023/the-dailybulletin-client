import axios from "axios";

const axiosSecure = axios.create({
  baseURL: `http://localhost:5000`,
});

axiosSecure.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token);

  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
