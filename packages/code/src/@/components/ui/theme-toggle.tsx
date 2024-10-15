import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <motion.div whileTap={{ scale: 0.9 }}>
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        size="icon"
        className={`rounded-full bg-black text-white overflow-hidden transition-all duration-300 hover:bg-opacity-80 group w-12 h-12 flex items-center justify-center`}
      >
        <motion.div
          className="opacity-100 transition-opacity duration-300"
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode
            ? <Sun className="h-5 w-5" />
            : <Moon className="h-5 w-5" />}
        </motion.div>
      </Button>
    </motion.div>
  );
};

const ThemeToggleWrapper = () => (
  <div className="flex justify-center items-center min-h-screen p-4">
    <ThemeToggle />
  </div>
);

export default ThemeToggleWrapper;
