/* eslint-disable @typescript-eslint/no-unused-vars */
import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const movies = await prismaclient.movie.findMany();
    return responseOK(200, movies);
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
}
