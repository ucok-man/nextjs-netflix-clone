import { prismaclient } from "@/lib/prisma-client";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowAltCircleLeft } from "react-icons/fa";

type Props = {
  params: { movieId: string };
};

export default async function WatchMoviePage({ params }: Props) {
  const movie = await prismaclient.movie.findUnique({
    where: {
      id: params.movieId,
    },
  });
  if (!movie) notFound();

  return (
    <div className="h-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center bg-black bg-opacity-70">
        <Link
          href={"/"}
          className="text-white cursor-pointer hover:opacity-80 transition-all pr-2 h-7 w-7 lg:h-11 lg:w-11"
        >
          <FaArrowAltCircleLeft className="size-full" />
        </Link>
        <p className="pl-2 text-white text-1xl md:text-3xl font-bold">
          <span className="font-light">Watching:</span> {movie.title}
        </p>
      </nav>
      <video
        className="h-full w-full"
        autoPlay
        controls
        src={movie.videoUrl}
      ></video>
    </div>
  );
}
