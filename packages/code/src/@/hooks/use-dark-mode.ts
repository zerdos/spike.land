import { useLocalStorage } from "@/external/use-local-storage";
import { useEffect } from "react";

export const useDarkMode = () => {
  const getInitialDarkMode = (): boolean => {
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

  const [isDarkMode, setIsDarkMode] = useLocalStorage<boolean>(
    "darkMode",
    getInitialDarkMode(),
  );

  useEffect(() => {
    if (!window.matchMedia || typeof window.matchMedia !== "function") return;

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
    
    // Set transition for smooth color changes
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    
    // Apply theme colors dynamically
    if (isDarkMode) {
      document.body.style.backgroundColor = '#1a1a1a';
      document.body.style.color = '#ffffff';
      document.documentElement.style.setProperty('--primary-color', '#4a9eff');
      document.documentElement.style.setProperty('--secondary-color', '#666666');
      document.documentElement.style.setProperty('--background-secondary', '#2d2d2d');
      document.documentElement.style.setProperty('--text-secondary', '#cccccc');
    } else {
      document.body.style.backgroundColor = '#ffffff';
      document.body.style.color = '#000000';
      document.documentElement.style.setProperty('--primary-color', '#0066cc');
      document.documentElement.style.setProperty('--secondary-color', '#888888');
      document.documentElement.style.setProperty('--background-secondary', '#f5f5f5');
      document.documentElement.style.setProperty('--text-secondary', '#444444');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return { isDarkMode, toggleDarkMode };
};
