"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function HomeClient() {
  // const [dragStart, setDragStart] = useState({ x: 0 });
  let dragStart = 0;
  const slideCount = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  function onDragStart(event: React.DragEvent) {
    // setDragStart({ x: event.clientX });
    dragStart = event.clientX;
  }

  function onDrag(event: React.DragEvent) {
    if (event.clientX === 0) return;
    const moveX = dragStart - event.clientX;

    ref.current!.style.transform = `translateX(${
      -402 * slideCount.current - moveX
    }px)`;
  }
  function onDragEnd(event: React.DragEvent) {
    const moveX = dragStart - event.clientX;
    slideCount.current += Math.round(moveX / 402);

    if (slideCount.current >= ref.current?.children.length! - 2) {
      slideCount.current = ref.current?.children.length! - 2;
    }
    if (slideCount.current < -1) {
      slideCount.current = -1;
    }
    ref.current?.querySelectorAll("img").forEach((img) => {
      img.style.width = "370px";
    });
    ref.current!.children[slideCount.current! + 1].querySelector(
      "img"
    )!.style.width = "500px";

    ref.current!.style.transform = `translateX(${-402 * slideCount.current}px)`;
  }

  useEffect(() => {}, [slideCount.current]);
  return (
    <div className="flex flex-col items-center gap-18">
      <div className="h-[120vh] flex flex-col items-center pt-16 gap-24">
        <h2 className="text-5xl">Room Previews</h2>
        <div className="overflow-hidden w-[1300px] flex justify-start">
          <div
            className="flex gap-8 items-center justify-start transition-all duration-300"
            ref={ref}
            onDragStart={onDragStart}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
            // onDragLeave={onDragLeave}
            // onDragExit={(e) => e.preventDefault()}
            onDragOver={(e) => e.preventDefault()}
          >
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={500}
                height={770}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0 ">
              <Image
                className="transition-all duration-300"
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[120vh] w-[1440px] flex flex-col items-center">
        <div className="flex self-start flex-col items-center">
          <Image src="/몽산포해변.png" width={720} height={688} alt="beach" />
          <span>시원한 몽산포 해변</span>
        </div>
        <div className="flex self-end flex-col items-center -top-[500px] relative">
          <Image src="/더쉼전경.png" width={953} height={772} alt="beach" />
          <span>시원한 몽산포 해변</span>
        </div>
      </div>
    </div>
  );
}
