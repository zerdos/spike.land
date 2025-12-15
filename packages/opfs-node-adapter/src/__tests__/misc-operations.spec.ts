import FS, { cwd, readFileSync } from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("memfs miscellaneous operations", () => {
  beforeEach(() => {
    setupTest();
  });

  describe("cwd", () => {
    it("should return root directory", async () => {
      const currentDir = await cwd();
      expect(currentDir).toBe("/");
    });
  });

  describe("readFileSync", () => {
    it("should read file synchronously from global object", () => {
      // Mock the global object with a file
      const globalFiles = globalThis as unknown as Record<string, string>;
      globalFiles["/sync-test.txt"] = "sync content";

      const content = readFileSync("/sync-test.txt");
      expect(content).toBe("sync content");

      // Clean up
      delete globalFiles["/sync-test.txt"];
    });

    it("should return empty string for non-existent file", () => {
      const content = readFileSync("/nonexistent.txt");
      expect(content).toBe("");
    });
  });

  describe("FS module", () => {
    it("should export all required methods", () => {
      expect(FS).toHaveProperty("readFile");
      expect(FS).toHaveProperty("writeFile");
      expect(FS).toHaveProperty("unlink");
      expect(FS).toHaveProperty("mkdir");
      expect(FS).toHaveProperty("readdir");
      expect(FS).toHaveProperty("stat");
      expect(FS).toHaveProperty("cwd");
      expect(FS).toHaveProperty("readFileSync");
    });

    it("should assign methods to globalThis", () => {
      expect(globalThis).toHaveProperty("readFile");
      expect(globalThis).toHaveProperty("writeFile");
      expect(globalThis).toHaveProperty("unlink");
      expect(globalThis).toHaveProperty("mkdir");
      expect(globalThis).toHaveProperty("readdir");
      expect(globalThis).toHaveProperty("stat");
      expect(globalThis).toHaveProperty("cwd");
      expect(globalThis).toHaveProperty("readFileSync");
    });
  });
});
