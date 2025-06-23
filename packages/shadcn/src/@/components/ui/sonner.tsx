import { useTheme } from "next-themes";
import { Toaster as Sonner, ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme } = useTheme();
  const allowedThemes = ["system", "light", "dark"] as const;
  const safeTheme =
    allowedThemes.includes(theme as any)
      ? (theme as "system" | "light" | "dark")
      : "system";

  return (
    <Sonner
      theme={safeTheme}
      className="toaster group"
      style={{
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
      } as React.CSSProperties}
      {...props}
    />
  );
};

export { Toaster };
