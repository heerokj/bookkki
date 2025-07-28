"use client";
import useKakaoLoader from "@/hooks/useKakaoLoader";
import { Map } from "react-kakao-maps-sdk";

export default function CafeMap() {
  useKakaoLoader();

  return (
    <div className="search-result-map border-2 w-1/2 ">
      <Map // 지도를 표시할 Container
        id="map"
        center={{
          // 지도의 중심좌표
          lat: 33.450701,
          lng: 126.570667,
        }}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      />
    </div>
  );
}
