import React from "react";
import Image from "next/image";
import { FaInstagram } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { FaArrowUp } from "react-icons/fa";

export default function BottomInfo() {
  return (
    <div className="h-[100vh] bg-[#4E4D3D] flex flex-col justify-center items-center gap-8">
      <Image src={require("../public/house.svg")} width={32} alt="house" />
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
        <span className="underline">관리자 로그인 </span>
        <p>Copyright©TGR by WillisKim</p>
      </div>
    </div>
  );
}
