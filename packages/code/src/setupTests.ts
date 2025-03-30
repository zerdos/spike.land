import "@testing-library/jest-dom";
import { vi, afterEach } from 'vitest';

// Mock matchMedia for all tests
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
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
  Object.defineProperty(window.URL, 'createObjectURL', {
    writable: true,
    value: vi.fn().mockImplementation(_blob => 'mock-blob-url'),
  });
}

// Fix for "Right-hand side of 'instanceof' is not an object" error in React
class MockHTMLElement {}
class MockElement extends MockHTMLElement {}
class MockHTMLInputElement extends MockHTMLElement {}
class MockHTMLTextAreaElement extends MockHTMLElement {}
class MockHTMLSelectElement extends MockHTMLElement {}

// Create proper instanceof checks for DOM elements
global.HTMLElement = MockHTMLElement as any;
global.Element = MockElement as any;
global.HTMLInputElement = MockHTMLInputElement as any;
global.HTMLTextAreaElement = MockHTMLTextAreaElement as any;
global.HTMLSelectElement = MockHTMLSelectElement as any;

// This helps ensure all assertions are cleaned up properly
afterEach(() => {
  // Reset any timers or pending promises
  vi.clearAllTimers();
});
