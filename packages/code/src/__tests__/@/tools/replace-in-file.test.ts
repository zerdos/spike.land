import { replaceInFileTool } from "@/tools/replace-in-file";
import { updateSearchReplace } from "@/lib/chat-utils";
import { md5 } from "@/lib/md5";
import type { ICode } from "@/lib/interfaces";
import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";

// Mock dependencies
vi.mock("@/lib/chat-utils", () => ({
  updateSearchReplace: vi.fn(),
}));

vi.mock("@/lib/md5", () => ({
  md5: vi.fn((str) => `mock-hash-${str.length}`),
}));

// Mock console functions
const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleDebug = console.debug;

beforeEach(() => {
  console.log = vi.fn();
  console.error = vi.fn();
  console.warn = vi.fn();
  console.debug = vi.fn();
  vi.clearAllMocks();
});

afterEach(() => {
  vi.resetAllMocks();
});

afterAll(() => {
  console.log = originalConsoleLog;
  console.error = originalConsoleError;
  console.warn = originalConsoleWarn;
  console.debug = originalConsoleDebug;
});

describe("replaceInFileTool", () => {
  // Mock global cSess
  const mockSetCode = vi.fn();
  const mockGetCode = vi.fn();
  const mockAddMessageChunk = vi.fn();

  const mockCSess: Partial<ICode> = {
    setCode: mockSetCode,
    getCode: mockGetCode,
    addMessageChunk: mockAddMessageChunk,
  };

  // Setup global object
  beforeEach(() => {
    (global as any).globalThis = {
      cSess: mockCSess,
    };
  });

  it("should validate the tool schema", () => {
    expect(replaceInFileTool.name).toBe("replace_in_file");
    expect(replaceInFileTool.description).toContain("Replace sections of content in an existing file");
    expect(replaceInFileTool.schema).toBeDefined();
  });

  // Access the tool's function for testing
  const toolFunc = (replaceInFileTool as any)._func;

  describe("tool execution", () => {
    it("should return an error for invalid file path", async () => {
      const result = await toolFunc({
        path: "",
        hash: "valid-hash",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Invalid file path provided");
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error for invalid hash", async () => {
      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Invalid hash provided");
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error for invalid diff format", async () => {
      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "valid-hash",
        diff: "invalid diff format",
      });

      expect(result.error).toContain("Invalid diff format");
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error if code session is not provided", async () => {
      // Remove cSess from global
      (global as any).globalThis = {};

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "valid-hash",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Code session not provided");
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error if file content retrieval fails", async () => {
      mockGetCode.mockResolvedValueOnce("");

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "valid-hash",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Failed to retrieve file content or file is empty");
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error if hash verification fails", async () => {
      const currentCode = "const x = 1;";
      mockGetCode.mockResolvedValueOnce(currentCode);

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "different-hash", // Different from what md5 will return
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Document has been modified since last hash");
      expect(md5).toHaveBeenCalledWith(currentCode);
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error if no changes were made", async () => {
      const currentCode = "const x = 1;";
      mockGetCode.mockResolvedValueOnce(currentCode);
      
      // Mock updateSearchReplace to return the same code (no changes)
      (updateSearchReplace as any).mockReturnValueOnce(currentCode);

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: `mock-hash-${currentCode.length}`, // Valid hash
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("No changes were made to the file");
      expect(updateSearchReplace).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it("should return an error if setCode fails", async () => {
      const currentCode = "const x = 1;";
      const modifiedCode = "const x = 2;";
      mockGetCode.mockResolvedValueOnce(currentCode);
      
      // Mock updateSearchReplace to return modified code
      (updateSearchReplace as any).mockReturnValueOnce(modifiedCode);
      
      // Mock setCode to fail
      mockSetCode.mockResolvedValueOnce(false);

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: `mock-hash-${currentCode.length}`, // Valid hash
        diff: "<<<<<<< SEARCH\nconst x = 1;\n=======\nconst x = 2;\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Failed to update the file with the modified code");
      expect(updateSearchReplace).toHaveBeenCalled();
      expect(mockSetCode).toHaveBeenCalled();
      expect(console.error).toHaveBeenCalled();
    });

    it("should successfully apply changes and return success response", async () => {
      const currentCode = "const x = 1;";
      const modifiedCode = "const x = 2;";
      mockGetCode.mockResolvedValueOnce(currentCode);
      mockGetCode.mockResolvedValueOnce(modifiedCode); // For the hash check after addMessageChunk
      
      // Mock updateSearchReplace to return modified code
      (updateSearchReplace as any).mockReturnValueOnce(modifiedCode);
      
      // Mock setCode to succeed
      mockSetCode.mockResolvedValueOnce(modifiedCode);

      const diff = "<<<<<<< SEARCH\nconst x = 1;\n=======\nconst x = 2;\n>>>>>>> REPLACE";
      const result = await toolFunc({
        path: "valid/path.ts",
        hash: `mock-hash-${currentCode.length}`, // Valid hash
        diff,
      });

      // Should return success with empty code (to save tokens)
      expect(result.code).toBe("");
      expect(result.hash).toBe(`mock-hash-${modifiedCode.length}`);
      expect(result.error).toContain("Changes applied successfully");
      
      // Verify all the expected function calls
      expect(updateSearchReplace).toHaveBeenCalledWith(diff, currentCode);
      expect(mockSetCode).toHaveBeenCalledWith(modifiedCode, true);
      expect(mockAddMessageChunk).toHaveBeenCalledWith(diff);
      expect(md5).toHaveBeenCalledWith(modifiedCode);
      expect(console.log).toHaveBeenCalledWith("✅ Successfully added message chunk");
    });

    it("should handle unexpected errors during execution", async () => {
      mockGetCode.mockRejectedValueOnce(new Error("Unexpected error"));

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "valid-hash",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Error in file replacement: Unexpected error");
      expect(console.error).toHaveBeenCalled();
    });

    it("should handle errors when retrieving code after an error", async () => {
      // First getCode throws an error
      mockGetCode.mockRejectedValueOnce(new Error("First error"));
      
      // Second getCode (in the catch block) also throws an error
      mockGetCode.mockRejectedValueOnce(new Error("Second error"));

      const result = await toolFunc({
        path: "valid/path.ts",
        hash: "valid-hash",
        diff: "<<<<<<< SEARCH\nold code\n=======\nnew code\n>>>>>>> REPLACE",
      });

      expect(result.error).toContain("Error in file replacement: First error");
      expect(console.error).toHaveBeenCalledWith("Failed to retrieve code after error", expect.any(Object));
    });
  });
});
