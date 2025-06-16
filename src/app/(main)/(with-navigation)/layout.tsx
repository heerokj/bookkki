import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Suspense fallback={<div>로딩...</div>}>{children}</Suspense>
      <Footer />
    </div>
  );
}
