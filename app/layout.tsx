import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import TopImage from "../components/top-image";
import BottomImage from "../components/bottom-image";
import BottomInfo from "@/components/bottom-info";
import Script from "next/script";
import { getSession } from "@/lib/session";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "The 쉼 | %s",
    default: "The 쉼",
  },
  description: "태안 몽산포 가족 펜션에서 즐거운 해루질을 체험해보세요.",
  openGraph: {
    siteName: "The 쉼",
    images: {
      url: "/더쉼전경.png",
    },
  },
  twitter: {
    title: "The 쉼",
    images: {
      url: "/더쉼전경.png",
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <html lang="en" className="overflow-x-hidden">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        <meta
          name="naver-site-verification"
          content="714f146e5ff05aef0f7501ac8fa6fee6671dac5a"
        />
      </head>
      <body
        className={`${inter.className} overflow-x-hidden`}
        suppressHydrationWarning
        draggable={false}
      >
        <TopImage loggedIn={session.id === 1 ? true : false} />
        {children}
        <BottomImage />
        <BottomInfo loggedIn={session.id === 1 ? true : false} />
      </body>
    </html>
  );
}
