import { cSessMock } from "@src/config/cSessMock";
import type { Message } from "@src/types/Message";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMessageHandling } from "./useMessageHandling";

// Mock dependencies
vi.mock("@src/AIHandler");
vi.mock("@src/services/runner");
vi.mock("../utils/chatUtils");
vi.mock("./useAutoSave", () => ({
  useAutoSave: vi.fn(),
}));
vi.mock("../shared", () => ({
  ...vi.importActual("../shared"),
  prettierToThrow: vi.fn(),
}));

describe("useMessageHandling", () => {
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
    cSess: cSessMock,
    setCodeWhatAiSeen: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle editing a message", () => {
    const messages: Message[] = [
      { id: "1", role: "user" as const, content: "Test message" },
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
    expect(mockProps.setMessages).toHaveBeenCalled();
    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });
});
