import React from "react";

type BlueButtonProps = {
  title: string;
  width?: string;
  height?: string;
  isPending?: boolean;
  onClick?: () => void;
};

export default function BlueButton({
  title,
  width = "w-20",
  height = "h-9",
  isPending = false,
  onClick,
}: BlueButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${width} ${height} p-2 px-4 rounded-md bg-[#84bbe1] hover:bg-[#00bbf9] text-white text-[13px]`}
    >
      {isPending ? "..." : title}
    </button>
  );
}
