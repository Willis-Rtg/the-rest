"use client";

import React, { useEffect, useState } from "react";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { PhoneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";
import { getSession } from "@/lib/session";
import { getRoomsInfo, TRooms } from "@/common/actions";

export default function TopNav() {
  const [menu, setMenu] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  function onClickMenu() {
    setMenu((prev) => !prev);
  }
  const [isAdmin, setIsAdmin] = useState(false);
  async function getAdmin() {
    const session = await getSession();
    setIsAdmin(session.id === 1);
  }
  const [rooms, setRooms] = useState<TRooms>([]);
  async function getRooms() {
    const rooms = await getRoomsInfo();
    setRooms(rooms);
  }

  useEffect(() => {
    if (menu) setMenuLeft(100);
    else setMenuLeft(0);
  }, [menu]);

  useEffect(() => {
    getAdmin();
    getRooms();
  }, []);

  return (
    <div className="flex fixed top-0  flex-col items-center w-full z-50">
      <div className="w-full px-4  flex items-center justify-between bg-neutral-200 bg-opacity-50">
        <div className="flex items-center gap-6 h-16 md:gap-8">
          <div className="text-neutral-600 md:hidden">
            {menu ? (
              <FaXmark size={38} onClick={onClickMenu} />
            ) : (
              <LuMenu size={38} onClick={onClickMenu} />
            )}
          </div>
          <Link
            href="/"
            className="cursor-pointer size-12 relative justify-self-center"
          >
            <Image src={"/house.svg"} fill alt="house" />
          </Link>
          <ul className="gap-5 h-16 items-center hidden  md:flex">
            <li className="relative flex flex-col items-center justify-center group h-full">
              <span className="hover:cursor-pointer">ABOUT</span>
              <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
                <Link href="/about">
                  <span className="font-bold hover:cursor-pointer">
                    PROLOGUE
                  </span>
                </Link>
              </div>
            </li>
            <li className="relative flex flex-col items-center justify-center group h-full">
              <span className="hover:cursor-pointer">ROOMS</span>
              <div className="absolute top-16 px-6 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col items-center rounded-lg">
                {rooms.map((room, index) => (
                  <Link
                    key={index}
                    className="hover:cursor-pointer flex"
                    href={`/rooms/${room.id}`}
                  >
                    <span className="font-bold text-center w-14">
                      {room.title}
                    </span>
                  </Link>
                ))}

                {isAdmin && (
                  <Link className="hover:cursor-pointer flex" href="/rooms/add">
                    <span className="font-bold hover:cursor-pointer text-center w-14">
                      룸 추가
                    </span>
                  </Link>
                )}
              </div>
            </li>
            <li className="relative flex flex-col items-center group h-full justify-center">
              <span className="hover:cursor-pointer">SPECIAL</span>
              <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
                <Link href="/special?type=해변%26산책로" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    해변&산책로
                  </span>
                </Link>
                <Link href="/special?type=오션뷰" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    오션뷰
                  </span>
                </Link>
                <Link href="/special?type=바베큐" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    바베큐
                  </span>
                </Link>
                <Link href="/special?type=잔디마당" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    잔디마당
                  </span>
                </Link>
                <Link href="/location/beaches" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    갯벌체험
                  </span>
                </Link>
              </div>
            </li>
            <li className="relative flex flex-col items-center group h-full justify-center">
              <span className="hover:cursor-pointer">RESERVE</span>
              <div className="absolute top-16 px-8 py-4 bg-[#7C7C7C] bg-opacity-80 text-white shadow-xl hidden group-hover:flex flex-col rounded-lg">
                <Link href="/reserve?type=예약안내" className="flex">
                  <span className="font-bold hover:cursor-pointer w-20 text-center">
                    예약 안내
                  </span>
                </Link>

                <Link
                  href="https://www.bookingplay.co.kr/partner/item/5141/calendar_main/"
                  className="flex"
                  target="_blank"
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
                <Link href="/location/beaches" className="flex">
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
      <div
        className={`relative flex flex-col gap-8 w-full p-8 pb-16 bg-neutral-200 bg-opacity-50 transition-transform z-30 ${
          menu ? "flex" : "hidden"
        }`}
      >
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">ABOUT</h3>
            <div className="flex flex-col items-center">
              <Link
                href="/about"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">PROLOGUE</h4>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">ROOMS</h3>
            <div className="flex flex-col items-center">
              {rooms.map((room) => (
                <Link
                  key={room.id}
                  href={`/rooms/${room.id}`}
                  onClick={() => {
                    setMenu(false);
                  }}
                >
                  <h4 className="text-lg">{room.title}</h4>
                </Link>
              ))}

              <Link
                href="/rooms/add"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">룸추가</h4>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">SEPCIAL</h3>
            <div className="flex flex-col items-center">
              <Link
                href="/special?type=해변%26산책로"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">해변&산책로</h4>
              </Link>
              <Link
                href="/special?type=오션뷰"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">오션뷰</h4>
              </Link>
              <Link
                href="/special?type=바베큐"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">바베큐</h4>
              </Link>
              <Link
                href="/special?type=잔디마당"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">잔디마당</h4>
              </Link>
              <Link
                href="/location/beaches"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">갯벌체험</h4>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex  justify-between">
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">RESERVE</h3>
            <div className="flex flex-col items-center">
              <Link
                href="/reserve?type=예약안내"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">예약 안내</h4>
              </Link>
              <Link
                href="https://www.bookingplay.co.kr/partner/item/5141/calendar_main/"
                onClick={() => {
                  setMenu(false);
                }}
                target="_blank"
              >
                <h4 className="text-lg">실시간 예약</h4>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">TRAVEL</h3>
            <div className="flex flex-col items-center">
              <Link
                href="/travel"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">추천여행지</h4>
              </Link>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <h3 className="text-2xl">LOCATION</h3>
            <div className="flex flex-col items-center">
              <Link
                href="/location/direct"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">오시는 길</h4>
              </Link>
              <Link
                href="/location/beaches"
                onClick={() => {
                  setMenu(false);
                }}
              >
                <h4 className="text-lg">갯벌체험</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
