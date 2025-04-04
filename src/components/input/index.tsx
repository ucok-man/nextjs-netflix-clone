import { ComponentProps } from "react";

type Props = {
  label: string;
} & ComponentProps<"input">;

export default function Input(props: Props) {
  return (
    <div className="relative">
      <input
        id={props.id}
        className="block rounded-md p-6 pb-1 w-full text-base text-white bg-neutral-700 appearance-none focus:outline-none focus:ring-0 peer"
        placeholder=" "
        value={props.value}
        type={props.type}
        onChange={props.onChange}
      />
      <label
        className="absolute text-base text-zinc-400 duration-150 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-6 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-3"
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
}
