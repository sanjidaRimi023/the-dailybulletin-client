import React from 'react';


const CreativeButton = ({ text = 'Click'}) => {
    return (
        <>
       <button class="relative inline-flex items-center justify-center px-6 py-2 border border-purple-500 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-indigo-500">
    <span class="w-48 h-48 rounded rotate-[-40deg] bg-indigo-600 absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
    <span class="relative w-full text-left text-black transition-colors duration-300 ease-in-out group-hover:text-white">{text}</span>
</button>
        </>
    );
};

export default CreativeButton;