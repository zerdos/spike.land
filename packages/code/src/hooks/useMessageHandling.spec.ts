import { cSessMock } from "@src/config/cSessMock";
import type { Message } from "@src/types/Message";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as messageProcessing from "./messageProcessing";
import * as useAutoSave from "./useAutoSave";
import { useMessageHandling } from "./useMessageHandling";

// Mock dependencies
vi.mock("@src/AIHandler", () => ({
  AIHandler: vi.fn(() => ({
    prepareClaudeContent: vi.fn().mockReturnValue("mocked claude content"),
  })),
}));
vi.mock("@src/services/runner");
vi.mock("./messageProcessing", () => ({
  createNewMessage: vi.fn((content, isSystem) => ({
    id: "mock-id",
    role: isSystem ? "system" : "user",
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
  const mockCsess = {
    ...cSessMock,
    session: {
      ...cSessMock.session,
      code: "test code",
    },
    broadCastSessChanged: vi.fn(),
    setCode: vi.fn(),
    sub: vi.fn(),
  };

  const mockProps = {
    codeSpace: "test-space",
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
    setCodeWhatAiSeen: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle sending a message", async () => {
    const mockNewMessage: Message = { id: "new-message-id", role: "user", content: "Test message" };
    vi.spyOn(messageProcessing, "createNewMessage").mockResolvedValue(mockNewMessage);
    vi.spyOn(useAutoSave, "useAutoSave").mockImplementation(() => Promise.resolve(new Response()));
    vi.spyOn(messageProcessing, "processMessage").mockImplementation(async (_, __, ___, ____, setMessages) => {
      setMessages([mockNewMessage]);
      return true; // Return a boolean as expected by the real function
    });

    const { result } = renderHook(() => useMessageHandling(mockProps));

    await act(async () => {
      await result.current.handleSendMessage("Test message", "mock-screenshot-data");
    });

    expect(mockProps.setInput).toHaveBeenCalledWith("");
    expect(mockProps.setAICode).toHaveBeenCalledWith("test code");
    expect(messageProcessing.processMessage).toHaveBeenCalled();
    expect(mockProps.setMessages).toHaveBeenCalledWith([mockNewMessage]);
  });

  it("should handle editing a message", () => {
    const messages: Message[] = [
      { id: "1", role: "user", content: "Test message" },
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
      { id: "1", role: "user", content: "Original message" } as Message,
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
      { id: "1", role: "user", content: "Edited message" },
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
