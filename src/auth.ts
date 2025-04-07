/* eslint-disable @typescript-eslint/no-explicit-any */
import { PrismaAdapter } from "@auth/prisma-adapter";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { prismaclient } from "./lib/prisma-client";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prismaclient),
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/auth",
  },

  providers: [
    Credentials({
      type: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      authorize: async ({ email, password }) => {
        if (!email || !password) {
          return null;
        }
        if (typeof email !== "string" || typeof password !== "string") {
          return null;
        }

        const user = await prismaclient.user.findUnique({
          where: {
            email: email,
          },
        });

        if (!user || !user.password) {
          return null;
        }

        const match = await compare(password, user.password);
        if (!match) {
          return null;
        }

        return user;
      },
    }),

    GitHub({
      clientId: process.env.AUTH_GITHUB_ID,
      clientSecret: process.env.AUTH_GITHUB_SECRET,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    },

    jwt({ token, user, session, trigger }) {
      const u = user as Record<string, any>;
      if (trigger === "signIn" || trigger === "signUp") {
        for (const key in u) {
          token[key] = u[key];
        }
      }
      if (trigger === "update") {
        for (const key in session.user) {
          token[key] = session.user[key];
        }
      }
      return token;
    },
    session({ session, token }) {
      const u = session.user as Record<string, any>;
      for (const key in token) {
        u[key] = token[key];
      }
      return { ...session, user: u };
    },
  },
});
