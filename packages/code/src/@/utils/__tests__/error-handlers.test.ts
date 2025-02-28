import { describe, expect, it, vi } from "vitest";
import {
  createCodeIntegrityError,
  createCompilationError,
  handleWorkflowError,
  WorkflowError,
} from "../error-handlers";

describe("error-handlers", () => {
  describe("WorkflowError", () => {
    it("should create error with message and context", () => {
      const message = "Test error";
      const context = { key: "value" };
      const error = new WorkflowError(message, context);

      expect(error.message).toBe(message);
      expect(error.context).toEqual(context);
      expect(error.name).toBe("WorkflowError");
    });

    it("should create error without context", () => {
      const message = "Test error";
      const error = new WorkflowError(message);

      expect(error.message).toBe(message);
      expect(error.context).toBeUndefined();
    });
  });

  describe("handleWorkflowError", () => {
    beforeEach(() => {
      vi.spyOn(console, "error").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should handle WorkflowError with context", () => {
      const error = new WorkflowError("Test error", { key: "value" });

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        "Workflow Error:",
        "Test error",
        { key: "value" },
      );
    });

    it("should handle code integrity error", () => {
      const error = new WorkflowError("Code integrity validation failed");

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Code integrity"),
      );
    });

    it("should handle compilation error", () => {
      const error = new WorkflowError("failed to compile");

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        expect.stringContaining("Compilation errors"),
      );
    });

    it("should handle unknown errors", () => {
      const error = new Error("Unknown error");

      expect(() => handleWorkflowError(error)).toThrow(WorkflowError);
      expect(console.error).toHaveBeenCalledWith("Unexpected Error:", error);
    });
  });

  describe("createCodeIntegrityError", () => {
    it("should create error with code integrity context", () => {
      const message = "Hash mismatch";
      const expectedHash = "abc123";
      const actualHash = "def456";
      const codeLength = 100;

      const error = createCodeIntegrityError(
        message,
        expectedHash,
        actualHash,
        codeLength,
      );

      expect(error).toBeInstanceOf(WorkflowError);
      expect(error.message).toContain(message);
      expect(error.context).toEqual({
        expectedHash,
        actualHash,
        codeLength,
      });
    });
  });

  describe("createCompilationError", () => {
    it("should create error with compilation context", () => {
      const errorMessage = "Syntax error";
      const documentHash = "abc123";
      const modifiedCodeHash = "def456";

      const error = createCompilationError(
        errorMessage,
        documentHash,
        modifiedCodeHash,
      );

      expect(error).toBeInstanceOf(WorkflowError);
      expect(error.message).toBe("Compilation failed");
      expect(error.context).toEqual({
        error: errorMessage,
        originalHash: documentHash,
        modifiedHash: modifiedCodeHash,
      });
    });

    it("should handle missing hashes", () => {
      const error = createCompilationError("Syntax error");

      expect(error).toBeInstanceOf(WorkflowError);
      expect(error.context).toEqual({
        error: "Syntax error",
        originalHash: undefined,
        modifiedHash: undefined,
      });
    });
  });
});
