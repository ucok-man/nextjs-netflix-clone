"use client";
import { ComponentProps, forwardRef } from "react";

type Props = {
  label: string;
} & Omit<ComponentProps<"input">, "className" | "ref" | "placeholder">;

const Input = forwardRef<HTMLInputElement, Props>(
  ({ id, label, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          {...props}
          className="block rounded-md p-6 pb-1 w-full text-base text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
          placeholder=" "
          ref={ref}
          id={id}
        />
        <label
          className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
          htmlFor={id}
        >
          {label}
        </label>
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
