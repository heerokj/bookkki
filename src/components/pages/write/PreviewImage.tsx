//NOTE - props로 받는 타입 공부하기
export default function PreviewImage({
  previewImages,
  setPreviewImages,
}: {
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
    <div className="grid grid-cols-2 gap-4 my-8">
      {previewImages.map((img, i) => {
        return (
          <div key={img} className="flex">
            <div className="w-[270px] h-[150px] overflow-hidden">
              <img
                src={img}
                alt={`${img}-${i}`}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <button
                onClick={() =>
                  setPreviewImages(previewImages.filter((t) => t !== img))
                }
              >
                <img src="/icons/x.svg" alt="x" className="w-[15px] h-[15px]" />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
