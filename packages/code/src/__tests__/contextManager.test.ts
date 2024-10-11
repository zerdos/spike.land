import { ContextManager } from "@/lib/context-manager";
import { beforeEach, describe, expect, test } from "vitest";

describe("ContextManager", () => {
  const codeSpace = "testCodeSpace";
  let contextManager: ContextManager;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    contextManager = new ContextManager(codeSpace);
  });

  test("initializes with empty context", () => {
    const context = contextManager.getFullContext();
    expect(context).toMatchInlineSnapshot(
      {
        currentTask: "",
        techStack: "",
        completionCriteria: "",
        codeStructure: "",
        adaptiveInstructions: "",
        errorLog: "",
        progressTracker: "",
        currentDraft: "",
      },
      `
      {
        "adaptiveInstructions": "",
        "codeSpace": "testCodeSpace",
        "codeStructure": "",
        "completionCriteria": "",
        "currentDraft": "",
        "currentTask": "",
        "errorLog": "",
        "progressTracker": "",
        "techStack": "",
      }
    `,
    );
  });

  test("updates and retrieves context correctly", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.updateContext("techStack", "React, TypeScript");
    contextManager.updateContext("currentDraft", "Draft content");

    expect(contextManager.getContext("currentTask")).toMatchInlineSnapshot("Test task");
    expect(contextManager.getContext("techStack")).toMatchInlineSnapshot("React, TypeScript");
    expect(contextManager.getContext("currentDraft")).toMatchInlineSnapshot("Draft content");

    const fullContext = contextManager.getFullContext();
    expect(fullContext.currentTask).toMatchInlineSnapshot("Test task");
    expect(fullContext.techStack).toMatchInlineSnapshot("React, TypeScript");
    expect(fullContext.currentDraft).toMatchInlineSnapshot("Draft content");
  });

  test("initializes context", () => {
    const context = contextManager.getFullContext();
    expect(context).toMatchInlineSnapshot(
      {
        currentTask: "",
        techStack: "",
        completionCriteria: "",
        codeStructure: "",
        adaptiveInstructions: "",
        errorLog: "",
        progressTracker: "",
        currentDraft: "",
      },
      `
      {
        "adaptiveInstructions": "",
        "codeSpace": "testCodeSpace",
        "codeStructure": "",
        "completionCriteria": "",
        "currentDraft": "",
        "currentTask": "",
        "errorLog": "",
        "progressTracker": "",
        "techStack": "",
      }
    `,
    );
  });

  test("clears context", () => {
    contextManager.updateContext("currentTask", "Test task");
    contextManager.updateContext("currentDraft", "Draft content");
    contextManager.clearContext();
    const context = contextManager.getFullContext();
    expect(context).toMatchInlineSnapshot(
      {
        currentTask: "",
        techStack: "",
        completionCriteria: "",
        codeStructure: "",
        adaptiveInstructions: "",
        errorLog: "",
        progressTracker: "",
        currentDraft: "",
      },
      `
      {
        "adaptiveInstructions": "",
        "codeSpace": "testCodeSpace",
        "codeStructure": "",
        "completionCriteria": "",
        "currentDraft": "",
        "currentTask": "",
        "errorLog": "",
        "progressTracker": "",
        "techStack": "",
      }
    `,
    );
  });
});
