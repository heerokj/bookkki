import React from "react";

type Props = {
  width?: string;
  height: string;
  rounded?: string;
  className?: string;
};

export default function SkeletonBox({
  width,
  height,
  rounded,
  className = "",
}: Props) {
  return (
    <div
      className={`${width} ${height} ${rounded} ${className} skeleton-item`}
    ></div>
  );
}
