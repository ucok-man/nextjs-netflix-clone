"use client";

import MovieList from "@/components/movie-list";
import { Movies } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function MyList() {
  const { data: movies, isPending } = useQuery({
    queryKey: ["mylist"],
    queryFn: async () => {
      const { data } = await axios.get("/api/favourites");
      return data as Movies;
    },
  });

  if (isPending) return null;

  return <MovieList title="My List" movies={movies || []} />;
}
