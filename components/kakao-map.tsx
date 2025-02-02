import { Map, MapMarker } from "react-kakao-maps-sdk";

export default function KakaoMap() {
  return (
    <>
      <Map
        className="w-[90vw] h-[50vw] md:w-[85vw] md:h-[30vw] "
        center={{ lat: 36.6755928210115, lng: 126.279624135505 }}
        // style={{ width: "85vw", height: "350px" }}
        level={10}
      >
        <MapMarker
          position={{ lat: 36.6755928210115, lng: 126.279624135505 }}
        />
      </Map>
    </>
  );
}
