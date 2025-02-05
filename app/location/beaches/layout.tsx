import { ReactNode } from "react";

export async function generateMetadata() {
  return {
    title: "갯벌체험",
    description: "The 쉼 펜션 앞 몽산포 갯벌에서 즐거운 해루질을 경험하세요.",
  };
}

export default function BeachesLayout({ children }: { children: ReactNode }) {
  return children;
}
