import { Button } from "@/components/ui/button";
import { useDarkMode } from "@/hooks/use-dark-mode";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export const ThemeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <motion.div
      whileTap={{ scale: 0.9 }}
    >
      <Button
        onClick={toggleDarkMode}
        variant="outline"
        size="icon"
        className={`rounded-full ${
          isDarkMode ? "bg-gray-800 text-yellow-400" : "bg-white text-gray-800"
        } transition-all duration-300`}
      >
        <motion.div
          animate={{ rotate: isDarkMode ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </motion.div>
      </Button>
    </motion.div>
  );
};
