import { ContextManager } from "@/lib/context-manager";
import type { Message, MessageContent } from "@/lib/interfaces";
import { anthropicSystem, reminder } from "../config/aiConfig";
import { extractCodeStructure, extractCurrentTask } from "../utils/contextUtils";

export interface AIServiceConfig {
  gpt4oEndpoint: string;
  anthropicEndpoint: string;
  openAIEndpoint: string;
  updateThrottleMs: number;
  retryWithClaudeEnabled: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
}

type AIEndpoint = "gpt4o" | "anthropic" | "openAI";

export interface ClaudeContentParams {
  content: string;
  messages: Message[];
  codeNow: string;
  codeSpace: string;
}

const SYSTEM_CONSTANTS = {
  GPT4_MODEL: "gpt-4o",
  MAX_MESSAGES: 5,
  ERROR_MESSAGES: {
    MISTAKE_PREFIX: "I'm sorry, I might have made a mistake.",
  },
} as const;

interface FormattedMessage {
  role: Message["role"];
  content: MessageContent;
}

interface APIResponse {
  content: string;
  cleanup?: () => void;
}

class APIError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "APIError";
  }
}

export class AIService {
  private config: AIServiceConfig;
  private contextManager: ContextManager;

  constructor(config: AIServiceConfig, codeSpace: string) {
    this.config = config;

    this.contextManager = new ContextManager(codeSpace);
  }

  private getEndpoint(type: AIEndpoint): string {
    const endpointMap: Record<AIEndpoint, string> = {
      gpt4o: this.config.gpt4oEndpoint,
      anthropic: this.config.anthropicEndpoint,
      openAI: this.config.openAIEndpoint,
    };
    return endpointMap[type];
  }

  private formatMessageContent(content: MessageContent): MessageContent {
    if (typeof content === "string" || !Array.isArray(content)) {
      return content;
    }

    return content.map((item) => {
      if (item.type !== "image") {
        return item;
      }

      return {
        type: "image",
        source: {
          type: "base64",
          media_type: item.source.media_type,
          data: item.source.data,
        },
      };
    });
  }

  private formatMessages(messages: Message[]): FormattedMessage[] {
    return messages
      .slice(-SYSTEM_CONSTANTS.MAX_MESSAGES)
      .map(({ role, content }) => ({
        role,
        content: this.formatMessageContent(content),
      }));
  }

  private async makeAPICall(
    endpoint: string,
    messages: Message[],
    model = "",
  ): Promise<Response> {
    const formattedMessages = this.formatMessages(messages);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        stream: true,
        messages: formattedMessages,
        ...(model ? { model } : {}),
      }),
    });

    if (!response.ok) {
      throw new APIError(`HTTP error! status: ${response.status}`, response.status);
    }

    return response;
  }

  private async processStream(
    reader: ReadableStreamDefaultReader<Uint8Array>,
    onUpdate: (chunk: string) => void,
  ): Promise<string> {
    const decoder = new TextDecoder();
    let content = "";

    while (true) {
      const { done, value } = await reader.read();

      if (done) {
        break;
      }

      const chunk = decoder.decode(value, { stream: true });
      content += chunk;
      onUpdate(chunk);
    }

    return content;
  }

  private async handleStreamingResponse(
    endpoint: string,
    messages: Message[],
    onUpdate: (chunk: string) => void,
    model?: string,
  ): Promise<APIResponse> {
    this.config.setIsStreaming(true);

    try {
      const response = await this.makeAPICall(endpoint, messages, model);
      const reader = response.body?.getReader();

      if (!reader) {
        throw new APIError("Response body is not readable!");
      }

      const content = await this.processStream(reader, onUpdate);

      return {
        content,
        cleanup: () => this.config.setIsStreaming(false),
      };
    } catch (error) {
      this.config.setIsStreaming(false);
      throw error instanceof APIError ? error : new APIError(String(error));
    }
  }

  private updateContextFromResponse(content: string): void {
    this.contextManager.updateContext(
      "currentTask",
      extractCurrentTask(content),
    );
    this.contextManager.updateContext(
      "codeStructure",
      extractCodeStructure(content),
    );
  }

  private createResponseMessage(content: string): Message {
    return {
      id: Date.now().toString(),
      role: "assistant",
      content,
    };
  }

  private async processAIResponse(
    type: AIEndpoint,
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<string> {
    const endpoint = this.getEndpoint(type);
    const model = type === "gpt4o" ? SYSTEM_CONSTANTS.GPT4_MODEL : "";

    const { content } = await this.handleStreamingResponse(
      endpoint,
      messages,
      onUpdate,
      model,
    );

    return content;
  }

  async sendToAI(
    type: AIEndpoint,
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<Message> {
    try {
      const content = await this.processAIResponse(type, messages, onUpdate);
      this.updateContextFromResponse(content);
      return this.createResponseMessage(content);
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  async sendToGpt4o(
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<Message> {
    return this.sendToAI("gpt4o", messages, onUpdate);
  }

  async sendToAnthropic(
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<Message> {
    return this.sendToAI("anthropic", messages, onUpdate);
  }

  prepareClaudeContent(params: ClaudeContentParams): string {
    const { content = "", messages = [], codeNow = "", codeSpace = "" } = params;

    if (content && content.startsWith(SYSTEM_CONSTANTS.ERROR_MESSAGES.MISTAKE_PREFIX)) {
      return content;
    }

    const isFirstMessage = messages.length === 0;
    const lastMessage = messages[messages.length - 1];
    const isSameCode = !isFirstMessage && lastMessage && lastMessage.content === codeNow;

    return isSameCode
      ? reminder({ userPrompt: content })
      : anthropicSystem({
        fileName: codeSpace,
        fileContent: codeNow,
        userPrompt: content,
      });
  }
}
