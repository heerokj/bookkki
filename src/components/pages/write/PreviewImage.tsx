import Image from "next/image";

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
              <Image
                src={img}
                alt={`${img}-${i}`}
                width={270}
                height={150}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <button
                onClick={() =>
                  setPreviewImages(previewImages.filter((t) => t !== img))
                }
              >
                <Image src="/icons/x.svg" alt="x" height={15} width={15} />
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
