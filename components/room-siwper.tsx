"use client";

import { getRoomsInfo, TRooms } from "@/common/actions";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function RoomSwiper() {
  // const [dragStart, setDragStart] = useState({ x: 0 });
  let dragStart = 0;
  const slideCount = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  function onDragStart(event: React.DragEvent) {
    dragStart = event.clientX;
  }
  function responsibleImageSize() {
    if (ref.current && ref.current.children[slideCount.current + 1]) {
      if (window.innerWidth >= 1024) {
        ref.current.querySelectorAll("img").forEach((img) => {
          img.style.width = "370px";
        });
        ref.current.querySelectorAll("img").forEach((img) => {
          img.style.height = "600px";
        });
        ref.current.children[slideCount.current! + 1].querySelector(
          "img"
        )!.style.width = "500px";
        ref.current.children[slideCount.current! + 1].querySelector(
          "img"
        )!.style.height = "770px";
      } else {
        ref.current?.querySelectorAll("img").forEach((img) => {
          img.style.width = "230px";
        });
        ref.current?.querySelectorAll("img").forEach((img) => {
          img.style.height = "410px";
        });
        ref.current!.children[slideCount.current! + 1].querySelector(
          "img"
        )!.style.width = "280px";
        ref.current!.children[slideCount.current! + 1].querySelector(
          "img"
        )!.style.height = "480px";
      }
    }
  }

  function onDrag(event: React.DragEvent) {
    if (event.clientX === 0) return;
    const moveX = dragStart - event.clientX;

    if (window.innerWidth > 1024)
      ref.current!.style.transform = `translateX(${
        -402 * slideCount.current - moveX
      }px)`;
    else
      ref.current!.style.transform = `translateX(${
        -302 * slideCount.current - moveX
      }px)`;
  }
  function onDragEnd(event: React.DragEvent) {
    const moveX = dragStart - event.clientX;
    if (window.innerWidth >= 1024)
      slideCount.current += Math.round(moveX / 402);
    else slideCount.current += Math.round(moveX / 282);

    if (slideCount.current >= ref.current?.children.length! - 2) {
      slideCount.current = ref.current?.children.length! - 2;
    }
    if (slideCount.current < -1) {
      slideCount.current = -1;
    }

    responsibleImageSize();

    if (window.innerWidth >= 1024)
      ref.current!.style.transform = `translateX(${
        -402 * slideCount.current
      }px)`;
    else
      ref.current!.style.transform = `translateX(${
        -246 * slideCount.current
      }px)`;
  }

  let touchStart = 0;

  function onTouchstart(event: React.TouchEvent) {
    touchStart = event.touches[0].clientX;
  }
  function onTouchMove(event: React.TouchEvent) {
    // console.log("touch move", event);
    if (event.touches[0].clientX === 0) return;
    const moveX = touchStart - event.touches[0].clientX;

    ref.current!.style.transform = `translateX(${
      -402 * slideCount.current - moveX
    }px)`;
  }
  function onTouchEnd(event: React.TouchEvent) {
    console.log(event);
    const moveX = touchStart - event.changedTouches[0].clientX;
    if (window.innerWidth >= 1024)
      slideCount.current += Math.round((moveX / 402) * 2);
    else slideCount.current += Math.round((moveX / 230) * 2);

    if (slideCount.current >= ref.current?.children.length! - 2) {
      slideCount.current = ref.current?.children.length! - 2;
    }
    if (slideCount.current < -1) {
      slideCount.current = -1;
    }
    responsibleImageSize();

    if (window.innerWidth >= 1024)
      ref.current!.style.transform = `translateX(${
        -402 * slideCount.current
      }px)`;
    else
      ref.current!.style.transform = `translateX(${
        -246 * slideCount.current
      }px)`;
  }
  const [rooms, setRooms] = useState<TRooms>([]);
  async function getRooms() {
    setRooms(await getRoomsInfo());
  }

  useEffect(() => {
    getRooms();
    window.addEventListener("resize", () => {
      responsibleImageSize();
    });

    return () => window.removeEventListener("reisze", () => {});
  }, []);

  useEffect(() => {
    if (rooms.length > 0) responsibleImageSize();
  }, [rooms]);
  return (
    <div className="flex flex-col items-center my-28 gap-24">
      <h2 className="text-3xl md:text-5xl">Room Previews</h2>
      <div className="overflow-hidden w-[770px] lg:w-[1300px] flex justify-start ">
        <div
          className="relative flex gap-4 lg:gap-8 items-center justify-start transition-all duration-300"
          ref={ref}
          onDragStart={onDragStart}
          onDrag={onDrag}
          onDragEnd={onDragEnd}
          // onDragOver={(e) => e.preventDefault()}
          onTouchStart={onTouchstart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
          draggable
        >
          {rooms.map((room) => (
            <Link
              href={`/rooms/${room.id}`}
              key={room.id}
              className=" left-0 flex flex-col items-center flex-shrink-0 "
            >
              <Image
                className="transition-all duration-300 md:w-[370px] md:h-[600px]"
                src={room.roomPhotos[0].url}
                width={270}
                height={450}
                alt="room"
              />
              <span className="text-xl">{room.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
