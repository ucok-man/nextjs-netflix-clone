/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";

export const GET = auth(async function GET(req, ctx) {
  if (!req.auth) {
    return responseErr(401, {
      message: "You are not allowed to access this resource",
    });
  }

  const movieId = ctx.params?.movieId;
  if (!movieId && typeof movieId !== "string") {
    return responseErr(404, {
      message: "The resource you are looking for cannot be found",
    });
  }

  try {
    const movie = await prismaclient.movie.findUnique({
      where: {
        id: movieId as string,
      },
    });
    return responseOK(200, movie);
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
});
