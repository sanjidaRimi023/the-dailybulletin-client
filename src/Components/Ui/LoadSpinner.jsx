import React from "react";

const LoadSpinner = () => {
  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-50 px-4">
      <div className="flex flex-col items-center space-y-6 max-w-xs w-full">
        <div className="w-8 h-8 relative transform rotate-45">
          <div
            className="absolute bg-indigo-600 w-3.5 h-3.5 animate-ping"
            style={{
              top: 0,
              left: 0,
              animationDuration: "1.2s",
            }}
          ></div>
          <div
            className="absolute bg-indigo-600 w-3.5 h-3.5 animate-ping"
            style={{
              top: 0,
              right: 0,
              animationDuration: "1.2s",
              animationDelay: "0.15s",
            }}
          ></div>
          <div
            className="absolute bg-indigo-600 w-3.5 h-3.5 animate-ping"
            style={{
              bottom: 0,
              right: 0,
              animationDuration: "1.2s",
              animationDelay: "0.3s",
            }}
          ></div>
          <div
            className="absolute bg-indigo-600 w-3.5 h-3.5 animate-ping"
            style={{
              bottom: 0,
              left: 0,
              animationDuration: "1.2s",
              animationDelay: "0.45s",
            }}
          ></div>
        </div>
        <p className="text-indigo-600 text-center text-lg sm:text-xl font-semibold tracking-wide">
          Loading news... Please wait.
        </p>
      </div>
    </div>
  );
};

export default LoadSpinner;

