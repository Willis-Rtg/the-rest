"use client";

import Image from "next/image";
import Link from "next/link";
import {
  deleteBeachDB,
  getInitalBeaches,
  getMoreBeaches,
  TBeachs,
} from "./actions";
import { RefObject, useEffect, useRef, useState, useTransition } from "react";

interface IBeachClient {
  isAdmin: boolean;
  initialBeaches: TBeachs;
}

export default function BeachClient({ isAdmin, initialBeaches }: IBeachClient) {
  const [beaches, setBeaches] = useState(initialBeaches);

  const refs = useRef<HTMLDivElement[] | null>(new Array(beaches.length));
  let slideCounts = useRef<number[]>(new Array(beaches.length));
  let startXs: number[] = new Array(beaches.length);
  let endXs: number[] = new Array(beaches.length);

  useEffect(() => {
    for (let [index, count] of slideCounts.current.entries()) {
      startXs[index] = 0;
      slideCounts.current[index] = 0;
      endXs[index] = 0;
    }
  }, []);

  // for (let x of startXs) {
  //   x = 0;
  // }

  function onDragStart(e: React.DragEvent<HTMLDivElement>, index: number) {
    startXs[index] = e.clientX;
  }
  function onDrag(e: React.DragEvent<HTMLDivElement>, index: number) {
    if (!e.clientX) return;
    const moveX = startXs[index] - e.clientX;
    refs.current![index].style.transform = `translateX(${
      slideCounts.current[index] * -window.innerWidth * 0.61 - moveX
    }px)`;
  }
  function onDragEnd(e: React.DragEvent<HTMLDivElement>, index: number) {
    if (!e.clientX) return;
    const moveX = startXs[index] - e.clientX;
    // endXs[index] += moveX;
    slideCounts.current[index] += Math.round(
      (moveX / window.innerWidth) * 0.61 * 4
    );
    if (slideCounts.current[index] <= -1) {
      slideCounts.current[index] = 0;
    }
    if (slideCounts.current[index] >= (beaches[index].files.length || 0) - 1) {
      slideCounts.current[index] = (beaches[index].files.length || 0) - 1;
    }
    refs.current![index].style.transform = `translateX(${
      slideCounts.current[index] * 0.61 * -window.innerWidth
    }px)`;
  }

  function onTouchStart(e: React.TouchEvent<HTMLDivElement>, index: number) {
    startXs[index] = e.touches[0].clientX;
  }
  function onTouch(e: React.TouchEvent<HTMLDivElement>, index: number) {
    if (e.touches[0].clientX == null) return;
    const moveX = startXs[index] - e.touches[0].clientX;
    refs.current![index].style.transform = `translateX(${
      slideCounts.current[index] * -window.innerWidth * 0.61 - moveX
    }px)`;
  }
  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>, index: number) {
    if (e.changedTouches[0].clientX == null) return;
    const moveX = startXs[index] - e.changedTouches[0].clientX;
    // endXs[index] += moveX;
    slideCounts.current[index] += Math.round(
      (moveX / window.innerWidth) * 0.61 * 4
    );
    if (slideCounts.current[index] <= -1) {
      slideCounts.current[index] = 0;
    }
    if (slideCounts.current[index] >= (beaches[index].files.length || 0) - 1) {
      slideCounts.current[index] = (beaches[index].files.length || 0) - 1;
    }
    refs.current![index].style.transform = `translateX(${
      slideCounts.current[index] * 0.61 * -window.innerWidth
    }px)`;
  }

  const [isPendingDelete, startTransitionDelete] = useTransition();

  async function deleteBeach(beachId: number) {
    const chekc = confirm("Do you want to delete sure?");
    if (!chekc) return;
    deleteBeachDB(beachId);
  }

  const trigger = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLastPage] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setIsLoading(true);
          const moreBeaches = await getMoreBeaches(page);
          if (moreBeaches.length !== 0) {
            setPage((prev) => prev + 1);
            setBeaches((prev) => [...prev, ...moreBeaches]);
          } else {
            setIsLastPage(true);
          }
          setIsLoading(false);
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="relative flex flex-col items-center">
      {beaches.map((beach, index) => (
        <div
          key={index}
          className={`flex flex-col items-center  py-16 px-8 md:px-32 w-full ${
            index % 2 ? "bg-neutral-200" : ""
          }`}
        >
          <div
            key={index}
            ref={(el) => {
              if (el && refs.current) {
                refs.current[index] = el;
              }
            }}
            className="flex w-[60vw] gap-[1vw] transition-transform duration-200"
            draggable
            onDragStart={(e) => onDragStart(e, index)}
            onDrag={(e) => onDrag(e, index)}
            onDragEnd={(e) => onDragEnd(e, index)}
            onTouchStart={(e) => onTouchStart(e, index)}
            onTouchMove={(e) => onTouch(e, index)}
            onTouchEnd={(e) => onTouchEnd(e, index)}
          >
            {beach.files.map((file, index) => (
              <div className="relative w-[60vw] h-[60vw] flex-shrink-0 ">
                <Image
                  key={index}
                  className="rounded-xl"
                  src={`${file.url}`}
                  fill
                  alt="갯벌체험"
                />
              </div>
            ))}
          </div>
          <div className="w-full flex justify-between items-center mt-4">
            <div className="flex items-center w-full">
              <div className="flex items-center gap-4">
                <div className="size-14 md:size-20 bg-sky-500 rounded-full self-start flex justify-center items-center text-white text-lg font-bold">
                  주인
                </div>
                <h4 className="flex gap-1 md:text-lg text-xs">
                  <span>{new Date(beach.createdAt).getFullYear()}년</span>
                  <span>{new Date(beach.createdAt).getMonth() + 1}월</span>
                  <span>{new Date(beach.createdAt).getDate()}일</span>
                </h4>
              </div>
            </div>
            {isAdmin && (
              <div className="flex gap-2 items-center">
                <Link
                  href={`/location/beaches/edit/${beach.id}`}
                  className="bg-green-500 text-white py-2 rounded-md w-[15vw] md:w-[10vw] text-xs md:text-lg text-center"
                >
                  수정
                </Link>
                <button
                  disabled={isPendingDelete}
                  onClick={() => {
                    startTransitionDelete(() => deleteBeach(beach.id));
                  }}
                  className={`${
                    isPendingDelete ? "bg-neutral-500" : "bg-orange-500"
                  } text-white py-2 rounded-md w-[15vw] md:w-[10vw] text-xs md:text-lg`}
                >
                  {isPendingDelete ? "loading.." : "삭제"}
                </button>
              </div>
            )}
          </div>
          <div className="mt-4 ml-4 w-full">
            <p>{beach.payload}</p>
          </div>
        </div>
      ))}

      {isAdmin && (
        <Link
          href={"/location/beaches/add"}
          className="absolute right-5 top-5 bg-green-500 px-5 py-2 rounded-md text-white"
        >
          올리기
        </Link>
      )}
      <div
        ref={trigger}
        className={`flex justify-center ${isLastPage ? "hidden" : "fles"}`}
      >
        <span className="px-4 py-2 bg-orange-400 text-white rounded-lg">
          Load more
        </span>
      </div>
    </div>
  );
}
