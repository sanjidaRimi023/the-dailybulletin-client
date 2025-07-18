import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex justify-center items-center mt-10 gap-2">
      {/* Prev Button */}
      <button
        onClick={handlePrev}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-s ${
          currentPage === 1
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "text-white bg-gray-800 hover:bg-gray-900"
        }`}
      >
        <FaArrowLeft />
        Prev
      </button>

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-3 h-8 text-sm font-medium rounded-e ${
          currentPage === totalPages
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "text-white bg-gray-800 hover:bg-gray-900"
        }`}
      >
        Next
        <FaArrowRight />
      </button>
    </div>
  );
};

export default Pagination;
