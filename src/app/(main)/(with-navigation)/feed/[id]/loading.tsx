import LoadingBar from "@/components/common/LoadingBar";
import React from "react";

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <LoadingBar />
    </div>
  );
}
