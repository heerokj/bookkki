"use client";

import BookImage from "./BookImage";
import SocialLoinButtons from "./SocialLoginButtons";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import bcrypt from "bcryptjs";
import { createClient } from "@/shared/utils/supabase/client";
import { useState } from "react";
import Toast from "../common/Toast";

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
  const [loginErrorToast, setLoginErrorToast] = useState(false);
  const [signUpErrorToast, setSignUpErrorToast] = useState(false);
  const [successSignUpToast, setSuccessSignUpToast] = useState(false);

  const supabase = createClient();
  const route = useRouter();

  const onSubmit = async (data: IFormInput) => {
    if (mode === "signIn") {
      //로그인 처리
      const result = await signIn("credentials", {
        userID: data.userId,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setLoginErrorToast(true);
        return;
      }
      route.push("/");
    } else {
      //회원가입 처리
      try {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const { error: userInsertError } = await supabase
          .from("users")
          .insert({
            user_id: data.userId,
            password: hashedPassword,
            nickname: data.nickname,
          })
          .select();

        if (userInsertError) {
          if (userInsertError.code === "23505") {
            setSignUpErrorToast(true);
            return;
          }
          alert("회원가입에 실패했습니다.");
          return;
        }
        setSuccessSignUpToast(true);

        setTimeout(() => {
          route.push("/sign-in");
        }, 2000);
      } catch (userInsertError) {
        console.error(userInsertError);
      }
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
                    {...register("userId", {
                      required: {
                        value: true,
                        message: "아이디를 입력해주세요",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col mb-[10px]">
                  <span className="mb-[2px]">비밀번호</span>
                  <input
                    type="password"
                    placeholder="비밀번호를 입력해주세요"
                    className="h-[50px] p-2 border-2 rounded-md w-[380px]"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "패스워드를 입력해주세요",
                      },
                    })}
                  />
                </div>
              </div>
            ) : (
              <div className="sign-up">
                <div className="sign-in">
                  <div className="flex flex-col mb-[10px]">
                    <label htmlFor="userId" className="mb-[2px]">
                      아이디
                    </label>
                    <input
                      type="text"
                      id="userId"
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
                      <p className="text-[#ff0000] p-[3px]">
                        {errors?.userId?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-[10px]">
                    <label htmlFor="nickname" className="mb-[2px]">
                      닉네임
                    </label>
                    <input
                      type="text"
                      id="nickname"
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
                      <p className="text-[#ff0000] p-[3px]">
                        {errors?.nickname?.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col mb-[10px]">
                    <label htmlFor="password" className="mb-[2px]">
                      비밀번호
                    </label>
                    <input
                      type="password"
                      id="password"
                      placeholder="비밀번호를 입력해주세요"
                      className="h-[50px] p-2 border-2 rounded-md w-[380px]"
                      {...register("password", {
                        required: {
                          value: true,
                          message: "비밀번호를 입력해주세요",
                        },
                        minLength: {
                          value: 8,
                          message: "비밀번호는 8자리 이상 12자리 이하입니다.",
                        },
                        maxLength: {
                          value: 12,
                          message: "비밀번호는 12자리 이하입니다.",
                        },
                      })}
                    />
                    {errors?.password && (
                      <p className="text-[#ff0000] p-[3px]">
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
                {mode === "signUp" ? "로그인 하러가기" : "회원가입 하러가기"}
              </button>
            </div>
          </form>
          {loginErrorToast && (
            <Toast
              text="아이디 또는 비밀번혼 정보가 일치하지 않습니다"
              setToast={setLoginErrorToast}
              time={1000}
            />
          )}
          {signUpErrorToast && (
            <Toast
              text="이미 존재하는 회원입니다."
              setToast={setSignUpErrorToast}
              time={1000}
            />
          )}
          {successSignUpToast && (
            <Toast
              text="환영합니다!! 회원이 되신걸 축하합니다!"
              setToast={setSuccessSignUpToast}
              time={1000}
              isError={false}
            />
          )}
        </div>
        <p className="mt-7 mb-4 text-sm">간편하게 로그인하기</p>
        <SocialLoinButtons />
      </div>
    </div>
  );
}
