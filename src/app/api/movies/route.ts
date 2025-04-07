/* eslint-disable @typescript-eslint/no-unused-vars */
import { auth } from "@/auth";
import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";

export const GET = auth(async function GET(req) {
  if (!req.auth) {
    return responseErr(401, {
      message: "You are not allowed to access this resource",
    });
  }
  try {
    const movies = await prismaclient.movie.findMany();
    return responseOK(200, movies);
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
});
