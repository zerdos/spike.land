import { vi, describe, it, expect, beforeEach, afterEach } from 'vitest';
import { CodeProcessor } from '../CodeProcessor';
import { RenderService } from '../../render/RenderService';
import type { EmotionCache } from '@emotion/cache';
import type { RenderedApp } from '@/lib/interfaces';

vi.mock('../../render/RenderService');

describe('CodeProcessor', () => {
  const mockCodeSpace = 'test-space';
  let codeProcessor: CodeProcessor;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset any iframe related globals
    if (window.frames.length) {
      delete (window as any).frames[0];
    }
    codeProcessor = new CodeProcessor(mockCodeSpace);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('process', () => {
    it('should format and transpile code successfully', async () => {
      const mockCode = 'const x = 5;';
      const mockSignal = new AbortController().signal;

      const result = await codeProcessor.process(mockCode, true, mockSignal);
      
      expect(result).toEqual({
        html: '<div></div>',
        css: ''
      });
    });

    it('should handle aborted signal', async () => {
      const mockCode = 'const x = 5;';
      const controller = new AbortController();
      const mockSignal = controller.signal;
      
      controller.abort();
      
      const result = await codeProcessor.process(mockCode, false, mockSignal);
      expect(result).toBe(false);
    });

    it('should return false on error', async () => {
      const mockCode = 'invalid code {';
      const mockSignal = new AbortController().signal;
      
      vi.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors
      
      const result = await codeProcessor.process(mockCode, false, mockSignal);
      expect(result).toBe(false);
    });
  });

  describe('runCode', () => {
    it('should execute code in iframe context', async () => {
      const mockTranspiled = 'const x = 5;';
      const mockResult = {
        html: '<div>Test</div>',
        css: '.test { color: red; }'
      };

      // Mock RenderService methods
      const mockEmotionCache = {
        key: 'test-key',
        nonce: undefined,
        inserted: {},
        registered: {},
        insert: vi.fn(),
        sheet: { tags: [] }
      } as EmotionCache;

      const mockRenderedApp: RenderedApp = {
        rootElement: document.createElement('div'),
        rRoot: {} as any,
        cssCache: mockEmotionCache,
        cleanup: vi.fn()
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(mockRenderedApp);
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue({
        html: mockResult.html,
        css: mockResult.css
      });

      const result = await codeProcessor.runCode(mockTranspiled);
      
      expect(result).toEqual(mockResult);
      expect(RenderService.prototype.updateRenderedApp).toHaveBeenCalledWith({
        transpiled: mockTranspiled
      });
      expect(RenderService.prototype.handleRender).toHaveBeenCalled();
    });

    it('should throw error if rendering fails', async () => {
      const mockTranspiled = 'const x = 5;';
      
      const mockEmotionCache = {
        key: 'test-key',
        nonce: undefined,
        inserted: {},
        registered: {},
        insert: vi.fn(),
        sheet: { tags: [] }
      } as EmotionCache;

      const mockRenderedApp: RenderedApp = {
        rootElement: document.createElement('div'),
        rRoot: {} as any,
        cssCache: mockEmotionCache,
        cleanup: vi.fn()
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(mockRenderedApp);
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue(false);

      await expect(codeProcessor.runCode(mockTranspiled)).rejects.toThrow('Running code produced no output');
    });
  });
});
