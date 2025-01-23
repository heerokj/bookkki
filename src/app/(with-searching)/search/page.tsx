export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(q);

  return <div>검색 후 페이지 {q}</div>;
}
