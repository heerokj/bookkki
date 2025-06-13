import FeedCards from "@/components/feed/FeedCards";
import { fetchFeeds } from "@/lib/actions/read-feed-action";

import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import Link from "next/link";

export default async function Feed() {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ["feeds"],
    queryFn: ({ pageParam }) => fetchFeeds(pageParam, 10),
    initialPageParam: 1,
    getNextPageParam: (
      lastPage: { hasNext: boolean },
      allPages: { hasNext: boolean }[]
    ) => {
      return lastPage?.hasNext ? allPages.length + 1 : undefined;
    },
  });

  // 직렬화된 React Query 상태를 클라이언트로 전달
  const dehydratedState = dehydrate(queryClient);

  return (
    <div className="mb-6">
      <div className="write-icon-container flex justify-end">
        <Link href={"/write"} className="p-4">
          <img
            src="/icons/pencil-line.svg"
            alt="pencil"
            width={20}
            height={20}
          />
        </Link>
      </div>
      <HydrationBoundary state={dehydratedState}>
        <FeedCards />
      </HydrationBoundary>
    </div>
  );
}
