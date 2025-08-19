import CafeSearchList from "@/components/pages/search-cafe/CafeSearchList";
import CafeSearchForm from "@/components/pages/search-cafe/CafeSearchForm";
import React from "react";

export default function CafePage() {
  return (
    <div className="mb-6">
      <div className="search mt-10">
        <CafeSearchForm />
        <CafeSearchList />
      </div>
    </div>
  );
}
