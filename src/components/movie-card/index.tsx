/* eslint-disable @next/next/no-img-element */
import { Movie } from "@/types";
import { BsFillPlayFill } from "react-icons/bs";
import FavouriteButton from "../favourite-button";

type Props = {
  movie: Movie;
};

export default function MovieCard({ movie }: Props) {
  return (
    <div className="group bg-zinc-900 relative h-[12vw]">
      <img
        className="cursor-pointer object-cover transition-all duration-150 shadow-xl rounded-md group-hover:opacity-90 sm:group-hover:opacity-0 delay-150 w-full h-[12vw]"
        src={movie.thumbnailUrl}
        alt="Movie Thumbnail"
      />
      <div className="opacity-0 absolute top-0 transition-all duration-150 z-10 invisible sm:visible delay-150 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[5vw] group-hover:translate-x-[2vw] group-hover:opacity-100">
        <img
          className="cursor-pointer object-cover transition-all duration-150 shadow-xl rounded-t-md w-full h-[12vw]"
          src={movie.thumbnailUrl}
          alt="Movie Thumbnail"
        />
        <div className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition-all duration-150 shadow-md rounded-b-md">
          <div className="flex flex-row items-center gap-3">
            <div
              className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition-all duration-150 hover:bg-neutral-300"
              onClick={() => {}}
            >
              <BsFillPlayFill size={30} className="relative left-[0.5px]" />
            </div>
            <FavouriteButton movieId={movie.id} />
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
  );
}
