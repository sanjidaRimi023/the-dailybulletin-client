import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

const CreativeButton = ({ text = 'Click', icon =  <FaArrowRight /> }) => {
    return (
        <>
       <div className="relative w-full cursor-pointer overflow-hidden text-blue-600 text-center font-medium text-sm px-5 py-2.5 me-2 mb-2 rounded-lg
      bg-white border border-blue-600 
      hover:text-white 
      hover:bg-gradient-to-r hover:from-blue-500 hover:to-indigo-600
      focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 
      shadow-md dark:shadow-lg transition-all duration-500 ease-in-out group">
      
      {/* Text before hover */}
      <span className="inline-block group-hover:translate-x-12 group-hover:opacity-0 transition-all duration-300">
        {text}
      </span>

      {/* Text + Icon after hover */}
      <div className="flex gap-2 items-center justify-center absolute top-0 left-0 h-full w-full opacity-0 translate-x-12 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 z-10">
        <span>{text}</span>
        {icon}
      </div>

      {/* Optional expanding hover glow effect */}
      <div className="absolute top-[40%] left-[20%] h-2 w-2 group-hover:h-full group-hover:w-full rounded-lg bg-blue-800 opacity-10 group-hover:opacity-20 scale-[1] group-hover:scale-[2.5] transition-all duration-300 group-hover:top-0 group-hover:left-0"></div>
    </div>
        </>
    );
};

export default CreativeButton;