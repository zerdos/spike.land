import { AssistantUIChat } from "@/components/app/assistant-ui-chat";
import { Thread } from "@/components/assistant-ui/thread";
import type { ImageData } from "@/lib/interfaces";
import {
  AssistantRuntimeProvider,
  type ComposerRuntime,
  type ThreadRuntime,
  useThreadRuntime,
} from "@assistant-ui/react";
import { useChatRuntime } from "@assistant-ui/react-ai-sdk";
import { render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Message interface for tests
interface Message {
  id: string;
  role: "user" | "assistant" | "system" | "data" | "tool";
  content: string;
  tool_calls?: Array<{
    id: string;
    type: string;
    function: {
      name: string;
      arguments: string;
    };
  }>;
  tool_call_id?: string;
}

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
        initialMessages={[]}
      />,
    );

    expect(Thread).toHaveBeenCalled();
  });

  it("should create runtime with correct API endpoint", () => {
    const codeSpace = "my-test-space";

    render(
      <AssistantUIChat
        codeSpace={codeSpace}
        initialMessages={[]}
      />,
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
      { id: "3", role: "data", content: "Should be filtered" },
      { id: "4", role: "system", content: "System message" },
    ];

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={messages}
      />,
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
      />,
    );

    expect(AssistantRuntimeProvider).toHaveBeenCalled();
    const mockAssistantRuntimeProvider = vi.mocked(AssistantRuntimeProvider);
    const callArgs = mockAssistantRuntimeProvider.mock.calls[0]?.[0];
    expect(callArgs?.runtime).toBe(mockRuntime);
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
      />,
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
      />,
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
      />,
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
          url: "http://example.com/design1.png",
          mediaType: "image/png",
          data: "test1",
          type: "image",
        },
        {
          src: "data:image/png;base64,test2",
          imageName: "design2.png",
          url: "http://example.com/design2.png",
          mediaType: "image/png",
          data: "test2",
          type: "image",
        },
      ] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith("Analyze this design");
    expect(mockComposerRuntime.send).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith(
      "Images detected in initial prompt:",
      initialPrompt.images,
    );

    consoleSpy.mockRestore();
  });

  it("should not send empty initial prompt", () => {
    const initialPrompt = {
      prompt: "",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />,
    );

    // Should not send empty prompts
    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not send whitespace-only prompts", () => {
    const initialPrompt = {
      prompt: "   \n\t  ",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />,
    );

    // Should not send whitespace-only prompts
    expect(mockComposerRuntime.setText).not.toHaveBeenCalled();
    expect(mockComposerRuntime.send).not.toHaveBeenCalled();
  });

  it("should not send if thread runtime is not available", () => {
    vi.mocked(useThreadRuntime).mockReturnValueOnce(null as unknown as ThreadRuntime);

    const initialPrompt = {
      prompt: "Test prompt",
      images: [] as ImageData[],
    };

    render(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
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
      />,
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
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledTimes(1);
    expect(mockComposerRuntime.send).toHaveBeenCalledTimes(1);

    // Re-render with same props
    rerender(
      <AssistantUIChat
        codeSpace="test-space"
        initialMessages={[]}
        initialPrompt={initialPrompt}
      />,
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
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(
      'Create a "Hello, World!" app with <script> tags & emojis 🎉',
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
      />,
    );

    expect(mockComposerRuntime.setText).toHaveBeenCalledWith(longPrompt);
    expect(mockComposerRuntime.send).toHaveBeenCalled();
  });

  describe("tool call messages", () => {
    it("should handle messages with tool calls", () => {
      const messagesWithToolCalls: Message[] = [
        {
          id: "1",
          role: "user",
          content: "Calculate the weather forecast",
        },
        {
          id: "2",
          role: "assistant",
          content: "I'll help you with the weather forecast.",
          tool_calls: [
            {
              id: "tool_1",
              type: "function",
              function: {
                name: "get_weather",
                arguments: JSON.stringify({ location: "New York", units: "fahrenheit" }),
              },
            },
          ],
        },
        {
          id: "3",
          role: "tool",
          content: JSON.stringify({ temperature: 72, condition: "sunny" }),
          tool_call_id: "tool_1",
        },
        {
          id: "4",
          role: "assistant",
          content: "The weather in New York is 72°F and sunny.",
        },
      ];

      render(
        <AssistantUIChat
          codeSpace="test-space"
          initialMessages={messagesWithToolCalls}
        />,
      );

      // Should filter out tool messages (role: "tool") but keep others
      expect(vi.mocked(useChatRuntime)).toHaveBeenCalledWith(
        expect.objectContaining({
          initialMessages: expect.arrayContaining([
            expect.objectContaining({ id: "1", role: "user" }),
            expect.objectContaining({ id: "2", role: "assistant" }),
            expect.objectContaining({ id: "4", role: "assistant" }),
          ]),
        }),
      );
    });

    it("should handle multiple tool calls in a single message", () => {
      const messagesWithMultipleTools: Message[] = [
        {
          id: "1",
          role: "assistant",
          content: "Let me gather multiple pieces of information.",
          tool_calls: [
            {
              id: "tool_1",
              type: "function",
              function: {
                name: "get_weather",
                arguments: JSON.stringify({ location: "Tokyo" }),
              },
            },
            {
              id: "tool_2",
              type: "function",
              function: {
                name: "get_time",
                arguments: JSON.stringify({ timezone: "Asia/Tokyo" }),
              },
            },
            {
              id: "tool_3",
              type: "function",
              function: {
                name: "search_restaurants",
                arguments: JSON.stringify({ location: "Tokyo", cuisine: "sushi" }),
              },
            },
          ],
        },
      ];

      render(
        <AssistantUIChat
          codeSpace="test-space"
          initialMessages={messagesWithMultipleTools}
        />,
      );

      expect(vi.mocked(useChatRuntime)).toHaveBeenCalledWith(
        expect.objectContaining({
          initialMessages: expect.arrayContaining([
            expect.objectContaining({
              id: "1",
              role: "assistant",
              tool_calls: expect.arrayContaining([
                expect.objectContaining({
                  function: expect.objectContaining({ name: "get_weather" }),
                }),
                expect.objectContaining({
                  function: expect.objectContaining({ name: "get_time" }),
                }),
                expect.objectContaining({
                  function: expect.objectContaining({ name: "search_restaurants" }),
                }),
              ]),
            }),
          ]),
        }),
      );
    });

    it("should handle tool calls with complex arguments", () => {
      const complexArgs = {
        query: "machine learning papers",
        filters: {
          yearRange: { start: 2020, end: 2024 },
          authors: ["John Doe", "Jane Smith"],
          topics: ["neural networks", "transformers"],
        },
        limit: 50,
        sortBy: "relevance",
      };

      const messagesWithComplexTools: Message[] = [
        {
          id: "1",
          role: "assistant",
          content: "Searching for papers...",
          tool_calls: [
            {
              id: "tool_1",
              type: "function",
              function: {
                name: "search_papers",
                arguments: JSON.stringify(complexArgs),
              },
            },
          ],
        },
      ];

      render(
        <AssistantUIChat
          codeSpace="test-space"
          initialMessages={messagesWithComplexTools}
        />,
      );

      expect(vi.mocked(useChatRuntime)).toHaveBeenCalledWith(
        expect.objectContaining({
          initialMessages: expect.arrayContaining([
            expect.objectContaining({
              tool_calls: expect.arrayContaining([
                expect.objectContaining({
                  function: expect.objectContaining({
                    arguments: JSON.stringify(complexArgs),
                  }),
                }),
              ]),
            }),
          ]),
        }),
      );
    });

    it("should handle tool error responses", () => {
      const messagesWithToolError: Message[] = [
        {
          id: "1",
          role: "assistant",
          content: "Let me check that for you.",
          tool_calls: [
            {
              id: "tool_1",
              type: "function",
              function: {
                name: "database_query",
                arguments: JSON.stringify({ query: "SELECT * FROM users" }),
              },
            },
          ],
        },
        {
          id: "2",
          role: "tool",
          content: JSON.stringify({
            error: "Database connection failed",
            code: "DB_CONNECTION_ERROR",
            details: "Unable to connect to database server",
          }),
          tool_call_id: "tool_1",
        },
        {
          id: "3",
          role: "assistant",
          content: "I encountered an error while accessing the database.",
        },
      ];

      render(
        <AssistantUIChat
          codeSpace="test-space"
          initialMessages={messagesWithToolError}
        />,
      );

      // Tool messages should be filtered out
      const calls = vi.mocked(useChatRuntime).mock.calls[0]?.[0] as { initialMessages: Message[] };
      expect(calls?.initialMessages).toHaveLength(2); // Only assistant messages
      expect(calls?.initialMessages).not.toContainEqual(
        expect.objectContaining({ role: "tool" }),
      );
    });

    it("should preserve message order with interleaved tool calls", () => {
      const interleavedMessages: Message[] = [
        {
          id: "1",
          role: "user",
          content: "What's the weather and time in multiple cities?",
        },
        {
          id: "2",
          role: "assistant",
          content: "I'll check the weather and time for you.",
          tool_calls: [
            {
              id: "tool_1",
              type: "function",
              function: {
                name: "get_weather",
                arguments: JSON.stringify({ location: "London" }),
              },
            },
          ],
        },
        {
          id: "3",
          role: "tool",
          content: JSON.stringify({ temperature: 15, condition: "cloudy" }),
          tool_call_id: "tool_1",
        },
        {
          id: "4",
          role: "assistant",
          content: "London is 15°C and cloudy. Let me check Paris next.",
          tool_calls: [
            {
              id: "tool_2",
              type: "function",
              function: {
                name: "get_weather",
                arguments: JSON.stringify({ location: "Paris" }),
              },
            },
          ],
        },
        {
          id: "5",
          role: "tool",
          content: JSON.stringify({ temperature: 18, condition: "sunny" }),
          tool_call_id: "tool_2",
        },
        {
          id: "6",
          role: "assistant",
          content: "Paris is 18°C and sunny.",
        },
      ];

      render(
        <AssistantUIChat
          codeSpace="test-space"
          initialMessages={interleavedMessages}
        />,
      );

      const calls = vi.mocked(useChatRuntime).mock.calls[0]?.[0] as { initialMessages: Message[] };
      // Should maintain order but filter out tool messages
      expect(calls?.initialMessages?.map((m: Message) => m.id)).toEqual(["1", "2", "4", "6"]);
    });
  });
});
