import { useTheme as useNextTheme } from "next-themes";
import { createContext, useContext } from "react";
import type { ReactNode } from "react";

type CustomTheme = "light" | "dark";

interface CustomThemeContextType {
  theme: CustomTheme | undefined; // next-themes can return 'system' or undefined initially
  setTheme: (theme: CustomTheme) => void;
}

const CustomThemeProviderContext = createContext<CustomThemeContextType | undefined>(
  undefined,
);

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { theme: nextTheme, setTheme: setNextTheme } = useNextTheme();

  // Adapt next-themes's theme to our "light" | "dark" type
  // For simplicity, if nextTheme is 'system' or undefined, we might default or handle it.
  // However, next-themes typically resolves 'system' to 'light' or 'dark'.
  const currentTheme: CustomTheme = nextTheme === "dark" ? "dark" : "light";

  const value: CustomThemeContextType = {
    theme: currentTheme,
    setTheme: (newTheme: CustomTheme) => setNextTheme(newTheme),
  };

  // The useEffect for class manipulation is removed as next-themes handles it.

  return (
    <CustomThemeProviderContext.Provider value={value}>
      <div className="transition-colors duration-600">
        {children}
      </div>
    </CustomThemeProviderContext.Provider>
  );
}

export const useCustomTheme = () => {
  const context = useContext(CustomThemeProviderContext);
  if (context === undefined) {
    throw new Error("useCustomTheme must be used within a ThemeProvider");
  }
  return context;
};
