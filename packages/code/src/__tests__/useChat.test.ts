import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useChat } from "../hooks/useChat";

// Mock the useLocalStorage hook
vi.mock("@uidotdev/usehooks", () => ({
  useLocalStorage: vi.fn((key, initialValue) => [initialValue, vi.fn()]),
}));

describe("useChat", () => {
  const codeSpace = "test-code-space";

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should initialize with empty messages and input", () => {
    const { result } = renderHook(() => useChat(codeSpace));

    expect(result.current.messages).toEqual([]);
    expect(result.current.input).toBe("");
    expect(result.current.isStreaming).toBe(true);
    expect(result.current.codeWhatAiSeen).toBe("");
    expect(result.current.editingMessageId).toBe(null);
    expect(result.current.editInput).toBe("");
  });

  it("should update input when setInput is called", () => {
    const { result } = renderHook(() => useChat(codeSpace));

    act(() => {
      result.current.setInput("New input");
    });

    expect(result.current.input).toBe("New input");
  });

  it("should update messages when setMessages is called", () => {
    const { result } = renderHook(() => useChat(codeSpace));
    const newMessages = [{ id: "1", role: "user", content: "Hello" }];

    act(() => {
      result.current.setMessages(newMessages);
    });

    expect(result.current.messages).toEqual(newMessages);
  });

  it("should reset chat when resetChat is called", () => {
    const { result } = renderHook(() => useChat(codeSpace));

    act(() => {
      result.current.setInput("Some input");
      result.current.setAICode("Some code");
      result.current.setEditingMessageId("123");
      result.current.setEditInput("Edit input");
      result.current.resetChat();
    });

    expect(result.current.messages).toEqual([]);
    expect(result.current.input).toBe("");
    expect(result.current.codeWhatAiSeen).toBe("");
    expect(result.current.editingMessageId).toBe(null);
    expect(result.current.editInput).toBe("");
  });
});
