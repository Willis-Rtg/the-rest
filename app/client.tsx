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
    setDragStart({ x: event.screenX });
  }

  function onDrag(event: React.DragEvent) {
    const moveX = dragStart.x - event.screenX;
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
        <Swiper
          className="px-96 w-[1330px] "
          spaceBetween={50}
          slidesPerView={3}
          onSlideChange={() => console.log("slide change")}
          scrollbar={true}
          onSwiper={(swiper) => {
            console.log((swiper.slides[1].style.height = "700px"));
          }}
        >
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <Image
                src="/room_preview.png"
                alt="room"
                width={370}
                height={600}
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <Image
                src="/room_preview.png"
                alt="room"
                width={500}
                height={770}
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="flex flex-col items-center ">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center ">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center ">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="flex flex-col items-center ">
              <Image
                src="/room_preview.png"
                width={370}
                height={600}
                alt="room"
              />
              <span className="text-xl">A동 101호</span>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="h-[100vh] flex flex-col items-center pt-16 gap-24"></div>
    </div>
  );
}
