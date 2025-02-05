"use client";
import React, { useEffect, useRef, useState, useTransition } from "react";
import TopNav from "./top-nav";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useFormState, useFormStatus } from "react-dom";
import {
  deleteCloudFile,
  getFiles,
  getUser,
  uploadBanner,
} from "@/common/actions";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface ITopImage {
  loggedIn: boolean;
}
export type TPreview = {
  id?: number;
  storageId?: string;
  type: "video" | "photo" | "svg";
  url: string;
  index: number;
  filename: string;
};

export default function TopImage({ loggedIn }: ITopImage) {
  const [previews, setPreviews] = useState<TPreview[]>([]);
  const [modal, setModal] = useState(false);
  const [state, action] = useFormState(intercepAction, null);
  let [isPending, startTransition] = useTransition();
  const inputRef = useRef<HTMLInputElement>(null);
  const [banner, setBanner] = useState(1);
  const {
    register,
    formState: { errors },
    setError,
  } = useForm();

  function onChangeImage(event: React.ChangeEvent<HTMLInputElement>) {
    const {
      target: { files },
    } = event;
    if (!files?.length) return;

    const arrFiles = Array.from(files);
    arrFiles.forEach(async (file, index) => {
      const url = URL.createObjectURL(file);
      if (file.type === "video/mp4") {
        setPreviews((prev) => [
          ...prev,
          {
            type: "video",
            url,
            index: index + previews.length,
            filename: file.name,
          },
        ]);
      } else if (file.type === "image/svg+xml") {
        setPreviews((prev) => [
          ...prev,
          {
            type: "svg",
            url,
            index: index + previews.length,
            filename: file.name,
          },
        ]);
      } else {
        setPreviews((prev) => [
          ...prev,
          {
            type: "photo",
            url,
            index: index + previews.length,
            filename: file.name,
          },
        ]);
      }
    });
  }
  async function intercepAction(_: any, formData: FormData) {
    if (!previews.length) return;
    const newFormData = await new FormData();

    for (const file of previews) {
      const response = await fetch(file.url);
      const data = await response.blob();
      const metadata = { type: `${data.type}` };
      const newFile = await new File([data], file.filename!, metadata);
      if (newFile.size > 1024 ** 2 * 3) {
        setError("root", { message: "File size is too big." });
        return;
      }

      await newFormData.append(`file`, newFile);
    }

    const result = await uploadBanner(
      {
        index: previews.map((preview) => preview.index),
        selectedBanner: banner,
      },
      newFormData
    );

    return result;
  }
  useEffect(() => {
    if (isPending) {
      if (state?.fieldErrors.length || state?.formErrors.length) {
        console.log("state");
        isPending = false;
      }
      return;
    }
    // setModal(false);
  }, [isPending, state]);

  const dragItem = useRef<number | null>();
  const dragOverItem = useRef<number | null>();

  function dragStart(e: React.DragEvent, index: number) {
    dragItem.current = index;
  }

  function dragEnter(e: React.DragEvent, index: number) {
    dragOverItem.current = index;
  }

  function drop(e: React.DragEvent) {
    const newList = [...previews];
    const dragItemValue = previews[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPreviews(newList);
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
    const newList = [...previews];
    const dragItemValue = previews[dragItem.current!];
    newList.splice(dragItem.current!, 1);
    newList.splice(dragOverItem.current!, 0, dragItemValue);
    dragItem.current = null;
    dragOverItem.current = null;

    for (let index in newList) {
      newList[index].index = Number(index);
    }
    setPreviews(newList);
  }

  function selectBanner(e: React.MouseEvent) {
    const bannerNumber = e.currentTarget.innerHTML.slice(3, 4);
    setBanner(Number(bannerNumber));
    const parent = e.currentTarget.parentElement;
    for (let i = 0; i < parent?.childElementCount!; i++) {
      parent?.children[i].classList.remove("ring-2", "opacity-100");
      parent?.children[i].classList.add("opacity-50");
    }
    e.currentTarget.classList.remove("opacity-50");
    e.currentTarget.classList.add("ring-2", "opacity-100");

    getBanners(Number(bannerNumber));
  }

  const bannerRef = useRef<HTMLDivElement>(null);

  async function getBanners(bannerNumber: number) {
    const files = await getFiles(bannerNumber);
    setPreviews(files);
  }

  async function getAdmin() {
    const admin = await getUser();
    getBanners(admin?.bannerId || 1);
    bannerRef.current?.childNodes.forEach((node: any) => {
      const bannerNumber = node.innerHTML.slice(3, 4);
      if (Number(bannerNumber) == admin?.bannerId) {
        node.classList.remove("opacity-50");
        node.classList.add("ring-2", "opacity-100");
      }
    });
  }

  useEffect(() => {
    getAdmin();
    if (modal) {
      document.body.style.overflowY = "hidden";
      document.body.parentElement!.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
      document.body.parentElement!.style.overflowY = "auto";
    }
  }, [modal]);

  const slider = useRef<HTMLDivElement>(null);
  let dragStartClientX = 0;
  let slideCount = useRef(0);
  const [windowX, setWindowX] = useState<number>(0);

  function onDragStart(e: React.DragEvent) {
    dragStartClientX = e.clientX;
  }
  function onDrag(e: React.DragEvent) {
    if (!e.clientX) return;
    const moveX = dragStartClientX - e.clientX;
    slider.current!.style.transform = `translateX(${
      -windowX * slideCount.current - moveX
    }px)`;
  }
  function onDragEnd(e: React.DragEvent) {
    const moveX = dragStartClientX - e.clientX;

    slideCount.current += Math.round((moveX / windowX) * 2);

    if (slideCount.current <= -1) {
      slideCount.current = 0;
    }
    if (slideCount.current >= previews.length - 1) {
      slideCount.current = previews.length - 1;
    }
    slider.current!.style.transform = `translateX(${
      -windowX * slideCount.current
    }px)`;
  }

  function onSlideTouchStart(e: React.TouchEvent) {
    dragStartClientX = e.touches[0].clientX;
    console.log(windowX);
  }
  function onSlideTouch(e: React.TouchEvent) {
    if (!e.touches[0].clientX) return;
    const moveX = dragStartClientX - e.touches[0].clientX;
    slider.current!.style.transform = `translateX(${
      -windowX * slideCount.current - moveX
    }px)`;
  }
  function onSlideTouchEnd(e: React.TouchEvent) {
    console.log(e);
    const moveX = dragStartClientX - e.changedTouches[0].clientX;

    slideCount.current += Math.round((moveX / windowX) * 2);

    if (slideCount.current <= -1) {
      slideCount.current = 0;
    }
    if (slideCount.current >= previews.length - 1) {
      slideCount.current = previews.length - 1;
    }
    slider.current!.style.transform = `translateX(${
      -windowX * slideCount.current
    }px)`;
  }

  useEffect(() => {
    setWindowX(window.innerWidth);
    window.addEventListener("resize", (event) => {
      setWindowX(window.innerWidth);
      slider.current!.style.transform = `translateX(${
        -window.innerWidth * slideCount.current
      }px)`;
    });
    return () => window.removeEventListener("resize", () => {});
  }, []);

  const videoRef = useRef<null[] | HTMLVideoElement[]>([]);

  const SLIDE_DURATION = 5000;

  useEffect(() => {
    const callback = async () => {
      if (slideCount.current < previews.length - 1) {
        if (previews[slideCount.current].type != "video") {
          slideCount.current += 1;
          slider.current!.style.transform = `translateX(${
            -window.innerWidth * slideCount.current
          }px)`;
        } else {
          await clearInterval(interval);

          await setTimeout(() => {
            if (slideCount.current < previews.length - 1) {
              slideCount.current += 1;
              slider.current!.style.transform = `translateX(${
                -window.innerWidth * slideCount.current
              }px)`;
            }
            interval = setInterval(callback, SLIDE_DURATION);
          }, videoRef.current[slideCount.current]!.duration * 1000 - SLIDE_DURATION);
        }
      } else {
        slideCount.current = 0;
        slider.current!.style.transform = `translateX(0px)`;
      }
    };

    let interval = setInterval(callback, SLIDE_DURATION);

    return () => {
      clearInterval(interval);
    };
  }, [previews, slideCount.current]);

  function deleteFile(e: React.MouseEvent, index: number) {
    const q = confirm("Do you want to actually delete this file?");
    if (!q) return;
    const deletedfile = previews[index];
    deleteCloudFile(deletedfile);
    setPreviews((prev) => {
      console.log(prev);
      return prev.filter((preview) => preview.index != previews[index].index);
    });
  }

  return (
    <div>
      <div className="relative flex justify-center items-center overflow-hidden">
        <div
          ref={slider}
          className="relative h-[100vh] w-[100vw] flex transition-all duration-300"
          draggable
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          onTouchStart={onSlideTouchStart}
          onTouchMove={onSlideTouch}
          onTouchEnd={onSlideTouchEnd}
        >
          {previews.map((preview, index) => {
            if (preview.type === "video") {
              return (
                <video
                  key={index}
                  className="object-cover flex-shrink-0 w-full"
                  autoPlay
                  loop
                  muted
                  // onEnded={onPlayEnded}
                  ref={(el) => {
                    videoRef.current[index] = el;
                  }}
                  // src={preview.url}
                  // controls
                >
                  <source src={preview.url} />
                </video>
              );
            }

            return (
              <div
                key={index}
                className="relative h-full w-[100vw] flex-shrink-0"
              >
                <Image
                  src={`${preview.url}`}
                  objectFit="cover"
                  fill
                  alt="banner"
                />
              </div>
            );
          })}
        </div>
        <div className="absolute text-white flex flex-col items-center self-center gap-4 z-10">
          <span>welcome</span>
          <h2 className="text-5xl">THE 쉼</h2>
        </div>
      </div>
      <TopNav />
      {loggedIn ? (
        <button
          className="absolute right-10 bottom-10 bg-yellow-400 px-3 py-2 rounded-lg"
          onClick={() => setModal(true)}
        >
          사진 변경
        </button>
      ) : null}

      {/* modal */}
      <div
        className={`fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center ${
          modal ? "flex" : "hidden"
        }
        z-20 overflow-hidden`}
      >
        <div className="relative bg-white w-[90vw] max-h-[70vh] lg:w-[80vw] lg:max-h-[80vh] p-4 rounded-xl z-10 overflow-scroll flex flex-col items-center">
          <div className="w-full">
            <XMarkIcon
              onClick={() => setModal(false)}
              className="absolute right-4 top-4 size-9"
            />
            <div className="flex flex-col items-center">
              <h3>베너 사진 변경</h3>
            </div>
            <div ref={bannerRef} className="flex justify-around my-2">
              <span
                onClick={selectBanner}
                className="px-6 py-1 bg-red-300 rounded-full cursor-pointer opacity-50 ring-neutral-500"
              >
                배너 1
              </span>
              <span
                onClick={selectBanner}
                className="px-6 py-1 bg-green-300 rounded-full cursor-pointer opacity-50 ring-neutral-500"
              >
                배너 2
              </span>
              <span
                onClick={selectBanner}
                className="px-6 py-1 bg-blue-300 rounded-full cursor-pointer opacity-50 ring-neutral-500"
              >
                배너 3
              </span>
            </div>
          </div>
          <form
            className="relative grid grid-cols-3 gap-2 mt-4 justify-items-center mb-20"
            // encType="multipart/form-data"
            action={(payload) => {
              if (previews.length < 5) {
                setError("root", { message: "Need at least 5 file." });
                return;
              }
              return startTransition(() => action(payload));
            }}
          >
            {previews.map((file, index) => {
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
                  {file.type === "video" ? (
                    <div className="bg-neutral-600 h-full w-full flex items-center justify-center">
                      <video controls className="w-full h-full">
                        <source src={`${file.url}`} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <Image src={file.url} fill alt="image" objectFit="cover" />
                  )}
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
                ref={inputRef}
                id="file"
                type="file"
                className="hidden"
                onChange={onChangeImage}
                multiple
                accept="image/png, image/jpeg, image/webp, image/svg+xml, video/mp4"
              />
              <label
                className="bg-neutral-300 w-[25vw] h-[25vw] text-lg flex justify-center items-center cursor-pointer"
                htmlFor="file"
              >
                <PlusIcon width={100} color="white" />
              </label>
            </div>
            <div className="absolute -bottom-20 flex flex-col items-center">
              <button
                disabled={isPending}
                className={`text-white px-20 py-3 rounded-lg self-center ${
                  isPending ? `bg-neutral-500` : "bg-green-500"
                }`}
              >
                {isPending ? "Upload 중..." : "등록"}
              </button>
              <p className="absolute -bottom-6 text-red-400 text-xs">
                {state?.formErrors[0] || errors.root?.message}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
