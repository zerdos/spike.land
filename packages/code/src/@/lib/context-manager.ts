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
    return localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)!) : {
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    };
  }

  public clearContext(): void {
    localStorage.removeItem(this.storageKey);
  }
}

export const createContextManager = (codeSpace: string) => new ContextManager(codeSpace);
