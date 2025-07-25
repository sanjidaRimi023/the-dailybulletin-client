// src/Hooks/useArticles.js
import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useArticles = () => {
  const axiosInstance = useAxios;

  const {
    data: articles = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/article");
      return res.data;
    },
  });

  return { articles, isLoading, isError, error, refetch };
};

export default useArticles;
