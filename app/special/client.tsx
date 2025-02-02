"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { uploadPanorama } from "./actions";
import { useSearchParams } from "next/navigation";
import { TPanoramaSpecial } from "./schemas";

type TPanorama = {
  type: string;
  files: TPanoramaFile[];
};

type TPanoramaFile = {
  id?: number;
  url: string;
  index: number;
  filename: string;
};
interface ISpecialProps {
  type: string;
}

export default function SpecialClient({
  panorama,
}: {
  panorama: TPanoramaSpecial;
}) {
  const [modal, setModal] = useState(false);
  const [panoramaFiles, setPanoramaFiles] = useState<TPanoramaFile[]>([]);
  const {
    register,
    formState: { errors },
    setError,
  } = useForm<TPanorama>({
    defaultValues: {
      files: panorama?.files,
    },
  });

  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...panoramaFiles];
    const dragItemValue = panoramaFiles[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanoramaFiles(newList);
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
    const newList = [...panoramaFiles];
    const dragItemValue = panoramaFiles[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanoramaFiles(newList);
  }

  function onChangePanorama(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      setPanoramaFiles((prev) => [
        ...prev,
        {
          url,
          index: index + panoramaFiles.length,
          filename: file.name,
          type: "photo",
        },
      ]);
    });
  }

  function deletePanorama(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setPanoramaFiles((prev) =>
      prev.filter((preview) => preview.index != panoramaFiles[index].index)
    );
  }

  const [state, action] = useFormState(interceptAction, null);
  let [isPending, startTransition] = useTransition();

  async function interceptAction(_: any, formData: FormData) {
    if (panoramaFiles.length != 5) {
      setError("files", { message: "Panorama need 5 photos." });
      isPending = false;
      return;
    }
    const newFormData = new FormData();

    for (const file of panoramaFiles) {
      const response = await fetch(file.url);
      const data = await response.blob();
      const newFile = new File([data], file.filename, {});
      newFormData.append("files", newFile);
    }
    return uploadPanorama(
      { type, index: panoramaFiles.map((file) => file.index) },
      newFormData
    );
  }
  const searchParams = useSearchParams();
  let type = searchParams.get("type");

  useEffect(() => {
    if (isPending) {
      if (
        state?.fieldError?.toString().length ||
        errors.files?.message?.length
      ) {
        console.log("fjewiof");
        isPending = false;
        console.log(isPending);
      }
      return;
    }
    setModal(false);
  }, [isPending, state]);

  useEffect(() => {
    setPanoramaFiles(() => {
      if (!panorama) return [];
      return panorama!.files.map((file: TPanoramaFile) => {
        return {
          id: file.id,
          index: file.index,
          filename: file.filename,
          type: "photo",
          url: file.url,
        };
      });
    });
  }, [panorama]);

  return (
    <div className="mt-16 p-8 flex flex-col items-center justify-center">
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center justify-items-center">
        {panorama?.files.map((file: TPanoramaFile, index: number) => {
          if (panorama.files.length - 1 === index) return;
          return (
            <div
              key={index}
              className="relative w-[80vw] h-[40vw] md:w-[45vw] md:h-[25vw]"
            >
              <Image src={file.url} fill alt="방사진1" objectFit="cover" />
            </div>
          );
        })}
        <div className="md:col-span-2 relative w-[92vw] h-[70vw] md:h-[55vw]">
          <Image
            src={panorama?.files[panorama?.files.length - 1].url || ""}
            fill
            alt="전경"
            objectFit="cover"
          />
        </div>
        <div
          onClick={() => setModal((prev) => !prev)}
          className="bg-orange-500 text-white px-5 py-2 rounded-md absolute right-3 bottom-3 cursor-pointer"
        >
          사진 넣기
        </div>
        <p>{state?.fieldError?.toString()}</p>
      </div>
      {modal && (
        <form
          // action={(payload) => {
          //   if (panoramaFiles.length != 5) {
          //     setError("files", { message: "Need 5 files." });
          //     return;
          //   }
          //   return startTransition(() => action(payload));
          // }}
          className={`flex fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center z-20 overflow-hidden`}
        >
          <div className="relative bg-white w-[90vw] max-h-[70vh] lg:w-[80vw] lg:max-h-[80vh] p-4 pb-10 rounded-xl z-10 overflow-scroll flex flex-col items-center">
            <div className="w-full">
              <XMarkIcon
                onClick={() => setModal(false)}
                className="absolute right-4 top-4 size-9"
              />
              <div className="flex flex-col items-center">
                <h3>Special 사진 변경</h3>
                <span className="text-xs text-orange-500">
                  5개 사진을 골라주세요.
                </span>
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
              {panoramaFiles.map((file, index) => {
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
                  {...register("files")}
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
                  onClick={() => {
                    if (panoramaFiles.length != 5) {
                      setError("files", { message: "Need 5 files." });
                      return;
                    }
                    return startTransition(async () => {
                      const newFormData = new FormData();
                      for (let file of panoramaFiles) {
                        const response = await fetch(file.url);
                        const data = await response.blob();
                        const newFile = new File([data], file.filename, {});
                        newFormData.append("files", newFile);
                      }
                      newFormData.append("type", type!.toString());
                      action(newFormData);
                    });
                  }}
                  className={`text-white px-20 py-3 rounded-lg self-center ${
                    isPending ? "bg-neutral-500" : "bg-green-500"
                  }`}
                  disabled={isPending}
                >
                  {isPending ? "uploading.." : "등록"}
                </button>
                <p className="absolute -bottom-6 text-red-400 text-xs text-center">
                  {/* {state?.formErrors[0] || errors.root?.message} */}
                  {errors.files?.message?.toString()}
                </p>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
