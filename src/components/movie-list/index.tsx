import { Movies } from "@/types";
import { isEmpty } from "lodash";
import MovieCard from "../movie-card";

type Props = {
  movies: Movies;
  title: string;
};

export default function MovieList({ movies, title }: Props) {
  if (isEmpty(movies)) return null;

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white mb-4 text-base md:text-xl lg:text-2xl font-semibold">
          {title}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
