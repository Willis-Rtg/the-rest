import Link from "next/link";
import React from "react";

export default function BottomImage() {
  return (
    <div className="bg-[url('../public/forest.png')] bg-blend-multiply bg-cover bg-center bg-fixed h-[100vh] ">
      <div className="bg-[rgba(0,0,0,0.2)] w-full h-full flex flex-col justify-center items-center text-white gap-16">
        <div className="flex flex-col justify-center items-center gap-8">
          <h4 className="text-neutral-300">WELCOME TO</h4>
          <h2 className="text-5xl">THE 쉼</h2>
          <h4 className="text-neutral-300">OCEAN VIEW & GRASS GARDEN</h4>
        </div>
        <Link
          href="https://www.bookingplay.co.kr/partner/item/5141/calendar_main/"
          target="_blank"
        >
          <button className="px-24 py-3 bg-[#4A9EAA] rounded-sm">
            예약하기
          </button>
        </Link>
      </div>
    </div>
  );
}
