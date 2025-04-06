"use client";

import { queryclient } from "@/context";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { without } from "lodash";
import { useSession } from "next-auth/react";
import { AiOutlineCheck, AiOutlinePlus } from "react-icons/ai";

type Props = {
  movieId: string;
};

export default function FavouriteButton({ movieId }: Props) {
  const { data: session, update: updateSession } = useSession();

  const isFavourites = session?.user?.favoriteMovieIds?.includes(movieId);

  const { mutate: toogleFavourites, isPending } = useMutation({
    mutationFn: async () => {
      if (isFavourites) {
        return await axios.delete("/api/favourites", {
          data: { movieId },
        });
      }
      return await axios.post("/api/favourites", { movieId });
    },

    onSuccess: async () => {
      await updateSession({
        user: {
          ...session?.user,
          favoriteMovieIds: isFavourites
            ? without(session?.user?.favoriteMovieIds, movieId)
            : [...(session?.user?.favoriteMovieIds as string[]), movieId],
        },
      });
      await queryclient.refetchQueries({
        queryKey: ["mylist"],
      });
    },
  });

  return (
    <button
      disabled={isPending}
      onClick={() => toogleFavourites()}
      className="cursor-pointer group/item size-6 lg:size-10 border-white border-2 rounded-full flex justify-center items-center transition-all duration-300 hover:border-neutral-300"
    >
      {isFavourites ? (
        <AiOutlineCheck className="text-white" size={30} />
      ) : (
        <AiOutlinePlus className="text-white" size={30} />
      )}
    </button>
  );
}
