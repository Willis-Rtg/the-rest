"use client";

import { login } from "@/common/actions";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";

export default function LoginModal() {
  const [modal, setModal] = useState(false);

  const [state, action] = useFormState(login, null);

  console.log(modal);

  useEffect(() => {
    if (state?.success) {
      setModal(false);
    }
  }, [state]);

  return (
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
          <button className="bg-neutral-400 text-white w-full py-1 mt-4 rounded-lg">
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
  );
}
