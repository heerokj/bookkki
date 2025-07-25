import React from "react";
import Image from "next/image";
import cafeImg from "/public/images/no-image-cafe.jpeg";

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
];

export default function BookCafeList() {
  return (
    <div>
      <ul className="cafe-wrapper flex gap-6 justify-between">
        {CAFE.map((cafe, index) => (
          <li className="bookkki-cafe-card" key={`${cafe}-${index}`}>
            <a>
              <div className="cafe-thumbnail h-[170px] w-[210px]">
                <Image
                  src={cafeImg}
                  width={150}
                  height={100}
                  alt="cafe"
                  className="w-full h-full rounded-md"
                />
              </div>
              <div className="cafe-info pt-2 pb-4">
                <p className="cafe-name text-base font-bold text-wrap">
                  소소책방
                </p>
                <p className="cafe-address text-sm text-gray-400">
                  경상남도 진주시
                </p>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
