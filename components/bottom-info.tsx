"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";
import { login } from "@/common/actions";
import { useFormState } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { destorySession, getSession } from "@/lib/session";

interface IBottomInfo {
  loggedIn: boolean;
}

export default function BottomInfo({ loggedIn }: IBottomInfo) {
  const [modal, setModal] = useState(false);

  const [state, action] = useFormState(login, null);

  async function logout() {
    const session = await getSession();
    if (session.id === 1) {
      destorySession();
    }
  }

  return (
    <div className="h-[100vh] bg-[#4E4D3D] flex flex-col justify-center items-center gap-8">
      <Image src="/house.svg" width={40} height={40} alt="house" />
      <div className="w-[80%] flex flex-col gap-2">
        <div className="flex justify-between text-neutral-400">
          <div className="flex  gap-2">
            <FaBlog size={24} />
            <FaInstagram size={24} />
          </div>
          <FaArrowUp size={24} />
        </div>
        <div className="border-b-2 border-neutral-400" />
      </div>
      <div className="flex flex-col items-center gap-8 text-neutral-200">
        <div />
        <div />
        <h4 className="text-2xl font-bold">010-8937-2647</h4>
        <p className="text-xs text-center px-4">
          상호:더쉼 펜션 | 대표자:김성환 | 사업자등록번호:000-00-0000 |
          통신판매번호:제2021-충남태안-0000호 | 주소:충남 태안군 남면 몽산포길
          166
        </p>
        <div />
        {loggedIn ? (
          <button className="underline" onClick={logout}>
            로그아웃
          </button>
        ) : (
          <button className="underline" onClick={() => setModal(true)}>
            관리자 로그인
          </button>
        )}
        <p>Copyright©TGR by WillisKim</p>
      </div>
      {/* modal */}
      <div
        className={`fixed top-0 w-full h-full bg-black bg-opacity-30 justify-center items-center ${
          modal ? "flex" : "hidden"
        }
        z-0 `}
      >
        <div className="relative bg-white w-[70vw] h-[30vh] lg:w-[30vw] lg:h-[30vh] p-12 rounded-xl z-10">
          <XMarkIcon
            onClick={() => setModal(false)}
            className="absolute right-4 top-4 size-8"
          />
          <div className="flex flex-col items-center">
            <h3>관리자 로그인</h3>
          </div>
          <form className="flex flex-col " action={action}>
            <div className="flex flex-col mt-8 gap-2">
              <input
                name="ID"
                className="border-2 px-2 py-1 "
                placeholder="아이디"
              />
              <input
                name="password"
                type="password"
                className="border-2 px-2 py-1 "
                placeholder="비밀번호"
              />
            </div>
            <button
              className="bg-neutral-400 text-white w-full py-1 mt-4 rounded-lg"
              onClick={() =>
                setModal((prev) => {
                  return state?.success ? prev : !prev;
                })
              }
            >
              로그인
            </button>
            {!state?.success && (
              <span className="text-red-400 self-center mt-4 text-sm">
                {state?.feildErrors!.password}
              </span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
