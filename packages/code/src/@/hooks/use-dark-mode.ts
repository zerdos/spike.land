import { useLocalStorage } from "@/external/use-local-storage";
import { useEffect } from "react";

export const getInitialDarkMode = (): boolean => {
  if (typeof window === "undefined") return false;
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode !== null) {
    return storedDarkMode === "true";
  } else {
    if (!window.matchMedia || typeof window.matchMedia !== "function") {
      return false;
    }
    try {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    } catch (e) {
      return false;
    }
  }
};

export const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    getInitialDarkMode(),
  );

  useEffect(() => {
    if (
      typeof window === "undefined" || !window.matchMedia ||
      typeof window.matchMedia !== "function"
    ) return;

    try {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      const handleChange = (event: MediaQueryListEvent) => {
        // Only update if localStorage doesn't have a user-set preference
        if (localStorage.getItem("darkMode") === null) {
          setIsDarkMode(event.matches);
        }
      };

      darkModeMediaQuery.addEventListener("change", handleChange);
      return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    } catch (e) {
      console.error("Error setting up media query listener for dark mode:", e);
      return;
    }
  }, [setIsDarkMode]);

  // The useEffect that previously toggled 'dark' class on documentElement
  // and set body styles/CSS variables has been removed.
  // This will now be handled by next-themes (class toggling)
  // and index.css (styles based on the .dark class).

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode: boolean) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};
