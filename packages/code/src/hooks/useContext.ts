import type { ProjectContext } from "@/lib/context-manager";
import { ContextManager } from "@/lib/context-manager";

interface ContextHook {
  getContext: (key: string) => string;
  updateContext: (key: string, content: string) => void;
  getFullContext: () => ProjectContext;
  clearContext: () => void;
}

export function useContext(codeSpace: string): ContextHook {
  const contextManager = new ContextManager(codeSpace);

  return {
    getContext: contextManager.getContext.bind(contextManager),
    updateContext: contextManager.updateContext.bind(contextManager),
    getFullContext: contextManager.getFullContext.bind(contextManager),
    clearContext: contextManager.clearContext.bind(contextManager),
  };
}
