import React from "react";
import { CircleLoader } from "react-spinners";
const LoadSpinner = () => {
  return (
    <>
      <CircleLoader
        color="#175fff"
        cssOverride={{}}
        loading
        size={80}
        speedMultiplier={1}
      />
    </>
  );
};

export default LoadSpinner;
