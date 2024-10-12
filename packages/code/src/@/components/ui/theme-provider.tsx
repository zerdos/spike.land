import { useDarkMode } from "@/hooks/use-dark-mode";
import { createContext, useContext } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  const theme: Theme = isDarkMode ? "dark" : "light";

  const value = {
    theme,
    setTheme: (mode: Theme) =>
      ((mode === "dark" && !isDarkMode) || (mode === "light" && isDarkMode)) &&
      toggleDarkMode(),
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
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
