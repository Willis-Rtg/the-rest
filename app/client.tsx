"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

export default function HomeClient() {
  const [dragStart, setDragStart] = useState({ x: 0 });
  const slideCount = useRef(0);
  const ref = useRef<HTMLDivElement>(null);
  function onDragStart(event: React.DragEvent) {
    // event.preventDefault();
    setDragStart({ x: event.clientX });
  }

  function onDrag(event: React.DragEvent) {
    console.log(event);
    const moveX = dragStart.x - event.clientX;
    ref.current!.style.transform = `translateX(-${
      402 * slideCount.current + moveX
    }px)`;
  }
  function onDragEnd(event: any) {
    if (dragStart.x - event.screenX > 0) {
      console.log("right");
      slideCount.current += 1;
      ref.current!.style.transform = `translateX(-${
        402 * slideCount.current
      }px)`;
    } else if (dragStart.x - event.screenX < 0) {
      if (slideCount.current === 0) return;
      slideCount.current -= 1;
      ref.current!.style.transform = `translateX(-${
        402 * slideCount.current
      }px)`;
    }
  }
  return (
    <div>
      <div className="h-[100vh] flex flex-col items-center pt-16 gap-24">
        <h2 className="text-5xl">Room Previews</h2>
        <div>
          <div className="relative h-full px-96 overflow-hidden w-[1330px] flex justify-center">
            <div
              className="flex"
              ref={ref}
              onDragStart={onDragStart}
              onDrag={onDrag}
              onDragEnd={onDragEnd}
              onDragLeave={(e) => e.preventDefault()}
              onDragOver={(e) => e.preventDefault()}
            >
              <div className="flex flex-col items-center flex-shrink-0">
                <Image
                  src="/room_preview.png"
                  alt="room"
                  width={500}
                  height={770}
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
                  src="/room_preview.png"
                  alt="room"
                  width={500}
                  height={770}
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
                  src="/room_preview.png"
                  width={500}
                  height={770}
                  alt="room"
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
                  src="/room_preview.png"
                  width={370}
                  height={600}
                  alt="room"
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
                  src="/room_preview.png"
                  width={370}
                  height={600}
                  alt="room"
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
                  src="/room_preview.png"
                  width={370}
                  height={600}
                  alt="room"
                />
                <span className="text-xl">A동 101호</span>
              </div>
              <div className="flex flex-col items-center flex-shrink-0 ">
                <Image
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
      </div>
      <div className="h-[100vh] flex flex-col items-center pt-16 gap-24"></div>
    </div>
  );
}
