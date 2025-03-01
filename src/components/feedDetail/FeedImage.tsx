import { FeedData } from "@/types/feed";

export default function FeedImage({ feedImage }: { feedImage: FeedData }) {
  return (
    <div className="feed-image w-full h-full overflow-hidden">
      {feedImage.image_urls?.map((img) => (
        <div key={img} className="w-full h-full">
          <img src={img} alt="img" className="w-full h-full object-fill" />
        </div>
      ))}
    </div>
  );
}
