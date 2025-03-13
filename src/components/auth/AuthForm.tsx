"use client";

import BookImage from "./BookImage";
import SocialLoinButtons from "./SocialLoginButtons";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { useForm } from "react-hook-form";

interface IFormInput {
  userId: string;
  nickname: string;
  password: string;
}

export default function AuthForm({ mode }: { mode: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({ mode: "onChange" });

  const supabase = createClient();
  const route = useRouter();

  const onSubmit = async (data: IFormInput) => {
    try {
      const { error: userInsertError } = await supabase
        .from("users")
        .insert({
          user_id: data.userId,
          password: data.password,
          nickname: data.nickname,
        })
        .select();

      if (userInsertError) {
        console.error(userInsertError);
        //TODO - 아이디 또는 닉네임 중복 확인하기
        if (userInsertError.code === "23505") {
          alert("아미 존재하는 회원입니다.");
          return;
        }
        alert("회원가입에 실패했습니다.");
        return;
      }
      alert("환영합니다!");
      route.push("/sign-in");
    } catch (userInsertError) {
      console.error(userInsertError);
    }
  };

  const handleClick = () => {
    route.push(mode === "signIn" ? "/sign-up" : "/sign-in");
  };
  return (
    <div className="grid grid-cols-3 h-screen">
      <BookImage />
      <div className="right-area flex flex-col justify-center items-center overflow-hidden">
        <div className="w-[400px] p-2">
          <div className="title text-left mb-[20px]">
            <p className="text-[30px] font-bold">텍스트힙에 퐁당</p>
            <p>북끼에서 인생책을 공유하세요</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    type="password"
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
                      {...register("userId", {
                        required: {
                          value: true,
                          message: "아이디를 입력해주세요",
                        },
                        maxLength: {
                          value: 20,
                          message: "아이디는 20자리 이하입니다.",
                        },
                      })}
                    />
                    {errors?.userId && (
                      <p className="text-[#ff0000] p-[2px]">
                        {errors?.userId?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-[10px]">
                    <span className="mb-[2px]">닉네임</span>
                    <input
                      type="text"
                      placeholder="닉네임을 입력해주세요"
                      className="h-[50px] p-2 border-2 rounded-md w-[380px]"
                      {...register("nickname", {
                        required: {
                          value: true,
                          message: "닉네임을 입력해주세요",
                        },
                        maxLength: {
                          value: 10,
                          message: "닉네임은 10자리 이하입니다.",
                        },
                      })}
                    />
                    {errors?.nickname && (
                      <p className="text-[#ff0000] p-[2px]">
                        {errors?.nickname?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-[10px]">
                    <span className="mb-[2px]">비밀번호</span>
                    <input
                      type="text"
                      placeholder="비밀번호를 입력해주세요"
                      className="h-[50px] p-2 border-2 rounded-md w-[380px]"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "비밀번호를 입력해주세요",
                        },
                        minLength: {
                          value: 8,
                          message: "비밀번호는 8자리 이상 10자리 이하입니다.",
                        },
                        maxLength: {
                          value: 10,
                          message: "비밀번호는 10자리 이하입니다.",
                        },
                      })}
                    />
                    {errors?.password && (
                      <p className="text-[#ff0000] p-[2px]">
                        {errors?.password?.message}
                      </p>
                    )}
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
          </form>
        </div>
        <p className="mb-[16px] text-[10px]">또는</p>
        <SocialLoinButtons />
      </div>
    </div>
  );
}
