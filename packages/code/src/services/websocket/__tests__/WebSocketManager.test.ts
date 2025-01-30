import { getCodeSpace } from "@/hooks/use-code-space";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CodeSessionBC } from "../../CodeSessionBc";
import { MessageHandlerService } from "../../message/MessageHandlerService";
import { ServiceWorkerManager } from "../../worker/ServiceWorkerManager";
import { WebSocketManager } from "../WebSocketManager";
import type { ICodeSession } from "@/lib/interfaces";

// Mock window.scrollTo for JSDOM
window.scrollTo = vi.fn();

// Mock BroadcastChannel
const mockPostMessage = vi.fn();
const mockClose = vi.fn();
let mockOnMessage: (event: MessageEvent<ICodeSession>) => void = () => {};

global.BroadcastChannel = vi.fn().mockImplementation(() => ({
  postMessage: mockPostMessage,
  close: mockClose,
  set onmessage(handler: (event: MessageEvent<ICodeSession>) => void) {
    mockOnMessage = handler;
  },
  get onmessage() {
    return mockOnMessage;
  },
}));

// Mock dependencies 
vi.mock("@/hooks/use-code-space", () => ({
  getCodeSpace: vi.fn().mockReturnValue("test-space"),
}));

vi.mock("@/lib/tw-dev-setup", () => ({
  init: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/hydrate", () => ({
  initializeApp: vi.fn().mockResolvedValue(undefined),
  renderPreviewWindow: vi.fn().mockResolvedValue(undefined),
}));

vi.mock("@/lib/errors", () => ({
  DOMError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "DOMError";
    }
  },
  WebSocketError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "WebSocketError";
    }
  },
  MessageHandlingError: class extends Error {
    constructor(message: string) {
      super(message);
      this.name = "MessageHandlingError";
    }
  },
  getErrorMessage: vi.fn(error => error?.message || String(error)),
}));

vi.mock("../../message/MessageHandlerService");
vi.mock("../../worker/ServiceWorkerManager");

// Create mock session
const createMockSession = (codeSpace: string): ICodeSession => ({
  html: "<div>test</div>",
  css: ".test{}",
  code: "",
  transpiled: "",
  codeSpace,
  messages: [],
});

// Mock sanitizeSession
vi.mock("@/lib/make-sess", () => ({
  sanitizeSession: vi.fn().mockImplementation(data => data),
}));

// Mock implementation for CodeSessionBC
class MockCodeSessionBC extends CodeSessionBC {
  constructor(codeSpace: string, initialSession?: ICodeSession) {
    super(codeSpace, initialSession || createMockSession(codeSpace));
    
    // Mock methods
    this.init = vi.fn().mockImplementation(async (session?: ICodeSession) => {
      const result = session || this.session || createMockSession(codeSpace);
      this.session = result;
      return result;
    });
  }

  // Override to make testing easier
  sub(callback: (session: ICodeSession) => void): () => void {
    const unsub = super.sub(callback);
    // Trigger initial callback
    setTimeout(() => {
      if (this.session) {
        callback(this.session);
      }
    }, 0);
    return unsub;
  }
}

vi.mock("../../CodeSessionBc", () => ({
  CodeSessionBC: vi.fn().mockImplementation((codeSpace: string, session?: ICodeSession) => new MockCodeSessionBC(codeSpace, session)),
}));

describe("WebSocketManager", () => {
  let webSocketManager: WebSocketManager;
  let mockMessageHandler: MessageHandlerService;
  let mockServiceWorker: ServiceWorkerManager;
  let originalLocation: Location;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    mockOnMessage = () => {}; // Reset to empty function

    // Save original location
    originalLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      pathname: "/test-path",
    } as Location;

    const expectedResult = { html: "<div>test</div>", css: ".test{}" };
    
    // Setup mocks
    mockMessageHandler = {
      handleMessage: vi.fn(),
      handleRunMessage: vi.fn().mockImplementation(async () => expectedResult),
      cleanup: vi.fn(),
    } as unknown as MessageHandlerService;

    mockServiceWorker = {
      setup: vi.fn().mockResolvedValue(undefined),
    } as unknown as ServiceWorkerManager;

    vi.mocked(MessageHandlerService).mockImplementation(() => mockMessageHandler);
    vi.mocked(ServiceWorkerManager).mockImplementation(() => mockServiceWorker);

    webSocketManager = new WebSocketManager();
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.useRealTimers();
    window.onmessage = null;
  });

  it("should initialize with default path", async () => {
    await webSocketManager.init();

    expect(getCodeSpace).toHaveBeenCalledWith("/test-path");
    expect(CodeSessionBC).toHaveBeenCalled();
    const mockCodeSessionBC = vi.mocked(CodeSessionBC).mock.results[0].value;
    expect(mockCodeSessionBC.init).toHaveBeenCalled();
    expect(mockCodeSessionBC.subscribers).toHaveLength(1); // One subscriber added
    expect(window.onmessage).toBeDefined(); // Window message handler set
  });

  it("should handle live page path", async () => {
    window.location.pathname = "/live/test-space";
    await webSocketManager.init();

    const { init: twInit } = await import("@/lib/tw-dev-setup");
    expect(twInit).toHaveBeenCalled();
  });

  it("should handle live-cms path", async () => {
    window.location.pathname = "/live-cms/test-space";
    await webSocketManager.init();

    const { init: twInit } = await import("@/lib/tw-dev-setup");
    expect(twInit).toHaveBeenCalled();
  });

  it("should handle dehydrated page path", async () => {
    window.location.pathname = "/live/test-space/dehydrated";
    const mockEmbed = document.createElement("div");
    mockEmbed.id = "embed";
    document.body.appendChild(mockEmbed);

    await webSocketManager.init();
    vi.runAllTimers();
    
    expect(mockEmbed.innerHTML).toContain("<div>test</div>");
    expect(mockEmbed.innerHTML).toContain(".test{}");
  });

  it("should handle broadcast messages", async () => {
    await webSocketManager.init();
    
    const mockCodeSessionBC = vi.mocked(CodeSessionBC).mock.results[0].value;
    const updatedSession = createMockSession("test-space");
    updatedSession.html = "<div>updated</div>";
    
    // Simulate broadcast message
    mockOnMessage(new MessageEvent("message", { data: updatedSession }));
    vi.runAllTimers();
    
    expect(mockCodeSessionBC.session).toEqual(updatedSession);
  });

  it("should initialize service worker after delay", async () => {
    await webSocketManager.init();
    vi.runAllTimers();

    expect(mockServiceWorker.setup).toHaveBeenCalled();
  });

  it("should handle initialization error", async () => {
    // const error = new Error("Init error");

    vi.mock("@/lib/tw-dev-setup", () => ({
      init: async ()=> true
    }));

    await expect(webSocketManager.init()).rejects.toThrow("Failed to initialize WebSocket: Init error");

    vi.mock("@/lib/tw-dev-setup", () => ({
      init: ()=> Promise.resolve(true),
    }));

  });

  it("should handle run message", async () => {
    const result = await webSocketManager.handleRunMessage("const x = 1;");
    
    expect(mockMessageHandler.handleRunMessage).toHaveBeenCalledWith("const x = 1;");
    expect(result).toEqual({ html: "<div>test</div>", css: ".test{}" });
  });

  it("should handle run message failure", async () => {
    mockMessageHandler.handleRunMessage = vi.fn().mockResolvedValue(false);
    
    const result = await webSocketManager.handleRunMessage("invalid code");
    expect(result).toBe(false);
  });

  it("should cleanup message handler and window.onmessage", () => {
    // Set window.onmessage
    window.onmessage = () => {};

    webSocketManager.cleanup();
    
    expect(mockMessageHandler.cleanup).toHaveBeenCalled();
    expect(window.onmessage).toBeNull();
  });

  it("should handle dehydrated page DOM error", async () => {
    window.location.pathname = "/live/test-space/dehydrated";
    // Don't create embed element to trigger error
    
    await expect(webSocketManager.init()).rejects.toThrow("Embed element not found");
  });
});
