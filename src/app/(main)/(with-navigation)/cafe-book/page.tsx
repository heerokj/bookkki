import CafeSearch from "@/components/pages/search-cafe/CafeSearch";
import CafeSearchForm from "@/components/pages/search-cafe/CafeSearchForm";
import React from "react";

export default function page() {
  return (
    <div className="mb-6">
      <div className="search mt-10">
        <CafeSearchForm />
        <CafeSearch />
      </div>
    </div>
  );
}
