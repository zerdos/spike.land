import type { ICode, ImageData } from "@/lib/interfaces";
import type { Message } from "@/lib/interfaces";
import { cSessMock } from "@src/config/cSessMock";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as messageProcessing from "./messageProcessing";
import * as useAutoSave from "./useAutoSave";
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
  handleError: vi.fn(),
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
  };

  const mockProps: UseMessageHandlingProps = {
    codeSpace: "test-space" as const,
    messages: [],
    setMessages: vi.fn(),
    setInput: vi.fn(),
    setIsStreaming: vi.fn(),
    codeWhatAiSeen: "initial code",
    setAICode: vi.fn(),
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
    vi.spyOn(messageProcessing, "createNewMessage").mockResolvedValue(await Promise.resolve(mockNewMessage));
    vi.spyOn(useAutoSave, "useAutoSave").mockImplementation(() => Promise.resolve(new Response()));
    vi.spyOn(messageProcessing, "processMessage").mockImplementation(
      async ({ setMessages }) => {
        setMessages([mockNewMessage]);
        return true;
      },
    );

    const { result } = renderHook(() => useMessageHandling(mockProps));

    const testImages: ImageData[] = [mockImageData];

    await act(async () => {
      await result.current.handleSendMessage("Test message", testImages);
    });

    expect(mockProps.setInput).toHaveBeenCalledWith("");
    expect(messageProcessing.processMessage).toHaveBeenCalled();
    expect(mockProps.setMessages).toHaveBeenCalledWith([mockNewMessage]);
    expect(mockProps.setAICode).toHaveBeenCalledWith("test code");
  });

  it("should handle editing a message", () => {
    const messages: Message[] = [
      { id: "1", role: "user", content: [{ type: "text", text: "Test message" }] },
    ];
    const { result } = renderHook(() => useMessageHandling({ ...mockProps, messages }));

    act(() => {
      result.current.handleEditMessage("1");
    });

    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith("1");
    expect(mockProps.setEditInput).toHaveBeenCalledWith("Test message");
  });

  it("should handle cancelling edit", () => {
    const { result } = renderHook(() => useMessageHandling(mockProps));

    act(() => {
      result.current.handleCancelEdit();
    });

    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });

  it("should handle saving edit", () => {
    const messages = [
      { id: "1", role: "user", content: [{ type: "text", text: "Original message" }] } as Message,
    ];
    const { result } = renderHook(() =>
      useMessageHandling({
        ...mockProps,
        messages,
        editInput: "Edited message",
      })
    );

    act(() => {
      result.current.handleSaveEdit("1");
    });

    expect(mockProps.setMessages).toHaveBeenCalledWith([
      { id: "1", role: "user", content: [{ type: "text", text: "Edited message" }] },
    ]);
    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });

  it("should handle saving edit for message with array content", () => {
    const messages = [
      { id: "1", role: "user", content: [{ type: "text", text: "Original message" }] } as Message,
    ];
    const { result } = renderHook(() =>
      useMessageHandling({
        ...mockProps,
        messages,
        editInput: "Edited message",
      })
    );

    act(() => {
      result.current.handleSaveEdit("1");
    });

    expect(mockProps.setMessages).toHaveBeenCalledWith([
      { id: "1", role: "user", content: [{ type: "text", text: "Edited message" }] },
    ]);
    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });
});
