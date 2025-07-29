import axios from 'axios';


const axiosInstance = axios.create({
    baseURL:`https://daily-bulletin-server.vercel.app`
})

const useAxios = () => {
    return axiosInstance;
};

export default useAxios;