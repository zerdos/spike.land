// contextManager.ts

export interface ProjectContext {
  currentTask: string;
  techStack: string;
  completionCriteria: string;
  codeStructure: string;
  adaptiveInstructions: string;
  errorLog: string;
  progressTracker: string;
}

class ContextManager {
  private storageKey: string;

  constructor(codeSpace: string) {
    this.storageKey = `projectContext_${codeSpace}`;
  }

  public updateContext(key: keyof ProjectContext, content: string): void {
    const context = this.getFullContext();
    context[key] = content;
    localStorage.setItem(this.storageKey, JSON.stringify(context));
  }

  public getContext(key: keyof ProjectContext): string {
    const context = this.getFullContext();
    return context[key] || "";
  }

  public getFullContext(): ProjectContext {
    const storedContext = localStorage.getItem(this.storageKey);
    return storedContext ? JSON.parse(storedContext) : {
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    };
  }

  public initializeContext(codeSpace: string): void {
    const initialContext: ProjectContext = {
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    };
    localStorage.setItem(`projectContext_${codeSpace}`, JSON.stringify(initialContext));
  }

  public clearContext(codeSpace: string): void {
    localStorage.removeItem(`projectContext_${codeSpace}`);
  }
}

export const createContextManager = (codeSpace: string) => new ContextManager(codeSpace);
