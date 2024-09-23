import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Code } from './chatRoom';
import { RouteHandler } from './routeHandler';
import type Env from './env';

vi.mock('./routeHandler');

describe('Hono app routes', () => {
  const state = {
    storage: {},
    id: 'test',
    metadata: {
      room: 'test',
    },
  } as any;

  const env = { } as Env;

  let app: Code;
  let mockRouteHandler: {
    handleUsersRoute: ReturnType<typeof vi.fn>;
    handleWebsocketRoute: ReturnType<typeof vi.fn>;
    handleCodeRoute: ReturnType<typeof vi.fn>;
    handleSessionRoute: ReturnType<typeof vi.fn>;
    handleAutoSaveRoute: ReturnType<typeof vi.fn>;
    handleLiveRoute: ReturnType<typeof vi.fn>;
  };

  beforeEach(() => {
    mockRouteHandler = {
      handleUsersRoute: vi.fn(),
      handleWebsocketRoute: vi.fn(),
      handleCodeRoute: vi.fn(),
      handleSessionRoute: vi.fn(),
      handleAutoSaveRoute: vi.fn(),
      handleLiveRoute: vi.fn(),
    };

    vi.mocked(RouteHandler).mockImplementation(() => mockRouteHandler as any);

    app = new Code(state, env);
    // @ts-ignore: Mocking the fetch method for testing
    app.fetch = vi.fn(app.fetch.bind(app));
  });

  it('should handle /users route', async () => {
    const mockUserResponse = new Response('Users response');
    mockRouteHandler.handleUsersRoute.mockResolvedValue(mockUserResponse);

    const res = await app.fetch(new Request('https://example.com/users?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Users response');
  });

  it('should handle /websocket route', async () => {
    const websocketResponse = new Response('Websocket response');
    mockRouteHandler.handleWebsocketRoute.mockResolvedValue(websocketResponse);

    const res = await app.fetch(new Request('https://example.com/websocket?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Websocket response');
  });

  it('should handle /code route', async () => {
    const mockResponse = new Response('Code response');
    mockRouteHandler.handleCodeRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(new Request('https://example.com/code?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Code response');
  });

  it('should handle /session route', async () => {
    const mockResponse = new Response('Session response');
    mockRouteHandler.handleSessionRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(new Request('https://example.com/session?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Session response');
  });

  it('should handle /auto-save route', async () => {
    const mockResponse = new Response('Auto-save response');
    mockRouteHandler.handleAutoSaveRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(new Request('https://example.com/auto-save/history?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Auto-save response');
  });

  it('should handle /live route', async () => {
    const mockResponse = new Response('Live response');
    mockRouteHandler.handleLiveRoute.mockResolvedValue(mockResponse);

    const res = await app.fetch(new Request('https://example.com/live/some/path?room=test'));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Live response');
  });
});