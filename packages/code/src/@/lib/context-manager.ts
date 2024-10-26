// contextManager.ts

export interface ProjectContext {
  [key: string]: string;
  currentTask: string;
  techStack: string;
  completionCriteria: string;
  codeStructure: string;
  currentDraft: string;
  adaptiveInstructions: string;
  errorLog: string;
  progressTracker: string;
}

class ContextManager {
  private codeSpace: string = "";
  private currentTask: string = "";
  private techStack: string = "";
  private completionCriteria: string = "";
  private codeStructure: string = "";
  private currentDraft: string = "";
  private adaptiveInstructions: string = "";
  private errorLog: string = "";
  private progressTracker: string = "";

  constructor(codeSpace: string) {
    this.codeSpace = codeSpace;
  }

  public updateContext(key: string, content: string): void {
    const context = this.getFullContext();
    context[key] = content;
  }

  public getContext(key: string): string {
    const context = this.getFullContext();
    return context[key] || "";
  }

  public getFullContext(): ProjectContext {
    return {
      codeSpace: this.codeSpace,
      currentTask: this.currentTask,
      techStack: this.techStack,
      completionCriteria: this.completionCriteria,
      codeStructure: this.codeStructure,
      currentDraft: this.currentDraft,
      adaptiveInstructions: this.adaptiveInstructions,
      errorLog: this.errorLog,
      progressTracker: this.progressTracker,
    };
  }

  public clearContext(): void {
    this.currentTask = "";
    this.techStack = "";
    this.completionCriteria = "";
    this.codeStructure = "";
    this.currentDraft = "";
    this.adaptiveInstructions = "";
    this.errorLog = "";
    this.progressTracker = "";
  }
}

export { ContextManager };
