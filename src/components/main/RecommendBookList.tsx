"use client";
import React from "react";
import Image from "next/image";
import bookImg from "../../../public/images/book-blue.jpeg";

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
      <ul className="slide-wrapper flex gap-6">
        {BOOKS.map((book, index) => (
          <li className="slide-items" key={`${book}-${index}`}>
            <a>
              <div className="bookkki-book-card">
                <div className="thumbnail">
                  <div className="thumbnail-inner border-2">
                    <div className="book-image overflow-hidden h-52 w-32">
                      <Image
                        src={bookImg}
                        width={150}
                        height={100}
                        alt="book"
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="book-info border-2 mt-2">
                  <p className="title text-base font-bold text-nowrap">
                    킬러 안데르스와 그의 친구 둘
                  </p>
                  <p className="author">요나스요나손 지음, 임호경 옮김</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
