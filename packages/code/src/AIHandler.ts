import { AIService } from "./services/AIService";
import { LocalStorageService } from "./services/LocalStorageService";
import { Message } from "./types/Message";

class AIHandler {
  private aiService: AIService;

  constructor(private codeSpace: string, aiService?: AIService) {
    const localStorageService = new LocalStorageService(codeSpace);
    this.aiService = aiService || new AIService(localStorageService);
  }

  async sendToAnthropic(messages: Message[]): Promise<Message> {
    return this.aiService.sendToAnthropic(messages);
  }

  async continueWithOpenAI(
    fullResponse: string,
    currentCode: string,
    nextCounter: number,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
    isRetry = false,
  ): Promise<string | void> {
    return this.aiService.continueWithOpenAI(
      fullResponse,
      currentCode,
      nextCounter,
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
    return this.aiService.prepareClaudeContent(content, messages, currentCode, this.codeSpace);
  }
}

export default AIHandler;
