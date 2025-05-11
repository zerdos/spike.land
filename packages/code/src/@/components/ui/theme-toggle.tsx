import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { domAnimation, LazyMotion, m } from "framer-motion";

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  // The new useDarkMode handles mounting, so if !isDarkMode and toggleDarkMode is a console.warn,
  // it implies it's not mounted yet. We can render a placeholder.
  // However, the useDarkMode hook now returns a default isDarkMode=false before mount,
  // so the UI will render correctly for light mode initially.
  // The toggleDarkMode will only work client-side after mount.

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
      >
        <Button
          onClick={toggleDarkMode}
          variant="outline"
          size="icon"
          className={`rounded-full bg-black text-white overflow-hidden transition-all duration-300 hover:bg-opacity-80 group w-12 h-12 flex items-center justify-center`}
        >
          <m.div
            className="opacity-100 transition-opacity duration-300"
            animate={{ rotate: isDarkMode ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {isDarkMode
              ? <SunIcon className="h-5 w-5" />
              : <MoonIcon className="h-5 w-5" />}
          </m.div>
        </Button>
      </m.div>
    </LazyMotion>
  );
};

const ThemeToggleWrapper = () => (
  <div className="flex justify-center items-center min-h-screen p-4">
    <ThemeToggle />
  </div>
);

export default ThemeToggleWrapper;
