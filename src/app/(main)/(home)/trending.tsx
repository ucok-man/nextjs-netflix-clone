"use client";

import MovieList from "@/components/movie-list";
import { Movies } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function Trending() {
  const { data: movies, isPending } = useQuery({
    queryKey: ["trending"],
    queryFn: async () => {
      const { data } = await axios.get("/api/movies");
      return data as Movies;
    },
  });
  if (isPending || !movies) return null;

  return <MovieList title="Trending Now" movies={movies} />;
}
