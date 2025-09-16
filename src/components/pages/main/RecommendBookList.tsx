"use client";
import React from "react";
import Image from "next/image";
import bookImg from "/public/images/no-image-book.png";

const BOOKS = [
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
  {
    title: "킬러 안데르스와 그의 친구 둘",
    author: "요나스요나손 지음, 임호경 옮김",
    img: "book",
  },
];

export default function RecommendBookList() {
  return (
    <div>
      <ul className="book-wrapper flex gap-6 justify-between">
        {BOOKS.map((book, index) => (
          <li
            className="bookkki-book-card hover:cursor-pointer transition-transform duration-300 hover:scale-105"
            key={`${book}-${index}`}
          >
            <a>
              <div className="book-thumbnail h-[200px] w-[170px]">
                <Image
                  src={bookImg}
                  width={150}
                  height={100}
                  alt="book"
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="book-info pt-2 pb-4">
                <p className="title text-base font-bold text-wrap">책 제목</p>
                <p className="author text-sm text-gray-400">
                  요나스요나손 지음, 임호경 옮김
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
