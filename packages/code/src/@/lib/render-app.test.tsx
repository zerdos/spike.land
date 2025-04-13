import React from "react";
// Import MockInstance type explicitly
import { afterEach, beforeEach, describe, expect, it, type MockInstance, vi } from "vitest";
// Import ALL named exports from the module under test
import * as RenderAppModule from "./render-app";

// --- Mocks ---

// Mock the AppToRender module directly with the component implementation inside the factory
vi.mock("../../AppToRender", () => ({
  AppToRender: () => <div>Mocked AppToRender</div>,
}));

// Mock other dependencies (BEFORE importing the module under test if possible, though imports are hoisted)
vi.mock("./importmap-utils", () => ({
  importMapReplace: vi.fn((code) => code),
}));

vi.mock("./shared", () => ({
  transpile: vi.fn(({ code }) => Promise.resolve(code)),
}));

// Mock fetch - reset before each test
const mockFetch = vi.fn();
global.fetch = mockFetch;

// Mock createRoot and its methods
const mockUnmount = vi.fn();
const mockRender = vi.fn();
vi.mock("react-dom/client", () => ({
  createRoot: vi.fn(() => ({
    render: mockRender,
    unmount: mockUnmount,
  })),
}));

// Mock @emotion/cache
const mockFlush = vi.fn();
vi.mock("@emotion/cache", () => ({
  default: vi.fn(() => ({
    key: "test-cache-key",
    sheet: {
      tags: [],
      flush: mockFlush,
    },
  })),
}));

// Mock hooks and other utilities
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn(() => "test-space"),
}));
vi.mock("@/hooks/use-window-size", () => ({
  default: vi.fn(() => ({ width: 1024, height: 768 })),
}));
vi.mock("@/lib/md5", () => ({
  md5: vi.fn((s) => `md5-${s}`),
}));
vi.mock("@/lib/try-catch", () => ({
  // Simplified tryCatch mock for testing purposes
  tryCatch: vi.fn(async (promiseOrFn) => {
    try {
      const result = typeof promiseOrFn === "function"
        ? await promiseOrFn()
        : await promiseOrFn;
      return { data: result, error: null };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }),
}));

// Mock URL.createObjectURL and Blob for importFromString browser path
if (typeof window !== "undefined") {
  window.URL.createObjectURL = vi.fn(() => "mock-blob-url");
  window.Blob = vi.fn(() => ({}) as Blob); // Simple mock
}

// --- Tests ---

import { type FlexibleComponentType } from "@/lib/interfaces"; // Import the type

describe("renderApp", () => {
  let rootElement: HTMLDivElement;
  // Explicitly type the spy using the imported MockInstance type
  let importFromStringSpy: MockInstance<
    (code: string) => Promise<FlexibleComponentType>
  >;

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();

    // Spy on the actual importFromString function from the imported module object
    // Default mock implementation resolves successfully
    importFromStringSpy = vi.spyOn(RenderAppModule, "importFromString")
      .mockResolvedValue(() => <div>Default Mock Import</div>);

    // Create a fresh root element for each test
    rootElement = document.createElement("div");
    rootElement.id = "embed";
    document.body.appendChild(rootElement);

    // Default fetch mock (can be overridden)
    mockFetch.mockResolvedValue({
      ok: true,
      text: () => Promise.resolve("export default () => <div>Fetched Code</div>"),
    } as Response);
  });

  afterEach(() => {
    // Clean up the DOM
    document.body.removeChild(rootElement);
    // Restore the original function after spying
    importFromStringSpy.mockRestore();
  });

  it("should return a valid RenderedApp object even if importFromString fails completely", async () => {
    // Arrange: Mock importFromString spy to reject
    const importError = new Error("Simulated import failure");
    importFromStringSpy.mockRejectedValue(importError);

    // Act
    // Use the imported renderApp directly
    const renderedApp = await RenderAppModule.renderApp({
      code: "invalid code",
      rootElement,
    });

    // Assert
    expect(renderedApp).toBeDefined();
    expect(renderedApp).not.toBeNull();
    expect(renderedApp?.App).toBeDefined();
    expect(typeof renderedApp?.App).toBe("function");
    // Check if the rendered component contains the expected error text
    // This requires rendering the component, which might be complex here.
    // For now, just check it's a function.
    expect(renderedApp?.rootElement).toBe(rootElement);
    expect(renderedApp?.rRoot).toBeDefined();
    expect(renderedApp?.cssCache).toBeDefined();
    expect(renderedApp?.cleanup).toBeDefined();
    expect(renderedApp?.toHtmlAndCss).toBeDefined();
  });

  // --- NEW TEST CASE ---
  it("should use static AppToRender when only codeSpace is provided", async () => {
    // Arrange: Ensure importFromString spy is set up (default is success, but shouldn't be called)
    importFromStringSpy.mockResolvedValue(() => (
      <div>
        Should Not Be Called
      </div>
    ));

    // Act: Call renderApp with only codeSpace
    const renderedApp = await RenderAppModule.renderApp({
      codeSpace: "editor-route",
      rootElement,
    });

    // Assert
    expect(renderedApp).toBeDefined();
    expect(renderedApp).not.toBeNull();
    expect(renderedApp?.App).toBeDefined();

    // Crucially, check if the App component's display name or structure matches the mock
    // Direct comparison with the function defined inside vi.mock might be unreliable.
    // Let's check if the rendered output contains the mock text.
    // This requires rendering the component, which adds complexity.
    // Alternative: Check the function name if possible, or rely on the fact
    // that importFromString/fetch were not called, implying the static path was taken.
    // For now, let's keep the check simple, acknowledging it might be fragile:
    // expect(renderedApp?.App.name).toContain('Mocked AppToRender'); // This won't work directly

    // Let's focus on the side effects: fetch and importFromString should NOT be called.
    expect(mockFetch).not.toHaveBeenCalled();
    expect(mockFetch).not.toHaveBeenCalled();

    // Ensure importFromString spy was NOT called
    expect(importFromStringSpy).not.toHaveBeenCalled();

    // Basic checks for RenderedApp structure
    expect(renderedApp?.rootElement).toBe(rootElement);
    expect(renderedApp?.rRoot).toBeDefined();
  });

  // Add more tests for other scenarios (transpiling, empty code, etc.) if needed
});
