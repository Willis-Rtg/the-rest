import React from "react";
import TopNav from "./top-nav";

export default function TopImage() {
  return (
    <div className="bg-[url('../public/bg-dumi.png')] bg-cover bg-no-repeat h-[100vh] flex justify-center items-center">
      <TopNav />
      <div className="text-white flex flex-col items-center gap-4">
        <span>welcome</span>
        <h2 className="text-5xl">THE 쉼</h2>
      </div>
    </div>
  );
}
