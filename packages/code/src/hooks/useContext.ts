import { createContextManager, ProjectContext } from "../contextManager";

interface ContextHook {
  getContext: (key: keyof ProjectContext) => string;
  updateContext: (key: keyof ProjectContext, content: string) => void;
  getFullContext: () => ProjectContext;
  initializeContext: (codeSpace: string) => void;
  clearContext: (codeSpace: string) => void;
}

export function useContext(codeSpace: string): ContextHook {
  const contextManager = createContextManager(codeSpace);

  return {
    getContext: contextManager.getContext.bind(contextManager),
    updateContext: contextManager.updateContext.bind(contextManager),
    getFullContext: contextManager.getFullContext.bind(contextManager),
    initializeContext: contextManager.initializeContext.bind(contextManager),
    clearContext: contextManager.clearContext.bind(contextManager),
  };
}
