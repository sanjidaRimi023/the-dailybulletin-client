import React from "react";
import { useTheme } from "../../Provider/ThemeProvider";
import { ImSun } from "react-icons/im";

import { BsMoonStarsFill } from "react-icons/bs";

const ThemeToggle = () => {
  const { theme, toggle } = useTheme();

  return (
    <>
      <button
        onClick={toggle}
        aria-label="Toggle theme"
        className="p-2 rounded-2xl border border-slate-200 dark:border-slate-700
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
        title={theme === "dark" ? "Switch to Light" : "Switch to Dark"}
      >
        {theme === "dark" ? <ImSun /> : <BsMoonStarsFill />}
      </button>
    </>
  );
};

export default ThemeToggle;
