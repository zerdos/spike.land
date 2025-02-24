import "@testing-library/jest-dom";
import "url-polyfill";

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock Worker
class MockWorker implements Worker {
  onmessage: ((event: MessageEvent) => void) | null = null;
  onmessageerror: ((event: MessageEvent) => void) | null = null;
  onerror: ((error: ErrorEvent) => void) | null = null;

  constructor(
    private _stringUrl: string | URL,
    private options?: WorkerOptions,
  ) {
    console.log("MockWorker created:", this._stringUrl, this.options);

    // Constructor implementation
  }

  addEventListener(type: string, listener: EventListener): void {
    if (type === "message") {
      this.onmessage = listener as (event: MessageEvent) => void;
    } else if (type === "error") {
      this.onerror = listener as (error: ErrorEvent) => void;
    }
  }

  removeEventListener(type: string): void {
    if (type === "message") {
      this.onmessage = null;
    } else if (type === "error") {
      this.onerror = null;
    }
  }

  postMessage(data: unknown): void {
    if (this.onmessage) {
      const messageEvent = new MessageEvent("message", { data });
      this.onmessage(messageEvent);
    }
  }

  terminate(): void {
    this.onmessage = null;
    this.onerror = null;
  }

  dispatchEvent(): boolean {
    return true;
  }
}

// Mock SharedWorker
class MockSharedWorker implements SharedWorker {
  private url: string;
  private options: string | WorkerOptions;

  port: MessagePort = {
    onmessage: null,
    onmessageerror: null,
    close: vi.fn(),
    start: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn().mockReturnValue(true),
    postMessage: vi.fn(),
  };

  onerror: ((event: ErrorEvent) => void) | null = null;

  constructor(stringUrl: string | URL, options?: string | WorkerOptions) {
    this.url = stringUrl as string;
    this.options = options || "";
    // console.log("MockSharedWorker created:", this.url, this.options);
    // Constructor implementation
  }

  addEventListener(type: string, listener: EventListener): void {
    if (type === "error") {
      this.onerror = listener as (error: ErrorEvent) => void;
    }
  }

  removeEventListener(type: string, _listener: EventListener): void {
    if (type === "error") {
      this.onerror = null;
    }
  }

  dispatchEvent(_event: Event): boolean {
    return true;
  }
}

// Define type for Web Workers
declare global {
  interface Window {
    Worker: typeof MockWorker;
    SharedWorker: typeof MockSharedWorker;
  }
}

// Implement Web Worker mocks
window.Worker = MockWorker;
window.SharedWorker = MockSharedWorker;

// Mock Location API
const mockLocation = {
  href: "http://localhost:3000",
  pathname: "/",
  search: "",
  hash: "",
  assign: vi.fn(),
  replace: vi.fn(),
  reload: vi.fn(),
};

Object.defineProperty(window, "location", {
  value: mockLocation,
  writable: true,
});

// Define type for Navigation API
interface NavigationAPI {
  navigate: (url: string) => Promise<void>;
  reload: () => Promise<void>;
  traverseTo: (key: string) => Promise<void>;
  back: () => Promise<void>;
  forward: () => Promise<void>;
}

// Mock Navigation API when using JSDOM
declare global {
  interface Window {
    navigation: NavigationAPI;
  }
}

// Mock Navigation API
window.navigation = {
  navigate: vi.fn().mockResolvedValue(undefined),
  reload: vi.fn().mockResolvedValue(undefined),
  traverseTo: vi.fn().mockResolvedValue(undefined),
  back: vi.fn().mockResolvedValue(undefined),
  forward: vi.fn().mockResolvedValue(undefined),
};

// Mock ResizeObserver
class MockResizeObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
}

window.ResizeObserver = MockResizeObserver;
window.scrollTo = vi.fn();

// Mock fetch
global.fetch = vi.fn();

// Add Vitest beforeEach hook
import { beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.clearAllMocks();
  mockLocation.pathname = "/";
  mockLocation.search = "";
  mockLocation.hash = "";
});
