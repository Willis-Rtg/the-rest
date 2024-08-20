"use client";

import Image from "next/image";
import { useRef, useState } from "react";

export default function HomeClient() {
  const [dragStart, setDragStart] = useState({ x: 0 });
  const [active, setActive] = useState(true);
  const slideCount = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  function onDragStart(event: React.DragEvent) {
    setDragStart({ x: event.clientX });
  }

  function onDrag(event: React.DragEvent) {
    event.preventDefault();
    if (!active) return;
    const moveX = dragStart.x - event.clientX;
    ref.current!.style.transform = `translateX(${
      -402 * slideCount.current - moveX
    }px)`;
  }
  function onDragEnd(event: React.DragEvent) {
    setActive(true);
    if (dragStart.x - event.clientX > 0) {
      if (slideCount.current > ref.current?.querySelectorAll("img").length! - 3)
        return setActive(false);
      slideCount.current += 1;
      if (
        slideCount.current != 0 &&
        dragStart.x - event.clientX > slideCount.current * 402
      ) {
        slideCount.current += 1;
      }
    } else if (dragStart.x - event.clientX <= 0) {
      if (slideCount.current <= -1) return setActive(false);
      slideCount.current -= 1;
    }
    ref
      .current!.querySelectorAll("img")
      ?.forEach((img) => (img.style.width = "370px"));
    ref.current!.children[slideCount.current! + 1]!.querySelector(
      "img"
    )!.style.width = "550px";
    ref.current!.style.transform = `translateX(${-402 * slideCount.current}px)`;
    if (slideCount.current > ref.current?.querySelectorAll("img").length! - 3)
      return setActive(false);
    if (slideCount.current <= -1) return setActive(false);
  }

  return (
    <div>
      <div className="h-[100vh] flex flex-col items-center pt-16 gap-24">
        <h2 className="text-5xl">Room Previews</h2>
        <div className="relative h-full px-96 overflow-hidden w-[1330px] flex justify-center">
          <div
            onDragStart={onDragStart}
            // onDragEnd={onDragEnd}
            onDrag={onDrag}
            onDragOver={(e) => e.preventDefault()}
            draggable={false}
            ref={ref}
            className="absolute flex flex-1 items-center gap-8 transition-all"
          >
            <div className="flex flex-col items-center relative flex-shrink-0">
              <Image
                src="/room_preview.png"
                alt="room"
                width={370}
                height={600}
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center relative flex-shrink-0">
              <Image
                src="/room_preview.png"
                alt="room"
                width={500}
                height={770}
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
            <div className="flex flex-col items-center flex-shrink-0">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
                className="transition-all"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </div>
        </div>
      </div>
      <div className="h-[100vh] flex flex-col items-center pt-16 gap-24"></div>
    </div>
  );
}
