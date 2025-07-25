import bookkki from "@/../public/images/bookkki-main-img.png";
import Image from "next/image";

export default function BookImage() {
  return (
    <div className="left-area col-span-2 h-screen">
      <Image
        src={bookkki}
        alt="북끼 이미지"
        className="w-full h-full object-fit"
      />
    </div>
  );
}
