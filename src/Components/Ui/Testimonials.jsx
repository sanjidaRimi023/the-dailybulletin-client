
import React, { useState, useEffect, useRef } from "react";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";



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
      "This newspaper has become my daily companion. From politics and business to lifestyle and entertainment, the content is engaging and trustworthy.",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoplayRef = useRef(null);
  const autoplayDelay = 5000;

  useEffect(() => {
    if (!isPaused) {
      autoplayRef.current = setInterval(
        () => setActiveIndex((prev) => (prev + 1) % cardData.length),
        autoplayDelay
      );
    }
    return () => clearInterval(autoplayRef.current);
  }, [isPaused]);

  const handleSelect = (index) => {
    setActiveIndex(index);
    setIsPaused(true); 
  };

  const activeCard = cardData[activeIndex];

  return (
    <section className="w-full py-12 px-4 md:px-8 bg-slate-50">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
        
        <div className="lg:w-1/3 text-center lg:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-800">
            Trusted by Thousands of Readers
          </h2>
          <p className="text-base md:text-lg text-slate-600">
            Hear from our community of satisfied readers who love our content
            and keep coming back for more insights.
          </p>
        </div>

        
        <div
          className="lg:w-2/3 w-full max-w-2xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="bg-white rounded-xl shadow-lg p-8 relative overflow-hidden min-h-[320px] flex flex-col justify-between">
     
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="flex-grow"
              >
                <p className="text-slate-700 text-lg md:text-xl leading-relaxed relative z-10">
                  "{activeCard.review}"
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center mt-6">
              <div className="flex-shrink-0">
                <img
                  className="w-14 h-14 rounded-full object-cover"
                  src={activeCard.image}
                  alt={activeCard.name}
                   onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = "https://placehold.co/100x100/1e1e1e/ffffff?text=404";
                   }}
                />
              </div>
              <div className="ml-4">
                <h4 className="text-lg font-bold text-slate-900">
                  {activeCard.name}
                </h4>
                <p className="text-indigo-600 font-medium">
                  {activeCard.position}
                </p>
              </div>
            </div>
          </div>
          
 
          <div className="flex justify-center items-center gap-3 mt-8">
            {cardData.map((card, index) => (
              <button
                key={card.id}
                onClick={() => handleSelect(index)}
                className={`w-12 h-12 rounded-full overflow-hidden transition-all duration-300 ease-in-out focus:outline-none ring-offset-2 ring-offset-slate-50 ${
                  activeIndex === index
                    ? "ring-2 ring-indigo-500 scale-110"
                    : "opacity-60 hover:opacity-100 hover:scale-105"
                }`}
              >
                <img
                  src={card.image}
                  alt={card.name}
                  className="w-full h-full object-cover"
                   onError={(e) => {
                     e.target.onerror = null;
                     e.target.src = "https://placehold.co/100x100/1e1e1e/ffffff?text=404";
                   }}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}