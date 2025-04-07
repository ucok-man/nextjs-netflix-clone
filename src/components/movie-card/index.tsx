/* eslint-disable @next/next/no-img-element */
"use client";

import { Movie } from "@/types";
import Link from "next/link";
import { useState } from "react";
import { BsChevronDown, BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "../favourite-button";
import InfoModal from "../info-modal";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <InfoModal
        movie={movie}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
      <div className="group bg-zinc-900 relative aspect-video">
        <img
          className="cursor-pointer object-cover transition-all duration-150 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150 w-full h-full"
          src={movie.thumbnailUrl}
          alt="Movie Thumbnail"
        />
        <div className="opacity-0 absolute top-0 transition-all duration-150 z-10 delay-150 w-full scale-0 group-hover:scale-100 group-hover:-translate-y-[5vw] group-hover:translate-x-[0vw] group-hover:opacity-100">
          <img
            className="cursor-pointer object-cover transition-all duration-150 shadow-xl rounded-t-md w-full h-full aspect-video"
            src={movie.thumbnailUrl}
            alt="Movie Thumbnail"
          />
          <div className="z-10 bg-zinc-800 p-4 absolute w-full transition-all duration-150 shadow-md rounded-b-md">
            <div className="flex flex-row items-center gap-3">
              <Link
                href={`/watch/${movie.id}`}
                className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition-all duration-150 hover:bg-neutral-300"
                onClick={() => {}}
              >
                <BsFillPlayFill size={30} className="relative left-[0.5px]" />
              </Link>

              <FavouriteButton movieId={movie.id} />

              <div
                onClick={() => setModalOpen(true)}
                className="cursor-pointer ml-auto group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
              >
                <BsChevronDown className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
              </div>
            </div>

            <p className="text-green-400 font-semibold mt-4">
              New <span className="text-white">{new Date().getFullYear()}</span>
            </p>

            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">
                {movie.duration}
              </p>
            </div>

            <div className="flex flex-row mt-4 gap-2 items-center">
              <p className="text-white text-[10px] lg:text-sm">{movie.genre}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
