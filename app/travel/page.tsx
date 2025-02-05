import Image from "next/image";
import { Gwendolyn } from "next/font/google";
import { FaArrowRight } from "react-icons/fa6";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: { type: string };
}) {
  return {
    title: "주변 관광지",
    description: "The 쉼 펜션 예약",
  };
}

const gwendolyn = Gwendolyn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});
export default function Travel() {
  return (
    <div>
      <div className="flex flex-col  lg:flex-row items-center justify-center gap-8 bg-neutral-100 p-16">
        <div>
          <div>
            <span>Memories THE 쉼</span>
            <h3 className="text-3xl">TRAVLE #01</h3>
            <h4 className="text-xl font-bold mt-8"> 몽산포해수욕장</h4>
          </div>
          <div className="relative w-[85vw] h-[50vw] lg:w-[35vw] lg:h-[30vw] mt-4">
            <Image src="/몽산포해수욕장.webp" fill alt="몽산포해수욕장" />
          </div>
        </div>
        <div className="lg:w-[40vw] flex flex-col items-center mt-8">
          <h6
            className={`${gwendolyn.className} text-9xl text-neutral-400 mb-8`}
          >
            Travel
          </h6>
          <div>
            태안해안국립공원에 속한 몽산포해수욕장은 서산 남서쪽 18km, 태안 남쪽
            9km, 남면 반도 서안에 길게 펼쳐져 있다. 백사장 길이 3km, 경사도 5도,
            평균수심 1~2m, 평균 수온 섭씨 22도 정도이며 모래밭과 울창한 소나무
            숲으로 둘러싸여 있다. <br /> (자료출처 : 대한민국 구석구석 -
            korean.visitkorea.or.kr)
          </div>
          <p className="mt-12 text-neutral-400 text-sm">
            All seasons of the year are beautiful here. THE 쉼 I give you a gift
            for your life.
          </p>
          <div className="border border-black py-2 px-4 flex items-center gap-4 self-start mt-8">
            <FaArrowRight size={30} />
            <span>155m 도보 약 3분</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-16">
        <div>
          <div>
            <span>Memories THE 쉼</span>
            <h3 className="text-3xl">TRAVLE #02</h3>
            <h4 className="text-xl font-bold mt-8">팜카밀레 허브농원</h4>
          </div>
          <div className="relative w-[85vw] h-[50vw] lg:w-[35vw] lg:h-[30vw]">
            <Image src="/허브농원.webp" fill alt="몽산포해수욕장" />
          </div>
        </div>
        <div className="lg:w-[40vw] flex flex-col items-center mt-8">
          <h6
            className={`${gwendolyn.className} text-9xl text-neutral-400 mb-8`}
          >
            Travel
          </h6>
          <div>
            팜 카밀레란 농원(Farm)이라는 영문의 이름과 허브를 대표하는
            카밀레(Kamille)와의 합성어로서 말 그대로 허브를 가꾸고 향기를
            전달하는 농원이라는 뜻이다. 국내 최초로 허브차를 수입, 제조 판매해온
            (주) 허브라가 다년간의 허브차, 허브 용품의 제조 및 유통 경험을
            바탕으로 오픈한 1만 2천 평 규모의 국내 최대 허브 관광농원이다.
            <br /> (자료출처 : 대한민국 구석구석 - korean.visitkorea.or.kr)
          </div>
          <p className="mt-12 text-neutral-400 text-sm">
            All seasons of the year are beautiful here. THE 쉼 I give you a gift
            for your life.
          </p>
          <div className="border border-black py-2 px-4 flex items-center gap-4 self-start mt-8">
            <FaArrowRight size={30} />
            <span>약 2.1km 차량 4분</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 bg-neutral-100 p-16">
        <div>
          <div>
            <span>Memories THE 쉼</span>
            <h3 className="text-3xl">TRAVLE #03</h3>
            <h4 className="text-xl font-bold mt-8"> 몽산포항</h4>
          </div>
          <div className="relative w-[85vw] h-[50vw] lg:w-[35vw] lg:h-[30vw]">
            <Image src="/몽산포항.webp" fill alt="몽산포해수욕장" />
          </div>
        </div>
        <div className="lg:w-[40vw] flex flex-col items-center mt-8">
          <h6
            className={`${gwendolyn.className} text-9xl text-neutral-400 mb-8`}
          >
            Travel
          </h6>
          <div>
            태안군 남면 몽산리 해안에 있는 포구로서 깨끗한 백사장에 끝없이
            펼쳐진 솔밭이 아름답고 물새 등 조류의 낙원을 이루며, 주변에는
            천연기념물 모감주나무의 군락이 있어 많은 피서객이 모여든다. <br />
            (자료출처 : 대한민국 구석구석 - korean.visitkorea.or.kr)
          </div>
          <p className="mt-12 text-neutral-400 text-sm">
            All seasons of the year are beautiful here. THE 쉼 I give you a gift
            for your life.
          </p>
          <div className="border border-black py-2 px-4 flex items-center gap-4 self-start mt-8">
            <FaArrowRight size={30} />
            <span>약 1.7km 차량 3분</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 p-16">
        <div>
          <div>
            <span>Memories THE 쉼</span>
            <h3 className="text-3xl">TRAVLE #04</h3>
            <h4 className="text-xl font-bold mt-8"> 쥬라기공원</h4>
          </div>
          <div className="relative w-[85vw] h-[50vw] lg:w-[35vw] lg:h-[30vw]">
            <Image src="/쥬라기공원.webp" fill alt="몽산포해수욕장" />
          </div>
        </div>
        <div className="lg:w-[40vw] flex flex-col items-center mt-8">
          <h6
            className={`${gwendolyn.className} text-9xl text-neutral-400 mb-8`}
          >
            Travel
          </h6>
          <div>
            안면도 쥬라기 공원은 충청남도 태안군 남면 신온리에 있다. 2011년 7월
            개관한 안면도 쥬라기 박물관으로 향하는 길목에있다. 공룡을 비롯해
            비행기, 고래, 기차 등 각종 조형물이 설치되어 있다.
            <br /> (자료출처 : 대한민국 구석구석 - korean.visitkorea.or.kr)
          </div>
          <p className="mt-12 text-neutral-400 text-sm">
            All seasons of the year are beautiful here. THE 쉼 I give you a gift
            for your life.
          </p>
          <div className="border border-black py-2 px-4 flex items-center gap-4 self-start mt-8">
            <FaArrowRight size={30} />
            <span>약 10.2km 차량 14분</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center gap-8 bg-neutral-100 p-16">
        <div>
          <div>
            <span>Memories THE 쉼</span>
            <h3 className="text-3xl">TRAVLE #05</h3>
            <h4 className="text-xl font-bold mt-8"> 태안 네이처월드</h4>
          </div>
          <div className="relative w-[85vw] h-[50vw] lg:w-[35vw] lg:h-[30vw]">
            <Image src="/네이처월드.webp" fill alt="몽산포해수욕장" />
          </div>
        </div>
        <div className="lg:w-[40vw] flex flex-col items-center mt-8">
          <h6
            className={`${gwendolyn.className} text-9xl text-neutral-400 mb-8`}
          >
            Travel
          </h6>
          <div>
            태안 마검포해수욕장 근처에 위치한 네이처월드에서는 1년 365일 쉼 없이
            축제가 열리고 있다. 2012년부터 시작된 태안꽃축제는 태풍과 가뭄으로
            그간 우여곡적이 많았다. <br /> (자료출처 : 대한민국 구석구석 -
            korean.visitkorea.or.kr)
          </div>
          <p className="mt-12 text-neutral-400 text-sm">
            All seasons of the year are beautiful here. THE 쉼 I give you a gift
            for your life.
          </p>
          <div className="border border-black py-2 px-4 flex items-center gap-4 self-start mt-8">
            <FaArrowRight size={30} />
            <span>약 10km 차량 16분</span>
          </div>
        </div>
      </div>
    </div>
  );
}
