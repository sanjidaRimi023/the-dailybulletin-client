import React from "react";
import { FadeLoader } from "react-spinners";

const LoadSpinner = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <FadeLoader
        color="#175fff"
        height={19}
        radius={4}
        width={6}
        speedMultiplier={1}
      />
      <p className="mt-4 text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
        Loading... Please wait.
      </p>
    </div>
  );
};

export default LoadSpinner;
