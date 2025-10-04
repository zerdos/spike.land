/**
 * External service wrapper interfaces for dependency injection
 * Provides isolation from external dependencies (KV, AI, etc.)
 */

import type { AIRequest } from "../../types";

/**
 * Rate limiter interface for managing API rate limits
 */
export interface IRateLimiter {
  /**
   * Check if request is allowed
   * @param key - Rate limit key (e.g., user ID, IP address)
   * @param limit - Maximum requests allowed
   * @param window - Time window in seconds
   */
  checkLimit(key: string, limit: number, window: number): Promise<boolean>;

  /**
   * Increment rate limit counter
   * @param key - Rate limit key
   * @param window - Time window in seconds
   */
  increment(key: string, window: number): Promise<number>;
}

/**
 * AI service interface for generating responses
 */
export interface IAIService {
  /**
   * Generate AI response
   * @param request - AI request data
   */
  generateResponse(request: AIRequest): Promise<{
    success: boolean;
    response?: string;
    tokensUsed?: number;
    error?: string;
  }>;
}

/**
 * Authentication service interface
 */
export interface IAuthService {
  /**
   * Verify request authentication
   * @param request - HTTP request
   */
  verifyRequest(request: Request): Promise<{
    userId: string;
    clerkId: string;
    sessionId?: string;
  } | null>;

  /**
   * Get user from Clerk ID
   * @param clerkId - Clerk user ID
   */
  getUserFromClerkId(clerkId: string): Promise<unknown>;
}

/**
 * WebSocket broadcaster interface
 */
export interface IWebSocketBroadcaster {
  /**
   * Broadcast message to room
   * @param roomId - Room/conversation ID
   * @param message - Message to broadcast
   */
  broadcast(roomId: string, message: unknown): Promise<void>;
}
