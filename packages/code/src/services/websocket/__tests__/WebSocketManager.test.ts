import { getCodeSpace } from "@/hooks/use-code-space";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Code } from "../../CodeSession";
import { CodeSessionBC } from "../../CodeSessionBc";
import { MessageHandlerService } from "../../message/MessageHandlerService";
import { ServiceWorkerManager } from "../../worker/ServiceWorkerManager";
import { WebSocketManager } from "../WebSocketManager";

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

vi.mock("../../message/MessageHandlerService");
vi.mock("../../worker/ServiceWorkerManager");
vi.mock("../../CodeSession");
vi.mock("../../CodeSessionBc");

describe("WebSocketManager", () => {
  let webSocketManager: WebSocketManager;
  let mockMessageHandler: MessageHandlerService;
  let mockServiceWorker: ServiceWorkerManager;
  let mockCodeSessionBC: CodeSessionBC;
  let originalLocation: Location;
  let mockSub: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    // Save original location
    originalLocation = window.location;
    delete (window as any).location;
    window.location = {
      ...originalLocation,
      pathname: "/test-path",
    } as Location;

    // Setup mocks
    mockSub = vi.fn();
    mockMessageHandler = {
      handleMessage: vi.fn(),
      cleanup: vi.fn(),
    } as unknown as MessageHandlerService;

    mockServiceWorker = {
      setup: vi.fn().mockResolvedValue(undefined),
    } as unknown as ServiceWorkerManager;

    mockCodeSessionBC = {
      init: vi.fn().mockResolvedValue({}),
      sub: mockSub,
    } as unknown as CodeSessionBC;

    vi.mocked(MessageHandlerService).mockImplementation(() => mockMessageHandler);
    vi.mocked(ServiceWorkerManager).mockImplementation(() => mockServiceWorker);
    vi.mocked(CodeSessionBC).mockImplementation(() => mockCodeSessionBC);

    webSocketManager = new WebSocketManager();
  });

  afterEach(() => {
    window.location = originalLocation;
    vi.useRealTimers();
  });

  it("should initialize with default path", async () => {
    await webSocketManager.init();

    expect(getCodeSpace).toHaveBeenCalledWith("/test-path");
    expect(mockCodeSessionBC.init).toHaveBeenCalled();
    expect(mockSub).toHaveBeenCalled();
  });

  it("should handle live page path", async () => {
    window.location.pathname = "/live/test-space";
    const mockCode = {
      init: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(Code).mockImplementation(() => mockCode as any);

    await webSocketManager.init();

    const { initializeApp, renderPreviewWindow } = await import("@/lib/hydrate");
    expect(mockCode.init).toHaveBeenCalled();
    expect(initializeApp).toHaveBeenCalled();
    expect(renderPreviewWindow).toHaveBeenCalledWith({
      codeSpace: "test-space",
      cSess: mockCode,
      AppToRender: expect.any(Function),
    });
  });

  it("should handle dehydrated page path", async () => {
    window.location.pathname = "/live/test-space/dehydrated";
    const mockEmbed = document.createElement("div");
    mockEmbed.id = "embed";
    document.body.appendChild(mockEmbed);

    await webSocketManager.init();

    expect(mockSub).toHaveBeenCalled();
    const callback = mockSub.mock.calls[0][0];
    callback({ html: "<div>test</div>", css: ".test{}" });
    expect(mockEmbed.innerHTML).toContain("<div>test</div>");
    expect(mockEmbed.innerHTML).toContain(".test{}");
  });

  it("should initialize service worker after delay", async () => {
    await webSocketManager.init();
    vi.runAllTimers();

    expect(mockServiceWorker.setup).toHaveBeenCalled();
  });

  it("should handle initialization error", async () => {
    const error = new Error("Init error");
    vi.mocked(mockCodeSessionBC.init).mockRejectedValueOnce(error);

    await expect(webSocketManager.init()).rejects.toThrow(error);
  });

  it("should cleanup message handler", () => {
    webSocketManager.cleanup();
    expect(mockMessageHandler.cleanup).toHaveBeenCalled();
  });
});
