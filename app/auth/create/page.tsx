"use client";

import { useFormState } from "react-dom";
import createAccount from "./actions";

export default function AuthCreate() {
  const [state, action] = useFormState(createAccount, null);
  return (
    <div>
      <form className="flex flex-col gap-2 p-10" action={action}>
        <input
          name="ID"
          className="bg-neutral-200 ring-2 ring-yellow-400 p-2 rounded-md"
          type="text"
          placeholder="ID"
        />
        <input
          name="password"
          className="bg-neutral-200 ring-2 ring-yellow-400 p-2 rounded-md"
          type="text"
          placeholder="password"
        />
        <button className="bg-yellow-400 rounded-md">회원가입</button>
      </form>
    </div>
  );
}
