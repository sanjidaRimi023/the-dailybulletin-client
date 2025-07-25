import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";


const useUserStats = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()

  const { data: stats = {}, isLoading } = useQuery({
    queryKey: ["userStats", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/article/user-stats/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  return { stats, isLoading };
};

export default useUserStats;
