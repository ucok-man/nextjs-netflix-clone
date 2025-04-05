import { formatZodError } from "@/lib/format-zod-error";
import { prismaclient } from "@/lib/prisma-client";
import { responseErr, responseOK } from "@/lib/response";
import { hash } from "bcryptjs";
import { NextRequest } from "next/server";
import { z } from "zod";

const Schema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    ),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(60, "Password must be at most 60 characters")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^a-zA-Z0-9]/,
      "Password must contain at least one special character"
    ),
});

export async function POST(req: NextRequest) {
  const { data, error } = Schema.safeParse(await req.json());
  if (error) {
    return responseErr(422, formatZodError(error.flatten()));
  }

  try {
    const exist = await prismaclient.user.findUnique({
      where: { email: data.email },
    });
    if (exist) {
      return responseErr(422, {
        email: "User with this email already exist",
      });
    }

    const hashpassword = await hash(data.password, 12);
    const user = await prismaclient.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashpassword,
        emailVerified: new Date(),
      },
    });

    return responseOK(200, user);
  } catch (error) {
    console.log({ err: error });
    return responseErr(500, { message: "We have problem in our server" });
  }
}
