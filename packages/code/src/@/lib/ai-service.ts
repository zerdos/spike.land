import { anthropicSystem, reminder } from "@/lib/ai-config";
import type { Message } from "@/lib/interfaces";
import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";

export interface AIServiceConfig {
  anthropicEndpoint: string;
  openAIEndpoint: string;
  gpt4oEndpoint: string;
  updateThrottleMs: number;
  retryWithClaudeEnabled: boolean;
  setIsStreaming: (isStreaming: boolean) => void;
}

export class AIService {
  private _config: AIServiceConfig;

  constructor(config: AIServiceConfig) {
    this._config = config;
  }

  public async sendToAnthropic(
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    this._config.setIsStreaming(true);

    try {
      const client = new Anthropic({
        dangerouslyAllowBrowser: true,
        apiKey: 'DUMMY_API_KEY',
        baseURL: this._config.anthropicEndpoint,
      });

      const stream = await client.messages.create({
        max_tokens: 8192,
        messages: messages.map((message) => ({
          role: message.role === "system" ? "user" : message.role,
          content: message.content.toString(),
        })),
        model: "claude-3-5-sonnet-latest",
        stream: true,
      });

      let content = "";
      for await (const messageStreamEvent of stream) {
        if (
          "type" in messageStreamEvent &&
          messageStreamEvent.type === "content_block_delta" &&
          messageStreamEvent.delta.type === "text_delta"
        ) {
          const chunkContent = messageStreamEvent.delta.text;
          if (chunkContent) {
            content += chunkContent;
            onUpdate(chunkContent);
          }
       
        }
      }

      return {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    } finally {
      this._config.setIsStreaming(false);
    }
  }

  public async sendToGpt4o(
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    this._config.setIsStreaming(true);

    try {
      const client = new OpenAI({
        baseURL: this._config.gpt4oEndpoint,
        apiKey: 'DUMMY_API_KEY',
      });

      const stream = await client.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        messages: messages.map((message) => ({
          role: message.role === "system" ? "user" : message.role,
          content: message.content.toString(),
        })),
      });

      let content = "";
      for await (const chunk of stream) {
        const chunkContent = chunk.choices[0]?.delta?.content;
        if (chunkContent) {
          content += chunkContent;
          onUpdate(chunkContent);
        }
      }

      return {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Unknown error occurred");
    } finally {
      this._config.setIsStreaming(false);
    }
  }

  public prepareClaudeContent(
    params: { content: string; messages: Message[]; codeNow: string; codeSpace: string; },
  ): string {
    const { content, messages, codeNow, codeSpace } = params;

    // Check for error messages that should be passed through directly
    if (content.toLowerCase().startsWith("i'm sorry")) {
      return content;
    }

    const lastMessage = messages[messages.length - 1];

    // If codeNow is different from the last message or there are no messages,
    // use anthropic system content
    // if (!lastMessage || lastMessage.content !== codeNow) {
      const result = anthropicSystem({
        fileName: codeSpace+".tsx",
        fileContent: codeNow,
        userPrompt: content,
      });
      return result;
    // }

    // If code hasn't changed, return reminder content
    // return reminder({
    //   userPrompt: content,
    //   fileName: codeSpace+ ".tsx",
    //   fileContent: codeNow,
    // });
  }
}
