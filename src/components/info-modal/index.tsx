"use client";

import { Movie } from "@/types";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "../favourite-button";

type Props = {
  open: boolean;
  onClose: () => void;
  movie: Movie;
};

export default function InfoModal({ open, movie, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="z-50 transition-all duration-300 bg-black bg-opacity-80 flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0">
      <div className="relative w-auto mx-auto max-w-3xl rounded-md overflow-hidden max-sm:px-2">
        <div
          className={`${
            open ? "scale-100" : "scale-0"
          } transform duration-300 relative flex-auto bg-zinc-900 drop-shadow-md`}
        >
          <div className="relative h-96">
            <video
              className="w-full brightness-[60%] object-cover h-full"
              autoPlay
              muted
              loop
              src={movie.videoUrl}
              poster={movie.thumbnailUrl}
            ></video>

            <div
              onClick={onClose}
              className="cursor-pointer absolute top-3 right-3 size-10 rounded-full bg-black bg-opacity-80 flex items-center justify-center"
            >
              <AiOutlineClose className="text-white" size={20} />
            </div>

            <div className="absolute bottom-[10%] left-5 sm:left-10">
              <p className="text-white text-3xl md:text-4xl h-full lg:text-5xl font-bold mb-8">
                {movie.title}
              </p>
              <div className="flex flex-row items-center gap-3">
                <Link
                  href={`/watch/${movie.id || ""}`}
                  className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition-all duration-150 hover:bg-neutral-300"
                >
                  <BsFillPlayFill size={30} className="relative left-[0.5px]" />
                </Link>

                <FavouriteButton movieId={movie.id || ""} />
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-12 py-8">
            <p className="text-green-400 font-semibold text-lg">New</p>
            <div className="flex items-center gap-2 mb-2">
              <p className="text-white text-lg">{movie.duration}</p>
              <div className="border h-4"></div>
              <p className="text-white text-lg ">{movie.genre}</p>
            </div>
            <p className="text-white text-lg max-sm:text-base max-sm:line-clamp-3">
              {movie.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
