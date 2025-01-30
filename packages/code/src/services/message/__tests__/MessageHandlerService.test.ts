import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MessageHandlerService } from '../MessageHandlerService';
import { MessageType } from '../types';
import { Message, TextPart, ImageUrlPart, MessagePart } from '@/lib/interfaces';

describe('MessageHandlerService', () => {
  let messageHandler: MessageHandlerService;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    messageHandler = new MessageHandlerService();
  });

  describe('message content handling', () => {
    it('should handle string content', async () => {
      const message: Message = {
        id: '1',
        type: MessageType.TEXT,
        content: 'Simple text message',
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ text: 'Simple text message' });
    });

    it('should handle TextPart content', async () => {
      const message: Message = {
        id: '2',
        type: MessageType.TEXT,
        content: { type: 'text', text: 'Text part message' } as TextPart,
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ text: 'Text part message' });
    });

    it('should handle MessagePart array with text', async () => {
      const message: Message = {
        id: '3',
        type: MessageType.TEXT,
        content: [
          { type: 'text', text: 'Array text message' } as TextPart,
          {
            type: 'image_url',
            image_url: { url: 'https://example.com/image.jpg' }
          } as ImageUrlPart,
        ],
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ text: 'Array text message' });
    });

    it('should handle array without text content', async () => {
      const message: Message = {
        id: '4',
        type: MessageType.TEXT,
        content: [{
          type: 'image_url',
          image_url: { url: 'https://example.com/image.jpg' }
        }] as MessagePart[],
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid message content type');
    });

    it('should handle invalid content type', async () => {
      const message: Message = {
        id: '5',
        type: MessageType.TEXT,
        content: { invalid: true } as any,
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid message content type');
    });
  });

  describe('message type handling', () => {
    it('should handle text messages', async () => {
      const message: Message = {
        id: '6',
        type: MessageType.TEXT,
        content: { type: 'text', text: 'Hello' } as TextPart,
        role: 'user',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({ text: 'Hello' });
    });

    it('should handle command messages', async () => {
      const message: Message = {
        id: '7',
        type: MessageType.COMMAND,
        content: { type: 'text', text: 'test-command' } as TextPart,
        role: 'system',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        command: 'test-command',
        executed: true,
      });
    });

    it('should handle status messages', async () => {
      const message: Message = {
        id: '8',
        type: MessageType.STATUS,
        content: { type: 'text', text: 'active' } as TextPart,
        role: 'system',
      };

      const result = await messageHandler.handleMessage(message);

      expect(result.success).toBe(true);
      expect(result.data).toEqual({
        status: 'active',
        timestamp: expect.any(String),
      });
    });

    it('should handle unknown message type', async () => {
      const result = await messageHandler.handleMessage({
        id: '9',
        type: 'unknown' as MessageType,
        content: { type: 'text', text: 'Test' } as TextPart,
        role: 'user',
      });

      expect(consoleSpy).toHaveBeenCalledWith('Unhandled message type:', 'unknown');
      expect(result.success).toBe(false);
      expect(result.error).toBe('Unhandled message type');
    });

    it('should handle message processing error', async () => {
      const testError = new Error('Test error');
      vi.spyOn(messageHandler as any, 'processMessage').mockRejectedValueOnce(testError);

      const result = await messageHandler.handleMessage({
        id: '10',
        type: MessageType.TEXT,
        content: { type: 'text', text: 'Test' } as TextPart,
        role: 'user',
      });

      expect(consoleSpy).toHaveBeenCalledWith('Error processing message:', testError);
      expect(result.success).toBe(false);
      expect(result.error).toBe('Test error');
    });
  });

  describe('message validation', () => {
    it('should validate required message fields', () => {
      const missingIdMessage = {
        type: MessageType.TEXT,
        content: { type: 'text', text: 'Test' } as TextPart,
        role: 'user',
      };

      const missingRoleMessage = {
        id: '11',
        type: MessageType.TEXT,
        content: { type: 'text', text: 'Test' } as TextPart,
      };

      expect(messageHandler.validateMessage(missingIdMessage)).toBe(false);
      expect(messageHandler.validateMessage(missingRoleMessage)).toBe(false);
    });

    it('should handle missing content', async () => {
      const result = await messageHandler.handleMessage({
        id: '12',
        type: MessageType.TEXT,
        role: 'user',
      } as Message);

      expect(consoleSpy).toHaveBeenCalledWith(
        'Error processing message:',
        expect.any(Error)
      );
      expect(result.success).toBe(false);
      expect(result.error).toBe('Missing message content');
    });
  });
});
