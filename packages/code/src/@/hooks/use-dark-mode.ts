import { useTheme as useNextTheme } from "next-themes";
import { useEffect, useState } from "react";

export const useDarkMode = () => {
  const { setTheme, resolvedTheme } = useNextTheme();
  const [mounted, setMounted] = useState(false);

  // useEffect only runs on the client, so now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // resolvedTheme is the actual theme ('light' or 'dark') even if 'theme' is 'system'
  // Only determine isDarkMode after the component has mounted to avoid hydration mismatch
  const isDarkMode = mounted ? resolvedTheme === "dark" : false; // Default to false SSR

  const toggleDarkMode = () => {
    // Use resolvedTheme to decide the next state
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  if (!mounted) {
    // Return a default/non-functional state during SSR or before mount
    // to prevent hydration issues if consumers try to use these values immediately.
    return {
      isDarkMode: false, // Consistent with the initial state of isDarkMode above
      toggleDarkMode: () => console.warn("toggleDarkMode called before mounted"),
    };
  }

  return { isDarkMode, toggleDarkMode };
};
