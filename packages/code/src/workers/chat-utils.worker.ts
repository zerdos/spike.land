import { Message } from '@/lib/interfaces';
import { AIHandler } from '../services/ai/AIHandler';

export class ChatHandler {
  constructor() {
    this.handleMessage = this.handleMessage.bind(this);
  }

  async handleMessage(message: Message) {
    try {
      if (!message || !message.content) {
        throw new Error('Invalid message format');
      }
      await this.processMessage(message);
    } catch (error) {
      console.error('Error in handleMessage:', error);
      self.postMessage({
        type: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }

  async processMessage(message: Message) {
    try {
      if (!AIHandler.validateContent(message.content)) {
        throw new Error('Invalid assistant message content type');
      }

      const content = message.content as { text: string; type: string };
      if (!content.text || !content.type || content.type !== 'text') {
        throw new Error('Invalid assistant message content type');
      }

      const response = await AIHandler.process(content.text);
      self.postMessage({
        type: 'response',
        content: response
      });
    } catch (error) {
      console.error('Error in processMessage:', error);
      throw error;
    }
  }
}

const chatHandler = new ChatHandler();

export function handleSendMessage(message: Message) {
  return chatHandler.handleMessage(message);
}
