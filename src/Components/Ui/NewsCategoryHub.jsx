"use client";

import React, { useState, useEffect, useMemo } from "react";
import { BsNewspaper } from "react-icons/bs";
import { FaLandmark, FaMoneyBillWave } from "react-icons/fa";
import { IoGlobeOutline, IoGameControllerOutline } from "react-icons/io5";
import { MdOutlineSportsCricket, MdOutlineScience } from "react-icons/md";
import { Link } from "react-router";

const IconWrapper = ({
  children,
  className = "",
  isHighlighted = false,
  isHovered = false,
  animationDelay = 0,
}) => (
  <div
    className={`relative group transition-all duration-300 ${className}`}
    style={{ animationDelay: `${animationDelay}s` }}
  >
    <div
      className={`
        backdrop-blur-xl rounded-2xl flex items-center justify-center transition-all duration-300 w-full h-full
        ${
          isHighlighted
            ? "dark:bg-gray-700/50 bg-gray-100/80 border border-blue-400/50 dark:shadow-blue-500/20 shadow-blue-400/30 shadow-2xl animate-breathing-glow"
            : `dark:bg-white/5 bg-white/60 border border-gray-200/50 dark:border-white/10 ${
                !isHovered && "animate-float"
              }`
        }
        ${
          isHovered
            ? "dark:bg-gray-600/50 bg-gray-200/80 border-blue-400/60 scale-110 dark:shadow-blue-400/30 shadow-blue-400/40 shadow-2xl"
            : "dark:hover:bg-white/10 hover:bg-gray-100/80 dark:hover:border-white/20 hover:border-gray-300/60"
        }
      `}
    >
      {children}
    </div>
  </div>
);

const IconGrid = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { radius, centralIconRadius, outerIconRadius, svgSize, svgCenter } =
    useMemo(() => {
      const isMobile = windowWidth < 768;
      const radius = isMobile ? 120 : 160;
      const centralIconRadius = isMobile ? 40 : 48;
      const outerIconRadius = isMobile ? 32 : 40;
      const svgSize = isMobile ? 300 : 380;
      const svgCenter = svgSize / 2;
      return { radius, centralIconRadius, outerIconRadius, svgSize, svgCenter };
    }, [windowWidth]);

  const categories = [
    {
      id: 1,
      title: "Politics",
      component: <FaLandmark size="45%" className="text-blue-500" />,
    },
    {
      id: 2,
      title: "International",
      component: <IoGlobeOutline size="50%" className="text-green-500" />,
    },
    {
      id: 3,
      title: "Sports",
      component: <MdOutlineSportsCricket size="55%" className="text-red-500" />,
    },
    {
      id: 4,
      title: "Entertainment",
      component: (
        <IoGameControllerOutline size="50%" className="text-yellow-500" />
      ),
    },
    {
      id: 5,
      title: "Science & Tech",
      component: <MdOutlineScience size="50%" className="text-purple-500" />,
    },
    {
      id: 6,
      title: "Economy",
      component: <FaMoneyBillWave size="45%" className="text-teal-500" />,
    },
  ];

  return (
    <section className="relative flex flex-col items-center justify-center">
      <div
        className="relative"
        style={{ width: `${svgSize}px`, height: `${svgSize}px` }}
      >
        <svg width={svgSize} height={svgSize} className="absolute top-0 left-0">
          <g>
            {categories.map((icon, i) => {
              const angleInDegrees = -150 + i * 60;
              const angleInRadians = angleInDegrees * (Math.PI / 180);
              const startX =
                svgCenter + centralIconRadius * Math.cos(angleInRadians);
              const startY =
                svgCenter + centralIconRadius * Math.sin(angleInRadians);
              const endX =
                svgCenter +
                (radius - outerIconRadius) * Math.cos(angleInRadians);
              const endY =
                svgCenter +
                (radius - outerIconRadius) * Math.sin(angleInRadians);
              return (
                <line
                  key={`line-${icon.id}`}
                  x1={startX}
                  y1={startY}
                  x2={endX}
                  y2={endY}
                  stroke={hoveredId === icon.id ? "#3B82F6" : "currentColor"}
                  strokeWidth="1"
                  className="transition-all duration-300"
                  style={{ opacity: hoveredId === icon.id ? 1 : 0.4 }}
                />
              );
            })}
          </g>
        </svg>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
          <IconWrapper
            className="w-20 h-20 md:w-24 md:h-24"
            isHighlighted={true}
          >
            <BsNewspaper
              size="40%"
              className="text-indigo-600"
            />
          </IconWrapper>
        </div>

        {categories.map((icon, i) => {
          const angleInDegrees = -150 + i * 60;
          const angleInRadians = angleInDegrees * (Math.PI / 180);
          const x = radius * Math.cos(angleInRadians);
          const y = radius * Math.sin(angleInRadians);

          return (
            <div
              key={icon.id}
              className="absolute top-1/2 left-1/2 z-10"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              onMouseEnter={() => setHoveredId(icon.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                <IconWrapper
                  className="w-16 h-16 md:w-20 md:h-20 cursor-pointer"
                  isHovered={hoveredId === icon.id}
                  animationDelay={i * 0.15}
                >
                  {icon.component}
                </IconWrapper>
                <span
                  className={`
                    text-xs md:text-sm font-semibold transition-all duration-300
                    ${
                      hoveredId === icon.id
                        ? "text-indigo-600"
                        : "text-gray-600"
                    }
                  `}
                >
                  {icon.title}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default function NewsCategoryHub() {
  return (
    <div className="w-full flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden relative my-10">
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 4s ease-in-out infinite;
          }
          @keyframes breathing-glow {
            0% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.4); }
            50% { box-shadow: 0 0 40px 10px rgba(59, 130, 246, 0.2); }
            100% { box-shadow: 0 0 20px 0px rgba(59, 130, 246, 0.4); }
          }
          .dark .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
          :not(.dark) .animate-breathing-glow {
            animation: breathing-glow 3s ease-in-out infinite;
          }
        `}
      </style>

      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 my-10">
          <div className="text-left w-full md:w-1/2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-1 h-12 bg-indigo-600 rounded-sm"></div>
              <h2 className="text-3xl md:text-5xl font-bold">
                Category-Based News
              </h2>
            </div>
            <p className="text-base md:text-lg mb-4 max-w-xl">
              Choose your preferred category to read the latest news about it.
            </p>
            <p className="text-base md:text-lg mb-4 max-w-xl">
              Stay informed with our curated categories covering politics,
              sports, international affairs, science, and more. Whether you're a
              tech enthusiast or a sports fan, we bring you real-time updates
              tailored to your interests.
            </p>
            <p className="text-base md:text-lg max-w-xl">
              Our smart categorization ensures you never miss out on the stories
              that matter most. Tap on a category icon to explore the latest
              headlines now.
            </p>
          </div>

          <div className="w-full md:w-1/2 flex justify-center">
            <Link to="/all-article">
            <IconGrid />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
