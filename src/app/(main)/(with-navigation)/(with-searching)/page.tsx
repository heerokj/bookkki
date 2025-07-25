import BookCafeList from "@/components/main/BookCafeList";
import RecommendBookList from "@/components/main/RecommendBookList";
import SectionBlock from "@/components/main/ui/SectionBlock";

export default async function Home() {
  return (
    <div>
      <SectionBlock title="최신순">
        <div>1</div>
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
