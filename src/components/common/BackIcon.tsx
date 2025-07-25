"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BackIcon() {
  const router = useRouter();
  const handleBackButtonClick = () => {
    router.back();
    return;
  };
  return (
    <div className="p-4">
      <img
        src="/icons/arrow-left.svg"
        alt="arrow"
        width={25}
        height={25}
        onClick={handleBackButtonClick}
        className="hover:cursor-pointer"
      />
    </div>
  );
}
