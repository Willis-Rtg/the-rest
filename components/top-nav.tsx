import React from "react";
import House from "../public/house.svg";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";

export default function TopNav() {
  return (
    <div className="fixed top-0 w-full flex items-center px-4 bg-neutral-200 bg-opacity-50 justify-between ">
      <div className="flex items-center gap-10">
        <Link href="/" className="cursor-pointer size-12 relative">
          <Image src={"/house.svg"} fill alt="house" />
        </Link>
        <ul className="flex gap-5 h-16 items-center">
          <li className="relative flex flex-col items-center justify-center group h-full">
            <span className="hover:cursor-pointer">ABOUT</span>
            <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
              <Link href="/about">
                <span className="font-bold hover:cursor-pointer">PROLOGUE</span>
              </Link>
            </div>
          </li>
          <li className="relative flex flex-col items-center justify-center group h-full">
            <span className="hover:cursor-pointer">ROOMS</span>
            <div className="absolute top-16 px-6 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col items-center rounded-lg">
              <Link className="hover:cursor-pointer flex" href="/rooms">
                <span className="font-bold text-center w-14">디럭스</span>
              </Link>
              <Link className="hover:cursor-pointer flex" href="/rooms">
                <span className="font-bold hover:cursor-pointer text-center w-14">
                  스위트
                </span>
              </Link>
              <Link className="hover:cursor-pointer flex" href="/rooms">
                <span className="font-bold hover:cursor-pointer text-center w-14">
                  오션뷰
                </span>
              </Link>
            </div>
          </li>
          <li className="relative flex flex-col items-center group h-full justify-center">
            <span className="hover:cursor-pointer">SPECIAL</span>
            <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
              <Link href="/special" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  해변&산책로
                </span>
              </Link>
              <Link href="/special" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  오션뷰
                </span>
              </Link>
              <Link href="/special" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  바베큐
                </span>
              </Link>
              <Link href="/special" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  잔디마당
                </span>
              </Link>
              <Link href="/location/beach" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  갯벌체험
                </span>
              </Link>
            </div>
          </li>
          <li className="relative flex flex-col items-center group h-full justify-center">
            <span className="hover:cursor-pointer">RESERVE</span>
            <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
              <Link href="/reserve" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  예약 안내
                </span>
              </Link>

              <Link
                href="https://www.bookingplay.co.kr/partner/item/5141/calendar_main/"
                className="flex"
              >
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  실시간 예약
                </span>
              </Link>
            </div>
          </li>
          <li className="relative flex flex-col items-center group h-full justify-center">
            <span className="hover:cursor-pointer">TRAVEL</span>
            <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
              <Link href="/travel" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  추천 여행지
                </span>
              </Link>
            </div>
          </li>
          <li className="relative flex flex-col items-center group h-full justify-center">
            <span className="hover:cursor-pointer">LOCATION</span>
            <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
              <Link href="/location/direct" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  오시는 길
                </span>
              </Link>
              <Link href="/location/beach" className="flex">
                <span className="font-bold hover:cursor-pointer w-20 text-center">
                  갯벌 체험
                </span>
              </Link>
            </div>
          </li>
        </ul>
      </div>
      <div className="flex gap-4 text-gray-600">
        <a href="tel:01089372647">
          <PhoneIcon className="size-6" />
        </a>
        <Link
          href="https://www.bookingplay.co.kr/partner/item/5141/calendar_main/"
          target="_blank"
        >
          <CalendarDaysIcon className="size-6" />
        </Link>
      </div>
    </div>
  );
}
