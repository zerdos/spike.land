import type { Message } from "@/lib/interfaces";

import { AIService } from "./services/AIService";

export class AIHandler {
  private aiService: AIService;
  private codeSpace: string;

  constructor(
    setIsStreaming: (isStreaming: boolean) => void,
    codeSpace: string,
    aiService?: AIService,
  ) {
    this.codeSpace = codeSpace;
    this.aiService = aiService || new AIService(
      {
        anthropicEndpoint: "/api/anthropic",
        openAIEndpoint: "/api/openai",
        gpt4oEndpoint: "/api/openai",
        updateThrottleMs: 1300,
        retryWithClaudeEnabled: true,
        setIsStreaming: (isStreaming: boolean) => setIsStreaming(isStreaming),
      },
      this.codeSpace,
    );
  }

  async sendToAnthropic(
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    return this.aiService.sendToAnthropic(messages, onUpdate);
  }

  async sendToGpt4o(
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    return this.aiService.sendToGpt4o(messages, onUpdate);
  }

  prepareClaudeContent(
    content: string,
    messages: Message[],
    currentCode: string,
    codeSpace: string,
  ): string {
    return this.aiService.prepareClaudeContent(
      { content, messages, codeNow: currentCode, codeSpace },
    );
  }
}
