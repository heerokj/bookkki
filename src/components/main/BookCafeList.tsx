import React from "react";
import Image from "next/image";
import bookImg from "../../../public/images/book-blue.jpeg";

const CAFE = [
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

export default function BookCafeList() {
  return (
    <div>
      <ul className="cafe-wrapper flex gap-6">
        {CAFE.map((cafe, index) => (
          <li className="cafe-items" key={`${cafe}-${index}`}>
            <a>
              <div className="bookkki-cafe-card">
                <div className="thumbnail">
                  <div className="thumbnail-inner border-2">
                    <div className="cafe-picture overflow-hidden h-36 w-36">
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
                <div className="cafe-info border-2 mt-2">
                  <p className="cafe-name text-base font-bold text-nowrap">
                    소소책방
                  </p>
                  <p className="cafe-address">경상남도 진주시</p>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
