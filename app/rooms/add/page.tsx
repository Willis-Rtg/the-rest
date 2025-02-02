"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Gwendolyn } from "next/font/google";
import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { uploadRoom } from "./action.ts";

const gwendolyn = Gwendolyn({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal"],
});

type TPanorama = {
  name: string;
  index: number;
  url: string;
};
type TRoomPhoto = {
  name: string;
  index: number;
  url: string;
};
enum Season {
  base,
  middle,
  busy,
}
enum Week {
  weekday,
  friday,
  weekend,
}
type TPrice = {
  season: Season;
  week: Week;
  price: number;
};

type TRoomRegister = {
  title: string;
  structure: string;
  pyong: number;
  quantity: number;
  maxQuantity: number;
  addPrice: string;
  facilities: string;
  extra: string;
  price1?: TPrice;
  price2?: TPrice;
  price3?: TPrice;
  price4?: TPrice;
  price5?: TPrice;
  price6?: TPrice;
  price7?: TPrice;
  price8?: TPrice;
  price9?: TPrice;
  priceLg1?: TPrice;
  priceLg2?: TPrice;
  priceLg3?: TPrice;
  priceLg4?: TPrice;
  priceLg5?: TPrice;
  priceLg6?: TPrice;
  priceLg7?: TPrice;
  priceLg8?: TPrice;
  priceLg9?: TPrice;
  panoramas: TPanorama[];
  roomPhotos: TRoomPhoto[];
};

export default function AddRoom() {
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [panoramas, setPanoramas] = useState<TPanorama[]>([]);
  const [roomPhotos, setRoomPhotos] = useState<TRoomPhoto[]>([]);
  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();
  const dragItem2 = useRef<number | null>();
  const dragOverItem2 = useRef<number | null>();
  let [isPending, startTransition] = useTransition();
  const [state, action] = useFormState(intercepAction, null);
  // const inputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    formState: { errors },
    setError,
  } = useForm<TRoomRegister>({
    defaultValues: {
      facilities:
        "TV, 에어컨, 냉장고, 취사도구, 전기밥솥, 전자레인지, 핫플레이트, 인터넷, 욕실용품, 객실샤워실",
      extra: "식기 구성은 4인 2인 1침구 구성 / 고기,새우,생선 취사불가",
      addPrice: Number(20000).toLocaleString("ko-KR"),
    },
  });

  async function intercepAction(_: any, formData: FormData) {
    console.log("intercepter");
    if (panoramas.length != 2) return;
    if (roomPhotos.length < 5) return;

    let prices = [];
    let testPrice = formData.get("price1");
    let testPriceLg = formData.get("priceLg1");
    for (let index = 1; index < 10; index++) {
      testPrice = formData.get(`price${index}`);
      testPriceLg = formData.get(`priceLg${index}`);
      let numberPrice = Number(testPrice);
      let numberPriceLg = Number(testPriceLg);
      if (isNaN(numberPrice)) {
        setError("price1", {
          message: `Prices are only each number. Check ${index} price`,
        });
        return;
      } else {
        setError("price1", { message: "" });
      }
      if (isNaN(numberPriceLg)) {
        setError("priceLg1", {
          message: `Prices are only each number. Check ${index} price`,
        });
        return;
      } else {
        setError("priceLg1", { message: "" });
      }
      if (testPrice) {
        prices.push(formData.get(`price${index}`));
      } else {
        prices.push(formData.get(`priceLg${index}`));
      }
    }

    for (let price of prices) {
      if (price === "") {
        return setError("root", { message: "Prices is required." });
      } else {
        setError("root", { message: "" });
      }
    }
    let newFormData = new FormData();
    newFormData = formData;
    newFormData.delete("prices");

    for (const price of prices) {
      if (price !== "") newFormData.append("prices", price!);
    }

    for (const file of panoramas) {
      const response = await fetch(file.url);
      const data = await response.blob();
      const newFile = new File([data], file.name, {});

      await newFormData.append("panaramas", newFile);
    }
    for (const file of roomPhotos) {
      const response = await fetch(file.url);
      const data = await response.blob();
      const newFile = new File([data], file.name, {});

      await newFormData.append("roomPhotos", newFile);
    }

    return uploadRoom(_, newFormData);
  }

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...panoramas];
    const dragItemValue = panoramas[dragItem.current!];
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
    const newList = [...panoramas];
    const dragItemValue = panoramas[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanoramas(newList);
  }

  function dragStart2(e: React.DragEvent, index: number) {
    dragItem2.current = index;
  }

  function dragEnter2(e: React.DragEvent, index: number) {
    dragOverItem2.current = index;
  }

  function drop2(e: React.DragEvent) {
    const newList = [...roomPhotos];
    const dragItemValue = roomPhotos[dragItem2.current!];
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
    const newList = [...roomPhotos];
    const dragItemValue = roomPhotos[dragItem2.current!];
    newList.splice(dragItem2.current!, 1);
    newList.splice(dragOverItem2.current!, 0, dragItemValue);
    dragItem2.current = null;
    dragOverItem2.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setRoomPhotos(newList);
  }

  function onChangePanorama(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    if (files.length > 2 || panoramas.length >= 2) {
      setError("panoramas", { message: "Maximum 2" });
      return;
    }

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      setPanoramas((prev) => [
        ...prev,
        {
          url,
          index: index + panoramas.length,
          name: file.name,
          type: "photo",
        },
      ]);
    });
  }

  function onChangeRoomPhoto(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      setRoomPhotos((prev) => [
        ...prev,
        {
          url,
          index: index + roomPhotos.length,
          name: file.name,
          type: "photo",
        },
      ]);
    });
  }

  function deletePanorama(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setPanoramas((prev) =>
      prev.filter((preview) => preview.index != panoramas[index].index)
    );
  }
  function deleteRoomPhoto(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setRoomPhotos((prev) =>
      prev.filter((preview) => preview.index != roomPhotos[index].index)
    );
  }

  function registerPanorama() {
    if (panoramas.length != 2) {
      setError("panoramas", { message: "Panorama is need 2 photos." });
      return;
    }
    setModal(false);
  }

  function registerRoomPhoto() {
    if (roomPhotos.length < 5) {
      setError("roomPhotos", {
        message: "Room photo is need at least 5 photos.",
      });
      return;
    }
    setModal2(false);
  }

  return (
    <form
      action={(payload) => {
        startTransition(() => action(payload));
      }}
      className="flex flex-col items-center mt-10"
    >
      <div className="px-4 flex flex-col items-center gap-6">
        <input
          {...register("title", {
            required: { value: false, message: "Title is required." },
          })}
          className="bg-neutral-200 p-2 rounded-lg text-center"
          placeholder="방 이름"
          required
        />
        <div className="flex flex-col items-center">
          <span className="font-bold">구조 넓이</span>
          <div className="flex flex-col items-center gap-2 *:text-neutral-500 text-sm">
            <input
              {...register("structure")}
              className="bg-neutral-200 rounded-lg p-1 text-center"
              placeholder="침대룸(더블) 화장실1"
              required
            />
            <span>
              <input
                {...register("pyong")}
                className="bg-neutral-200 rounded-lg p-1 text-center"
                size={5}
                placeholder="평"
                required
              />
              평
            </span>
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
                className="bg-neutral-200 rounded-lg text-center"
                size={3}
                required
              />
              명 최대
              <input
                {...register("maxQuantity")}
                className="bg-neutral-200 rounded-lg text-center"
                required
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
                      required
                      {...register("addPrice")}
                      className="bg-neutral-200 rounded-lg text-center"
                      placeholder={Number(20000).toLocaleString("ko-KR")}
                      size={10}
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
            {...register("facilities")}
            className="text-neutral-500 text-sm text-center bg-neutral-200"
            size={80}
            placeholder="TV, 에어컨, 냉장고, 취사도구, 전기밥솥, 전자레인지, 핫플레이트,
            인터넷, 욕실용품, 객실샤워실"
            required
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold">특이사항</span>
          <input
            {...register("extra")}
            type="text"
            className="text-neutral-500 text-sm bg-neutral-200 text-center"
            size={50}
            placeholder="식기 구성은 4인 2인 1침구 구성 / 고기,새우,생선 취사불가"
            required
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
                <td>원룸형 / 침대룸 주방 화장실</td>
                <td>6</td>
                <td>8</td>
                <td>
                  <input
                    {...register("priceLg1")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg2")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg3")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg4")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg5")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg6")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg7")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg8")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("priceLg9")}
                    className="bg-neutral-200 p-1"
                    size={10}
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
                    {...register("price1")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price2")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price3")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
              </tr>
              <tr>
                <td> 준성수기</td>
                <td>
                  <input
                    {...register("price4")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price5")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price6")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
              </tr>
              <tr>
                <td> 성수기</td>
                <td>
                  <input
                    {...register("price7")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price8")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
                <td>
                  <input
                    {...register("price9")}
                    className="bg-neutral-200 p-1"
                    size={10}
                  />
                  원
                </td>
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

      <div className=" relative flex flex-col items-center md:flex-row justify-center gap-8 bg-[#eee] p-24 w-full ">
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
            {panoramas[0] ? (
              <Image src={panoramas[0].url} fill alt="" />
            ) : (
              <Image src="/태안해변.png" fill alt="태안해변" />
            )}
          </div>
        </div>
        <div className="flex flex-col">
          <h1
            className={`text-9xl text-neutral-400 self-center mb-16 ${gwendolyn.className} italic`}
          >
            Rooms
          </h1>
          <div className="relative w-[70vw] h-[40vw] md:w-[35vw] md:h-[25vw]">
            {panoramas[1] ? (
              <Image src={panoramas[1].url} fill alt="" />
            ) : (
              <Image src="/노을.png" fill alt="노을" />
            )}
          </div>
          <p className="text-neutral-400 mt-8">
            All seasons of the year are beautiful here. The 쉼 Pension <br />I
            give you a gift for your life.
          </p>
          <div
            aria-disabled
            className="absolute bottom-5 right-5 bg-green-400 text-white p-2 rounded-lg cursor-pointer"
            onClick={() => setModal((prev) => !prev)}
          >
            사진 변경
          </div>
        </div>
        {/* modal */}
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
                {panoramas.map((file, index) => {
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
                    {...register("panoramas")}
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
                    {errors.panoramas?.message?.toString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="relative flex flex-col items-center">
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {roomPhotos.map((file, index) =>
            index === roomPhotos.length - 1 ? null : (
              <div
                key={index}
                className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]"
              >
                <Image src={file.url} fill alt="방사진1" />
              </div>
            )
          )}
        </div>
        <div className="mt-8 relative w-[90vw] h-[70vw] md:h-[55vw]">
          <Image src={roomPhotos[roomPhotos.length - 1]?.url} fill alt="전경" />
        </div>
        <button
          className="absolute -bottom-5 -right-5 bg-green-400 text-white p-2 rounded-lg"
          onClick={() => setModal2((prev) => !prev)}
        >
          사진 변경
        </button>
      </div>
      {/* modal2 */}
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
              {roomPhotos.map((file, index) => {
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
      <button
        type="submit"
        className="py-3 px-5 bg-yellow-300 mt-4"
        disabled={isPending}
      >
        {isPending ? "uploading..." : "등록"}
      </button>
      <p className="text-red-400 mt-2 text-sm">{errors.root?.message}</p>
      <p className="text-red-400 mt-2 text-sm">{errors.price1?.message}</p>
      <p className="text-red-400 mt-2 text-sm">{errors.priceLg1?.message}</p>
    </form>
  );
}
