"use client";

import PreviewImage from "@/components/write/PreviewImage";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { createClient } from "@/shared/utils/supabase/client";
import Toast from "@/components/common/Toast";

export default function WritePage() {
  const userData = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isToast, setIsToast] = useState(false);

  const router = useRouter();
  const supabase = createClient();

  const convertURLtoFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop();
    const filename = url.split("/").pop();
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  };

  // 이미지 스토리지에 업로드 후 url 반환
  const uploadImages = async () => {
    const uploadUrls = [];
    const convertURLtoFiles = [];

    // previewImages를 File 객체로 변환하기
    for (const file of previewImages) {
      const newFile = await convertURLtoFile(file);
      convertURLtoFiles.push(newFile);
    }

    // 파일 업로드
    const results = await Promise.all(
      convertURLtoFiles.map((file) =>
        supabase.storage.from("images").upload(`post/${uuid()}`, file)
      )
    );

    for (const result of results) {
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(result.data?.path as string);
      uploadUrls.push(urlData.publicUrl);
    }

    //url 반환
    return uploadUrls;
  };

  // 발행 버튼 클릭
  const handleClickUpload = async () => {
    if (isUploading) return;
    setIsUploading(true);

    try {
      if (!userData) {
        alert("로그인이 필요합니다.");
        return;
      }

      const uploadUrls = await uploadImages();

      if (uploadUrls?.length === 0) {
        setIsToast(true);
        //TODO - 토스트로 바꾸기
        // alert("이미지를 등록해주세요");
        return;
      }

      if (userData && uploadUrls?.length !== 0) {
        const { error } = await supabase.from("posts").insert({
          user_id: userData.id,
          title: title,
          content: content,
          image_urls: uploadUrls,
        });

        if (error) {
          console.error(error.message);
          alert("등록에 실패했습니다.");
          return;
        }
        alert("등록되었습니다.");
        router.push("/feed");
      }
    } catch (error) {
      console.error("등록에 실패했습니다.", error);
      alert("등록 중에 오류가 발생했습니다.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;

    if (fileList.length > 6) {
      alert("사진은 최대 6장까지 등록가능합니다.");
      return;
    }

    // 프리뷰 이미지
    const filesArray = Array.from(fileList);
    if (previewImages.length >= 6) {
      alert("사진은 최대 6장까지 등록가능합니다.");
      return;
    }

    const selectedFiles = filesArray.map((file) => {
      return URL.createObjectURL(file);
    });
    setPreviewImages((prev) => prev.concat(selectedFiles));
  };

  const backSpaceBtn = () => {
    const isConfirmed = window.confirm("작성중인 내용은 삭제됩니다");
    if (!isConfirmed) return;
    router.back();
  };

  return (
    <div>
      <section className="bar flex justify-between items-center border-b-[1px] h-[50px]">
        <button type="button" onClick={backSpaceBtn}>
          <img src="/icons/arrow-left.svg" alt="arrow-left" />
        </button>
        <button type="button" onClick={handleClickUpload}>
          {isUploading ? "발행중.." : "발행"}
        </button>
      </section>

      <section className="editor-container flex flex-col m-auto mx-[250px]">
        <div className="editor-heading h-[100px] border-b-[2px] mt-[50px] ">
          <input
            className="h-full w-full px-4 focus:outline-0 text-[30px]"
            type="text"
            placeholder="제목을 입력해주세요"
            value={title}
            onChange={(e) => {
              e.preventDefault();
              setTitle(e.target.value);
            }}
            maxLength={50}
          />
        </div>
        <div className="editor-body">
          <div className="body-images bg-gray-50 p-6">
            <p className="font-extrabold">사진 추가하기</p>
            <label htmlFor="inputFile">
              <div
                className={`inline-block p-2 py-3 my-4 font-medium border-[1px] border-gray-300 rounded-xl text-center w-1/4 bg-white ${
                  previewImages.length < 6
                    ? `hover:bg-gray-100 cursor-pointer`
                    : `bg-gray-100 text-gray-300 `
                }`}
              >
                사진 선택
              </div>
            </label>
            <p className="text-gray-400">
              * 사진은 최대 6장까지 첨부할 수 있습니다.
            </p>
            <input
              type="file"
              id="inputFile"
              name="file"
              accept="image/*"
              hidden
              multiple
              onChange={handleImageChange}
              disabled={previewImages.length >= 6}
            />
            {/* 이미지들이 보일 preview 자리 만들기 */}
            <PreviewImage
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
            />
          </div>
          <div className="body-context mt-[30px] h-[300px]">
            <textarea
              className="w-full h-full focus:outline-0 p-2"
              placeholder="내용을 입력해주세요"
              value={content}
              onChange={(e) => {
                e.preventDefault();
                setContent(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </section>
      {isToast && (
        <Toast
          setToast={setIsToast}
          text="이미지를 등록해주세요."
          time={1000}
        />
      )}
    </div>
  );
}
