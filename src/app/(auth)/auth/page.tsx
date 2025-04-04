"use client";
/* eslint-disable @next/next/no-img-element */

import Input from "@/components/input";
import { useCallback, useState } from "react";

export default function AuthPage() {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [variant, setVariant] = useState<"login" | "register">("login");
  const toogleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  return (
    <div className="min-h-screen relative size-full bg-[url('/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black size-full lg:opacity-50 absolute"></div>

      <nav className="relative px-12 py-5">
        <img src={"/logo.png"} alt="Logo Image" className="h-12" />
      </nav>
      <div className="relative flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Sign in" : "Register"}
          </h2>
          <div className="flex flex-col gap-4">
            {variant === "register" && (
              <Input
                id="name"
                label="Username"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                value={username}
              />
            )}
            <Input
              id="email"
              label="Email"
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              value={email}
            />
            <Input
              id="password"
              label="Password"
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              value={password}
            />
            <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <p className="text-neutral-500 mt-12">
              {variant === "login"
                ? "First time using Netflix? "
                : "Already have an account? "}
              <span
                onClick={toogleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
