"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { getRooms, TRooms } from "./actions";

export default function RoomLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { id: string };
}>) {
  const roomId = Number(params.id);
  const ref = useRef<HTMLDivElement>(null);
  const [rooms, setRooms] = useState<TRooms>();
  async function initalData() {
    setRooms(await getRooms());
  }

  useEffect(() => {
    initalData();
  }, []);
  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl uppercase">
          {rooms?.find((room) => room.id === roomId)?.title}
        </h1>
        <p className="text-xs text-neutral-500 text-center mt-4">
          Comfortable rest in your imagination,
          <br /> Pleasure meeting. It's an auxiliary facility prepared for you.
        </p>
        <span className="text-xs text-neutral-500 my-6 underline">
          풍경보기
        </span>
        <div
          ref={ref}
          className="border-y-2 p-4 w-full flex justify-center gap-4"
        >
          {rooms?.map((room) => (
            <Link key={room.id} href={`/rooms/${room.id}`}>
              <span
                className={`uppercase ${
                  roomId === room.id ? "underline" : null
                }`}
              >
                {room.title}
              </span>
            </Link>
          ))}
        </div>
      </div>
      {children}
    </div>
  );
}
