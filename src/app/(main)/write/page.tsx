"use client";

import PreviewImage from "@/components/write/PreviewImage";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const route = useRouter();
  const supabase = createClient();

  const backSpaceBtn = () => {
    alert("작성 중인 내용은 삭제됩니다.");
    route.push("/feed");
  };

  // 이미지 스토리지에 업로드 후 url 반환
  const uploadImages = async () => {
    //이미지 스토리지에 업로드
    const uploadUrls = [];

    for (const file of previewImages) {
      const fileUUid = uuid(); //supabase 한글명은 안됏엇나?.. 암튼 uuid로!
      const filePath = `post/${fileUUid}`; // 파일 저장 경로

      //파일 업로드
      const { data, error } = await supabase.storage
        .from("images")
        .upload(filePath, file); //filePath는 문자열(string)이어야 한다.

      if (error) {
        console.error("이미지 파일 업로드 실패 :", error.message);
        return; //TODO - continue 해야하나
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

  //TODO - async, await 를 안적어줘서 insert안되엇음
  const handleClickUpload = async () => {
    alert("등록하시겠습니까?");

    // url 가져오기
    const uploadUrls = await uploadImages();

    const { data, error } = await supabase.from("posts").insert({
      user_id: "42d9022d-2a87-4e71-bf1b-369b5599d057",
      title: title,
      content: content,
      image_urls: uploadUrls,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //NOTE - e.target.files의 files 속성이 존재하지 않기 때문에 files가 존재하는 HTMLInputElement타입을 as 키워드로 지정
    const fileList = e.target.files as FileList;

    if (fileList.length >= 9) {
      alert("사진은 최대 9장까지 등록가능합니다.");
      return;
    } else {
      // 리스트를 배열로 저장
      const filesArray = Array.from(fileList);

      // url로 변경
      const selectedFiles = filesArray.map((file) => {
        console.log("🚀 ~ selectedFiles ~ file:", file);
        console.log("🚀 ~ selectedFiles ~ file.name:", file.name);
        return URL.createObjectURL(file);
      });
      //NOTE -  images 상태 값에 배열 합치기
      setPreviewImages((prev) => prev.concat(selectedFiles));
    }
  };

  return (
    <div>
      <form>
        <div className="flex justify-between items-center border-b-[1px] h-[50px]">
          <div>
            <button type="button" onClick={backSpaceBtn}>
              <img src="/icons/arrow-left.svg" alt="arrow-left" />
            </button>
          </div>
          <div>
            <div>
              <button>임시저장</button>
              <button type="button" onClick={handleClickUpload}>
                발행
              </button>
            </div>
          </div>
        </div>
        <section className="flex flex-col justify-between items-center">
          <div className="title border-b-[1px] mt-[50px] h-[50px]">
            <input
              className="h-[50px]"
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
            />
          </div>
          <div className="border-2 m-2 p-7">
            <div className="images">
              {previewImages.length >= 9 ? (
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
                  <img src="/icons/plus.svg" alt="plus" />
                </label>
              )}
              {/* 이미지들이 보일 preview 자리 만들기 */}
              <PreviewImage
                previewImages={previewImages}
                setPreviewImages={setPreviewImages}
              />
            </div>
            <div className="context">
              <textarea
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
      </form>
    </div>
  );
}
