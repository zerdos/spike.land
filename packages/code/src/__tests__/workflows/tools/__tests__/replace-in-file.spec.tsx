import { getReplaceInFileTool } from "@/../workflows/tools/replace-in-file";
import { updateSearchReplace } from "@/lib/chat-utils";
import type { ICode } from "@/lib/interfaces";
import { md5 } from "@/lib/md5";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@/lib/chat-utils", () => ({
  updateSearchReplace: vi.fn(),
  SEARCH_REPLACE_MARKERS: {
    SEARCH_START: "<<<<<<< SEARCH",
    SEPARATOR: "=======",
    REPLACE_END: ">>>>>>> REPLACE",
  },
}));

vi.mock("@/lib/md5", () => ({
  md5: vi.fn((input) => `md5-${typeof input === "string" ? input.substring(0, 10) : "mock"}`),
}));

describe("replace-in-file tool", () => {
  // Mock code session
  const mockCodeSession: ICode = {
    getCode: vi.fn().mockResolvedValue("const test = 'test';"),
    setCode: vi.fn().mockResolvedValue("const updated = 'updated';"),
    getMessages: vi.fn().mockReturnValue([]),
    addMessage: vi.fn().mockReturnValue(true),
    removeMessages: vi.fn().mockReturnValue(true),
    addMessageChunk: vi.fn(),
    getSession: vi.fn().mockResolvedValue({
      code: "const test = 'test';",
      codeSpace: "test-space",
      html: "<div>Test</div>",
      css: ".test { color: red; }",
      messages: [],
      transpiled: "const test = 'test';",
    }),
    setSession: vi.fn(),
    init: vi.fn().mockResolvedValue({
      code: "const test = 'test';",
      codeSpace: "test-space",
      html: "<div>Test</div>",
      css: ".test { color: red; }",
      messages: [],
      transpiled: "const test = 'test';",
    }),
    screenshot: vi.fn().mockResolvedValue({
      imageName: "test.png",
      url: "data:image/png;base64,test",
      src: "data:image/png;base64,test",
      mediaType: "image/png",
      data: "test",
      type: "image",
    }),
    getCodeSpace: vi.fn().mockReturnValue("test-space"),
    sub: vi.fn().mockReturnValue(() => {}),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "log").mockImplementation(() => {});
    vi.spyOn(console, "warn").mockImplementation(() => {});
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.spyOn(console, "debug").mockImplementation(() => {});
  });

  it("should create a replace-in-file tool", () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    expect(tool).toBeDefined();
    expect(tool.name).toBe("replace_in_file");
    expect(tool.description).toContain("Replace sections of content");
    expect(typeof tool.invoke).toBe("function");
  });

  it("should successfully replace content in a file", async () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    // Mock the updateSearchReplace function to return updated content
    vi.mocked(updateSearchReplace).mockReturnValueOnce(
      "const updated = 'updated';",
    );

    const result = await tool.invoke({
      path: "/path/to/file.ts",
      hash: "md5-const test",
      diff: `<<<<<<< SEARCH
const test = 'test';
=======
const updated = 'updated';
>>>>>>> REPLACE`,
    });

    expect(mockCodeSession.getCode).toHaveBeenCalled();
    expect(updateSearchReplace).toHaveBeenCalled();
    expect(mockCodeSession.setCode).toHaveBeenCalledWith(
      "const updated = 'updated';",
    );
    expect(mockCodeSession.addMessageChunk).toHaveBeenCalled();

    expect(result).toHaveProperty("hash");
    expect(result).toHaveProperty("error");
    expect(typeof result === "string" ? result : result.error).toContain(
      "Changes applied successfully",
    );
  });

  it("should return an error if the file hash doesn't match", async () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    const result = await tool.invoke({
      path: "/path/to/file.ts",
      hash: "incorrect-hash",
      diff: `<<<<<<< SEARCH
const test = 'test';
=======
const updated = 'updated';
>>>>>>> REPLACE`,
    });

    expect(result).toHaveProperty("error");
    expect(typeof result === "string" ? result : result.error).toContain(
      "Document has been modified",
    );
  });

  it("should return an error if the diff format is invalid", async () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    const result = await tool.invoke({
      path: "/path/to/file.ts",
      hash: "md5-const test",
      diff: "This is not a valid diff format",
    });

    expect(result).toHaveProperty("error");
    expect(typeof result === "string" ? result : result.error).toContain("Invalid diff format");
  });

  it("should return an error if no changes were made", async () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    // Mock the updateSearchReplace function to return the same content (no changes)
    vi.mocked(updateSearchReplace).mockReturnValueOnce("const test = 'test';");

    const result = await tool.invoke({
      path: "/path/to/file.ts",
      hash: "md5-const test",
      diff: `<<<<<<< SEARCH
const test = 'test';
=======
const updated = 'updated';
>>>>>>> REPLACE`,
    });

    expect(result).toHaveProperty("error");
    expect(typeof result === "string" ? result : result.error).toContain("No changes were made");
  });

  it("should handle errors during code update", async () => {
    const tool = getReplaceInFileTool(mockCodeSession);

    // Mock the updateSearchReplace function to return updated content
    vi.mocked(updateSearchReplace).mockReturnValueOnce(
      "const updated = 'updated';",
    );

    // Mock setCode to throw an error
    vi.mocked(mockCodeSession.setCode).mockRejectedValueOnce(
      new Error("Failed to update code"),
    );

    const result = await tool.invoke({
      path: "/path/to/file.ts",
      hash: "md5-const test",
      diff: `<<<<<<< SEARCH
const test = 'test';
=======
const updated = 'updated';
>>>>>>> REPLACE`,
    });

    expect(result).toHaveProperty("error");
    expect(typeof result === "string" ? result : result.error).toContain(
      "Error in file replacement",
    );
  });
});
