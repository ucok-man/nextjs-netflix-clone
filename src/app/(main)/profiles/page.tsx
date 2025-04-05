/* eslint-disable @next/next/no-img-element */

import { auth } from "@/auth";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProfilesPage() {
  const session = await auth();
  if (!session) notFound();

  return (
    <div className="flex items-center h-full min-h-screen justify-center">
      <div className="flex flex-col">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href={"/"}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white overflow-hidden transition-all duration-300">
                <img src="/default-blue.png" alt="Default PP" />
              </div>

              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white transition-all duration-300">
                {session?.user?.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
