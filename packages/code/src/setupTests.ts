import "@testing-library/jest-dom";

import { TextDecoder, TextEncoder } from "text-encoding";

globalThis.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

self.TextEncoder = TextEncoder;
self.TextDecoder = TextDecoder;
