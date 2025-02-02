"use client";

import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useEffect, useRef, useState, useTransition } from "react";
import { Fade } from "react-awesome-reveal";
import { useForm } from "react-hook-form";
import {
  deleteCloudFile,
  getPanorama,
  TPanorama,
  uploadPanorama,
} from "./actions";
import { useFormState } from "react-dom";

export default function About() {
  const [panorama, setPanorama] = useState<TPanorama>();
  const [modal, setModal] = useState(false);
  const [fadeIsPending, fadeStartTransition] = useTransition();
  const {
    register,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      panorama,
    },
  });

  async function initalPanorama() {
    const panorama = await getPanorama();
    setPanorama(panorama);
  }

  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...panorama!.files];
    const dragItemValue = panorama!.files[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanorama({ files: newList });
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
    const newList = [...panorama!.files];
    const dragItemValue = panorama!.files[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPanorama({ files: newList });
  }

  const [previews, setPreviews] = useState<FileList>();
  async function onChangePanorama(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;
    let arrFiles;

    if (files.length > 6 || panorama?.files?.length! > 6) {
      setError("panorama", { message: "Maximum 6" });
      arrFiles = Array.from(previews!);
      // return;
    } else {
      setPreviews(files);
      arrFiles = Array.from(files);
    }
    for (let [index, file] of arrFiles.entries()) {
      if (panorama?.files.length! >= 6) break;
      const url = URL.createObjectURL(file);
      setPanorama((prev) => {
        if (prev?.files.length! >= 6) {
          setError("panorama", { message: "Maximum 6" });
          return prev;
        } else {
          setError("panorama", { message: "" });
        }

        return {
          files: [
            ...(prev ? prev?.files : []),
            {
              id: +"",
              url,
              index: index + panorama?.files.length!,
              filename: file.name,
              type: "photo",
              storageId: "",
            },
          ],
        };
      });
    }
  }

  async function deletePanorama(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    setPanorama((prev) => {
      return {
        files: prev!.files.filter(
          (preview) => preview.index != panorama!.files[index].index
        ),
      };
    });
    if (panorama?.files[index].storageId) {
      const result = await deleteCloudFile(
        panorama?.files[index].id!,
        panorama?.files[index].storageId!
      );
    }
  }

  const [panoramaState, panoramaAction] = useFormState(
    intercepPanoramaAction,
    null
  );

  async function intercepPanoramaAction(_: any, formData: FormData) {
    const newFormData = new FormData();

    if (!panorama) {
      return {
        fieldError: "panorama is empty",
      };
    }
    for (let file of panorama!.files) {
      const response = await fetch(file.url);
      console.log(response);
      const data = await response.blob();
      const metadata = { type: `${data.type}` };
      const newFile = new File([data], file.filename, metadata);

      newFormData.append("panorama", newFile);
    }

    return uploadPanorama(_, newFormData);
  }

  useEffect(() => {
    initalPanorama();
  }, []);

  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-20">
        <h1 className="text-5xl">PROLOGUE</h1>
        <p className="text-xs text-neutral-500 text-center mt-4">
          Comfortable rest in your imagination,
          <br /> Pleasure meeting. It&apos;s an auxiliary facility prepared for
          you.
        </p>
        <span className="text-xs text-neutral-500 my-6 underline">
          풍경보기
        </span>
        <div className="border-y-2 p-4 w-full flex justify-center">
          <span>PROLOGUE</span>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center relative mt-10">
        <div className="relative flex sm:self-start flex-col sm:flex-row items-center gap-4">
          <Fade direction="left" cascade={true}>
            <div className="relative w-[75vw] h-[55vw] sm:w-[50vw] sm:h-[35vw]">
              <Image
                src={panorama?.files ? panorama?.files[0]?.url : ""}
                fill
                objectFit="cover"
                alt="beach"
              />
            </div>
            <div className="flex flex-col pb-28 px-4">
              <p className="leading-tight text-neutral-500 text-xs lg:text-sm">
                PROLOGUE 푸른 물결 넘실대는 수평선이 펼쳐진 곳... <br />
                황금빛 모래가 반짝이는 곳... <br />
                파도 소리에 갈매기도 춤추는 곳... <br />
                방안 가득 따스한 햇살이 머무는 곳... <br />
                붉은 노을이 마음 따뜻하게 하는 곳...
                <br />
                밤하늘 촘촘히 별들이 노래하는 곳... <br />
                행복한 웃음이 번지는 곳...
                <br />
                환상의 섬 몽산포 앞 바닷가 펜션... <br />
                THE쉼 입니다. 마음을 담아서 행복한 시간을 보내실 여러분을
                초대합니다.
              </p>
            </div>
          </Fade>
        </div>
        <div className="relative flex flex-col-reverse sm:flex-row items-center sm:self-end bottom-[100px] lg:bottom-[100px]">
          <Fade direction="right">
            <div className="flex flex-col sm:pt-24 pr-4 px-4">
              <p className="leading-tight text-neutral-500 text-xs lg:text-sm sm:self-end self-center sm:text-right mt-4 w-[60%]">
                A beach pension in front of Anmyeondo Island...THE 쉼. We invite
                you to have a happy time with all your heart.
              </p>
            </div>
            <div className="relative w-[75vw] h-[55vw] sm:w-[60vw] sm:h-[40vw]">
              <Image
                src={panorama?.files ? panorama?.files[1]?.url : ""}
                fill
                objectFit="cover"
                alt="beach"
              />
            </div>
          </Fade>
        </div>
      </div>

      <div>
        <div className="relative flex justify-center items-center gap-8 flex-col sm:flex-row">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 justify-center">
            {panorama?.files.map((file, index) => {
              if (index > 1) {
                return (
                  <div
                    key={index}
                    className="relative w-[45vw] h-[40vw] sm:w-[20vw] sm:h-[60vw]"
                  >
                    <Image src={file.url} fill objectFit="cover" alt="전경1" />
                  </div>
                );
              }
            })}
          </div>
          <button
            className="bg-yellow-500 text-white absolute bottom-5 right-5 px-4 py-2 rounded-md"
            onClick={() => setModal((prev) => !prev)}
          >
            사진 변경
          </button>
          {/* modal */}
          {modal && (
            <form
              action={(payload) => {
                fadeStartTransition(() => panoramaAction(payload));
                setModal(false);
              }}
              className={`flex fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center z-20 overflow-hidden`}
            >
              <div className="relative bg-white w-[90vw] max-h-[70vh] lg:w-[80vw] lg:max-h-[80vh] p-4 pb-10 rounded-xl z-10 overflow-scroll flex flex-col items-center">
                <div className="w-full">
                  <XMarkIcon
                    onClick={() => setModal(false)}
                    className="absolute right-4 top-4 size-9"
                  />
                  <div className="flex flex-col items-center">
                    <h3>전경 사진 변경</h3>
                    <p className="text-xs text-orange-400">
                      6개의 사진을 넣어주세요.
                    </p>
                  </div>
                </div>
                <div className="relative grid grid-cols-3 gap-2 mt-4 justify-items-center mb-20">
                  {panorama?.files.map((file, index) => {
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
                      disabled={fadeIsPending}
                      className={`text-white px-20 py-3 rounded-lg self-center ${"bg-green-500"}`}
                    >
                      {fadeIsPending ? "Uploading..." : "등록"}
                    </button>
                    <p className="absolute -bottom-6 text-red-400 text-xs text-center">
                      {/* {state?.formErrors[0] || errors.root?.message} */}
                      {errors.panorama?.message?.toString()}
                      {panoramaState?.fieldError.toString()}
                    </p>
                  </div>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
