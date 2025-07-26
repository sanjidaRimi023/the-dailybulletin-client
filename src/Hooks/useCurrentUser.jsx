import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useCurrentUser = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axiosSecure.get(`/users/${user.email}`)
        .then(res => {
          setUserInfo(res.data);
          setLoading(false);
        })
        .catch(err => {
          console.error("Failed to load user info", err);
          setLoading(false);
        });
    }
  }, [user?.email, axiosSecure]);

  return [userInfo, loading];
};

export default useCurrentUser;
