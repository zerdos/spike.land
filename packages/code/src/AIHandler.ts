import { AIService } from "./services/AIService";
import { LocalStorageService } from "./services/LocalStorageService";
import { Message } from "./types/Message";

export class AIHandler {
  private aiService: AIService;
  constructor(private codeSpace: string, aiService?: AIService) {
    this.codeSpace = codeSpace;
    const localStorageService = new LocalStorageService(this.codeSpace);
    this.aiService = aiService || new AIService(localStorageService);
  }

  async sendToAnthropic(messages: Message[], onUpdate: (code: string)=>void): Promise<Message> {
    return this.aiService.sendToAnthropic(messages, onUpdate);
  }

  async continueWithOpenAI(
    fullResponse: string,
    currentCode: string,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    isRetry = false,
  ): Promise<string | void> {
    return this.aiService.continueWithOpenAI(
      fullResponse,
      currentCode,
      onCodeUpdate,
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


