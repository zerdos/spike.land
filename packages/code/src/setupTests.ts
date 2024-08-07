import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "text-encoding";

// Add type definitions for ResizeObserver
declare global {
  interface Global {
    ResizeObserver: jest.Mock;
  }

  var TextEncoder: typeof TextEncoder;
  var TextDecoder: typeof TextDecoder;
}

globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;
