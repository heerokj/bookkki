import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "글 작성하기 - 북끼",
  description: "새로운 글을 작성하는 페이지입니다.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
