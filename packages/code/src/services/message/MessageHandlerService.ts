import { Message, MessageType, MessageResponse, MessageHandlerConfig, TextPart, MessageContent } from './types';

/**
 * Service for handling and processing different types of messages
 * with support for text, command, and status messages.
 */
export class MessageHandlerService {
  private config: MessageHandlerConfig;

  /**
   * Creates a new MessageHandlerService instance
   * @param config Optional configuration for the service
   */
  constructor(config: MessageHandlerConfig = {}) {
    this.config = {
      logErrors: true,
      maxRetries: 3,
      timeout: 5000,
      ...config,
    };
  }

  /**
   * Validates if an unknown object is a valid Message
   * @param message The object to validate
   * @returns Type guard indicating if the object is a valid Message
   */
  public validateMessage(message: unknown): message is Message {
    if (!message || typeof message !== 'object') {
      return false;
    }

    const msg = message as Message;
    return (
      'id' in msg &&
      'type' in msg &&
      'role' in msg &&
      Object.values(MessageType).includes(msg.type as MessageType)
    );
  }

  /**
   * Type guard to check if content is a TextPart
   * @param content The content to check
   * @returns True if content is a TextPart
   */
  private isTextPart(content: MessageContent): content is TextPart {
    return (
      typeof content === 'object' &&
      content !== null &&
      'type' in content &&
      content.type === 'text' &&
      'text' in content &&
      typeof (content as TextPart).text === 'string'
    );
  }

  /**
   * Extracts text content from different MessageContent types
   * @param content The message content to process
   * @returns The extracted text string
   * @throws Error if no valid text content is found
   */
  private getTextFromContent(content: MessageContent): string {
    if (typeof content === 'string') {
      return content;
    } else if (Array.isArray(content)) {
      const textPart = content.find(part => part.type === 'text') as TextPart | undefined;
      if (!textPart) {
        throw new Error('No text content found in message parts');
      }
      return textPart.text;
    } else if (this.isTextPart(content)) {
      return content.text;
    }
    throw new Error('Invalid message content type');
  }

  /**
   * Main method for handling messages
   * @param message The message to process
   * @returns A promise resolving to a MessageResponse
   */
  public async handleMessage(message: Message): Promise<MessageResponse> {
    try {
      if (!this.validateMessage(message)) {
        throw new Error('Invalid message format');
      }

      if (!message.content) {
        throw new Error('Missing message content');
      }

      if (!Object.values(MessageType).includes(message.type as MessageType)) {
        console.error('Unhandled message type:', message.type);
        return {
          success: false,
          error: 'Unhandled message type',
        };
      }

      const result = await this.processMessage(message);
      return {
        success: true,
        data: result,
      };
    } catch (error) {
      if (this.config.logErrors) {
        console.error('Error processing message:', error);
      }

      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  /**
   * Processes a message based on its type
   * @param message The message to process
   * @returns A promise resolving to the processed result
   * @throws Error if message processing fails
   */
  private async processMessage(message: Message): Promise<unknown> {
    try {
      const text = this.getTextFromContent(message.content);

      switch (message.type) {
        case MessageType.TEXT:
          return { text };
        case MessageType.COMMAND:
          return { command: text, executed: true };
        case MessageType.STATUS:
          return { status: text, timestamp: new Date().toISOString() };
        default:
          throw new Error(`Unsupported message type: ${message.type}`);
      }
    } catch (error) {
      throw new Error('Invalid message content type');
    }
  }
}
