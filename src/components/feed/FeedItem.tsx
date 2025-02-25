import { FeedData } from "@/types/feed";
import Link from "next/link";

export default function FeedItem({
  id,
  created_at,
  user_id,
  title,
  content,
  image_urls,
}: FeedData) {
  console.log("🚀 ~ image_urls:", image_urls);

  return (
    <div key={id}>
      <div className="flex">
        <div>프로필</div>
        <div>닉네임</div>
        <button>
          <img src="/icons/ellipsis.svg" alt="ellipsis" />
        </button>
      </div>
      <Link href={`/feed/${id}`}>
        <div>
          {image_urls?.map((img) => (
            <div key={img}>
              <img src={img} alt="img" />
            </div>
          ))}
        </div>
        <div>{content}</div>
        <div>{created_at}</div>
      </Link>
    </div>
  );
}
