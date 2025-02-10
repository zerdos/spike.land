import type { Message } from "@/lib/interfaces";
import { anthropicSystem, reminder } from "../../config/aiConfig";

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
  private _codeSpace: string;

  constructor(config: AIServiceConfig, codeSpace: string) {
    this._config = config;
    this._codeSpace = codeSpace;
  }

  public async sendToAI(
    endpoint: "anthropic" | "gpt4o",
    messages: Message[],
    onUpdate: (code: string) => void
  ): Promise<Message> {
    this._config.setIsStreaming(true);

    try {
      const baseUrl = endpoint === "anthropic" 
        ? this._config.anthropicEndpoint 
        : this._config.gpt4oEndpoint;

      const response = await fetch(baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const reader = response.body?.getReader();
      if (!reader) throw new Error('No response body');

      let content = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = new TextDecoder().decode(value);
        content += chunk;
        onUpdate(content);
      }

      return {
        id: Math.random().toString(36).substring(7),
        role: "assistant",
        content
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Unknown error occurred');
    } finally {
      this._config.setIsStreaming(false);
    }
  }

  public async sendToAnthropic(
    messages: Message[],
    onUpdate: (code: string) => void
  ): Promise<Message> {
    return this.sendToAI("anthropic", messages, onUpdate);
  }

  public async sendToGpt4o(
    messages: Message[],
    onUpdate: (code: string) => void
  ): Promise<Message> {
    return this.sendToAI("gpt4o", messages, onUpdate);
  }

  public prepareClaudeContent(
    params: { content: string; messages: Message[]; codeNow: string; codeSpace: string }
  ): string {
    const { content, messages, codeNow, codeSpace } = params;

    // Check for error messages that should be passed through directly
    if (content.toLowerCase().startsWith("i'm sorry")) {
      return content;
    }

    const lastMessage = messages[messages.length - 1];
    
    // If codeNow is different from the last message or there are no messages,
    // use anthropic system content
    if (!lastMessage || lastMessage.content !== codeNow) {
      const result = anthropicSystem({
        fileName: codeSpace,
        fileContent: codeNow,
        userPrompt: content
      });
      return result;
    }
    
    // If code hasn't changed, return reminder content
    return reminder({
      userPrompt: content
    });
  }
}
