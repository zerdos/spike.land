import { describe, it, expect, vi, beforeEach } from 'vitest';
import app from './chatRoom';
import { RouteHandler } from './routeHandler';

vi.mock('./routeHandler');

describe('Hono app routes', () => {
  let mockRouteHandler: jest.Mocked<RouteHandler>;

  beforeEach(() => {
    mockRouteHandler = new RouteHandler({} as any) as jest.Mocked<RouteHandler>;
    vi.mocked(RouteHandler).mockImplementation(() => mockRouteHandler);
  });

  it('should handle /users route', async () => {
    const mockResponse = new Response('Users response');
    mockRouteHandler.handleUsersRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/users?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Users response');
  });

  it('should handle /websocket route', async () => {
    const mockResponse = new Response('Websocket response');
    mockRouteHandler.handleWebsocketRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/websocket?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Websocket response');
  });

  it('should handle /code route', async () => {
    const mockResponse = new Response('Code response');
    mockRouteHandler.handleCodeRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/code?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Code response');
  });

  it('should handle /session route', async () => {
    const mockResponse = new Response('Session response');
    mockRouteHandler.handleSessionRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/session?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Session response');
  });

  // Add similar tests for other routes...

  it('should handle /auto-save route', async () => {
    const mockResponse = new Response('Auto-save response');
    mockRouteHandler.handleAutoSaveRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/auto-save/history?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Auto-save response');
  });

  it('should handle /live route', async () => {
    const mockResponse = new Response('Live response');
    mockRouteHandler.handleLiveRoute.mockResolvedValue(mockResponse);

    const res = await app.request('/live/some/path?room=test');
    expect(res.status).toBe(200);
    expect(await res.text()).toBe('Live response');
  });
});