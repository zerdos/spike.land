import {
  createCodeIntegrityError,
  createCompilationError,
  ErrorType,
  handleWorkflowError,
  WorkflowError,
} from "@/../workflows/tools/utils/error-handlers";
import { describe, expect, it, vi } from "vitest";

describe("error-handlers", () => {
  describe("WorkflowError", () => {
    it("should create error with message and context", () => {
      const message = "Test error";
      const context = { key: "value" };
      const error = new WorkflowError(message, undefined, context);

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
      vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it("should handle WorkflowError with context", () => {
      const error = new WorkflowError("Test error", undefined, {
        key: "value",
      });

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        "Workflow Error:",
        error.getUserFriendlyMessage(),
        error.context,
      );
    });

    it("should handle code integrity error", () => {
      const error = new WorkflowError(
        "Code integrity validation failed",
        ErrorType.CodeIntegrity,
      );

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        "Code integrity validation failed:",
        error.getUserFriendlyMessage(),
      );
      expect(console.error).toHaveBeenCalledWith(
        "Context:",
        JSON.stringify(error.context, null, 2),
      );
    });

    it("should handle compilation error", () => {
      const error = new WorkflowError(
        "failed to compile",
        ErrorType.Compilation,
      );

      expect(() => handleWorkflowError(error)).toThrow(error);
      expect(console.error).toHaveBeenCalledWith(
        "Compilation errors detected:",
        error.getUserFriendlyMessage(),
      );
    });

    it("should handle unknown errors", () => {
      const error = new Error("Unknown error");

      const result = handleWorkflowError(error);
      expect(result).toBeInstanceOf(WorkflowError);
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
      expect(error.context).toMatchObject({
        expectedHash,
        actualHash,
        codeLength,
      });
    });
  });

  describe("createCompilationError", () => {
    it("should create error with compilation context", () => {
      const errorMessage = "Syntax error";
      const hash = "abc123";
      const modifiedCodeHash = "def456";

      const error = createCompilationError(
        errorMessage,
        hash,
        modifiedCodeHash,
      );

      expect(error).toBeInstanceOf(WorkflowError);
      expect(error.message).toBe("Compilation failed: Syntax error");
      expect(error.context).toMatchObject({
        error: errorMessage,
        originalHash: hash,
        modifiedHash: modifiedCodeHash,
      });
    });

    it("should handle missing hashes", () => {
      const error = createCompilationError("Syntax error");

      expect(error).toBeInstanceOf(WorkflowError);
      expect(error.context).toMatchObject({
        error: "Syntax error",
        originalHash: undefined,
        modifiedHash: undefined,
      });
    });
  });
});
