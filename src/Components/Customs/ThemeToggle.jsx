import React, { useEffect, useState } from "react";
import { ImSun } from "react-icons/im";

import { BsMoonStarsFill } from "react-icons/bs";

const ThemeToggle = () => {
  const [currentTheme, setCurrentTheme] = useState("light");
  const [isChangeTheme, setIsChangeTheme] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "light";
    setCurrentTheme(theme);
    setIsChangeTheme(false);
  }, [isChangeTheme]);

  const handleTheme = () => {
    const rootColor = document.documentElement;
    if (currentTheme == "dark") {
      rootColor.style.setProperty("color-scheme", "light");
      localStorage.setItem("theme", "light");
      setIsChangeTheme(true);
      return;
    } else if (currentTheme == "light") {
      rootColor.style.setProperty("color-scheme", "dark");
      localStorage.setItem("theme", "dark");
      setIsChangeTheme(true);
      return;
    }
  };
  return (
    <>
      <button
        onClick={handleTheme}
        aria-label="Toggle theme"
        className="p-2 rounded-2xl border border-slate-200 dark:border-slate-700
                 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300"
        title={currentTheme === "dark" ? "Switch to Light" : "Switch to Dark"}
      >
        {currentTheme === "dark" ? <BsMoonStarsFill /> :<ImSun /> }
      </button>
    </>
  );
};

export default ThemeToggle;
