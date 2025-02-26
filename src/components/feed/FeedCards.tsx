import { createClient } from "@/utils/supabase/server";
import FeedCard from "./FeedCard";

export default async function FeedCards() {
  //NOTE - try/catch문으로 하면 그 안에서만 data사용하고 있어서 return문에서 사용 못했음
  const supabase = await createClient(); //NOTE - await
  const { data, error } = await supabase.from("posts").select();

  console.log("🚀 ~ FeedItems ~ data:", data);
  if (error) {
    console.error(error.message);
    return <div>데이터를 불러오는데 오류가 발생했습니다.</div>;
  }
  //NOTE - 데이터 보낼때 {...post}를 자식컴포넌트로 보냄
  return (
    <div className="grid grid-cols-3 gap-4">
      {data && data.length > 0 ? (
        data.map((post) => <FeedCard key={post.id} {...post} />)
      ) : (
        <div>데이터가 없습니다.</div>
      )}
    </div>
  );
}
