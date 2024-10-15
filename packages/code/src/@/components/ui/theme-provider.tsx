import { useDarkMode } from "@/hooks/use-dark-mode";
import { createContext, useContext, useEffect } from "react";
import type { ReactNode } from "react";


type Theme = 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeProviderContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const theme: Theme = isDarkMode ? "dark" : "light";

  const value = {
    theme,
    setTheme: (mode: Theme) =>
      ((mode === "dark" && !isDarkMode) || (mode === "light" && isDarkMode)) &&
      toggleDarkMode(),
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(theme);
  }, [theme]);

  return (
    <ThemeProviderContext.Provider value={value}>
      <div className="transition-colors duration-600">
        {children}
      </div>
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

