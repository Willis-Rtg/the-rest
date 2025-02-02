"use client";

import Image from "next/image";
import { Gwendolyn } from "next/font/google";
import RoomSwiper from "@/components/room-siwper";
import { deleteRoomDB, getRoom, TRoom } from "./actions";
import { useFormState } from "react-dom";
import { useState, useTransition } from "react";
import { redirect } from "next/navigation";
import Link from "next/link";

const gwendolyn = Gwendolyn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export default function RoomDetailClient({
  roomDB,
  isAdmin,
}: {
  roomDB: TRoom;
  isAdmin: boolean;
}) {
  const [room, setRoom] = useState<TRoom>(roomDB);
  const [state, action] = useFormState(deleteRoom, null);
  const [isPending, startTransition] = useTransition();

  function deleteRoom(_: any, formData: FormData) {
    const newFormData = new FormData();

    if (!room) return;
    newFormData.append("roomId", room.id + "");
    return deleteRoomDB(_, newFormData);
  }

  return (
    <form
      action={(payload) => {
        startTransition(async () => {
          await action(payload);
          console.log(state);
        });
        redirect("/");
      }}
      className="flex flex-col items-center"
    >
      <div className="px-4 flex flex-col items-center gap-6">
        <h3 className="text-2xl font-bold gap-4">{room?.title}</h3>
        <div className="flex flex-col items-center">
          <span className="font-bold">구조 넓이</span>
          <div className="flex flex-col items-center *:text-neutral-500 text-sm">
            <span>{room?.structure}</span>
            <span>{room?.pyong}평</span>
            <span>개별 바베큐</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">기준 인원</span>
          <div className="flex flex-col gap-2 items-center *:text-neutral-500 *:text-sm">
            <span>
              기준 {room?.quantity}명 최대 {room?.maxQuantity}명 / 기준인원
              초과시 추가요금 발생
            </span>
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
                  <td>{room?.addPrice.toLocaleString("ko-KR")}원</td>
                  <td>{room?.addPrice.toLocaleString("ko-KR")}원</td>
                  <td>{room?.addPrice.toLocaleString("ko-KR")}원</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">구비시설</span>
          <p className="text-neutral-500 text-sm text-center">
            {room?.facilities}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">특이사항</span>
          <p className="text-neutral-500 text-sm">{room?.extra}</p>
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
                <td>{room?.structure}</td>
                <td>{room?.quantity}</td>
                <td>{room?.maxQuantity}</td>
                {room?.prices.map((price, key) => (
                  <td key={key}>
                    {Number(price.price).toLocaleString("ko-KR")} 원
                  </td>
                ))}
                {/* <td>220,000</td>
                <td>220,000</td>
                <td>250,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td>
                <td>300,000</td> */}
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
                {room?.prices
                  .filter((price) => price.season === "base")
                  .map((price) => (
                    <td key={price.id}>
                      {price.price.toLocaleString("ko-KR")} 원
                    </td>
                  ))}
              </tr>
              <tr>
                <td> 준성수기</td>
                {room?.prices
                  .filter((price) => price.season === "middle")
                  .map((price) => (
                    <td key={price.id}>
                      {price.price.toLocaleString("ko-KR")} 원
                    </td>
                  ))}
              </tr>
              <tr>
                <td> 성수기</td>
                {room?.prices
                  .filter((price) => price.season === "busy")
                  .map((price) => (
                    <td key={price.id}>
                      {price.price.toLocaleString("ko-KR")} 원
                    </td>
                  ))}
              </tr>
              <tr>
                <td>기준인원</td>
                <td>추가인원</td>
                <td colSpan={4}>유형</td>
              </tr>
              <tr>
                <td>{room?.quantity}</td>
                <td>{room?.maxQuantity}</td>
                <td colSpan={4}>{room?.structure}</td>
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
            <Image src={room?.panorama?.files[0].url!} fill alt="태안해변" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1
            className={`text-9xl text-neutral-400 self-center mb-16 ${gwendolyn.className} italic`}
          >
            Rooms
          </h1>
          <div className="relative w-[70vw] h-[40vw] md:w-[35vw] md:h-[25vw]">
            <Image src={room?.panorama?.files[1].url! || ""} fill alt="노을" />
          </div>
          <p className="text-neutral-400 mt-8">
            All seasons of the year are beautiful here. The 쉼 Pension <br />I
            give you a gift for your life.
          </p>
        </div>
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {room?.roomPhotos.map((photo, index) => {
          if (room.roomPhotos.length - 1 === index) return null;
          return (
            <div
              key={photo.id}
              className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]"
            >
              <Image src={photo.url} fill alt="방사진1" objectFit="cover" />
            </div>
          );
        })}
      </div>
      <div className="mt-8 relative w-[90vw] h-[70vw] md:h-[55vw]">
        {
          <Image
            src={room?.roomPhotos[room.roomPhotos.length - 1].url! || ""}
            fill
            alt="전경"
            objectFit="cover"
          />
        }
      </div>
      {isAdmin && (
        <div className="flex gap-10">
          <button
            disabled={isPending}
            className="bg-red-500 px-5 py-2 mt-10 text-white rounded-md"
          >
            룸 삭제
          </button>
          <Link
            href={`/rooms/${room?.id}/edit`}
            className="bg-green-500 px-5 py-2 mt-10 text-white rounded-md"
          >
            룸 수정
          </Link>
        </div>
      )}
      <RoomSwiper />
    </form>
  );
}
