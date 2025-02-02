import Image from "next/image";
import { Gwendolyn } from "next/font/google";
import RoomSwiper from "@/components/room-siwper";

const gwendolyn = Gwendolyn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export default function Rooms() {
  return (
    <div className="flex flex-col items-center">
      <div className="px-4 flex flex-col items-center gap-6">
        <h3 className="text-2xl font-bold gap-4">디럭스 101(원룸)</h3>
        <div className="flex flex-col items-center">
          <span className="font-bold">구조 넓이</span>
          <div className="flex flex-col items-center *:text-neutral-500 text-sm">
            <span>침대룸(더블) 화장실1</span>
            <span>18평</span>
            <span>개별 바베큐</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">기준 인원</span>
          <div className="flex flex-col gap-2 items-center *:text-neutral-500 *:text-sm">
            <span>기준 6명 최대 8명 / 기준인원 초과시 추가요금 발생</span>
            <table>
              <tbody className="*:*:border-2 *:*:px-2 text-center">
                <tr className="*:font-bold">
                  <td>시즌</td>
                  <td>성인</td>
                  <td>아동</td>
                  <td>유아</td>
                </tr>
                <tr>
                  <td>비수기(공통)</td>
                  <td>20,000원</td>
                  <td>20,000원</td>
                  <td>20,000원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">구비시설</span>
          <p className="text-neutral-500 text-sm text-center">
            TV, 에어컨, 냉장고, 취사도구, 전기밥솥, 전자레인지, 핫플레이트,
            인터넷, 욕실용품, 객실샤워실
          </p>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">특이사항</span>
          <p className="text-neutral-500 text-sm">
            식기 구성은 4인 2인 1침구 구성 / 고기,새우,생선 취사불가
          </p>
        </div>
        <div>
          <table className="hidden lg:block my-16 [&_td]:border-x-2 [&_tr]:border-y-2 [&_td]:text-center [&_td]:text-xs [&_td]:font-semibold [&_td]:p-2">
            <thead>
              <tr className="border-t-2 border-t-orange-400">
                <td rowSpan={2} className="">
                  객실명
                </td>
                <td rowSpan={2}>평형</td>
                <td rowSpan={2}>유형</td>
                <td colSpan={2}>인원</td>
                <td colSpan={3}>정상가</td>
                <td colSpan={3}>준성수기</td>
                <td colSpan={3}>성수기</td>
              </tr>
              <tr>
                <td>기준</td>
                <td>최대</td>
                <td>주중</td>
                <td>금요일</td>
                <td>주말</td>
                <td>주중</td>
                <td>금요일</td>
                <td>주말</td>
                <td>주중</td>
                <td>금요일</td>
                <td>주말</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>더쉼 101호</td>
                <td>18평</td>
                <td>원룸형 / 침대룸 주방 화장실</td>
                <td>6</td>
                <td>8</td>
                <td>180,000</td>
                <td>220,000</td>
                <td>220,000</td>
                <td>250,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td>
              </tr>
            </tbody>
          </table>
          <table className="lg:hidden my-16 [&_td]:border-x-2 [&_tr]:border-y-2 [&_td]:text-center [&_td]:text-xs [&_td]:font-semibold [&_td]:p-2">
            <thead className="bg-neutral-100">
              <tr className=" border-t-4 border-t-orange-400">
                <td colSpan={2}>객실명</td>
                <td>기간</td>
                <td>주중</td>
                <td>금요일</td>
                <td>주말</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td rowSpan={3} colSpan={2}>
                  B동[더쉼] 101호
                </td>
                <td> 정상가</td>
                <td> 180,000</td>
                <td> 220,000</td>
                <td> 220,000</td>
              </tr>
              <tr>
                <td> 정상가</td>
                <td> 180,000</td>
                <td> 220,000</td>
                <td> 220,000</td>
              </tr>
              <tr>
                <td> 정상가</td>
                <td> 180,000</td>
                <td> 220,000</td>
                <td> 220,000</td>
              </tr>
              <tr>
                <td>기준인원</td>
                <td>추가인원</td>
                <td colSpan={4}>유형</td>
              </tr>
              <tr>
                <td>6</td>
                <td>8</td>
                <td colSpan={4}>원룸형/침대룸 주방 화장실</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-col items-center md:flex-row justify-center gap-8 bg-[#eee] p-24 w-full ">
        <div>
          <div className="ml-2">
            <h4 className="text-sm font-semibold">Memories THE 쉼</h4>
            <h2 className="text-4xl">ROOMS DETAIL</h2>
            <h3 className="my-8">
              편안한 휴식을 선물해드리는
              <br /> 태안 THE 쉼 펜션의 객실을 만나보세요.
            </h3>
          </div>
          <div className="relative w-[80vw] h-[45vw] md:w-[45vw] md:h-[35vw]">
            <Image src="/태안해변.png" fill alt="태안해변" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1
            className={`text-9xl text-neutral-400 self-center mb-16 ${gwendolyn.className} italic`}
          >
            Rooms
          </h1>
          <div className="relative w-[70vw] h-[40vw] md:w-[35vw] md:h-[25vw]">
            <Image src="/노을.png" fill alt="노을" />
          </div>
          <p className="text-neutral-400 mt-8">
            All seasons of the year are beautiful here. The 쉼 Pension <br />I
            give you a gift for your life.
          </p>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]">
          <Image src="/노을.png" fill alt="방사진1" />
        </div>
        <div className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]">
          <Image src="/노을.png" fill alt="방사진1" />
        </div>
        <div className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]">
          <Image src="/노을.png" fill alt="방사진1" />
        </div>
        <div className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]">
          <Image src="/노을.png" fill alt="방사진1" />
        </div>
      </div>
      <div className="mt-8 relative w-[90vw] h-[70vw] md:h-[55vw]">
        <Image src="/더쉼전경.png" fill alt="전경" />
      </div>
      <RoomSwiper />
    </div>
  );
}
