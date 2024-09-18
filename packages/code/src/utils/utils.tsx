import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import React, { useEffect } from "react";

// Components
interface TypingIndicatorProps {
  isDarkMode: boolean;
}

const AnimatedDot: React.FC<{ delay: number; isDarkMode: boolean }> = ({ delay, isDarkMode }) => (
  <motion.div
    className={cn(
      "w-2 h-2 rounded-full",
      isDarkMode ? "bg-gray-400" : "bg-gray-800"
    )}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
    }}
    transition={{
      duration: 1,
      repeat: Infinity,
      delay,
    }}
  />
);

const TypingDots: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => (
  <div className="flex space-x-1">
    {[0, 1, 2].map((dot) => <AnimatedDot key={dot} delay={dot * 0.2} isDarkMode={isDarkMode} />)}
  </div>
);

export const TypingIndicator: React.FC<TypingIndicatorProps> = ({ isDarkMode }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  useEffect(() => {
    const interval = setInterval(() => {

      console.log("typing");
      if (ref.current) {
          ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={ref} className="flex space-x-2 items-center p-2">
      <span className="text-sm text-gray-500">AI is typing</span>
      <TypingDots isDarkMode={isDarkMode} />
    </div>
  );
};
