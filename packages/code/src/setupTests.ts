import "@testing-library/jest-dom";
import { afterAll, afterEach, beforeAll, vi } from "vitest";

// Mock matchMedia for all tests
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock URL.createObjectURL which is not available in jsdom
if (!window.URL.createObjectURL) {
  Object.defineProperty(window.URL, "createObjectURL", {
    writable: true,
    value: vi.fn().mockImplementation((_blob) => "mock-blob-url"),
  });
}

// Fix for "Right-hand side of 'instanceof' is not an object" error in React
// Only define these if they don't already exist to avoid breaking instanceof checks
if (!global.HTMLElement) {
  const MockHTMLElement = function() {} as unknown as new() => HTMLElement;
  global.HTMLElement = MockHTMLElement;
}

if (!global.Element) {
  const MockElement = function() {} as unknown as new() => Element;
  Object.setPrototypeOf(MockElement.prototype, global.HTMLElement.prototype);
  global.Element = MockElement;
}

if (!global.HTMLInputElement) {
  const MockHTMLInputElement = function() {} as unknown as new() => HTMLInputElement;
  Object.setPrototypeOf(
    MockHTMLInputElement.prototype,
    global.HTMLElement.prototype,
  );
  global.HTMLInputElement = MockHTMLInputElement;
}

if (!global.HTMLTextAreaElement) {
  const MockHTMLTextAreaElement = function() {} as unknown as new() => HTMLTextAreaElement;
  Object.setPrototypeOf(
    MockHTMLTextAreaElement.prototype,
    global.HTMLElement.prototype,
  );
  global.HTMLTextAreaElement = MockHTMLTextAreaElement;
}

if (!global.HTMLSelectElement) {
  const MockHTMLSelectElement = function() {} as unknown as new() => HTMLSelectElement;
  Object.setPrototypeOf(
    MockHTMLSelectElement.prototype,
    global.HTMLElement.prototype,
  );
  global.HTMLSelectElement = MockHTMLSelectElement;
}

// Silence console output during tests
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
};

beforeAll(() => {
  // Mock all console methods to be silent
  console.log = vi.fn();
  console.warn = vi.fn();
  console.error = vi.fn();
  console.info = vi.fn();
  console.debug = vi.fn();
});

afterAll(() => {
  // Restore original console methods
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
  console.info = originalConsole.info;
  console.debug = originalConsole.debug;
});

// This helps ensure all assertions are cleaned up properly
afterEach(() => {
  // Reset any timers or pending promises
  vi.clearAllTimers();
});
