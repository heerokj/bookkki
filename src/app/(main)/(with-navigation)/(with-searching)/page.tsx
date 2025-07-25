import BookCafeList from "@/components/pages/main/BookCafeList";
import LatestFeedList from "@/components/pages/main/LatestFeedList";
import RecommendBookList from "@/components/pages/main/RecommendBookList";
import SectionBlock from "@/components/pages/main/ui/SectionBlock";

export default async function Home() {
  return (
    <div>
      <SectionBlock title="최신순">
        <LatestFeedList />
      </SectionBlock>
      <SectionBlock
        title="북끼의 추천"
        description="제가 추천해준 책 읽어보실래요?"
      >
        <RecommendBookList />
      </SectionBlock>
      <SectionBlock
        title="북카페 추천"
        description="분위기 좋은 카페에서 책 읽으면 얼마나 기분이 좋게요"
      >
        <BookCafeList />
      </SectionBlock>
    </div>
  );
}
