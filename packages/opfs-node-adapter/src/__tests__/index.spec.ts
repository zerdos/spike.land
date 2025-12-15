import FS from "../index";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockDirectoryHandle, mockFileSystem, mockNavigator, setupTest } from "./setup";

// Apply mocks
vi.stubGlobal("navigator", mockNavigator);

describe("memfs", () => {
  beforeEach(() => {
    setupTest();
  });

  // This file serves as an entry point for all memfs tests
  // The actual tests are in the following files:
  // - utils.spec.ts: Tests for utility functions
  // - file-operations.spec.ts: Tests for file operations
  // - directory-operations.spec.ts: Tests for directory operations
  // - misc-operations.spec.ts: Tests for miscellaneous operations

  // Add a simple test to avoid "No test found" error
  it("should have mocks set up correctly", () => {
    expect(mockNavigator).toBeDefined();
    expect(mockDirectoryHandle).toBeDefined();
    expect(mockFileSystem).toBeDefined();
  });

  it("should export a complete FS module", () => {
    expect(FS).toHaveProperty("readFile");
    expect(FS).toHaveProperty("writeFile");
    expect(FS).toHaveProperty("unlink");
    expect(FS).toHaveProperty("mkdir");
    expect(FS).toHaveProperty("readdir");
    expect(FS).toHaveProperty("stat");
    expect(FS).toHaveProperty("cwd");
    expect(FS).toHaveProperty("readFileSync");
    expect(FS).toHaveProperty("open");
    expect(FS).toHaveProperty("copyFile");
    expect(FS).toHaveProperty("rename");
    expect(FS).toHaveProperty("rmdir");
    expect(FS).toHaveProperty("access");
    expect(FS).toHaveProperty("truncate");
    expect(FS).toHaveProperty("appendFile");
  });
});
