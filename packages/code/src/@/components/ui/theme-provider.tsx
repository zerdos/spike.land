import { useDarkMode } from "@/hooks/use-dark-mode";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type Theme = "light" | "dark";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void; // This will effectively call toggleDarkMode
}

const ThemeProviderContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const theme: Theme = isDarkMode ? "dark" : "light";

  const value = {
    theme,
    // setTheme now just toggles. If a specific theme is passed,
    // it only toggles if the passed theme is different from the current one.
    setTheme: (newTheme: Theme) => {
      if ((newTheme === "dark" && !isDarkMode) || (newTheme === "light" && isDarkMode)) {
        toggleDarkMode();
      }
    },
  };

  // No useEffect needed here to manage 'dark' class on documentElement,
  // as next-themes (used by NextThemesProvider in render-app.tsx) handles it.

  return (
    <ThemeProviderContext.Provider value={value}>
      <div className="transition-colors duration-600">
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => { // Renamed back from useCustomTheme
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
