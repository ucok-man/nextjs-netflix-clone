"use client";

import InfoModal from "@/components/info-modal";
import { Movie } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useState } from "react";

import { AiOutlineInfoCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

export default function BillBoard() {
  const [modalOpen, setModalOpen] = useState(false);
  const { data: movie, isPending } = useQuery({
    queryKey: ["billboard"],
    queryFn: async () => {
      const { data } = await axios.get("/api/random");
      return data as Movie;
    },
  });

  if (isPending) return null;
  if (!movie) return null;

  return (
    <>
      <InfoModal
        movie={movie}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="relative">
        <video
          className="w-full min-h-[280px] object-cover brightness-[60%]"
          autoPlay
          muted
          loop
          poster={movie?.thumbnailUrl}
          src={movie?.videoUrl}
        ></video>
        <div className="absolute top-[40%] md:top-[30%] ml-4 md:ml-16">
          <p className="text-white text-xl md:text-5xl h-full md:w-[50%] lg:text-6xl font-bold drop-shadow-xl">
            {movie?.title}
          </p>
          <p className="text-white text-sm md:text-lg mt-3 md:mt-8 md:w-[80%] w-[90%] lg:w-[50%] drop-shadow-xl max-md:line-clamp-2">
            {movie?.description}
          </p>

          <div className="flex flex-row items-center mt-3 md:mt-4 gap-3">
            <Link
              href={`/watch/${movie?.id}`}
              className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition-all duration-300 cursor-pointer"
            >
              <BsFillPlayFill className="mr-1 size-4 md:size-6" />
              Play
            </Link>

            <button
              onClick={() => setModalOpen(true)}
              className="bg-white text-white py-1 md:py-2 px-2 md:px-4 w-auto rounded-md bg-opacity-30 text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-opacity-20 transition-all duration-300"
            >
              <AiOutlineInfoCircle className="mr-1 size-4 md:size-6" />
              More Info
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
