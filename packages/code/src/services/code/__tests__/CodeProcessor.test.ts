import type { ICodeSession, RenderedApp } from '../../../@/lib/interfaces';
import type { EmotionCache } from '@emotion/cache';
import { createRoot } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { formatCode, transpileCode } from '../../../components/editorUtils';
import { RenderService } from '../../render/RenderService';
import type { IWebSocketManager } from '../../websocket/types';
import { CodeProcessor } from '../CodeProcessor';

vi.mock('../../render/RenderService');
vi.mock('../../../components/editorUtils');

describe('CodeProcessor', () => {
  const mockCodeSpace = 'test-space';
  let codeProcessor: CodeProcessor;

  const sessionMock: ICodeSession = {
    code: 'const x = 5;',
    transpiled: 'const x = 5;',
    html: '<div></div>',
    codeSpace: mockCodeSpace,
    css: 'css',
    messages: [
      { id: '1', role: 'user', content: 'Test' },
      { id: '2', role: 'assistant', content: 'Test' },
    ],
  };

  const getSession = () => sessionMock;

  beforeEach(() => {
    vi.clearAllMocks();

    // Mock WebSocketManager
    const mockWebSocketManager: IWebSocketManager = {
      handleRunMessage: vi.fn().mockResolvedValue({
        html: '<div>Mocked HTML</div>',
        css: '/* Mocked CSS */',
      }),
      init: vi.fn(),
      cleanup: vi.fn(),
    };

    // Mock window.frames[0]
    (window.frames as any)[0] = {
      webSocketManager: mockWebSocketManager,
    };

    codeProcessor = new CodeProcessor(mockCodeSpace);
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Reset iframe mock
    delete (window.frames as any)[0];
  });

  describe('process', () => {
    it('should format and transpile code successfully', async () => {
      const mockCode = 'const x = 6;';
      const mockSignal = new AbortController().signal;

      vi.mocked(transpileCode).mockResolvedValue(`transpiled`);

      vi.mocked(formatCode).mockResolvedValue(`formatted`);

      const result = await codeProcessor.process(
        mockCode,
        true,
        mockSignal,
        getSession
      );

      expect(result).toMatchInlineSnapshot(`
        {
          "code": "formatted",
          "codeSpace": "test-space",
          "css": "css",
          "html": "<div></div>",
          "messages": [
            {
              "content": "Test",
              "id": "1",
              "role": "user",
            },
            {
              "content": "Test",
              "id": "2",
              "role": "assistant",
            },
          ],
          "transpiled": "transpiled",
        }
      `);
    });

    it('should should run as well', async () => {
      const mockCode = 'const x = 6;';
      const mockSignal = new AbortController().signal;

      vi.mocked(transpileCode).mockResolvedValue(`transpiled`);

      vi.mocked(formatCode).mockResolvedValue(`formatted`);

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession
      );

      expect(result).toMatchInlineSnapshot(`
        {
          "code": "formatted",
          "codeSpace": "test-space",
          "css": "/* Mocked CSS */",
          "html": "<div>Mocked HTML</div>",
          "messages": [
            {
              "content": "Test",
              "id": "1",
              "role": "user",
            },
            {
              "content": "Test",
              "id": "2",
              "role": "assistant",
            },
          ],
          "transpiled": "transpiled",
        }
      `);
    });

    it('should handle aborted signal', async () => {
      const mockCode = 'const x = 5;';
      const controller = new AbortController();
      const mockSignal = controller.signal;

      controller.abort();

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession
      );
      expect(result).toBe(false);
    });

    it('should return false on error', async () => {
      const mockCode = 'invalid code {';
      const mockSignal = new AbortController().signal;

      vi.spyOn(console, 'error').mockImplementation(() => {}); // Silence console errors

      const result = await codeProcessor.process(
        mockCode,
        false,
        mockSignal,
        getSession
      );
      expect(result).toBe(false);
    });
  });

  describe('runCode', () => {
    it('should execute code in iframe context', async () => {
      const mockTranspiled = 'const x = 5;';
      const mockResult = {
        html: '<div>Test</div>',
        css: '.test { color: red; }',
      };

      // Mock RenderService methods
      const mockEmotionCache = {
        key: 'test-key',
        nonce: undefined,
        inserted: {},
        registered: {},
        insert: vi.fn(),
        sheet: { tags: [], isSpeedy: true, key: 'test-key' },
      } as unknown as EmotionCache;

      const rootElement = document.createElement('div');

      const mockRenderedApp: RenderedApp = {
        rootElement: document.createElement('div'),
        rRoot: createRoot(rootElement),
        cssCache: mockEmotionCache,
        cleanup: vi.fn(),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(
        mockRenderedApp
      );
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue({
        html: mockResult.html,
        css: mockResult.css,
      });

      const result = await codeProcessor.runCode(mockTranspiled);

      expect(result).toEqual(mockResult);
      expect(RenderService.prototype.updateRenderedApp).toHaveBeenCalledWith({
        transpiled: mockTranspiled,
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
        sheet: { tags: [] },
      } as unknown as EmotionCache;

      const rootElement = document.createElement('div');
      const mockRenderedApp: RenderedApp = {
        rootElement,
        rRoot: createRoot(rootElement),
        cssCache: mockEmotionCache,
        cleanup: vi.fn(),
      };

      vi.mocked(RenderService.prototype.updateRenderedApp).mockResolvedValue(
        mockRenderedApp
      );
      vi.mocked(RenderService.prototype.handleRender).mockResolvedValue(false);

      await expect(codeProcessor.runCode(mockTranspiled)).rejects.toThrow(
        'Running code produced no output'
      );
    });
  });
});
