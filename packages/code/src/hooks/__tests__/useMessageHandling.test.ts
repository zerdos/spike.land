import { ImageData, Message } from "@/lib/interfaces";
import { AIHandler } from "@src/AIHandler";
import { ICode } from "@src/cSess.interface";
import { act, renderHook } from "@testing-library/react-hooks";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useMessageHandling } from "../useMessageHandling";

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
  } as any;

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

  it("should handle sending a message with multiple images", async () => {
    const mockPrepareClaudeContent = vi.fn().mockReturnValue("prepared content");
    const mockSendToAnthropic = vi.fn().mockResolvedValue({
      id: "assistant-message-id",
      role: "assistant" as const,
      content: "Assistant response",
    });

    vi.mocked(AIHandler).mockImplementation(() => ({
      prepareClaudeContent: mockPrepareClaudeContent,
      sendToAnthropic: mockSendToAnthropic,
    } as any));

    const { result } = renderHook(() => useMessageHandling(defaultProps));

    const content = "Test message";
    const images: ImageData[] = [
      {
        imageName: "image1.jpg",
        url: "url1",
        src: "src1",
        mediaType: "image/jpeg",
        data: "data:image/jpeg;base64,image1data",
        type: "image/jpeg",
      },
      {
        imageName: "image2.png",
        url: "url2",
        src: "src2",
        mediaType: "image/png",
        data: "data:image/png;base64,image2data",
        type: "image/png",
      },
    ];

    await act(async () => {
      await result.current.handleSendMessage(content, images);
    });

    expect(mockPrepareClaudeContent).toHaveBeenCalledWith(content, [], "initial code", "testCodeSpace");
    expect(mockSendToAnthropic).toHaveBeenCalled();
    expect(mockSetMessages).toHaveBeenCalled();
    expect(mockSetInput).toHaveBeenCalledWith("");
    expect(mockSetAICode).toHaveBeenCalledWith("initial code");
  });

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
