import type { Message } from "@/lib/interfaces";
import { AIService } from "./services/AIService";

export class AIHandler {
  private aiService: AIService;
  constructor(
    setIsStreaming: (isStreaming: boolean) => void = () => {},
    aiService?: AIService,
  ) {
    this.aiService = aiService || new AIService(
      {
        anthropicEndpoint: "/api/anthropic",
        openAIEndpoint: "/api/openai",
        gpt4oEndpoint: "/api/openai",
        updateThrottleMs: 1300,
        retryWithClaudeEnabled: true,
        setIsStreaming: setIsStreaming,
      },
    );
  }

  async sendToAnthropic(
    messages: Message[],
    onUpdate: (code: string) => void,
  ): Promise<Message> {
    // delete id-s from messages - they are not needed for Claude§
    const messagesToSend = messages.map((message) => {
      const { id: _id, ...rest } = message;
      return rest;
    }) as unknown as Message[];
    return this.aiService.sendToAnthropic(messagesToSend, onUpdate);
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
    return this.aiService.prepareClaudeContent({
      content,
      messages,
      codeNow: currentCode,
      codeSpace,
    });
  }
}
