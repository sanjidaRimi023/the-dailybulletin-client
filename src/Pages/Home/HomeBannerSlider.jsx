"use client";
import React, { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { AnimatePresence, motion } from "framer-motion";
import Sharebtn from "../../Components/Ui/Sharebtn";

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
    id: 3,
    title: "Olympics 2025: Records Broken, Legends Born",
    description:
      "From underdog victories to historic performances, the global stage witnessed breathtaking moments that will be remembered for decades.",
    date: "6 Days ago",
    comments: 31,
    category: "Sports",
    image: "https://i.ibb.co/Xxc23Fv5/pd-09897.jpg",
  },
  {
    id: 4,
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

const article = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

function Gallery({ items, setIndex, index }) {
  return (
    <div className="flex flex-col lg:flex-row gap-10 max-w-screen-xl mx-auto px-4 sm:px-6 py-16">
      
      {/* Left Text Section */}
      <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
          Your Source for Reliable,
          <span className="bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            {" "}Real-Time News
          </span>
        </h1>

        <h2 className="text-indigo-600 text-xl sm:text-2xl font-semibold">
          Truth. Integrity. Journalism.
        </h2>

        <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300">
          Get the latest headlines, politics, sports, tech and culture — in one trusted source.
        </p>

        <div className="flex justify-center lg:justify-start">
          <Sharebtn text="Read Latest News" />
        </div>
        
      </div>

      {/* Right Image Gallery Section */}
      <div className="flex gap-2 overflow-x-auto lg:overflow-visible scrollbar-hide lg:w-1/2">
        {items.map((item, i) => (
          <motion.div
            whileTap={{ scale: 0.95 }}
            key={item.id}
            className={`relative rounded-xl flex-shrink-0 transition-all duration-500 ease-in-out overflow-hidden cursor-pointer 
              ${index === i ? "w-[clamp(280px,40vw,420px)]" : "w-[60px] sm:w-[80px]"} h-[300px] sm:h-[400px]`}
            onClick={() => setIndex(i)}
            onMouseEnter={() => setIndex(i)}
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover rounded-xl"
            />
            <AnimatePresence mode="wait">
              {index === i && (
                <motion.article
                  variants={article}
                  initial="hidden"
                  animate="show"
                  className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent text-white p-4 space-y-2"
                >
                  <motion.h1 variants={article} className="text-lg sm:text-base font-semibold">
                    {item.title}
                  </motion.h1>
                  <motion.p variants={article} className="text-xs sm:text-sm leading-tight">
                    {item.description}
                  </motion.p>
                  <motion.div
                    variants={article}
                    className="text-[10px] sm:text-xs flex justify-between text-gray-200"
                  >
                    <span>{item.date}</span>
                    <span className="border border-blue-600 bg-blue-500 text-white px-3 py-1 font-semibold rounded-full">{item.category}</span>
                  </motion.div>
                </motion.article>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


export default function HeroBannerSlider() {
  const [index, setIndex] = useState(0);

  return (
    <section className="overflow-hidden dark:bg-gray-900">
      <Gallery items={banners} index={index} setIndex={setIndex} />
    </section>
  );
}