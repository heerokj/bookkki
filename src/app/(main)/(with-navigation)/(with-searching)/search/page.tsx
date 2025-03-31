import { fetchBooksData } from "@/services/main";
import Image from "next/image";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  const { total, items } = await fetchBooksData(q, 10, 1);

  return (
    <div>
      <p className="py-[20px]">검색결과 {total}</p>
      <div className="flex flex-wrap gap-4">
        {items.map((book) => {
          return (
            <div
              key={book.isbn}
              className="w-[180px] h-[350px] overflow-hidden"
            >
              <div className="overflow-hidden h-[250px]">
                <Image
                  src={book.image}
                  width={150}
                  height={80}
                  alt={book.title ?? "book"}
                  className="w-full h-full"
                />
              </div>
              <p className="pt-2 text-[15px] font-bold text-nowrap">
                {book.title}
              </p>
              <p className="text-[14px] text-gray-500">{book.author}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
