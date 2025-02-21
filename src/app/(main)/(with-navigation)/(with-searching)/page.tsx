import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[200px]">
      <section>
        <div>
          <h3>북끼 랭킹</h3>
          <Link href={"/"}></Link>
          <p>베스트 셀러들을 만나보세요!</p>
          <div>
            <ul>
              <li>
                <div>
                  {/* <img src="" alt="" /> */}
                  <p>책 이름</p>
                  <p>작가 이름 </p>
                </div>
              </li>
              <li></li>
            </ul>
          </div>
        </div>
      </section>
      <section>
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
      </section>
    </div>
  );
}
