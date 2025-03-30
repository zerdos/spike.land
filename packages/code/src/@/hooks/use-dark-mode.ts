import { useLocalStorage } from "@/external/use-local-storage";
import { useEffect } from "react";

export const useDarkMode = () => {
  const getInitialDarkMode = (): boolean => {
    if (typeof window === "undefined") return false;
    const storedDarkMode = localStorage.getItem("darkMode");
    if (storedDarkMode !== null) {
      return storedDarkMode === "true";
    } else {
      if (!window.matchMedia || typeof window.matchMedia !== 'function') return false;
      
      try {
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
      } catch (e) {
        return false;
      }
    }
  };

  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    getInitialDarkMode(),
  );

  useEffect(() => {
    if (!window.matchMedia || typeof window.matchMedia !== 'function') return;
    
    try {
      const darkModeMediaQuery = window.matchMedia(
        "(prefers-color-scheme: dark)",
      );

      const handleChange = (event: MediaQueryListEvent) => {
        if (localStorage.getItem("darkMode") === null) {
          setIsDarkMode(event.matches);
        }
      };

      darkModeMediaQuery.addEventListener("change", handleChange);
      return () => darkModeMediaQuery.removeEventListener("change", handleChange);
    } catch (e) {
      return;
    }
  }, [setIsDarkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};
