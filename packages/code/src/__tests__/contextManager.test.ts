import { beforeEach, describe, expect, test } from "vitest";
import { createContextManager } from "../contextManager";

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
    });
  });

  test("updates and retrieves context correctly", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.updateContext("techStack", "React, TypeScript");

    expect(contextManager.getContext("currentTask")).toBe("Test task");
    expect(contextManager.getContext("techStack")).toBe("React, TypeScript");

    const fullContext = contextManager.getFullContext();
    expect(fullContext.currentTask).toBe("Test task");
    expect(fullContext.techStack).toBe("React, TypeScript");
  });

  test("initializes context", () => {
    contextManager.initializeContext(codeSpace);
    const context = contextManager.getFullContext();
    expect(context).toEqual({
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    });
  });

  test("clears context", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.clearContext(codeSpace);
    const context = contextManager.getFullContext();
    expect(context).toEqual({
      currentTask: "",
      techStack: "",
      completionCriteria: "",
      codeStructure: "",
      adaptiveInstructions: "",
      errorLog: "",
      progressTracker: "",
    });
  });
});
