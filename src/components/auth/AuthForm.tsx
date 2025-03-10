"use client";

import BookImage from "./BookImage";
import SocialLoinButtons from "./SocialLoginButtons";
import { useRouter } from "next/navigation";

export default function AuthForm({ mode }: { mode: string }) {
  const route = useRouter();
  const handleClick = () => {
    route.push(mode === "signIn" ? "/sign-up" : "/sign-in");
  };
  return (
    <div className="grid grid-cols-3 h-screen">
      <div className="col-span-2 h-screen">
        <BookImage />
      </div>
      <div className="flex flex-col justify-center items-center overflow-hidden">
        <div className="w-[400px] p-2">
          <div className="text-left mb-[20px]">
            <p className="text-[30px] font-bold">텍스트힙에 퐁당</p>
            <p>북끼에서 인생책을 공유하세요</p>
          </div>
          <div>
            {mode === "signIn" ? (
              <div className="sign-in">
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
              </div>
            ) : (
              <div className="sign-up">
                <div className="sign-in">
                  <div className="flex flex-col mb-[10px]">
                    <span className="mb-[2px]">아이디</span>
                    <input
                      type="text"
                      placeholder="아이디를 입력해주세요"
                      className="h-[50px] p-2 border-2 rounded-md w-[380px]"
                    />
                  </div>
                  <div className="flex flex-col mb-[10px]">
                    <span className="mb-[2px]">닉네임</span>
                    <input
                      type="text"
                      placeholder="닉네임을 입력해주세요"
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
                </div>
              </div>
            )}
            <button className="h-[50px] p-2 rounded-md w-[380px] my-2 bg-[#84bbe1] hover:bg-[#00bbf9] text-white">
              {mode === "signIn" ? "로그인" : "회원가입"}
            </button>
            <div className="flex justify-center gap-2 p-2">
              <button type="button" onClick={handleClick}>
                {mode === "signUp" ? "로그인" : "회원가입"}
              </button>
              <div>|</div>
              <button onClick={() => alert("추후 업데이트 될 예정입니다🙂")}>
                ID/PW 찾기
              </button>
            </div>
          </div>
          <div className="flex justify-around"></div>
        </div>
        <p className="mb-[16px] text-[10px]">또는</p>
        <SocialLoinButtons />
      </div>
    </div>
  );
}
