"use client";

import { XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRef, useState } from "react";

export default function useModal(previews, onChange) {
  const [modal, setModal] = useState(false);

  const [files, setFiles] = useState(previews);

  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...files];
    const dragItemValue = files[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setFiles(newList);
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
    const newList = [...files];
    const dragItemValue = files[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setFiles(newList);
  }

  function deleteFile(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setFiles((prev) => prev.filter((preview) => preview.index != index));
  }

  return (
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
        <form
          className="relative grid grid-cols-3 gap-2 mt-4 justify-items-center mb-20"
          // encType="multipart/form-data"
          action={(payload) => {
            if (files.length != 2) {
              // setError("root", { message: "Need at least 2 file." });
              return;
            }
            // return startTransition(() => action());
          }}
        >
          {files.map((file, index) => {
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
                {<Image src={file.url} fill alt="image" objectFit="cover" />}
                <XMarkIcon
                  className="absolute right-3 top-3 size-6"
                  onClick={(e) => deleteFile(e, index)}
                />
              </div>
            );
          })}
          <div className="flex">
            <input
              {...register("file")}
              // ref={inputRef}
              id="panorama"
              type="file"
              className="hidden"
              onChange={onChangePanorama}
              multiple
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
            >
              {"등록"}
            </button>
            <p className="absolute -bottom-6 text-red-400 text-xs">
              {/* {state?.formErrors[0] || errors.root?.message} */}
              {errors.root?.message}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
