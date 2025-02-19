"use client";

import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  // const [image, setImage] = useState("");

  // const backSpaceBtn = () => {
  //   alert("작성 중인 내용은 삭제됩니다.");
  //   route.back();
  // };

  return (
    <div>
      <form>
        <div className="flex justify-between items-center border-b-[1px] h-[50px] px-[350px] ">
          <div>
            <button>
              <img src="/icons/arrow-left.svg" alt="email" />
            </button>
          </div>
          <div>
            <div>
              <button>저장</button>
              <button type="submit">발행</button>
            </div>
          </div>
        </div>
        <section className="flex flex-col justify-between items-center">
          <div className="border-b-[1px] mt-[50px] h-[50px]">
            <input
              className="h-[50px]"
              type="text"
              required
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
          </div>
          <div>
            <button>
              <img src="/icons/plus.svg" alt="email" />
            </button>
            <textarea
              required
              name=""
              placeholder="내용을 입력해주세요"
              value={context}
              onChange={(e) => {
                e.preventDefault();
                setContext(e.target.value);
              }}
            ></textarea>
          </div>
        </section>
      </form>
    </div>
  );
}
