import KakaoMap from "@/components/kakao-map";
import Image from "next/image";

export default function Direct() {
  // const [mounted, setMounted] = useState<boolean>(false);

  // useEffect(() => {
  //   console.log(localStorage.getItem("refreshed"));
  //   if (localStorage.getItem("refreshed") != "true") {
  //     localStorage.setItem("refreshed", "true");
  //     window.location.reload();
  //   } else {
  //   }
  // }, []);

  return (
    <div className="pt-20 flex flex-col">
      <div className="flex justify-center">
        <KakaoMap />
      </div>
      <div className="px-24 mb-20">
        <div className="mt-12 flex flex-col md:flex-row items-center">
          <div className="relative w-[80vw] h-[40vw] md:w-[30vw] md:h-[30vw]">
            <Image src="/노을.png" fill alt="석양" />
          </div>
          <div className="md:ml-24 mt-10 md:mt-0">
            <h5 className="text-xl font-bold text-center">NAVIAGTION</h5>
            <h5 className="text-xl text-center">네이게이션 이용시</h5>
            <h6 className="mt-8 font-semibold text-center">
              - 도로명 주소: 충남 태안군 남면 몽산포길 166
            </h6>
          </div>
        </div>
        <div className="flex mt-12 items-center justify-between md:justify-around gap-8">
          <div className="flex flex-col gap-4 ">
            <h4 className="text-xl font-bold text-center">BY BUS</h4>
            <h4 className="text-xl font-bold text-center">대중교통</h4>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-neutral-400 text-white flex justify-center items-center px-10 py-4 font-semibold text-center">
              오실 때 시내버스 시간보기
            </div>
            <div className="bg-neutral-400 text-white flex justify-center items-center px-10 py-4 font-semibold text-center">
              가실 때 시내버스 시간보기
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
