import React from "react";
import { TbChevronsRight } from "react-icons/tb";
export default function AuthButton({
  text = "click",
  icon = <TbChevronsRight />,
  ...props
}) {
  return (
    <>
      <button {...props} className="flex w-full justify-center gap-2 cursor-pointer px-2 mt-8 py-2 items-center dark:hover:bg-blue-500 bg-blue-500 hover:bg-white hover:text-blue-500 text-white border-blue-500 dark:hover:text-white transition-all border-2 dark:border-white dark:bg-white dark:text-blue-500 rounded-full font-semibold">
        {text}
        {icon}
      </button>
    </>
  );
}
