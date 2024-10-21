import { useEffect, useState } from "react";

export default function useMatchMedia(query: string) {
  const [matches, setMatches] = useState(false);

  const handleChange = (e: MediaQueryListEvent) => {
    setMatches(e.matches);
  };

  useEffect(() => {
    const matchMedia = window.matchMedia(query);

    setMatches(matchMedia.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, [query]);

  return matches;
}
