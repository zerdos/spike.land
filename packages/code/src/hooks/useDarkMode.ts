import { useEffect, useState } from "react";
import { useCodeSpace } from "./useCodeSpace";

export const useDarkMode = () => {
  const codeSpace = useCodeSpace();

  const getInitialDarkMode = () => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode !== null) {
      return savedMode === "true";
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialDarkMode);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      if (localStorage.getItem("darkMode") === null) {
        setIsDarkMode(darkModeMediaQuery.matches);
      }
    };

    darkModeMediaQuery.addListener(handleChange);
    return () => darkModeMediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    const broadcastChannel = new BroadcastChannel("chat_sync");
    const handleMessage = (event) => {
      if (event.data.type === `update_dark_mode-${codeSpace}`) {
        setIsDarkMode(event.data.isDarkMode);
        localStorage.setItem("darkMode", event.data.isDarkMode.toString());
      }
    };

    broadcastChannel.addEventListener("message", handleMessage);
    return () => {
      broadcastChannel.removeEventListener("message", handleMessage);
      broadcastChannel.close();
    };
  }, [codeSpace]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("darkMode", newMode.toString());
    const broadcastChannel = new BroadcastChannel("chat_sync");
    broadcastChannel.postMessage({
      type: `update_dark_mode-${codeSpace}`,
      isDarkMode: newMode,
    });
  };

  return { isDarkMode, toggleDarkMode };
};
