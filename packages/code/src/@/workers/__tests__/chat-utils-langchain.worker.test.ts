import { describe, it, expect, vi, beforeEach } from "vitest";

describe("chat-utils-langchain.worker", () => {
  beforeEach(() => {
    vi.resetModules();
    // Mock location before importing
    (global as any).location = { origin: "http://localhost:3000", pathname: "/live/test", search: "", hash: ""
     };
  });

  it("should expose createWorkflow globally", async () => {
    // Import after setting up mocks
    await import("../chat-utils-langchain.worker");
    
    expect((globalThis as any)).toHaveProperty("createWorkflow");
    expect(typeof (globalThis as any).createWorkflow).toBe("function");
  });

  afterEach(() => {
    // Clean up global
    delete (globalThis as any).createWorkflow;
  });
});
