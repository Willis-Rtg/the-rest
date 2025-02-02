"use client";

import RoomSwiper from "@/components/room-siwper";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Fade } from "react-awesome-reveal";
import { getHomeBeachesMore, THomeBeaches, THomePanorama } from "./actions";

export default function HomeClient({
  panorama,
  beachesInitial,
}: {
  panorama: THomePanorama;
  beachesInitial: THomeBeaches;
}) {
  const [beaches, setBeaches] = useState(beachesInitial);
  const ref = useRef<HTMLDivElement>(null);
  let dragStart = useRef(0);
  let dragEnd = useRef(0);

  function onDragStart(event: React.DragEvent) {
    dragStart.current = event.clientX;
  }

  function onDrag(event: React.DragEvent) {
    if (event.clientX === 0) return;
    let moveX = dragStart.current - event.clientX;
    if (window.innerWidth > 1024) {
      if (dragEnd.current < (beaches.length - 1) * (-570 - 32)) {
        moveX = 0;
        dragEnd.current = (beaches.length - 1) * (-570 - 32);
      }
    } else {
      if (touchEnd.current < (beaches.length - 1) * (-270 - 32)) {
        moveX = 0;
        touchEnd.current = (beaches.length - 1) * (-270 - 32);
      }
    }
    if (dragEnd.current > -64) {
      dragEnd.current = -64;
      moveX = 0;
    }
    ref.current!.style.transform = `translateX(${dragEnd.current - moveX}px)`;
  }

  function onDragEnd(event: React.DragEvent) {
    const pastX = ref.current!.style.transform.replace("px", "(").split("(");
    dragEnd.current = Number(pastX[1]);
  }

  let touchStart = useRef(0);
  let touchEnd = useRef(0);
  function onTouchStart(event: React.TouchEvent) {
    touchStart.current = event.touches[0].clientX;
  }

  function onTouchMove(event: React.TouchEvent) {
    let moveX = touchStart.current - event.touches[0].clientX;
    if (touchEnd.current < (beaches.length - 1) * (-270 - 32)) {
      moveX = 0;
      touchEnd.current = (beaches.length - 1) * (-270 - 32);
    }
    if (touchEnd.current >= -150) {
      touchEnd.current = -158;
      moveX = 0;
    }
    ref.current!.style.transform = `translateX(${touchEnd.current - moveX}px)`;
  }

  function onTouchEnd(event: React.TouchEvent) {
    const pastX = ref.current!.style.transform.replace("px", "(").split("(");
    touchEnd.current = Number(pastX[1]);
  }

  const trigger = useRef<HTMLSpanElement>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
      ) => {
        const element = entries[0];
        if (element.isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          setLoading(true);
          const moreBeaches = await getHomeBeachesMore(page);
          if (moreBeaches.length) {
            setBeaches((prev) => [...prev, ...moreBeaches]);
            setPage((prev) => prev + 1);
          } else {
            setLastPage(true);
          }
          setLoading(false);
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
    }
    return () => observer.disconnect();
  }, [page]);

  return (
    <div className="flex flex-col items-center gap-8">
      <RoomSwiper />
      <div className="w-full flex flex-col items-center justify-center relative mt-10">
        <div className="flex sm:self-start flex-col sm:flex-row items-center gap-4">
          <Fade direction="left" cascade={true}>
            <div className="relative w-[75vw] h-[55vw] sm:w-[50vw] sm:h-[35vw]">
              <Image
                src={panorama?.files[0].url || ""}
                fill
                objectFit="cover"
                alt="beach"
              />
            </div>
            <div className="flex flex-col pb-28 px-4">
              <h4 className="text-xl lg:text-2xl z-10">시원한 몽산포 해변</h4>
              <p className="leading-tight text-neutral-500 text-xs lg:text-base">
                몽산포 해변은 갯벌에는 잘 빠지지 않고, 만조때는 시원한
                해수욕장이 반겨줍니다.
              </p>
            </div>
          </Fade>
        </div>
        <div className="relative flex flex-col-reverse sm:flex-row items-center sm:self-end bottom-[100px] lg:bottom-[150px]">
          <Fade direction="right">
            <div className="flex flex-col sm:pt-24 pr-4 px-4">
              <h4 className="text-xl lg:text-2xl sm:self-end">더쉼 전경</h4>
              <p className="leading-tight text-neutral-500 text-xs lg:text-base self-end sm:text-right">
                The 쉼 펜션은 전 객실 아름다운 풍경과 2층 오션뷰를 제공합니다.
                <br /> 잘 가꾸어진 정원과 바베큐장이 있으며 모두가 즐겁게 휴식을
                즐기실 수 있습니다.
              </p>
            </div>
            <div className="relative w-[75vw] h-[55vw] sm:w-[60vw] sm:h-[40vw]">
              <Image
                src={panorama?.files[1].url || ""}
                fill
                alt="beach"
                objectFit="cover"
              />
            </div>
          </Fade>
        </div>
      </div>
      <div className="relative flex flex-col pl-10 lg:pl-20 w-[100vw] overflow-hidden mb-28">
        <h3 className="relative text-2xl lg:text-4xl self-center z-20 pb-12">
          갯벌 체험
        </h3>
        <div
          ref={ref}
          className="flex items-center gap-8 relative transition-all"
          onDrag={onDrag}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={(e) => e.preventDefault()}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {beaches.map((beach, index) => {
            return (
              <div
                key={index}
                className="relative w-[270px] h-[420px] lg:w-[570px] lg:h-[760px] shrink-0"
              >
                <Image
                  className="rounded-lg"
                  src={`${beach.files[0].url}`}
                  fill
                  alt="beaches"
                />
              </div>
            );
          })}
          <span
            hidden={lastPage}
            ref={trigger}
            className="px-4 py-2 bg-orange-500 text-white shrink-0 rounded-md z-10"
          >
            More
          </span>
        </div>
      </div>
    </div>
  );
}
