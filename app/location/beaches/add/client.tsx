"use client";

import Image from "next/image";
import { useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { FaRegImages } from "react-icons/fa";
import { uploadBeach } from "./actions";

type TFile = {
  filename: string;
  url: string;
  type: "photo" | "svg" | "mp4/vedio";
  index: number;
  test?: string;
};

export type TBeach = {
  files: TFile[];
  payload?: string;
  // createAt: Date;
};

export default function BeachAddClient() {
  const [beach, setBeach] = useState<TBeach | null>(null);

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = e;

    if (!files) {
      return;
    }

    const arrFiles = Array.from(files);

    for (let [index, file] of arrFiles.entries()) {
      const reader = new FileReader();
      let imgUrl = "";
      reader.readAsDataURL(file);
      reader.onload = async (event) => {
        imgUrl = event.target?.result as string;
        setBeach((prev) => {
          return {
            ...prev,
            files: [
              ...(prev?.files || []),
              {
                filename: file.name,
                url: imgUrl,
                type: "photo",
                index,
              },
            ],
          };
        });
      };
    }
  }

  const slider = useRef<HTMLDivElement>(null);
  let dragStart = 0;
  const slideCount = useRef(0);

  function onDragStart(e: React.DragEvent) {
    dragStart = e.clientX;
  }
  function onDrag(e: React.DragEvent) {
    if (!e.clientX) return;
    const moveX = dragStart - e.clientX;
    slider.current!.style.transform = `translateX(${
      -window.innerWidth * 0.61 * slideCount.current - moveX
    }px)`;
  }
  function onDragEnd(e: React.DragEvent) {
    const moveX = dragStart - e.clientX;

    slideCount.current += Math.round((moveX / window.innerWidth) * 0.61 * 3);

    if (slideCount.current <= -1) {
      slideCount.current = 0;
    }
    if (slideCount.current >= (beach?.files.length || 0) - 1) {
      slideCount.current = (beach?.files.length || 0) - 1;
    }
    slider.current!.style.transform = `translateX(${
      -window.innerWidth * 0.61 * slideCount.current
    }px)`;
  }
  function onTouchStart(e: React.TouchEvent) {
    dragStart = e.touches[0].clientX;
  }
  function onTouch(e: React.TouchEvent) {
    if (!e.touches[0].clientX) return;
    if (!beach?.files) return;
    const moveX = dragStart - e.touches[0].clientX;
    slider.current!.style.transform = `translateX(${
      -window.innerWidth * 0.61 * slideCount.current - moveX
    }px)`;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (!beach?.files) return;
    const moveX = dragStart - e.changedTouches[0].clientX;

    slideCount.current += Math.round((moveX / window.innerWidth) * 0.61 * 3);

    if (slideCount.current <= -1) {
      slideCount.current = 0;
    }
    if (slideCount.current >= (beach?.files.length || 0) - 1) {
      slideCount.current = (beach?.files.length || 0) - 1;
    }
    slider.current!.style.transform = `translateX(${
      -window.innerWidth * 0.61 * slideCount.current
    }px)`;
  }

  const { register, setError } = useForm();
  let [isPending, startTransition] = useTransition();

  function onChangePayload(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const { value } = e.target;
    setBeach((prev) => {
      return {
        files: [...(prev?.files || [])],
        payload: value,
      };
    });
  }

  async function registerBeach() {
    if (!beach?.files.length) return;
    if (beach?.files.length < 2) {
      setError("files", { message: "사진이 2장 이상 필요합니다." });
      return;
    }
    const newFormData = new FormData();
    for (let file of beach.files) {
      const response = await fetch(file.url, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const data = await response.blob();
      const newFile = new File([data], file.filename, {});
      newFormData.append("files", newFile);
    }
    newFormData.append("payload", beach.payload || "");

    // newFormData.headers.set("Content-Type", "multipart/form-data");

    uploadBeach(newFormData);
  }

  return (
    <div>
      <div className="flex flex-col items-center  py-16 px-8 md:px-32 w-full">
        <div className="relative flex flex-col ">
          {/* <Image src="/태안해변.png" fill alt="갯벌체험" /> */}
          <input
            id="beachPhotos"
            hidden
            type="file"
            name="files"
            multiple
            accept="image/png, image/jpeg, image/webp, image/svg+xml, video/mp4"
            onChange={onChange}
          />
          <div
            className="relative flex gap-[1vw] w-[60vw] h-[60vw] transition-transform duration-200"
            ref={slider}
            // draggable
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            onTouchStart={onTouchStart}
            onTouchMove={onTouch}
            onTouchEnd={onTouchEnd}
            onDragOver={(e) => e.preventDefault()}
          >
            {beach?.files.length ? (
              beach?.files.map((file, index) => (
                <div
                  key={index}
                  className="relative w-[60vw] h-[60vw] flex-shrink-0"
                >
                  <Image
                    src={file.url}
                    fill
                    alt="갯벌체험"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))
            ) : (
              <label
                htmlFor="beachPhotos"
                className="w-[60vw] h-[60vw] bg-neutral-200 cursor-pointer flex justify-center items-center"
              >
                <FaRegImages size={150} className="" />
              </label>
            )}
          </div>
        </div>
        <div className="flex flex-col w-full px-4 mt-4">
          <div className="flex items-center gap-8">
            <div className="size-14 md:size-20 bg-sky-500 rounded-full self-start flex justify-center items-center text-white font-bold text-lg">
              주인
            </div>
          </div>
          <div className="mt-4 flex flex-col items-center gap-4">
            <textarea
              {...register("payload")}
              onChange={onChangePayload}
              className="w-full bg-neutral-100 p-5"
              placeholder="즐거운 해루질 사진과 함께 말씀을 남겨주세요."
            />
            {/* <p>
              201호와 202호 에서 잡은 동죽과 맛조개 입니다. 맛조개를 많이
              잡으셔서 바베큐와 같이 구워드신답니다. 재밌는 갯벌 체험은 THE쉼
              펜션과 함께하세요.
            </p> */}
            <button
              disabled={isPending}
              onClick={async () => {
                await startTransition(() => registerBeach());
              }}
              className={`${
                isPending ? "bg-neutral-400" : "bg-green-400"
              }  text-white px-5 py-2 rounded-md self-center`}
            >
              {isPending ? "uploading.." : "등록하기"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
