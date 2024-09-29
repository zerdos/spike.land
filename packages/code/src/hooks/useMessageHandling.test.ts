import type { Message } from "@/lib/interfaces";
import type { ICode } from "@/lib/interfaces";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMessageHandling } from "./useMessageHandling";

vi.mock("@src/AIHandler");
vi.mock("@src/hooks/useAutoSave", () => ({
  useAutoSave: vi.fn(),
}));

describe("useMessageHandling", () => {
  const mockSetMessages = vi.fn();
  const mockSetInput = vi.fn();
  const mockSetIsStreaming = vi.fn();
  const mockSetAICode = vi.fn();
  const mockSetEditingMessageId = vi.fn();
  const mockSetEditInput = vi.fn();

  const mockCSess: ICode = {
    session: {
      code: "initial code",
    },
    setCode: vi.fn(),
  } as Partial<ICode>;

  const defaultProps = {
    codeSpace: "testCodeSpace",
    messages: [],
    setMessages: mockSetMessages,
    setInput: mockSetInput,
    setIsStreaming: mockSetIsStreaming,
    codeWhatAiSeen: "",
    setAICode: mockSetAICode,
    editingMessageId: null,
    setEditingMessageId: mockSetEditingMessageId,
    editInput: "",
    setEditInput: mockSetEditInput,
    cSess: mockCSess,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // Increase timeout to 30 seconds for this specific test

  it("should handle editing a message", () => {
    const messages = [{
      id: "message-id",
      role: "user" as const,
      content: [{ type: "text", text: "Original content" }],
    }] as Message[];
    const { result } = renderHook(() => useMessageHandling({ ...defaultProps, messages }));

    act(() => {
      result.current.handleEditMessage("message-id");
    });

    expect(mockSetEditingMessageId).toHaveBeenCalledWith("message-id");
    expect(mockSetEditInput).toHaveBeenCalledWith("Original content");
  });

  it("should handle canceling edit", () => {
    const { result } = renderHook(() => useMessageHandling(defaultProps));

    act(() => {
      result.current.handleCancelEdit();
    });

    expect(mockSetEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockSetEditInput).toHaveBeenCalledWith("");
  });

  it("should handle saving edit", () => {
    const messages = [
      { id: "message-1", role: "user" as const, content: [{ type: "text", text: "Original content" }] },
    ] as Message[];
    const { result } = renderHook(() => useMessageHandling({ ...defaultProps, messages, editInput: "Edited content" }));

    act(() => {
      result.current.handleSaveEdit("message-1");
    });

    expect(mockSetMessages).toHaveBeenCalledWith([
      { id: "message-1", role: "user", content: [{ type: "text", text: "Edited content" }] },
    ]);
    expect(mockSetEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockSetEditInput).toHaveBeenCalledWith("");
  });
});
