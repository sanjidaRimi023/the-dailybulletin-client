import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import useAxios from "../../Hooks/useAxios";
import LoadSpinner from "../Ui/LoadSpinner";
import { Link } from "react-router";

const ArticleCardSlider = () => {
  const axiosInstance = useAxios();

  const { data: articles = [], isLoading } = useQuery({
    queryKey: ["approvedArticles"],
    queryFn: async () => {
      const res = await axiosInstance.get("/article/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <LoadSpinner />;
  }

  const limitedArticles = articles.slice(0, 6);

  return (
    <>
      <section className="container mx-auto px-4 py-2">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-10 bg-indigo-600 rounded-sm"></div>

          <h2 className="text-2xl md:text-4xl font-bold">
            Latest News
          </h2>
        </div>
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{ clickable: true }}
          navigation={true}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          modules={[Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {limitedArticles.map((article) => (
            <SwiperSlide key={article._id}>
              <div className="group flex h-full flex-col overflow-hidden bg-white/10 rounded-2xl shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-indigo-600">
                <div className="overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex-1">
                    <p className="mb-2 inline-block text-xs font-semibold uppercase tracking-wide text-indigo-600 ">
                      {article.publisher || "NewsHub"}
                    </p>

                    <h2 className="mb-3 text-xl font-bold leading-snug line-clamp-2">
                      {article.title}
                    </h2>

                    <p className="line-clamp-3">
                      {article.description}
                    </p>
                  </div>

                  <div className="mt-4 border-t border-gray-100 pt-4 dark:border-gray-700">
                    <Link to={`/article-detail/${article._id}`}
                      className="font-semibold text-indigo-600 transition-colors duration-300 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Read More &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default ArticleCardSlider;
