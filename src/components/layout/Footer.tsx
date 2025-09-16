import Image from "next/image";

export default function Footer() {
  return (
    <div className="border-t-[1px] py-[20px]">
      <div className="flex justify-between p-[5px]">
        <p className="font-bold text-[16px]">(주) 북끼 Bookkki</p>
        <ul className="flex gap-5">
          <li>
            <a href="mailto:wjdgmlfhr0321@gmail.com">
              <Image
                src="/icons/mail.svg"
                width={20}
                height={20}
                alt="email"
                className="mt-[1px]"
              />
            </a>
          </li>
          <li>
            <a href="https://github.com/heerokj/bookkki">
              <Image
                src="/icons/github.svg"
                alt="github"
                width={20}
                height={20}
                className="mt-[1px]"
              />
            </a>
          </li>
          <li>
            <a href="https://wjdgmlfhr0321.tistory.com/">
              <Image
                src="/icons/tistory.svg"
                alt="tistory"
                width={16}
                height={16}
                className="mt-[3px]"
              />
            </a>
          </li>
        </ul>
      </div>
      <div className="px-[5px] py-[20px] text-xs text-[#6f6f6f] flex flex-col gap-2">
        <p>대표이사 : 정희록 | 번호 : 010-4132-5619</p>
        <p>주소 : 경기도 고양시 일산서구 일산3동 후곡마을 희록이 방</p>
      </div>
      <p className="px-[5px] py-[10px] text-[12px] text-[#6f6f6f]">
        Copyright © 2025 북끼 All Rights Reserved.
      </p>
    </div>
  );
}
