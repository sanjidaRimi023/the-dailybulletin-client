import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { MdFlashOn } from "react-icons/md";

const Headline = () => {
  const [current, setCurrent] = useState(0);
  const [fade, setFade] = useState(true);
  const axiosInstance = useAxios();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['breaking-articles'],
    queryFn: async () => {
      const res = await axiosInstance("/article/approved");
      return res.data;
    },
  });

  useEffect(() => {
    if (!articles || articles.length === 0) return;

    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % articles.length);
        setFade(true);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [articles]);

  if (isLoading) {
    return (
      <div className="bg-red-600 text-white py-3 text-center text-sm font-medium">
        Loading breaking news...
      </div>
    );
  }

  return (
    <div className="w-full bg-gradient-to-r from-red-700 to-red-600 text-white py-3 px-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 shadow-md overflow-hidden">
    
      <div className="flex items-center gap-2 bg-white text-red-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
        <MdFlashOn className="text-xl" />
        <span>BREAKING</span>
      </div>

  
      <div className="relative h-6 w-full overflow-hidden">
        <div
          className={`transition-opacity duration-500 ease-in-out text-sm sm:text-base font-medium truncate ${
            fade ? "opacity-100" : "opacity-0"
          }`}
        >
          {articles[current]?.title}
        </div>
      </div>
    </div>
  );
};

export default Headline;
