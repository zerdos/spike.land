import { AIHandler } from "@src/AIHandler";
import type { Message } from "@src/types/Message";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import * as sharedModule from "../shared";
import * as chatUtils from "../utils/chatUtils";
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

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();
Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("useMessageHandling", () => {
  const mockProps = {
    codeSpace: "test-space",
    messages: [],
    setMessages: vi.fn(),
    setInput: vi.fn(),
    setIsStreaming: vi.fn(),
    codeWhatAiSeen: "initial code",
    setAICode: vi.fn(),
    saveMessages: vi.fn(),
    editingMessageId: null,
    setEditingMessageId: vi.fn(),
    editInput: "",
    setEditInput: vi.fn(),
    cSess: { session: { code: "initial code" } },
    broadcastChannel: { current: null },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should handle sending a message", async () => {
    const { result } = renderHook(() => useMessageHandling(mockProps));

    // Mock AIHandler methods
    const mockPrepareClaudeContent = vi.fn().mockReturnValue(
      "prepared content",
    );
    const mockSendToAnthropic = vi.fn().mockResolvedValue({
      id: "1",
      role: "assistant",
      content: "Assistant response",
    });

    AIHandler.prototype.prepareClaudeContent = mockPrepareClaudeContent;
    AIHandler.prototype.sendToAnthropic = mockSendToAnthropic;

    // Mock updateSearchReplace
    vi.mocked(chatUtils.updateSearchReplace).mockReturnValue("updated code");

    // Mock prettierToThrow
    vi.mocked(sharedModule.prettierToThrow).mockResolvedValue("formatted code");

    await act(async () => {
      await result.current.handleSendMessage("Test message", "");
    });

    expect(mockProps.setInput).toHaveBeenCalledWith("");
    expect(mockProps.setIsStreaming).toHaveBeenCalledWith(true);
    expect(mockProps.saveMessages).toHaveBeenCalled();
    // expect(mockSendToAnthropic).toHaveBeenCalled();
    // expect(vi.mocked(runner)).toHaveBeenCalledWith("formatted code");
  });

  it("should handle resetting chat", () => {
    const { result } = renderHook(() => useMessageHandling(mockProps));

    act(() => {
      result.current.handleResetChat();
    });

    expect(mockProps.setMessages).toHaveBeenCalledWith([]);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith(
      "chatMessages-test-space",
    );
  });

  it("should handle resetting chat", () => {
    const { result } = renderHook(() => useMessageHandling(mockProps));

    act(() => {
      result.current.handleResetChat();
    });

    expect(mockProps.setMessages).toHaveBeenCalledWith([]);
    expect(localStorage.removeItem).toHaveBeenCalledWith(
      "chatMessages-test-space",
    );
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
    expect(mockProps.saveMessages).toHaveBeenCalled();
    expect(mockProps.setEditingMessageId).toHaveBeenCalledWith(null);
    expect(mockProps.setEditInput).toHaveBeenCalledWith("");
  });
});
