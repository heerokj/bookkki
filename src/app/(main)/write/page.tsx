"use client";

import PreviewImage from "@/components/write/PreviewImage";
import { createClient } from "@/utils/supabase/client";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { UserContext } from "@/context/UserContext";

export default function WritePage() {
  const userData = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]); //TODO - previewImages에 있는 파일이 blob:http://... 같은 blob URL이 아니라 File 객체여야 해!

  const route = useRouter();
  const supabase = createClient();

  const backSpaceBtn = () => {
    alert("작성 중인 내용은 삭제됩니다.");
    route.push("/feed");
  };

  const convertURLtoFile = async (url: string) => {
    const response = await fetch(url);
    const data = await response.blob();
    const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
    const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
    const metadata = { type: `image/${ext}` };
    return new File([data], filename!, metadata);
  };

  // 이미지 스토리지에 업로드 후 url 반환
  const uploadImages = async () => {
    //이미지 스토리지에 업로드
    const uploadUrls = [];

    //NOTE - previewImages에 있는 파일이 blob:http://... 같은 blob URL이 아니라 File 객체여야 해!
    for (const file of previewImages) {
      const fileUUid = uuid(); //supabase 한글명은 안됏엇나?.. 암튼 uuid로!
      const filePath = `post/${fileUUid}`; // 파일 저장 경로

      //TODO - previewImages를 File 객체로 변환하기
      const newFile = await convertURLtoFile(file);

      //파일 업로드
      const { error } = await supabase.storage
        .from("images")
        .upload(filePath, newFile); //NOTE - filePath는 문자열(string)이어야 한다.
      //NOTE - file은 blob:~~ 이면 안돼!!!!!!!!!
      //Supabase의 .upload() 메서드는 File 객체 또는 Blob 객체를 받아야 해. 단순한 URL 문자열은 업로드 할 수 없다!!!

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
    try {
      // url 가져오기
      const uploadUrls = await uploadImages();

      if (userData) {
        const { error } = await supabase.from("posts").insert({
          user_id: userData.id,
          title: title,
          content: content,
          image_urls: uploadUrls,
        });
        if (error) {
          console.error(error.message);
          alert("등록에 실패했습니다.");
        }
      }
      alert("등록되었습니다.");
      route.push("/feed");
    } catch (error) {
      console.error("등록에 실패했습니다.", error);
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
      //NOTE -  images 상태 값에 배열 합치기
      setPreviewImages((prev) => prev.concat(selectedFiles));
    }
  };

  return (
    <div>
      <form>
        <div className="bar flex justify-between items-center border-b-[1px] h-[50px]">
          <div>
            <button type="button" onClick={backSpaceBtn}>
              <img src="/icons/arrow-left.svg" alt="arrow-left" />
            </button>
          </div>
          <div>
            <div className="flex gap-4">
              <button>임시저장</button>
              <button type="button" onClick={handleClickUpload}>
                발행
              </button>
            </div>
          </div>
        </div>
        <div className="editor-container flex flex-col m-auto mx-[250px]">
          <div className="editor-heading h-[100px] border-b-[2px] mt-[50px] ">
            <input
              className="h-full px-4 focus:outline-0 text-[30px]"
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => {
                e.preventDefault();
                setTitle(e.target.value);
              }}
              maxLength={20}
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
        </div>
      </form>
    </div>
  );
}
