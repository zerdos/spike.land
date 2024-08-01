import { AIService } from "./services/AIService";
import { Message } from "./types/Message";

class AIHandler {
  private aiService: AIService;

  constructor(private codeSpace: string, aiService?: AIService) {
    this.aiService = aiService || new AIService(codeSpace);
  }

  async sendMessage(messages: Message[]): Promise<Message> {
    return this.aiService.sendMessage(messages);
  }

  async continueConversation(
    fullResponse: string,
    currentCode: string,
    onCodeUpdate: (code: string) => void,
    setMessages: React.Dispatch<React.SetStateAction<Message[]>>,
    setAICode: (code: string) => void,
  ): Promise<string | void> {
    return this.aiService.continueConversation(
      fullResponse,
      currentCode,
      onCodeUpdate,
      setMessages,
      setAICode,
    );
  }

  prepareContent(
    content: string,
    messages: Message[],
    currentCode: string,
  ): string {
    return this.aiService.prepareContent(content, messages, currentCode, this.codeSpace);
  }
}

export default AIHandler;
