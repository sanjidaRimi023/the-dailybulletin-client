import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useUserRole = () => {
  const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

  const { data: role, isPending: roleLoading } = useQuery({
    enabled: !!user?.email && !loading,
    queryKey: ['user-role', user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/user/role?email=${user.email}`);
      console.log(res);
      return res.data?.role;
    }
  });

  return { role, roleLoading };
};

export default useUserRole;