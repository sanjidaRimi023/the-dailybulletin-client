// HomeBannerSlider.jsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper/modules";
import { FaRegClock, FaCommentDots } from "react-icons/fa";

const banners = [
  {
    id: 1,
    title: "The Perfect Weekend Getaway: Relax and Unwind",
    description:
      "This year has been a whirlwind of drama and controversy in the world of celebrities. From unexpected breakups to shocking revelations...",
    date: "5 Days ago",
    comments: 17,
    category: "Lifestyle",
    image:
      "https://images.unsplash.com/photo-1540206395-68808572332f?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 2,
    title: "Global Elections 2025: The Shifting Power",
    description:
      "From Asia to Europe, citizens are heading to the polls in what experts call the most transformative election year in decades.",
    date: "2 Days ago",
    comments: 23,
    category: "Politics",
    image: "https://i.ibb.co/MD7bM3W6/download.jpg",
  },
  {
    id: 3,
    title: "AI Revolution: What ChatGPT-6 Means for the Tech World",
    description:
      "OpenAI's latest release is transforming the way we communicate, learn, and build software. Here's what it means for you.",
    date: "1 Day ago",
    comments: 45,
    category: "Technology",
    image:
      "https://images.unsplash.com/photo-1603791440384-56cd371ee9a7?auto=format&fit=crop&w=1170&q=80",
  },
  {
    id: 4,
    title: "Olympics 2025: Records Broken, Legends Born",
    description:
      "From underdog victories to historic performances, the global stage witnessed breathtaking moments that will be remembered for decades.",
    date: "6 Days ago",
    comments: 31,
    category: "Sports",
    image: "https://i.ibb.co/Xxc23Fv5/pd-09897.jpg",
  },
  {
    id: 5,
    title: "Mental Health Crisis: Why Gen Z is Struggling",
    description:
      "More young people than ever are seeking help for anxiety, depression, and burnout. Experts warn of a growing global crisis.",
    date: "3 Days ago",
    comments: 29,
    category: "Health",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&w=1170&q=80",
  },
];

const HomeBannerSlider = () => {
  return (
    <div className="container mx-auto my-4 rounded-full">
      <Swiper
     
        loop
        autoplay={{ delay: 2000 }}
        pagination={true}
        modules={[ Autoplay, Pagination]}
        className="w-full h-[550px] md:h-[650px]"
      >
        {banners.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              className="relative w-full h-full bg-center bg-cover"
              style={{ backgroundImage: `url(${item.image})` }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent z-10" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-10 md:p-16 flex flex-col gap-4 max-w-5xl mx-auto text-white">
                {/* Meta info */}
                <div className="flex items-center gap-4 text-sm md:text-base text-gray-300 font-medium mb-2 flex-wrap">
                  <span className="flex items-center gap-2">
                    <FaRegClock /> {item.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <FaCommentDots /> {item.comments} Comments
                  </span>
                  <span className="bg-blue-600 px-2 py-1 rounded-md text-xs font-semibold uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                {/* Title with animated underline */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold leading-snug max-w-4xl group cursor-pointer w-fit">
                  <span className="relative inline-block">
                    <span
                      className="after:absolute after:left-0 after:-bottom-1 after:h-[4px] after:w-0 
                      after:bg-blue-400 after:transition-all after:duration-500 group-hover:after:w-full"
                    >
                      {item.title}
                    </span>
                  </span>
                </h2>

                {/* Description */}
                <p className="text-base sm:text-lg md:text-xl font-light text-gray-200 max-w-3xl drop-shadow">
                  {item.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default HomeBannerSlider;
