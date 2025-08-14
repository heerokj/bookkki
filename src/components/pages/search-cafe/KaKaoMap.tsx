"use client";
import useKakaoLoader from "@/hooks/useKakaoLoader";
import {
  Map,
  MapMarker,
  MapTypeControl,
  ZoomControl,
} from "react-kakao-maps-sdk";
import { CafeData } from "@/types/cafe";

export default function KaKaoMap({ cafe }: { cafe: CafeData }) {
  useKakaoLoader();

  const location = convertToLatLng(cafe.COORDINATES);

  return (
    <div className="search-result-map border-2 w-1/2">
      <Map // 지도를 표시할 Container
        id="map"
        center={location}
        style={{
          // 지도의 크기
          width: "100%",
          height: "100%",
        }}
        level={3} // 지도의 확대 레벨
      >
        <MapMarker position={location}>
          <div style={{ color: "#000" }}>{cafe.TITLE}</div>
        </MapMarker>
        <MapTypeControl position={"TOPRIGHT"} />
        <ZoomControl position={"RIGHT"} />
      </Map>
    </div>
  );
}

function convertToLatLng(str: string) {
  const [lat, lng] = str.split(" ").map(Number);
  return { lat, lng };
}
