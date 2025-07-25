import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps } from "next-themes";
import type { FC } from "react";

export const ThemeProvider: FC<ThemeProviderProps> = (
  { children, ...props },
) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};
