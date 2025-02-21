import SearchBar from "@/components/main/SearchBar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col justify-center mx-[50px]">
      <SearchBar />
      {children}
    </div>
  );
}
