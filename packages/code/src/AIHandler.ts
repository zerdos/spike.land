import { AIService } from "./services/AIService";
import { LocalStorageService } from "./services/LocalStorageService";
import { Message } from "./types/Message";

export class AIHandler {
  private aiService: AIService;
  constructor(private codeSpace: string, aiService?: AIService) {
    this.codeSpace = codeSpace;
    const localStorageService = new LocalStorageService(this.codeSpace);
    this.aiService = aiService || new AIService(localStorageService, {
      anthropicEndpoint: "/api/anthropic",
      openAIEndpoint: "/api/openai",
      gpt4oEndpoint: "/api/openai",
      updateThrottleMs: 300,
      retryWithClaudeEnabled: true,
    });
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

  async continueWithOpenAI(
    fullResponse: string,
    currentCode: string,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    isRetry = false,
  ): Promise<string | void> {
    return this.aiService.continueWithOpenAI(
      fullResponse,
      currentCode,
      setMessages,
      setAICode,
      isRetry,
    );
  }

  prepareClaudeContent(
    content: string,
    messages: Message[],
    currentCode: string,
    codeSpace: string,
  ) {
    return this.aiService.prepareClaudeContent(
      content,
      messages,
      currentCode,
      codeSpace,
    );
  }
}
