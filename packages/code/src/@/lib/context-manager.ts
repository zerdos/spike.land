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
  private context: ProjectContext;

  constructor(codeSpace: string) {
    this.storageKey = `projectContext_${codeSpace}`;
    this.context = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)!) : {
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    };
  }

  public updateContext(key: keyof ProjectContext, content: string): void {
    this.context![key] = content;
    localStorage.setItem(this.storageKey, JSON.stringify(this.context));
  }

  public getContext(key: keyof ProjectContext): string {
    return this.context[key] || "";
  }

  public getFullContext(): ProjectContext {
    return this.context!;
  }

  public clearContext(): void {
    localStorage.removeItem(this.storageKey);
    this.context = localStorage.getItem(this.storageKey) ? JSON.parse(localStorage.getItem(this.storageKey)!) : {
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    };
  }
}

export const createContextManager = (codeSpace: string) => new ContextManager(codeSpace);
