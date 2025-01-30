import { Message } from '@/lib/interfaces';
import { CodeProcessor } from '../code/CodeProcessor';
import { IMessageHandlerService, RunMessageResult } from '../websocket/types';
import {  MessageType, MessageResponse, MessageHandlerConfig } from './types';

export class MessageHandlerService implements IMessageHandlerService {
  private config: MessageHandlerConfig;

  constructor(config: MessageHandlerConfig = {}) {
    this.config = {
      logErrors: true,
      maxRetries: 3,
      timeout: 5000,
      ...config,
    };
  }

  public   cleanup(): void {
    this.config = {
      logErrors: true,
      maxRetries: 3,
      timeout: 5000,
    };
    // Cleanup resources
  }

  public validateMessage(message: unknown): message is Message {
    if (!message || typeof message !== 'object') {
      return false;
    }

    const msg = message as Message;
    return (
      'type' in msg &&
      Object.values(MessageType).includes((msg as unknown as {type: MessageType}).type)
    );
  }

  public async handleRunMessage(transpiled: string): Promise<RunMessageResult | false> {
    // Process run message
    const codeProcessor = new CodeProcessor();
    const executed= await codeProcessor.process(transpiled, false, new AbortController().signal);
    if (!executed) {
      return false;
    }
    return executed;
  }

  public async handleMessage(event: Message): Promise<MessageResponse> {
    const message = event as Message;
    try {
      if (!this.validateMessage(message)) {
        throw new Error('Invalid message format');
      }

      if (!message.content) {
        throw new Error('Missing message content');
      }

      if (!Object.values(MessageType).includes((message as unknown as {
        type: MessageType;
      }).type)) {
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

  private async processMessage(message: Message): Promise<unknown> {
    switch (message.type) {
      case MessageType.TEXT:
        return this.handleTextMessage(message);
      case MessageType.COMMAND:
        return this.handleCommandMessage(message);
      case MessageType.STATUS:
        return this.handleStatusMessage(message);
      default:
        throw new Error(`Unsupported message type: ${message.type}`);
    }
  }

  private async handleTextMessage(message: Message): Promise<unknown> {
    // Process text message
    return { text: message.content };
  }

  private async handleCommandMessage(message: Message): Promise<unknown> {
    // Process command message
    return { command: message.content, executed: true };
  }

  private async handleStatusMessage(message: Message): Promise<unknown> {
    // Process status message
    return { status: message.content, timestamp: new Date().toISOString() };
  }
}
