import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../Hooks/useAxios";
import { MdFlashOn } from "react-icons/md";
const Headline = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [displayedWords, setDisplayedWords] = useState([]);
  const axiosInstance = useAxios();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ['breaking-articles'],
    queryFn: async () => {
      const res = await axiosInstance("/article/approved");
      return res.data;
    },
  });

  useEffect(() => {
    if (!articles.length) return;

    const words = articles[currentIndex]?.title?.split(" ") || [];

    const wordInterval = setInterval(() => {
      setDisplayedWords((prev) => {
        const nextWords = [...prev, words[wordIndex]];
        return nextWords;
      });

      setWordIndex((prev) => prev + 1);

      if (wordIndex >= words.length - 1) {
        clearInterval(wordInterval);
        setTimeout(() => {
          setDisplayedWords([]);
          setWordIndex(0);
          setCurrentIndex((prev) => (prev + 1) % articles.length);
        }, 2000);
      }
    }, 200);

    return () => clearInterval(wordInterval);
  }, [articles, currentIndex, wordIndex]);

  if (isLoading) {
    return (
      <div className="bg-indigo-600 text-white p-2 text-sm">Loading breaking news...</div>
    );
  }

  return (
    <div className="bg-indigo-600 text-white py-2 px-4 overflow-hidden">
      <div className="container mx-auto flex items-center gap-4">
         <div className="flex items-center gap-2 bg-white text-indigo-600 px-3 py-1 rounded-full text-sm font-bold shadow-sm">
        <MdFlashOn className="text-xl animate-pulse" />
        <span>BREAKING</span>
      </div>
      <div className="relative h-6 w-full overflow-hidden whitespace-nowrap">
        <p className="transition-all duration-500 ease-in-out text-sm md:text-base font-medium">
          {displayedWords.join(" ")}
        </p>
      </div>
      </div>
    </div>
  );
};

export default Headline;
