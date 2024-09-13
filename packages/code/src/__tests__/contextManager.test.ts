import { createContextManager } from "@/lib/context-manager";
import { beforeEach, describe, expect, test } from "vitest";

describe("ContextManager", () => {
  const codeSpace = "testCodeSpace";
  let contextManager: ReturnType<typeof createContextManager>;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    contextManager = createContextManager(codeSpace);
  });

  test("initializes with empty context", () => {
    const context = contextManager.getFullContext();
    expect(context).toEqual({
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
      currentDraft: "",
    });
  });

  test("updates and retrieves context correctly", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.updateContext("techStack", "React, TypeScript");
    contextManager.updateContext("currentDraft", "Draft content");

    expect(contextManager.getContext("currentTask")).toBe("Test task");
    expect(contextManager.getContext("techStack")).toBe("React, TypeScript");
    expect(contextManager.getContext("currentDraft")).toBe("Draft content");

    const fullContext = contextManager.getFullContext();
    expect(fullContext.currentTask).toBe("Test task");
    expect(fullContext.techStack).toBe("React, TypeScript");
    expect(fullContext.currentDraft).toBe("Draft content");
  });

  test("initializes context", () => {
    const context = contextManager.getFullContext();
    expect(context).toEqual({
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
      currentDraft: "",
    });
  });

  test("clears context", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.updateContext("currentDraft", "Draft content");
    contextManager.clearContext();
    const context = contextManager.getFullContext();
    expect(context).toEqual({
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
      currentDraft: "",
    });
  });
});
