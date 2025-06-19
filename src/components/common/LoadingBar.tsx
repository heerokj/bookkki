"use client";

import Lottie from "lottie-react";
import bookAnimation from "@/assets/lottie/Book-loading.json";

const LoadingBar = () => {
  return (
    <div className="w-[200px] h-[200px]">
      <Lottie animationData={bookAnimation} />
    </div>
  );
};

export default LoadingBar;
