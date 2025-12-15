import { describe, it, expect } from "vitest";
import "../../setup";
import { readFileSync } from "../../../operations/file/readFileSync";

describe("readFileSync", () => {
  it("should read file synchronously from global object", () => {
    const globalFiles = globalThis as unknown as Record<string, string>;
    globalFiles["/sync-test.txt"] = "sync content";

    const content = readFileSync("/sync-test.txt");
    expect(content).toBe("sync content");

    delete globalFiles["/sync-test.txt"];
  });

  it("should return empty string for non-existent file", () => {
    const content = readFileSync("/nonexistent.txt");
    expect(content).toBe("");
  });
});
