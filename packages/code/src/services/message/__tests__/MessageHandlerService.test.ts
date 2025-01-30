import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MessageHandlerService } from '../MessageHandlerService';
import { MessageType } from '../types';
import { Message } from '@/lib/interfaces';

describe('MessageHandlerService', () => {
  let messageHandler: MessageHandlerService;
  let consoleSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    messageHandler = new MessageHandlerService();
  });

  it('should handle valid messages', async () => {
    const result = await messageHandler.handleMessage({
      type: MessageType.TEXT,
      content: 'Hello',
    } as unknown as Message);

    expect(result).toBeDefined();
    expect(result.success).toBe(true);
  });

  it('should handle unknown message type', async () => {
    const result = await messageHandler.handleMessage({
      type: 'unknown' as MessageType,
      content: 'Test',
    } as unknown as Message);

    expect(consoleSpy).toHaveBeenCalledWith('Error processing message:', new Error('Invalid message format'));
    expect(result.success).toBe(false);
  });

  it('should handle message processing error', async () => {
    const testError = new Error('Test error');
    // const processMessage = vi.spyOn(messageHandler as any, 'processMessage')
    //   .mockRejectedValueOnce(testError);

    const result = await messageHandler.handleMessage({
      type: MessageType.TEXT,
      content: 'Test',
    }  as unknown as Message);

    expect(consoleSpy).toHaveBeenCalledWith('Error processing message:', testError);
    expect(result.success).toBe(false);
    expect(result.error).toBe('Test error');
  });

  it('should handle missing content', async () => {
    const result = await messageHandler.handleMessage({
      type: MessageType.TEXT,
    } as unknown as Message);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Error processing message:',
      expect.any(Error)
    );
    expect(result.success).toBe(false);
    expect(result.error).toBe('Missing message content');
  });

  it('should validate message format', () => {
    const validMessage = {
      type: MessageType.TEXT,
      content: 'Test',
    };

    const invalidMessage = {};

    expect(messageHandler.validateMessage(validMessage)).toBe(true);
    expect(messageHandler.validateMessage(invalidMessage)).toBe(false);
  });
});
