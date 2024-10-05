import type { ICode, ImageData, Message } from "@/lib/interfaces";
import { cSessMock } from "@src/config/cSessMock";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as messageProcessing from "./messageProcessing";
import type { UseMessageHandlingProps } from "./useMessageHandling";
import { useMessageHandling } from "./useMessageHandling";

// Mock dependencies
vi.mock("@src/AIHandler", () => ({
  AIHandler: vi.fn(() => ({
    prepareClaudeContent: vi.fn().mockReturnValue("mocked claude content"),
  })),
}));
vi.mock("@src/services/runner");
vi.mock("./messageProcessing", () => ({
  createNewMessage: vi.fn((content: string | ImageData[]) => ({
    id: "mock-id",
    role: "user",
    content,
  })),
  processMessage: vi.fn(),
}));
vi.mock("./useAutoSave", () => ({
  useAutoSave: vi.fn(),
}));
vi.mock("../shared", () => ({
  ...vi.importActual("../shared"),
  prettierToThrow: vi.fn(),
}));

describe("useMessageHandling", () => {
  const mockImageData: ImageData = {
    imageName: "mock-screenshot.png",
    url: "https://example.com/mock-screenshot.png",
    src: "data:image/png;base64,mockedBase64Data",
    mediaType: "image/png",
    data: "mockedBase64Data",
    type: "image/png",
  };

  const mockCsess: ICode = {
    ...cSessMock,
    session: {
      ...cSessMock.session,
      code: "test code",
    },
    init: vi.fn(),
    setCode: vi.fn().mockResolvedValue("test code"),
    sub: vi.fn(),
    screenShot: vi.fn().mockResolvedValue(mockImageData),
    currentCodeWithExtraModels: vi.fn().mockResolvedValue("test code with extra models"),
    setModelsByCurrentCode: vi.fn().mockResolvedValue("updated code"),
    getCode: vi.fn().mockResolvedValue("test code"),
  };

  const mockProps: UseMessageHandlingProps = {
    codeSpace: "test-space",
    messages: [],
    setMessages: vi.fn(),
    setInput: vi.fn(),
    setIsStreaming: vi.fn(),
    editingMessageId: null,
    setEditingMessageId: vi.fn(),
    editInput: "",
    setEditInput: vi.fn(),
    cSess: mockCsess,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle sending a message", async () => {
    const mockNewMessage: Message = {
      id: "new-message-id",
      role: "user",
      content: [{ type: "text", text: "Test message" }],
    };
    vi.spyOn(messageProcessing, "createNewMessage").mockResolvedValue(mockNewMessage);
    vi.spyOn(messageProcessing, "processMessage").mockImplementation(
      async ({ setMessages }) => {
        setMessages([mockNewMessage]);
        return true;
      },
    );

    const { result } = renderHook(() => useMessageHandling(mockProps));

    await act(async () => {
      await result.current.handleSendMessage("Test message", [mockImageData]);
    });

    expect(mockProps.setInput).toHaveBeenCalledWith("");
    expect(messageProcessing.processMessage).toHaveBeenCalledWith(expect.objectContaining({
      aiHandler: expect.any(Object),
      cSess: mockCsess,
      codeNow: "test code",
      messages: expect.arrayContaining([mockNewMessage]),
      setMessages: expect.any(Function),
      newUserMessage: mockNewMessage,
    }));
    expect(mockProps.setMessages).toHaveBeenCalledWith([mockNewMessage]);
  });

  it("should handle error during message processing", async () => {
    const mockNewMessage: Message = {
      id: "new-message-id",
      role: "user",
      content: [{ type: "text", text: "Test message" }],
    };
    vi.spyOn(messageProcessing, "createNewMessage").mockResolvedValue(mockNewMessage);
    vi.spyOn(messageProcessing, "processMessage").mockImplementation(
      async () => {
        throw new Error("Processing error");
      },
    );

    const { result } = renderHook(() => useMessageHandling(mockProps));

    await act(async () => {
      await result.current.handleSendMessage("Test message", []);
    });

    expect(mockProps.setMessages).toHaveBeenCalledWith(
      expect.arrayContaining([
        mockNewMessage,
        expect.objectContaining({
          role: "assistant",
          content: expect.stringContaining("Sorry, there was an error processing your request"),
        }),
      ]),
    );
  });

  it("should not save edit for non-existent message", () => {
    const { result } = renderHook(() => useMessageHandling(mockProps));

    act(() => {
      result.current.handleSaveEdit("non-existent-id");
    });

    expect(mockProps.setMessages).toHaveBeenCalled();
    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });
});
