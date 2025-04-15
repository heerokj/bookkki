import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import React from "react";

export default function loading() {
  const count = 6;
  return (
    <div className="mb-6">
      <div className="h-[50px]"></div>
      <div className="grid grid-cols-3 gap-4">
        {Array(count)
          .fill(0)
          .map((_, index) => (
            <LoadingSkeleton key={index} />
          ))}
      </div>
    </div>
  );
}
