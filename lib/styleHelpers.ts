import { useEffect, useState } from "react";

export const useMatchMedia = (value: string) => {
  const [darkMode, setDarkMode] = useState(false);

  const modeMe = (e: any) => {
    setDarkMode(!!e.matches);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(value);

    setDarkMode(matchMedia.matches);
    matchMedia.addEventListener("change", modeMe);

    return () => matchMedia.removeEventListener("change", modeMe);
  }, [value]);

  return darkMode;
};
