"use client";

import Image from "next/image";
import { TRoom } from "../actions";
import { Gwendolyn } from "next/font/google";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { useRef, useState, useTransition } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { TPanorama } from "@/app/about/actions";
import { updateRoomDB } from "./actions";
import { redirect } from "next/navigation";

interface IRoomEdit {
  room: TRoom;
}

const gwendolyn = Gwendolyn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

export default function RoomEditClient({ room }: IRoomEdit) {
  const {
    register,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: {
      title: room?.title,
      structure: room?.structure,
      pyong: room?.pyong,
      quantity: room?.quantity,
      maxQuantity: room?.maxQuantity,
      addPrice: room?.addPrice.toLocaleString("ko-KR"),
      facilities: room?.facilities,
      extra: room?.extra,
      panorama: room?.panorama?.files,
      roomPhotos: room?.roomPhotos,
      price1: room?.prices
        .find((price) => price.season == "base" && price.week == "weekday")
        ?.price.toLocaleString("ko-KR"),
      price2: room?.prices
        .find((price) => price.season == "base" && price.week == "friday")
        ?.price.toLocaleString("ko-KR"),
      price3: room?.prices
        .find((price) => price.season == "base" && price.week == "weekend")
        ?.price.toLocaleString("ko-KR"),
      price4: room?.prices
        .find((price) => price.season == "middle" && price.week == "weekday")
        ?.price.toLocaleString("ko-KR"),
      price5: room?.prices
        .find((price) => price.season == "middle" && price.week == "friday")
        ?.price.toLocaleString("ko-KR"),
      price6: room?.prices
        .find((price) => price.season == "middle" && price.week == "weekend")
        ?.price.toLocaleString("ko-KR"),
      price7: room?.prices
        .find((price) => price.season == "busy" && price.week == "weekday")
        ?.price.toLocaleString("ko-KR"),
      price8: room?.prices
        .find((price) => price.season == "busy" && price.week == "friday")
        ?.price.toLocaleString("ko-KR"),
      price9: room?.prices
        .find((price) => price.season == "busy" && price.week == "weekend")
        ?.price.toLocaleString("ko-KR"),
    },
  });
  const [modal, setModal] = useState(false);
  const [panoramas, setPanoramas] = useState(room?.panorama?.files || []);
  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...panoramas!];
    const dragItemValue = panoramas![dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanoramas(newList);
  }

  function touchStart(e: React.TouchEvent, index: number) {
    dragItem.current = index;
  }

  function touchEnter(e: React.TouchEvent, index: number) {
    e.preventDefault();
    const el = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (!el) return;
    e.currentTarget.parentElement!.childNodes.forEach((item, index) => {
      if (item === el.parentElement) dragOverItem.current = index;
    });
  }

  function touchEnd(e: React.TouchEvent) {
    const newList = [...panoramas!];
    const dragItemValue = panoramas![dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanoramas(newList);
  }

  function onChangePanorama(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    if (files.length > 2 || panoramas!.length >= 2) {
      setError("panorama", { message: "Maximum 2" });
      return;
    }

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      console.log(file);
      setPanoramas((prev: any) => {
        return [
          ...prev!,
          {
            url,
            index: index + panoramas!.length,
            filename: file.name,
            type: "photo",
          },
        ];
      });
    });
    console.log(panoramas);
  }
  function deletePanorama(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setPanoramas((prev) =>
      prev?.filter((preview) => preview.index != panoramas![index].index)
    );
  }

  function registerPanorama() {
    if (panoramas?.length != 2) {
      setError("panorama", { message: "Panorama is need 2 photos." });
      return;
    }
    setModal(false);
  }

  const [modal2, setModal2] = useState(false);
  const [roomPhotos, setRoomPhotos] = useState(room?.roomPhotos || []);
  const dragItem2 = useRef<number | null>();
  const dragOverItem2 = useRef<number | null>();

  function dragStart2(e: React.DragEvent, index: number) {
    dragItem2.current = index;
  }

  function dragEnter2(e: React.DragEvent, index: number) {
    dragOverItem2.current = index;
  }

  function drop2(e: React.DragEvent) {
    const newList = [...roomPhotos!];
    const dragItemValue = roomPhotos![dragItem2.current!];
    newList.splice(dragItem2.current!, 1);
    newList.splice(dragOverItem2.current!, 0, dragItemValue);
    dragItem2.current = null;
    dragOverItem2.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setRoomPhotos(newList);
  }

  function touchStart2(e: React.TouchEvent, index: number) {
    dragItem2.current = index;
  }

  function touchEnter2(e: React.TouchEvent, index: number) {
    e.preventDefault();
    const el = document.elementFromPoint(
      e.touches[0].clientX,
      e.touches[0].clientY
    );
    if (!el) return;
    e.currentTarget.parentElement!.childNodes.forEach((item, index) => {
      if (item === el.parentElement) dragOverItem2.current = index;
    });
  }

  function touchEnd2(e: React.TouchEvent) {
    const newList = [...roomPhotos!];
    const dragItemValue = roomPhotos![dragItem2.current!];
    newList.splice(dragItem2.current!, 1);
    newList.splice(dragOverItem2.current!, 0, dragItemValue);
    dragItem2.current = null;
    dragOverItem2.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setRoomPhotos(newList);
  }

  function onChangeRoomPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      setRoomPhotos((prev: any) => [
        ...prev,
        {
          url,
          index: index + roomPhotos!.length,
          filename: file.name,
          type: "photo",
        },
      ]);
    });
  }

  const [isPending, startTransition] = useTransition();

  function deleteRoomPhoto(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setRoomPhotos((prev) =>
      prev!.filter((preview) => preview.index != roomPhotos![index].index)
    );
  }
  function registerRoomPhoto() {
    if (roomPhotos!.length < 5) {
      setError("roomPhotos", {
        message: "Room photo is need at least 5 photos.",
      });
      return;
    }
    setModal2(false);
  }

  const [state, action] = useFormState(updateRoom, null);

  async function updateRoom(_: any, formData: FormData) {
    if (panoramas.length < 2) {
      setError("root", { message: "Panoramas are required." });
      return;
    }
    if (roomPhotos.length < 5) {
      setError("root", { message: "Room photos are required." });
      return;
    }
    let newFormData = new FormData();
    newFormData = formData;

    for (let panorama of panoramas) {
      const response = await fetch(panorama.url);
      const data = await response.blob();
      const newFile = new File([data], panorama.filename, {});
      newFormData.append("panoramas", newFile);
    }

    for (let roomPhoto of roomPhotos) {
      const response = await fetch(roomPhoto.url);
      const data = await response.blob();
      const newFile = new File([data], roomPhoto.filename, {});

      newFormData.append("roomPhotos", newFile);
    }

    for (let i = 0; i < 9; i++) {
      newFormData.append(
        "prices",
        formData.getAll(`price${i + 1}`)[window.innerWidth < 1024 ? 1 : 0]
      );
      newFormData.delete(`price${i + 1}`);
    }

    return updateRoomDB(room?.id, formData);
  }

  return (
    <form
      action={async (payload) => {
        await startTransition(() => action(payload));
        redirect(`/rooms/${room?.id}`);
      }}
      className="flex flex-col items-center"
    >
      <div className="px-4 flex flex-col items-center gap-6">
        <input
          {...register("title")}
          className="text-2xl font-bold gap-4 bg-neutral-300 text-center"
          required
        />
        <div className="flex flex-col items-center">
          <span className="font-bold">구조 넓이</span>
          <div className="flex flex-col gap-2 items-center *:text-neutral-500 text-sm">
            <input
              {...register("structure")}
              required
              className="bg-neutral-300 text-center"
            />
            <div>
              <input
                {...register("pyong")}
                required
                className="bg-neutral-300 text-center"
                size={5}
              />
              평
            </div>
            <span>개별 바베큐</span>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">기준 인원</span>
          <div className="flex flex-col gap-2 items-center *:text-neutral-500 *:text-sm">
            <span>
              기준
              <input
                {...register("quantity")}
                required
                className="bg-neutral-300 text-center"
                size={3}
              />
              명 최대
              <input
                {...register("maxQuantity")}
                required
                className="bg-neutral-300 text-center"
                size={3}
              />
              명 / 기준인원 초과시 추가요금 발생
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
                  <td>
                    <input
                      className="bg-neutral-300 text-center"
                      size={7}
                      required
                      {...register("addPrice")}
                    />
                    원
                  </td>
                  <td>공통</td>
                  <td>공통</td>
                  <td>공통</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">구비시설</span>
          <input
            size={80}
            required
            {...register("facilities")}
            className="text-neutral-500 text-sm text-center bg-neutral-300"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">특이사항</span>
          <input
            required
            {...register("extra")}
            size={60}
            className="text-neutral-500 text-sm text-center bg-neutral-300"
          />
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
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price1")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price2")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price3")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price4")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price5")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price6")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price7")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price8")}
                  />
                  원
                </td>
                <td>
                  <input
                    className="bg-neutral-300 text-center"
                    required
                    size={10}
                    {...register("price9")}
                  />
                  원
                </td>
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
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register(`price1`)}
                  />
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price2")}
                  />{" "}
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price3")}
                  />{" "}
                  원
                </td>
              </tr>
              <tr>
                <td> 준성수기</td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register(`price4`)}
                  />
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price5")}
                  />{" "}
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price6")}
                  />{" "}
                  원
                </td>
              </tr>
              <tr>
                <td> 성수기</td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register(`price7`)}
                  />
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price8")}
                  />{" "}
                  원
                </td>
                <td>
                  <input
                    required
                    size={10}
                    className="bg-neutral-300 text-center"
                    {...register("price9")}
                  />{" "}
                  원
                </td>
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

      <div className="relative flex flex-col items-center md:flex-row justify-center gap-8 bg-[#eee] p-24 w-full ">
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
            <Image
              src={panoramas[0] ? panoramas[0].url : ""}
              fill
              alt="태안해변"
            />
          </div>
        </div>
        <div className="flex flex-col">
          <h1
            className={`text-9xl text-neutral-400 self-center mb-16 ${gwendolyn.className} italic`}
          >
            Rooms
          </h1>
          <div className="relative w-[70vw] h-[40vw] md:w-[35vw] md:h-[25vw]">
            <Image src={panoramas[1] ? panoramas[1].url : ""} fill alt="노을" />
          </div>
          <p className="text-neutral-400 mt-8">
            All seasons of the year are beautiful here. The 쉼 Pension <br />I
            give you a gift for your life.
          </p>
        </div>
        <div
          onClick={() => setModal((prev) => !prev)}
          className="absolute right-5 bottom-5 bg-green-500 text-white px-5 py-2 rounded-md cursor-pointer"
        >
          사진 변경
        </div>
        {modal && (
          <div
            className={`flex fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center z-20 overflow-hidden`}
          >
            <div className="relative bg-white w-[90vw] max-h-[70vh] lg:w-[80vw] lg:max-h-[80vh] p-4 pb-10 rounded-xl z-10 overflow-scroll flex flex-col items-center">
              <div className="w-full">
                <XMarkIcon
                  onClick={() => setModal(false)}
                  className="absolute right-4 top-4 size-9"
                />
                <div className="flex flex-col items-center">
                  <h3>베너 사진 변경</h3>
                </div>
              </div>
              <div
                className="relative grid grid-cols-3 gap-2 mt-4 justify-items-center mb-20"
                // encType="multipart/form-data"
                // action={(payload) => {
                //   if (panorama.length != 2) {
                //     setError("root", { message: "Need at least 2 file." });
                //     return;
                //   }
                //   return startTransition(() => action());
                // }}
              >
                {panoramas?.map((file, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => dragStart(e, index)}
                      onDragEnter={(e) => dragEnter(e, index)}
                      onDragEnd={drop}
                      onDragOver={(e) => e.preventDefault()}
                      onTouchStart={(e) => touchStart(e, index)}
                      onTouchMove={(e) => touchEnter(e, index)}
                      onTouchEnd={(e) => touchEnd(e)}
                      className="relative w-[25vw] h-[25vw] transition-all z-50"
                    >
                      {
                        <Image
                          src={file.url}
                          fill
                          alt="image"
                          objectFit="cover"
                        />
                      }
                      <XMarkIcon
                        className="absolute right-3 top-3 size-6"
                        onClick={(e) => deletePanorama(e, index)}
                      />
                    </div>
                  );
                })}
                <div className="flex">
                  <input
                    {...register("panorama")}
                    // ref={inputRef}
                    id="panorama"
                    type="file"
                    className="hidden"
                    onChange={onChangePanorama}
                    multiple
                    required
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  />

                  <label
                    className="bg-neutral-300 w-[25vw] h-[25vw] text-lg flex justify-center items-center cursor-pointer"
                    htmlFor="panorama"
                  >
                    <PlusIcon width={100} color="white" />
                  </label>
                </div>
                <div className="absolute -bottom-20 flex flex-col items-center">
                  <button
                    className={`text-white px-20 py-3 rounded-lg self-center ${"bg-green-500"}`}
                    onClick={registerPanorama}
                  >
                    {"등록"}
                  </button>
                  <p className="absolute -bottom-6 text-red-400 text-xs text-center">
                    {/* {state?.formErrors[0] || errors.root?.message} */}
                    {errors.panorama?.message?.toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {roomPhotos!.map((photo, index) => {
          if (roomPhotos!.length - 1 === index) return null;
          return (
            <div
              key={index}
              className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]"
            >
              <Image src={photo.url} fill alt="방사진1" />
            </div>
          );
        })}
      </div>
      <div className="mt-8 relative w-[90vw] h-[70vw] md:h-[55vw]">
        {
          <Image
            src={roomPhotos![roomPhotos!.length - 1]?.url || ""}
            fill
            alt="전경"
          />
        }
        <div
          onClick={() => setModal2((prev) => !prev)}
          className="absolute right-5 bottom-5 bg-sky-500 text-white px-5 py-2 rounded-md cursor-pointer"
        >
          사진 변경
        </div>
        {modal2 && (
          <div
            className={`flex fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center z-20 overflow-hidden`}
          >
            <div className="relative bg-white w-[90vw] max-h-[70vh] lg:w-[80vw] lg:max-h-[80vh] p-4 pb-10 rounded-xl z-10 overflow-scroll flex flex-col items-center">
              <div className="w-full">
                <XMarkIcon
                  onClick={() => setModal2(false)}
                  className="absolute right-4 top-4 size-9"
                />
                <div className="flex flex-col items-center">
                  <h3>방 사진 변경</h3>
                </div>
              </div>
              <div
                className="relative grid grid-cols-3 gap-2 mt-4 justify-items-center mb-20"
                // encType="multipart/form-data"
                // action={(payload) => {
                //   if (roomPhoto.length < 4) {
                //     setError("root", { message: "Need at least 4 file." });
                //     return;
                //   }
                //   return startTransition(() => action());
                // }}
              >
                {roomPhotos?.map((file, index) => {
                  return (
                    <div
                      key={index}
                      draggable
                      onDragStart={(e) => dragStart2(e, index)}
                      onDragEnter={(e) => dragEnter2(e, index)}
                      onDragEnd={drop2}
                      onDragOver={(e) => e.preventDefault()}
                      onTouchStart={(e) => touchStart2(e, index)}
                      onTouchMove={(e) => touchEnter2(e, index)}
                      onTouchEnd={(e) => touchEnd2(e)}
                      className="relative w-[25vw] h-[25vw] transition-all z-50"
                    >
                      {
                        <Image
                          src={file.url}
                          fill
                          alt="image"
                          objectFit="cover"
                        />
                      }
                      <XMarkIcon
                        className="absolute right-3 top-3 size-6"
                        onClick={(e) => deleteRoomPhoto(e, index)}
                      />
                    </div>
                  );
                })}
                <div className="flex">
                  <input
                    {...register("roomPhotos")}
                    // ref={inputRef}
                    id="roomPhoto"
                    type="file"
                    className="hidden"
                    onChange={onChangeRoomPhoto}
                    multiple
                    accept="image/png, image/jpeg, image/webp, image/svg+xml"
                    required
                  />

                  <label
                    className="bg-neutral-300 w-[25vw] h-[25vw] text-lg flex justify-center items-center cursor-pointer"
                    htmlFor="roomPhoto"
                  >
                    <PlusIcon width={100} color="white" />
                  </label>
                </div>
                <div className="absolute -bottom-20 flex flex-col items-center">
                  <button
                    className={`text-white px-20 py-3 rounded-lg self-center ${"bg-green-500"}`}
                    onClick={registerRoomPhoto}
                  >
                    {"등록"}
                  </button>
                  <p className="absolute -bottom-6 text-red-400 text-xs text-center">
                    {/* {state?.formErrors[0] || errors.root?.message} */}
                    {errors.roomPhotos?.message?.toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        disabled={isPending}
        className={`${
          isPending ? "bg-slate-500" : "bg-orange-500"
        }  text-white px-5 py-2 rounded-md mt-10`}
      >
        {isPending ? "Uploading.." : "저장"}
      </button>
      <p>{errors.root?.message}</p>
    </form>
  );
}
