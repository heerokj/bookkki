import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-co justify-center">
      <div className="wrap w-[1200px]">{children}</div>
    </div>
  );
}
