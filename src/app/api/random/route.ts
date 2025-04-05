/* eslint-disable @typescript-eslint/no-unused-vars */

import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";
import { NextApiRequest } from "next";

export async function GET(req: NextApiRequest) {
  try {
    const moviecount = await prismaclient.movie.count();
    const randomidx = Math.floor(Math.random() * moviecount);
    const movie = await prismaclient.movie.findMany({
      take: 1,
      skip: randomidx,
    });
    if (movie.length <= 0) {
      return responseErr(404, {
        message: "The resource you are looking for cannot be found",
      });
    }

    return responseOK(200, movie.at(0));
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
}
