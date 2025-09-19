import React from "react";
import { TbChevronsRight } from "react-icons/tb";
export default function AuthButton({
  text = "click",
  icon = <TbChevronsRight />,
  ...props
}) {
  return (
    <>
      <button {...props} className="flex w-full justify-center gap-2 cursor-pointer px-2 mt-8 py-2 items-center border border-indigo-600 hover:bg-indigo-500 hover:text-white rounded-full font-semibold transition">
        {text}
        {icon}
      </button>
    </>
  );
}
