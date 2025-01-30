import { Message, MessageContent } from '@/lib/interfaces';
import { AIHandler } from '../services/ai/AIHandler';

export class ChatHandler {
  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  async handleMessage(message: Message) {
    try {
      if (!message.content) {
        throw new Error('Invalid message format');
      }
      await this.processMessage(message);
    } catch (error) {
      console.error('Error in handleMessage:', error);
      self.postMessage({
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }

  async processMessage(message: Message) {
    try {
      if (!AIHandler.validateContent(message.content)) {
        throw new Error('Invalid assistant message content type');
      }
      if (typeof message.content !== 'string') {
        throw new Error('Invalid message content');
      }

      const response = await AIHandler.process(message.content);
      await this.sendAssistantMessage(response.text);
    } catch (error) {
      console.error('Error in processMessage:', error);
      throw error;
    }
  }

  async sendAssistantMessage(content: MessageContent) {
    try {
      if (!content) {
        throw new Error('Invalid assistant message content type');
      }

      self.postMessage({
        type: 'response',
        content,
      });
    } catch (error) {
      console.error('Error in sendAssistantMessage:', error);
      throw error;
    }
  }
}

const chatHandler = new ChatHandler();

export function handleSendMessage(message: Message) {
  return chatHandler.handleMessage(message);
}
