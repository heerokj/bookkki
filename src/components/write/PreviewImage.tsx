//NOTE - props로 받는 타입 공부하기
export default function PreviewImage({
  previewImages,
  setPreviewImages,
}: {
  previewImages: string[];
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  return (
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
                setPreviewImages(previewImages.filter((t) => t !== img))
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
  );
}
