"use client";
import CafeSearchList from "@/components/pages/search-cafe/CafeSearchList";
import CafeSearchForm from "@/components/pages/search-cafe/CafeSearchForm";
import React, { useState } from "react";

export default function CafePage() {
  const [debouncedSearchText, setDebouncedSearchText] = useState("");

  const handleChange = (text: string) => {
    setDebouncedSearchText(text);
  };

  return (
    <div className="mb-6">
      <div className="search mt-10">
        <CafeSearchForm onChange={handleChange} />
        <CafeSearchList searchText={debouncedSearchText} />
      </div>
    </div>
  );
}
