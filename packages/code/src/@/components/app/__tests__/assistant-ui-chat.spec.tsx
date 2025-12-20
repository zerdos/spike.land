import { AssistantUIChat } from "@/components/app/assistant-ui-chat";
import { Thread } from "@/components/assistant-ui/thread";
import type { ImageData } from "@/lib/interfaces";
import {
  AssistantRuntimeProvider,
  type ComposerRuntime,
  type ThreadRuntime,
  useThreadRuntime,
} from "@assistant-ui/react";
import { AssistantChatTransport, useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@assistant-ui/react", () => ({
  AssistantRuntimeProvider: vi.fn(function AssistantRuntimeProvider({ children }: { children: React.ReactNode }) {
    return children;
  }),
  useThreadRuntime: vi.fn(),
}));

vi.mock("@assistant-ui/react-ai-sdk", () => ({
  useChatRuntime: vi.fn(),
  AssistantChatTransport: vi.fn(function AssistantChatTransport() {
    // Mock transport implementation
  }),
}));

vi.mock("@/components/assistant-ui/thread", () => ({
  Thread: vi.fn(function Thread() {
    return <div data-testid="thread">Thread Component</div>;
  }),
}));

// Create mock composer runtime
const mockComposerRuntime = {
  text: "",
  setText: vi.fn(),
  send: vi.fn(),
  cancel: vi.fn(),
  isEditing: false,
  canCancel: false,
  isEmpty: true,
  attachments: [],
  addAttachment: vi.fn(),
  removeAttachment: vi.fn(),
  reset: vi.fn(),
  value: "",
  setValue: vi.fn(),
  attachmentAccept: "*",
  attachmentsCount: 0,
} as unknown as ComposerRuntime;

// Create mock thread runtime
const mockThreadRuntime = {
  composer: mockComposerRuntime,
  messages: [],
  isDisabled: false,
  isRunning: false,
  append: vi.fn(),
  startRun: vi.fn(),
  cancelRun: vi.fn(),
  addToolResult: vi.fn(),
  speak: vi.fn(),
  stopSpeaking: vi.fn(),
  getModelConfig: vi.fn(),
  switchToBranch: vi.fn(),
  export: vi.fn(),
  import: vi.fn(),
  getState: vi.fn().mockReturnValue({
    messages: [],
    isRunning: false,
    isDisabled: false,
  }),
  subscribe: vi.fn(),
  capabilities: {
    edit: false,
    reload: false,
    cancel: true,
    unstable_copy: false,
    speech: false,
    attachments: false,
    feedback: false,
  },
  threadId: "test-thread",
  adapters: undefined,
  extras: undefined,
  speech: null,
} as unknown as ThreadRuntime;

describe("AssistantUIChat", () => {
  // Create a minimal mock runtime that satisfies the type requirements
  const mockRuntime = {
    thread: mockThreadRuntime,
    messages: [],
    setMessages: vi.fn(),
    append: vi.fn(),
    startRun: vi.fn(),
    cancelRun: vi.fn(),
    subscribe: vi.fn(),
  } as unknown as ReturnType<typeof useChatRuntime>;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useChatRuntime).mockReturnValue(mockRuntime);
    vi.mocked(useThreadRuntime).mockReturnValue(mockThreadRuntime);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render Thread component", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
      />,
    );

    expect(Thread).toHaveBeenCalled();
  });

  it("should create runtime with correct transport", () => {
    const codeSpace = "my-test-space";

    render(
      <AssistantUIChat
        codeSpace={codeSpace}
      />,
    );

    expect(useChatRuntime).toHaveBeenCalledWith(
      expect.objectContaining({
        transport: expect.any(Object),
      })
    );
  });

  it("should create transport with correct API endpoint", () => {
    const codeSpace = "my-test-space";

    render(
      <AssistantUIChat
        codeSpace={codeSpace}
      />,
    );

    expect(AssistantChatTransport).toHaveBeenCalledWith({
      api: `/live/${codeSpace}/messages`,
    });
  });

  it("should provide runtime to AssistantRuntimeProvider", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
      />,
    );

    expect(AssistantRuntimeProvider).toHaveBeenCalled();
    const mockFn = AssistantRuntimeProvider as unknown as ReturnType<typeof vi.fn>;
    const callArgs = mockFn.mock?.calls[0]?.[0];
    expect(callArgs).toHaveProperty("runtime", mockRuntime);
  });

  it("should auto-send initial prompt when provided", () => {
    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    // Initial send should be triggered after component mounts
    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("Test prompt");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  it("should not auto-send when initial prompt is null", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={null}
      />,
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not auto-send when initial prompt is undefined", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={undefined}
      />,
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should handle initial prompt with images", () => {
    const initialPrompt = {
      prompt: "Describe this image",
      images: [
        {
          url: "data:image/png;base64,abc123",
          src: "data:image/png;base64,abc123",
          imageName: "test.png",
          mediaType: "image/png",
          data: "abc123",
        },
      ] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("Describe this image");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  it("should not send empty initial prompt", () => {
    const initialPrompt = {
      prompt: "",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not send whitespace-only prompts", () => {
    const initialPrompt = {
      prompt: "   ",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not send if thread runtime is not available", () => {
    vi.mocked(useThreadRuntime).mockReturnValue(null as unknown as ThreadRuntime);

    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should handle runtime without composer gracefully", () => {
    const runtimeWithoutComposer = {
      ...mockThreadRuntime,
      composer: undefined,
    } as unknown as ThreadRuntime;

    vi.mocked(useThreadRuntime).mockReturnValue(runtimeWithoutComposer);

    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    // Should not throw, and no methods should be called since composer is undefined
    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should only send initial prompt once", () => {
    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    const { rerender } = render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    // Rerender with the same prompt
    rerender(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    // Should only be called once despite rerender
    expect(mockComposerRuntime.setText).toHaveBeenCalledTimes(1);
    expect(mockComposerRuntime.send).toHaveBeenCalledTimes(1);
  });

  it("should handle special characters in prompt", () => {
    const initialPrompt = {
      prompt: "Test with 'quotes' and \"double quotes\" and \n newlines",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(
      "Test with 'quotes' and \"double quotes\" and \n newlines",
    );
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  it("should handle very long prompts", () => {
    const longPrompt = "a".repeat(10000);
    const initialPrompt = {
      prompt: longPrompt,
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(longPrompt);
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });
});