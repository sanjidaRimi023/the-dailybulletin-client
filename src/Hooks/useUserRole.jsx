import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const useUserRole = () => {
  const { user, loading } = useAuth(); 
    const axiosSecure = useAxiosSecure();

  const { data: role, isPending: roleLoading } = useQuery({
	queryKey: ['user-role', user?.email],
	enabled: !loading && !!user?.email,
	queryFn: async () => {
		if (user?.email) {
			const res = await axiosSecure.get(`/user/role?email=${user?.email}`)
			return res.data?.role
		}
	  },
	
})

  return { role, roleLoading };
};

export default useUserRole;