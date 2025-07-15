"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function BackButton() {
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
        width={20}
        height={20}
        onClick={handleBackButtonClick}
      />
    </div>
  );
}
