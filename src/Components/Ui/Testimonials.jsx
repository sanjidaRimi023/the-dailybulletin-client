"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Icons
const ChevronLeftIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
const ChevronRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Card data
const cardData = [
  {
    id: 1,
    name: "Ayesha Rahman",
    position: "Loyal Reader",
    review:
      "I have been reading this newspaper for over three years, and I must say it consistently delivers high-quality news. The articles are well-researched, unbiased, and easy to understand.",
    image:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 2,
    name: "Tanvir Hasan",
    position: "Subscriber",
    review:
      "What I appreciate most is the balance between breaking news and analytical pieces. Every morning, I can rely on this newspaper to give me both timely updates and thoughtful insights.",
    image:
      "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 3,
    name: "Farhana Akter",
    position: "Frequent Reader",
    review:
      "This newspaper has become my daily companion. From politics and business to lifestyle and entertainment, the content is engaging and trustworthy",
    image:
      "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    id: 4,
    name: "Rashed Khan",
    position: "Long-time Subscriber",
    review:
      "I have tried several online news sources, but this one stands out for its professionalism and reliability. The reporting is thorough, and the writers go the extra mile to provide context that other outlets often miss.",
    image:
      "https://i.ibb.co/8LT8W7jN/portrait-confident-young-businessman-with-his-arms-crossed.jpg",
  },
  {
    id: 5,
    name: "Nusrat Jahan",
    position: "Reader",
    review:
      "I am impressed by the range of topics covered here. Every time I visit, I discover something new—whether it’s a detailed investigative report or an inspiring human-interest story.",
    image:
      "https://i.ibb.co/Zp6ktS7q/photorealistic-lawyer-day-celebration.jpg",
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(
    Math.floor(cardData.length / 2)
  );
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);
  const autoplayDelay = 4000;

  // Autoplay effect
  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(
        () => setActiveIndex((prev) => (prev + 1) % cardData.length),
        autoplayDelay
      );
    }
    return () => clearInterval(autoplayRef.current);
  }, [isPaused]);

  const changeSlide = (newIndex) => {
    setActiveIndex((newIndex + cardData.length) % cardData.length);
  };

  const onDragEnd = (event, info) => {
    const threshold = 80;
    if (info.offset.x > threshold) changeSlide(activeIndex - 1);
    else if (info.offset.x < -threshold) changeSlide(activeIndex + 1);
  };

  return (
    <section className="w-full py-12 px-4 md:px-8">
      <div className="container mx-auto flex flex-col md:flex-row items-start md:items-center gap-10">
        <div className="md:w-1/3 text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Thousands of Readers
          </h2>
          <p className="text-base md:text-lg">
            Hear from our community of satisfied readers who love our content
            and keep coming back for more insights.
          </p>
        </div>

        {/* Right Column: Carousel */}
        <div
          className="md:w-2/3 relative w-full flex flex-col"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center overflow-hidden">
            <motion.div
              className="w-full h-full flex items-center justify-center"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={onDragEnd}
            >
              {cardData.map((card, index) => (
                <Card
                  key={card.id}
                  card={card}
                  index={index}
                  activeIndex={activeIndex}
                  totalCards={cardData.length}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Card Component
function Card({ card, index, activeIndex, totalCards }) {
  let offset = index - activeIndex;
  if (offset > totalCards / 2) offset -= totalCards;
  else if (offset < -totalCards / 2) offset += totalCards;

  const isVisible = Math.abs(offset) <= 2;
  const animate = {
    x: `${offset * 55}%`,
    scale: offset === 0 ? 1 : 0.85,
    rotateY: offset * 15,
    zIndex: totalCards - Math.abs(offset),
    opacity: isVisible ? 1 : 0,
    transition: { type: "spring", stiffness: 260, damping: 30 },
  };

  return (
    <motion.div
      className="absolute w-[80%] sm:w-2/3 md:w-1/2 lg:w-[45%] h-full cursor-pointer"
      style={{ transformStyle: "preserve-3d" }}
      animate={animate}
      initial={false}
      whileHover={{ scale: 1.05, rotateY: 0 }}
    >
      <div className="w-full h-full rounded-3xl bg-gray-100 flex flex-col overflow-hidden border border-gray-500 transition-transform duration-500">
        {/* Image */}
        <div className="w-full h-[55%] overflow-hidden relative group">
          <img
            src={card.image}
            alt={card.name}
            className="w-full hidden md:block h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/400x400/1e1e1e/ffffff?text=Image+Missing";
            }}
          />
          <div className="absolute bottom-2 left-2 bg-indigo-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
            {card.position}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-5 text-left">
          <h3 className="text-xl font-bold mb-2 text-black">{card.name}</h3>
          <p className="text-sm flex-grow overflow-hidden leading-relaxed text-black">
            "{card.review}"
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></span>
            <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-100"></span>
            <span className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse delay-200"></span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
