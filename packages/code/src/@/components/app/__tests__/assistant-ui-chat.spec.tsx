import { AssistantUIChat } from "@/components/app/assistant-ui-chat";
import { Thread } from "@/components/assistant-ui/thread";
import type { ImageData } from "@/lib/interfaces";
import { render } from "@testing-library/react";
import {
  AssistantRuntimeProvider,
  useThreadRuntime,
  type ComposerRuntime,
  type ThreadRuntime,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import type { Message } from "ai";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock dependencies
vi.mock("@assistant-ui/react", () => ({
  AssistantRuntimeProvider: vi.fn(({ children }) => children),
  useThreadRuntime: vi.fn(),
}));

vi.mock("@assistant-ui/react-ai-sdk", () => ({
  useChatRuntime: vi.fn(),
}));

vi.mock("@/components/assistant-ui/thread", () => ({
  Thread: vi.fn(() => <div data-testid="thread">Thread Component</div>),
}));

// Mock composer runtime
const mockComposerRuntime: ComposerRuntime = {
  setText: vi.fn(),
  send: vi.fn(),
  setRole: vi.fn(),
  setRunConfig: vi.fn(),
  reset: vi.fn(),
  clearAttachments: vi.fn(),
  addAttachment: vi.fn(),
  cancel: vi.fn(),
  getState: vi.fn(),
  getAttachmentAccept: vi.fn(),
  subscribe: vi.fn(),
  getAttachmentByIndex: vi.fn(),
  path: { composerSource: "thread" },
  type: "thread",
} as unknown as ComposerRuntime;

// Mock thread runtime
const mockThreadRuntime: ThreadRuntime = {
  composer: mockComposerRuntime,
  getState: vi.fn(),
  subscribe: vi.fn(),
  append: vi.fn(),
  startRun: vi.fn(),
  cancelRun: vi.fn(),
  addToolResult: vi.fn(),
  speak: vi.fn(),
  getSubmittedFeedback: vi.fn(),
  submitFeedback: vi.fn(),
  getModelConfig: vi.fn(),
  path: { ref: "main", threadId: "test-thread" },
  messages: [],
  getBranch: vi.fn(),
  switchToBranch: vi.fn(),
  deleteBranch: vi.fn(),
  submitUserMessage: vi.fn(),
  deleteMessage: vi.fn(),
  reload: vi.fn(),
  isLoading: false,
  isDisabled: false,
  unstable_on: vi.fn(),
  capabilities: {
    cancel: true,
    reload: true,
    copy: true,
    speak: true,
    feedback: true,
    edit: true,
    unstable_submitFeedback: true,
    unstable_switchToBranch: true,
    attachments: true,
  },
  extras: undefined,
  speech: null,
} as unknown as ThreadRuntime;

describe("AssistantUIChat", () => {
  const mockRuntime = { mock: "runtime" };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useChatRuntime).mockReturnValue(mockRuntime as any);
    vi.mocked(useThreadRuntime).mockReturnValue(mockThreadRuntime);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should render Thread component", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
      />
    );

    expect(Thread).toHaveBeenCalled();
  });

  it("should create runtime with correct API endpoint", () => {
    const codeSpace = "my-test-space";
    
    render(
      <AssistantUIChat
        codeSpace={codeSpace}
        initialMessages={[]}
      />
    );

    expect(useChatRuntime).toHaveBeenCalledWith({
      api: `/live/${codeSpace}/messages`,
      initialMessages: [],
    });
  });

  it("should filter out messages with data role", () => {
    const messages: Message[] = [
      { id: "1", role: "user", content: "Hello" },
      { id: "2", role: "assistant", content: "Hi" },
      { id: "3", role: "data", content: "Should be filtered" } as any,
      { id: "4", role: "system", content: "System message" },
    ];

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={messages}
      />
    );

    expect(useChatRuntime).toHaveBeenCalledWith({
      api: "/live/test-space/messages",
      initialMessages: [
        { id: "1", role: "user", content: "Hello" },
        { id: "2", role: "assistant", content: "Hi" },
        { id: "4", role: "system", content: "System message" },
      ],
    });
  });

  it("should provide runtime to AssistantRuntimeProvider", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
      />
    );

    expect(AssistantRuntimeProvider).toHaveBeenCalled();
    const callArgs = (AssistantRuntimeProvider as any).mock.calls[0][0];
    expect(callArgs.runtime).toBe(mockRuntime);
  });

  it("should auto-send initial prompt when provided", () => {
    const initialPrompt = {
      prompt: "Create a weather app",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("Create a weather app");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  it("should not auto-send when initial prompt is null", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={null}
      />
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not auto-send when initial prompt is undefined", () => {
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={undefined}
      />
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should handle initial prompt with images", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    
    const initialPrompt = {
      prompt: "Analyze this design",
      images: [
        {
          src: "data:image/png;base64,test1",
          imageName: "design1.png",
        },
        {
          src: "data:image/png;base64,test2",
          imageName: "design2.png",
        },
      ] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("Analyze this design");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Images detected in initial prompt:",
      initialPrompt.images
    );

    consoleSpy.mockRestore();
  });

  it("should handle empty initial prompt", () => {
    const initialPrompt = {
      prompt: "",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  it("should not send if thread runtime is not available", () => {
    vi.mocked(useThreadRuntime).mockReturnValueOnce(null as any);

    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should handle runtime without composer gracefully", () => {
    const runtimeWithoutComposer = {
      ...mockThreadRuntime,
      composer: undefined,
    } as any;

    vi.mocked(useThreadRuntime).mockReturnValueOnce(runtimeWithoutComposer);

    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    // Should not throw, just won't send the message
    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    // Verify setText and send were not called since composer is undefined
    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should only send initial prompt once", () => {
    const initialPrompt = {
      prompt: "Send only once",
      images: [] as ImageData[],
    };

    const { rerender } = render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledTimes(1);
    expect(mockComposerRuntime.send).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    // Should not send again
    expect(mockComposerRuntime.setText).toHaveBeenCalledTimes(1);
    expect(mockComposerRuntime.send).toHaveBeenCalledTimes(1);
  });

  it("should handle special characters in prompt", () => {
    const initialPrompt = {
      prompt: 'Create a "Hello, World!" app with <script> tags & emojis 🎉',
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(
      'Create a "Hello, World!" app with <script> tags & emojis 🎉'
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
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(longPrompt);
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });
});