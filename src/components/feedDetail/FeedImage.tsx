import { FeedData } from "@/types/feed";
import Image from "next/image";

export default function FeedImage({ feedImage }: { feedImage: FeedData }) {
  return (
    <div className="feed-image w-full h-full overflow-hidden">
      {feedImage.image_urls?.map((img) => (
        <div key={img} className="h-full">
          <Image
            src={img}
            height={250}
            width={300}
            alt="img"
            className="w-full h-full"
          />
        </div>
      ))}
    </div>
  );
}
