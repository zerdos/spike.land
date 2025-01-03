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

  private formatMessageContent(content: MessageContent) {
    if (typeof content === "string") {
      return content;
    } else if (Array.isArray(content)) {
      return content.map((item) => {
        if (item.type === "image") {
          return {
            type: "image",
            source: {
              type: "base64",
              media_type: item.source.media_type,
              data: item.source.data,
            },
          };
        } else {
          return item;
        }
      });
    }
    return content;
  }

  private async makeAPICall(
    endpoint: string,
    messages: Message[],
    model = ``,
  ): Promise<Response> {
    try {
      const formattedMessages = messages.slice(-5).map(({ role, content }) => ({
        role,
        content: this.formatMessageContent(content),
      }));

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
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response;
    } catch (error) {
      console.error("Error making API call:", error);
      throw error;
    }
  }

  private async handleStreamingResponse(
    endpoint: string,
    messages: Message[],
    onUpdate: (chunk: string) => void,
    model?: string,
  ): Promise<string> {
    try {
      this.config.setIsStreaming(true);
      const response = await this.makeAPICall(endpoint, messages, model);
      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Response body is not readable!");
      }

      let content = "";
      const decoder = new TextDecoder();
      const buffer = [];
      await reader.read().then(
        function processText({ done, value }): Promise<void> {
          if (done) {
            return Promise.resolve();
          }

          buffer.push(value);
          const chunk = decoder.decode(value, { stream: true });
          content += chunk;
          onUpdate(chunk);

          // Update the content in the UI

          // Process the next chunk
          return reader.read().then(processText);
        },
      );

      return content;

      // const throttleUpdate = (onUpdate, this.config.updateThrottleMs);

      // return content;
    } catch (error) {
      console.error("Error handling streaming response:", error);
      throw error;
    } finally {
      this.config.setIsStreaming(false);
    }
  }

  async sendToAI(
    type: AIEndpoint,
    messages: Message[],
    onUpdate: (chunk: string) => void,
  ): Promise<Message> {
    try {
      const endpoint = this.getEndpoint(type);

      const result = await this.handleStreamingResponse(
        endpoint,
        messages,
        onUpdate,
        type === "gpt4o" ? `gpt-4o` : "",
      );

      // Update context based on AI response
      this.contextManager.updateContext(
        "currentTask",
        extractCurrentTask(result),
      );
      this.contextManager.updateContext(
        "codeStructure",
        extractCodeStructure(result),
      );

      return {
        id: Date.now().toString(),
        role: "assistant",
        content: result,
      } as Message;
    } catch (error) {
      console.error("Error sending to AI:", error);
      throw error;
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

  prepareClaudeContent(
    content: string,
    messages: Message[],
    codeNow: string,
    codeSpace: string,
  ): string {
    const context = this.contextManager.getFullContext();
    const contextString = JSON.stringify(context, null, 2);

    if (
      messages.length === 0 ||
      codeNow !== messages[messages.length - 1]?.content
    ) {
      return `
Current project context:
${contextString}

${
        anthropicSystem({
          fileName: codeSpace,
          fileContent: codeNow,
          userPrompt: content,
        })
      }`;
    } else {
      return `
Current project context:
${contextString}

${reminder({ userPrompt: content })}`;
    }
  }
}
