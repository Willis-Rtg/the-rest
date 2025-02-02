"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

export default function RoomLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: string;
}>) {
  const searchParams = useSearchParams();
  let type = searchParams.get("type");
  const subNavs = ["해변&산책로", "오션뷰", "바베큐", "잔디마당", "갯벌체험"];
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Array.from(ref.current!.children).forEach((subNav) => {
      subNav.classList.remove("underline");
      subNav.classList.remove("font-bold");
      if (type === "해변&산책로") {
        type = "해변&amp;산책로";
      }
      if (subNav.children[0].innerHTML === type) {
        subNav.classList.add("underline");
        subNav.classList.add("font-bold");
      }
    });
  }, [type]);
  return (
    <div className="py-16">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl uppercase">{type}</h1>
        <p className="text-xs text-neutral-500 text-center mt-4">
          Comfortable rest in your imagination,
          <br /> Pleasure meeting. It&apos;s an auxiliary facility prepared for
          you.
        </p>
        <span className="text-xs text-neutral-500 my-6 underline">
          풍경보기
        </span>
        <div
          ref={ref}
          className="border-y-2 p-4 w-full flex justify-center gap-4"
        >
          <Link href="/special?type=해변%26산책로">
            <span className={`uppercase`}>해변&산책로</span>
          </Link>
          <Link href="/special?type=오션뷰">
            <span className={`uppercase`}>오션뷰</span>
          </Link>
          <Link href="/special?type=바베큐">
            <span className={`uppercase`}>바베큐</span>
          </Link>
          <Link href="/special?type=잔디마당">
            <span className={`uppercase`}>잔디마당</span>
          </Link>
          <Link href="/special?type=갯벌체험">
            <span className={`uppercase`}>갯벌체험</span>
          </Link>
        </div>
      </div>
      {children}
    </div>
  );
}
