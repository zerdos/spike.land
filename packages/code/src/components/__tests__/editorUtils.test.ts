import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { runCode } from '../editorUtils';

describe('editorUtils', () => {
  let postMessageSpy: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Setup iframe mock
    // Create mock iframe with postMessage spy
    postMessageSpy = vi.fn();
    const mockIframe = {
      contentWindow: {
        postMessage: postMessageSpy
      }
    };
    
    // Mock querySelector to return our mock iframe
    vi.spyOn(document, 'querySelector').mockImplementation((selector) => {
      if (selector === 'iframe') {
        return mockIframe as any;
      }
      return null;
    });
  });

  afterEach(() => {
    // Cleanup spies
    vi.clearAllMocks();
  });

  describe('runCode', () => {
    it('should send code to iframe and receive result', async () => {
      const mockTranspiled = 'const x = 5;';
      const mockResult = {
        html: '<div>Test</div>',
        css: '.test { color: red; }'
      };

      // Setup window message handling
      setTimeout(() => {
        window.dispatchEvent(new MessageEvent('message', {
          data: {
            type: 'code-execution-result',
            result: mockResult
          }
        }));
      }, 0);

      const result = await runCode(mockTranspiled);
      
      // Verify iframe received correct message
      expect(postMessageSpy).toHaveBeenCalledWith({
        type: 'execute-code',
        code: mockTranspiled
      }, '*');
      
      expect(result).toEqual(mockResult);
    });

    it('should return false if no iframe found', async () => {
      vi.spyOn(document, 'querySelector').mockReturnValue(null);
      const result = await runCode('const x = 5;');
      expect(result).toBe(false);
    });

    it('should handle timeout', async () => {
      vi.useFakeTimers();
      const resultPromise = runCode('const x = 5;');
      
      await vi.runAllTimersAsync();
      
      const result = await resultPromise;
      expect(result).toBe(false);
      vi.useRealTimers();
    });

    it('should cleanup message listener on result', async () => {
      const mockTranspiled = 'const x = 5;';
      const addEventListenerSpy = vi.spyOn(window, 'addEventListener');
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      // Setup window message handling
      setTimeout(() => {
        window.dispatchEvent(new MessageEvent('message', {
          data: {
            type: 'code-execution-result',
            result: { html: '', css: '' }
          }
        }));
      }, 0);

      await runCode(mockTranspiled);

      expect(addEventListenerSpy).toHaveBeenCalledTimes(1);
      expect(removeEventListenerSpy).toHaveBeenCalledTimes(1);
    });
  });
});
