/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";

import Input from "@/components/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

import { z } from "zod";

const formschema = z.object({
  name: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username can only contain letters, numbers, and underscores"
    )
    .optional(),
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

export default function AuthPage() {
  const searchParams = useSearchParams();

  const { mutate: signUp, isPending } = useMutation({
    mutationFn: async (payload: z.infer<typeof formschema>) => {
      const { data } = await axios.post("/api/register", payload);
      return data;
    },
    onError: (err: AxiosError) => {
      if (err.status === 422) {
        const response = err.response?.data as any;
        for (const key in response.error) {
          form.setError(key as any, {
            message: response.error[key],
          });
        }
        return;
      }

      throw err;
    },

    onSuccess: async () => {
      await signIn("credentials", {
        ...form.getValues(),
        redirectTo: "/profiles",
      });
      form.reset();
    },
  });

  const form = useForm<z.infer<typeof formschema>>({
    resolver: zodResolver(formschema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [variant, setVariant] = useState<"login" | "register">("login");
  const toogleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
    form.reset();
  }, [form]);

  useEffect(() => {
    if (
      searchParams.get("error") === "CredentialsSignin" &&
      searchParams.get("code") === "credentials"
    ) {
      form.setError("email", {
        message: "Invalid email and password",
      });
    }
  }, [searchParams, form]);

  const { errors } = form.formState;

  return (
    <div className="min-h-screen relative size-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black size-full lg:opacity-50 absolute"></div>

      <nav className="relative px-12 py-5">
        <img src={"/images/logo.png"} alt="Logo Image" className="h-12" />
      </nav>

      {/* Form Box */}
      <div className="relative flex justify-center">
        <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
          {/* Form Header */}
          <h2 className="text-white text-4xl mb-8 font-semibold">
            {variant === "login" ? "Sign in" : "Register"}
          </h2>

          {/* Form Content */}
          <form
            className="flex flex-col gap-4"
            onSubmit={form.handleSubmit((payload) => {
              if (variant === "register") {
                signUp(payload);
              } else {
                signIn("credentials", {
                  ...payload,
                  redirectTo: "/profiles",
                });
              }
            })}
          >
            {variant === "register" && (
              <>
                <Input id="name" label="Username" {...form.register("name")} />
                <p className="text-xs text-red-500 relative -top-2 pl-1">
                  {errors.name?.message}
                </p>
              </>
            )}
            <Input id="email" label="Email" {...form.register("email")} />
            <p className="text-xs text-red-500 relative -top-2 pl-1">
              {errors.email?.message}
            </p>

            <Input
              id="password"
              label="Password"
              {...form.register("password")}
            />
            <p className="text-xs text-red-500 relative -top-2 pl-1">
              {errors.password?.message}
            </p>

            <button
              disabled={isPending}
              type="submit"
              className="bg-red-600 py-3 text-white rounded-md w-full hover:bg-red-700 transition"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>

            {/* Social  */}
            <div className="flex flex-row items-center gap-4 mt-4 justify-center">
              <div
                onClick={() =>
                  signIn("google", {
                    redirectTo: "/profiles",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() =>
                  signIn("github", {
                    redirectTo: "/profiles",
                  })
                }
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition-all"
              >
                <FaGithub size={30} />
              </div>
            </div>

            {/* Link Toogle */}
            <p className="text-neutral-500 mt-6">
              {variant === "login"
                ? "First time using Netflix? "
                : "Already have an account? "}
              <span
                onClick={toogleVariant}
                className="text-white ml-1 hover:underline cursor-pointer"
              >
                {variant === "login" ? "Create an account" : "Login"}
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
