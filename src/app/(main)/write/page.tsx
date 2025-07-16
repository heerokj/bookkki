"use client";

import PreviewImage from "@/components/write/PreviewImage";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";
import { createClient } from "@/shared/utils/supabase/client";

export default function WritePage() {
  const userData = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

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

    for (const file of previewImages) {
      const fileUUid = uuid();
      const filePath = `post/${fileUUid}`;

      //previewImages를 File 객체로 변환하기
      const newFile = await convertURLtoFile(file);

      //파일 업로드
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, newFile);

      if (error) {
        console.error("이미지 파일 업로드 실패 :", error.message);
        return;
      }

      //url 가져오기
      const { data: urlData } = supabase.storage
        .from("images")
        .getPublicUrl(filePath);

      uploadUrls.push(urlData.publicUrl);
    }

    //url 반환
    return uploadUrls;
  };

  const handleClickUpload = async () => {
    try {
      if (!userData) {
        alert("등록 중에 오류가 발생했습니다.");
      }

      const uploadUrls = await uploadImages();

      if (uploadUrls?.length === 0) {
        alert("이미지를 등록해주세요");
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
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //NOTE - e.target.files의 files 속성이 존재하지 않기 때문에 files가 존재하는 HTMLInputElement타입을 as 키워드로 지정
    const fileList = e.target.files as FileList;

    if (previewImages.length >= 6) {
      alert("사진은 최대 6장까지 등록가능합니다.");
      return;
    } else {
      // 리스트를 배열로 저장
      const filesArray = Array.from(fileList);

      // url로 변경
      const selectedFiles = filesArray.map((file) => {
        return URL.createObjectURL(file);
      });
      //images 상태 값에 배열 합치기
      setPreviewImages((prev) => prev.concat(selectedFiles));
    }
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
          발행
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
        <div className="editor-body p-7">
          <div className="body-images">
            {previewImages.length >= 6 ? (
              <></>
            ) : (
              <label htmlFor="file">
                <input
                  type="file"
                  id="file"
                  name="file"
                  accept="image/*"
                  hidden
                  multiple
                  onChange={handleImageChange}
                />
                <img src="/icons/plus.svg" alt="plus" className="mb-[10px]" />
              </label>
            )}
            {/* 이미지들이 보일 preview 자리 만들기 */}
            <PreviewImage
              previewImages={previewImages}
              setPreviewImages={setPreviewImages}
            />
          </div>
          <div className="body-context mt-[30px] h-[300px]">
            <textarea
              className="w-full h-full focus:outline-0"
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
    </div>
  );
}
