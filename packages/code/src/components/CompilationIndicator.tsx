import { Loader2 } from "@/external/lucide-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import React, { useEffect, useState } from "react";

export type CompilationState = "idle" | "formatting" | "transpiling" | "rendering" | "ready" | "error";

interface CompilationIndicatorProps {
  state: CompilationState;
  className?: string;
}

const stateMessages: Record<CompilationState, string> = {
  idle: "",
  formatting: "Formatting...",
  transpiling: "Transpiling...",
  rendering: "Rendering...",
  ready: "",
  error: "Error",
};

export const CompilationIndicator: React.FC<CompilationIndicatorProps> = ({
  state,
  className,
}) => {
  // Initialize visible based on initial state to avoid synchronous setState in effect
  const [visible, setVisible] = useState(() =>
    state === "formatting" || state === "transpiling" || state === "rendering"
  );

  useEffect(() => {
    if (state === "formatting" || state === "transpiling" || state === "rendering") {
      // Only update if not already visible to avoid unnecessary renders
      setVisible(v => v ? v : true);
      return undefined;
    }
    if (state === "ready" || state === "idle") {
      // Delay hiding for a smooth transition
      const timeout = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timeout);
    }
    if (state === "error") {
      // Keep error visible longer
      const timeout = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [state]);

  const isActive = state === "formatting" || state === "transpiling" || state === "rendering";
  const isError = state === "error";

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute inset-0 flex items-center justify-center z-10 pointer-events-none",
            className,
          )}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg",
              isError
                ? "bg-red-100 text-red-700 border border-red-200"
                : "bg-white/90 text-gray-700 border border-gray-200",
            )}
          >
            {isActive && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            <span className="text-sm font-medium">
              {stateMessages[state]}
            </span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Context for compilation state
import { createContext, useContext } from "react";

interface CompilationStateContextValue {
  state: CompilationState;
  setState: (state: CompilationState) => void;
}

export const CompilationStateContext = createContext<CompilationStateContextValue>({
  state: "idle",
  setState: () => {},
});

export const useCompilationState = () => useContext(CompilationStateContext);

interface CompilationStateProviderProps {
  children: React.ReactNode;
}

export const CompilationStateProvider: React.FC<CompilationStateProviderProps> = ({ children }) => {
  const [state, setState] = useState<CompilationState>("idle");

  return (
    <CompilationStateContext.Provider value={{ state, setState }}>
      {children}
    </CompilationStateContext.Provider>
  );
};
