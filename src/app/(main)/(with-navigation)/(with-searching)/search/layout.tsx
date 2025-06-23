import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검색하기 - 북끼",
  description: "원하는 도서를 검색할 수 있는 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
