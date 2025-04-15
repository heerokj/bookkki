import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    return (
      <div>
        <div className="text-[30px]">로그인 상태</div>
      </div>
    );
  }

  return (
    <div className="h-[200px]">
      <div>
        <h3>따끈따끈 신작</h3>
        <Link href={"/"}></Link>
        <p>새로 나온 책들을 만나보세요!</p>
        <div>
          <ul>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
