import React from "react";

const Sharebtn = ({ text = "click", ...props }) => {
  return (
    <>
      <button {...props} class="relative inline-flex items-center justify-center  px-6 py-2 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500">
        <span class="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700"></span>
        <span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-blue-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
        <span class="relative text-white">{text}</span>
      </button>
    </>
  );
};

export default Sharebtn;
