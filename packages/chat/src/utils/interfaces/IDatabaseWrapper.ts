/**
 * Database wrapper interfaces for dependency injection
 * Provides isolation from Cloudflare D1 implementation details
 */

import type { Conversation, Message, User } from "../../types";

/**
 * Generic error wrapper for database failures
 */
export class DatabaseError extends Error {
  constructor(
    message: string,
    public readonly operation: string,
    public readonly originalError?: unknown,
  ) {
    super(message);
    this.name = "DatabaseError";
  }
}

/**
 * User repository interface
 */
export interface IUserRepository {
  /**
   * Find user by ID
   * @param id - User ID
   */
  findById(id: string): Promise<User | null>;

  /**
   * Find user by Clerk ID
   * @param clerkId - Clerk user ID
   */
  findByClerkId(clerkId: string): Promise<User | null>;

  /**
   * Create new user
   * @param data - User data
   */
  create(data: Partial<User>): Promise<User>;

  /**
   * Update user
   * @param id - User ID
   * @param data - Updated user data
   */
  update(id: string, data: Partial<User>): Promise<User>;
}

/**
 * Conversation repository interface
 */
export interface IConversationRepository {
  /**
   * Find conversation by ID
   * @param id - Conversation ID
   */
  findById(id: string): Promise<Conversation | null>;

  /**
   * Create new conversation
   * @param data - Conversation data
   */
  create(data: Partial<Conversation>): Promise<Conversation>;

  /**
   * List conversations for user
   * @param userId - User ID
   */
  listByUserId(userId: string): Promise<Conversation[]>;
}

/**
 * Message repository interface
 */
export interface IMessageRepository {
  /**
   * Find message by ID
   * @param id - Message ID
   */
  findById(id: string): Promise<Message | null>;

  /**
   * Create new message
   * @param data - Message data
   */
  create(data: Partial<Message>): Promise<Message>;

  /**
   * List messages by conversation ID
   * @param conversationId - Conversation ID
   */
  listByConversationId(conversationId: string): Promise<Message[]>;
}
