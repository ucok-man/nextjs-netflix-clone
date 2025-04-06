import { auth } from "@/auth";
import { formatZodError } from "@/lib/format-zod-error";
import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";
import { without } from "lodash";

import { z } from "zod";

const Schema = z.object({
  movieId: z.string(),
});

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return responseErr(401, {
      message: "You are not allowed to access this resource",
    });
  }

  const { data, error } = Schema.safeParse(await req.json());
  if (error) {
    return responseErr(422, formatZodError(error.flatten()));
  }

  try {
    const movie = await prismaclient.movie.findUnique({
      where: {
        id: data.movieId,
      },
    });

    if (!movie) {
      throw responseErr(404, {
        message: "The resource you are looking for cannot be found",
      });
    }

    if (req.auth.user?.favoriteMovieIds?.includes(movie.id)) {
      return responseOK(200, {
        message: `Movie ${data.movieId} added to favourites`,
      });
    }

    await prismaclient.user.update({
      where: {
        id: req.auth.user?.id,
      },
      data: {
        favoriteMovieIds: {
          push: movie.id,
        },
      },
    });

    return responseOK(200, {
      message: `Movie ${data.movieId} added to favourites`,
    });
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
});

export const DELETE = auth(async function DELETE(req) {
  if (!req.auth) {
    return responseErr(401, {
      message: "You are not allowed to access this resource",
    });
  }

  const { data, error } = Schema.safeParse(await req.json());
  if (error) {
    return responseErr(422, formatZodError(error.flatten()));
  }

  try {
    const movie = await prismaclient.movie.findUnique({
      where: {
        id: data.movieId,
      },
    });

    if (!movie) {
      throw responseErr(404, {
        message: "The resource you are looking for cannot be found",
      });
    }

    if (!req.auth.user?.favoriteMovieIds?.includes(movie.id)) {
      return responseOK(200, {
        message: `Movie ${data.movieId} deleted to favourites`,
      });
    }

    await prismaclient.user.update({
      where: {
        id: req.auth.user?.id,
      },
      data: {
        favoriteMovieIds: {
          set: without(req.auth.user.favoriteMovieIds, movie.id),
        },
      },
    });

    return responseOK(200, {
      message: `Movie ${data.movieId} deleted to favourites`,
    });
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
});

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return responseErr(401, {
      message: "You are not allowed to access this resource",
    });
  }

  try {
    const user = await prismaclient.user.findUnique({
      where: {
        email: req.auth.user?.email as string,
      },
    });
    if (!user) {
      return responseErr(500, { message: "We have problem in our server" });
    }

    const movies = await prismaclient.movie.findMany({
      where: {
        id: {
          in: user.favoriteMovieIds,
        },
      },
    });

    return responseOK(200, movies);
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
});
