"use client";
import Link from "next/link";

export default function LoginFrom() {
  return (
    <>
      <div className="w-[400px] p-2">
        <div className="text-left mb-[20px]">
          <p className="text-[30px] font-bold">텍스트힙에 퐁당</p>
          <p>북끼에서 인생책을 공유하세요</p>
        </div>
        <div>
          <div className="flex flex-col mb-[10px]">
            <span className="mb-[2px]">아이디</span>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              className="h-[50px] p-2 border-2 rounded-md w-[380px]"
            />
          </div>
          <div className="flex flex-col mb-[10px]">
            <span className="mb-[2px]">비밀번호</span>
            <input
              type="text"
              placeholder="비밀번호를 입력해주세요"
              className="h-[50px] p-2 border-2 rounded-md w-[380px]"
            />
          </div>
          <button className="h-[50px] p-2 rounded-md w-[380px] my-2 bg-[#84bbe1]">
            로그인
          </button>
          <div className="flex justify-center gap-2 p-2">
            {/* 컴포넌트로 바꿀예정 */}
            <Link href={"/sign-up"}>회원가입</Link>
            <div>|</div>
            <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
              ID/PW 찾기
            </button>
          </div>
        </div>
      </div>
      <p className="mb-[16px] text-[10px]">또는</p>
    </>
  );
}
