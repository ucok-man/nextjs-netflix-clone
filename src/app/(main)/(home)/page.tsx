"use client";
import { signOut } from "next-auth/react";

export default function HomePage() {
  return (
    <div onClick={() => signOut()} className="text-white cursor-pointer">
      Logout
    </div>
  );
}
