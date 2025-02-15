import type { Message } from '@/lib/interfaces';
import { handleSendMessage } from '@/workers/chat-utils.worker';
import { beforeEach, describe, expect, test, vi } from 'vitest';

// Mock BroadcastChannel
class MockBroadcastChannel {
  postMessage = vi.fn();
}

// Mock worker environment
const mockSelf = {
  postMessage: vi.fn(),
};
global.BroadcastChannel = MockBroadcastChannel as any;
global.self = mockSelf as any;

const mockAIService = {
  sendToAnthropic: vi.fn(),
  prepareClaudeContent: vi.fn(),
  sendToGpt4o: vi.fn(),
};

vi.mock('../../services/AIService', () => ({
  AIService: vi.fn().mockImplementation(() => mockAIService),
}));

describe('handleSendMessage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockAIService.sendToAnthropic.mockResolvedValue({
      status: 200, // Mock a successful response
      id: 'test-id',
      role: 'assistant',
      content: 'Test response',
    });
    mockAIService.prepareClaudeContent.mockReturnValue('Prepared content');
  });

  test('should handle valid messages', async () => {
    const testMessage: Message = {
      id: 'test-message-1',
      role: 'user',
      content: 'Test message',
    };

    const data = {
      messages: [testMessage],
      codeSpace: 'test.ts',
      prompt: 'Test prompt',
      images: [],
      code: '// Test code',
    };

    const result = await handleSendMessage(data);

    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
    expect(mockSelf.postMessage).toHaveBeenCalledWith(
      expect.objectContaining({
        isStreaming: false,
        messages: expect.any(Array),
      })
    );
  });

  test('should handle error from AIService', async () => {
    const testError = new Error('Test error in AIService');

    // Mock sendToAnthropic to reject with an error
    mockAIService.sendToAnthropic.mockRejectedValue(testError);

    const testMessage: Message = {
      id: 'test-message-1',
      role: 'user',
      content: 'Test message',
    };

    const data = {
      messages: [testMessage],
      codeSpace: 'test.ts',
      prompt: 'Test prompt',
      images: [],
      code: '// Test code',
    };

    const result = await handleSendMessage(data);

    // The specific snapshot might need adjustment based on the actual error handling
    // in handleSendMessage, but the key is that it should handle the error gracefully.
    expect(result).toBeDefined();
    expect(Array.isArray(result)).toBe(true);
  });
});
