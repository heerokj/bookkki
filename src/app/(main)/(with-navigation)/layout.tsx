import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import LoadingSkeleton from "@/components/skeleton/LoadingSkeleton";
import { ReactNode, Suspense } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <Suspense fallback={<LoadingSkeleton />}>{children}</Suspense>
      <Footer />
    </div>
  );
}
