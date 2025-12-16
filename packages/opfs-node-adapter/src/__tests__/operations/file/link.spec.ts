import { describe, expect, it, vi, beforeEach } from "vitest";
import { link } from "../../../operations/file/link";
import { mockNavigator, setupTest } from "../../setup";
import type { LinkErrnoException } from "../../../types";

vi.stubGlobal("navigator", mockNavigator);

describe("link", () => {
  beforeEach(() => {
    setupTest();
  });

  it("should throw ENOTSUP error", async () => {
    await expect(link("/existing", "/new")).rejects.toThrow("ENOTSUP: operation not supported");
  });

  it("should throw error with correct code property", async () => {
    try {
      await link("/existing", "/new");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).code).toBe("ENOTSUP");
    }
  });

  it("should throw error with correct syscall property", async () => {
    try {
      await link("/existing", "/new");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).syscall).toBe("link");
    }
  });

  it("should include both paths in error message", async () => {
    try {
      await link("/path/to/existing", "/path/to/new");
      expect.fail("Should have thrown an error");
    } catch (error) {
      const message = (error as Error).message;
      expect(message).toContain("/path/to/existing");
      expect(message).toContain("/path/to/new");
    }
  });

  it("should set path property to existingPath", async () => {
    try {
      await link("/existing", "/new");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).path).toBe("/existing");
    }
  });

  it("should set dest property to newPath", async () => {
    try {
      await link("/existing", "/new");
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect((error as LinkErrnoException).dest).toBe("/new");
    }
  });
});
