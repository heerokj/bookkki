"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WritePage() {
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  const route = useRouter();

  const backSpaceBtn = () => {
    alert("작성 중인 내용은 삭제됩니다.");
    route.push("/feed");
  };

  const handleClickUpload = () => {
    alert("등록하시겠습니까?");
    console.log("🚀 ~ WritePage ~ previewImages:", previewImages);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        return URL.createObjectURL(file);
      });
      // images 상태 값에 배열 합치기
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
          <div>
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
                    onChange={handleChangeImage}
                  />
                  <img src="/icons/plus.svg" alt="plus" />
                </label>
              )}
              {/* 이미지들이 보일 preview 자리 만들기 */}
              <div className="grid grid-cols-3 gap-4">
                {previewImages.map((img, i) => {
                  return (
                    <div key={img} className="flex">
                      <img
                        src={img}
                        alt={`${img}-${i}`}
                        className="object-cover"
                        width={150}
                        height={150}
                      />
                      <button
                        onClick={() =>
                          setPreviewImages(
                            previewImages.filter((t) => t !== img)
                          )
                        }
                      >
                        <img
                          src="/icons/x.svg"
                          alt="x"
                          className="w-[15px] h-[15px] mb-[110px]"
                        />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="context">
              <textarea
                placeholder="내용을 입력해주세요"
                value={context}
                onChange={(e) => {
                  e.preventDefault();
                  setContext(e.target.value);
                }}
              ></textarea>
            </div>
          </div>
        </section>
      </form>
    </div>
  );
}
