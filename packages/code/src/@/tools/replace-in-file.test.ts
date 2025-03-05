import * as fs from "fs";
import * as path from "path";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { replaceInFile } from "./replace-in-file";

// Mock fs module
vi.mock("fs", () => ({
  promises: {
    readFile: vi.fn(),
    writeFile: vi.fn(),
    access: vi.fn(),
    mkdir: vi.fn(),
  },
  existsSync: vi.fn(),
}));

// Mock path module
vi.mock("path", () => ({
  dirname: vi.fn((p) => p.split("/").slice(0, -1).join("/")),
  resolve: vi.fn((...args) => args.join("/")),
}));

describe("replaceInFile", () => {
  const mockPath = "/path/to/file.ts";
  const mockContent = `
function hello() {
  console.log("Hello, world!");
  return 42;
}

function goodbye() {
  console.log("Goodbye, world!");
  return 0;
}
`;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(fs.promises.readFile).mockResolvedValue(mockContent);
    vi.mocked(fs.promises.writeFile).mockResolvedValue(undefined);
    vi.mocked(fs.promises.access).mockResolvedValue(undefined);
    vi.mocked(fs.existsSync).mockReturnValue(true);
  });

  it("should replace content in a file", async () => {
    const diff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
function hello() {
  console.log("Hello, updated world!");
  return 100;
}
>>>>>>> REPLACE`;

    const expectedNewContent = `
function hello() {
  console.log("Hello, updated world!");
  return 100;
}

function goodbye() {
  console.log("Goodbye, world!");
  return 0;
}
`;

    await replaceInFile(mockPath, diff);

    expect(fs.promises.readFile).toHaveBeenCalledWith(mockPath, "utf8");
    expect(fs.promises.writeFile).toHaveBeenCalledWith(mockPath, expectedNewContent, "utf8");
  });

  it("should handle multiple replacements", async () => {
    const diff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
function hello() {
  console.log("Hello, updated world!");
  return 100;
}
>>>>>>> REPLACE

<<<<<<< SEARCH
function goodbye() {
  console.log("Goodbye, world!");
  return 0;
}
=======
function farewell() {
  console.log("Farewell, world!");
  return -1;
}
>>>>>>> REPLACE`;

    const expectedNewContent = `
function hello() {
  console.log("Hello, updated world!");
  return 100;
}

function farewell() {
  console.log("Farewell, world!");
  return -1;
}
`;

    await replaceInFile(mockPath, diff);

    expect(fs.promises.readFile).toHaveBeenCalledWith(mockPath, "utf8");
    expect(fs.promises.writeFile).toHaveBeenCalledWith(mockPath, expectedNewContent, "utf8");
  });

  it("should create directories if they don't exist", async () => {
    vi.mocked(fs.promises.access).mockRejectedValueOnce(new Error("Directory doesn't exist"));

    const diff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
function hello() {
  console.log("Hello, updated world!");
  return 100;
}
>>>>>>> REPLACE`;

    await replaceInFile(mockPath, diff);

    expect(fs.promises.mkdir).toHaveBeenCalledWith(path.dirname(mockPath), { recursive: true });
  });

  it("should throw an error if the search content is not found", async () => {
    const diff = `<<<<<<< SEARCH
function notInFile() {
  console.log("This function doesn't exist!");
}
=======
function newFunction() {
  console.log("New function!");
}
>>>>>>> REPLACE`;

    await expect(replaceInFile(mockPath, diff)).rejects.toThrow("Search content not found");
  });

  it("should handle empty replacements (deletions)", async () => {
    const diff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
>>>>>>> REPLACE`;

    const expectedNewContent = `

function goodbye() {
  console.log("Goodbye, world!");
  return 0;
}
`;

    await replaceInFile(mockPath, diff);

    expect(fs.promises.writeFile).toHaveBeenCalledWith(mockPath, expectedNewContent, "utf8");
  });

  it("should handle malformed diff strings", async () => {
    const malformedDiff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
function hello() {
  console.log("Hello, updated world!");
  return 100;
}
`; // Missing the closing delimiter

    await expect(replaceInFile(mockPath, malformedDiff)).rejects.toThrow("Malformed diff string");
  });

  it("should handle files that don't exist", async () => {
    vi.mocked(fs.existsSync).mockReturnValueOnce(false);

    const diff = `<<<<<<< SEARCH
function hello() {
  console.log("Hello, world!");
  return 42;
}
=======
function hello() {
  console.log("Hello, updated world!");
  return 100;
}
>>>>>>> REPLACE`;

    await expect(replaceInFile(mockPath, diff)).rejects.toThrow("File does not exist");
  });
});
