"use client";

import useInfiniteBooksData from "@/hooks/use-search-books";
import { useSearchParams } from "next/navigation";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import Image from "next/image";

export default function SearchPage() {
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();
  const bookName = searchParams.get("q");
  const { data, error, isLoading, fetchNextPage, hasNextPage } =
    useInfiniteBooksData({ bookTitle: bookName ?? "" });

  const bookList = data?.pages.flatMap((page) => page?.data) ?? [];
  const total = data?.pages[0].count;

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <span>로딩중입니다...</span>;
  if (error) return <span>오류가 발생했습니다 : {error.message}</span>;

  return (
    <div>
      <p className="py-[20px] font-semibold">검색결과 {total}권</p>
      <div className="grid grid-cols-5 gap-6">
        {bookList.map((book, index) => {
          return (
            <div key={`${book.isbn}-${index}`} className="overflow-hidden">
              <div className="overflow-hidden h-[300px] rounded-md">
                <Image
                  src={book.image}
                  width={150}
                  height={100}
                  alt={book.title ?? "book"}
                  className="w-full h-full"
                />
              </div>
              <div className="pt-2 pb-4">
                <p className="text-base font-bold text-wrap">{book.title}</p>
                <p className="text-sm text-gray-400">
                  {book.author.replace(/\^/g, ",")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <div ref={ref} className="text-center py-[40px]">
        {hasNextPage ? <div>더보기</div> : <div>모든 피드를 불러왔습니다.</div>}
      </div>
    </div>
  );
}
