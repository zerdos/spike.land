import "@testing-library/jest-dom";
import { TextDecoder, TextEncoder } from "text-encoding";
import type { Mock } from "vitest";
import { vi } from "vitest";

// Add type definitions for ResizeObserver
declare global {
  interface Global {
    ResizeObserver: Mock;
  }

  // const TextEncoder: typeof TextEncoder;
  // const TextDecoder: typeof TextDecoder;
}

globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

globalThis.TextEncoder = TextEncoder;
globalThis.TextDecoder = TextDecoder;

const VI_TEST = true;
process.env.VI_TEST = VI_TEST.toString();
Object.assign(globalThis, { VI_TEST });
