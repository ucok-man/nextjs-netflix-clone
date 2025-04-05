/* eslint-disable @next/next/no-img-element */
"use client";

import { signOut } from "next-auth/react";

type Props = {
  visible: boolean;
};

export default function AccountMenu({ visible }: Props) {
  if (!visible) return null;

  return (
    <div className="bg-black w-56 absolute top-8 right-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/default-blue.png"
            alt="Profiles"
          />
          <p className="text-white text-sm group-hover/item:underline underline-offset-4">
            Username
          </p>
        </div>

        <hr className="bg-gray-600 border-0 h-px my-4" />

        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline underline-offset-4"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
}
