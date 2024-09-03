import { useSyncedStorage } from "@/hooks/use-synced-storage";
import { useEffect } from "react";

export const useDarkMode = () => {
  const getInitialDarkMode = (): boolean => {
    if (typeof window === "undefined") return false;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useSyncedStorage<boolean>("darkMode", getInitialDarkMode());

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(darkModeMediaQuery.matches);
      }
    };

    darkModeMediaQuery.addListener(handleChange);
    return () => darkModeMediaQuery.removeListener(handleChange);
  }, [setIsDarkMode]);

  useEffect(() => {
    if (isDarkMode !== null) {
      document.documentElement.classList.toggle("dark", isDarkMode);
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return { isDarkMode: !!isDarkMode, toggleDarkMode };
};
