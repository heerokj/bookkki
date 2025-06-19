"use client";

import React, { useEffect } from "react";
import { WarningIconRed } from "../../../public/icons/WarningIconRed";
import { CheckWithCircle } from "../../../public/icons/CheckWithCircle";
type Props = {
  setToast: React.Dispatch<React.SetStateAction<boolean>>;
  text: string;
  time: number;
  isError?: boolean;
};

export default function Toast({ setToast, text, time, isError = true }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setToast(false);
    }, time);
    return () => {
      clearTimeout(timer);
    };
  }, [setToast, time]);

  return (
    <div className="fixed top-[80px] left-1/2 -translate-x-1/2 bg-gray-600 p-4 rounded-xl text-white animate-slide-up">
      <div className="flex items-center gap-2">
        {isError ? <WarningIconRed /> : <CheckWithCircle />}
        <p className="text-base font-semibold text-white">{text}</p>
      </div>
    </div>
  );
}
