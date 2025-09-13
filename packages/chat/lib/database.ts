import type {
  Env,
  User,
  Conversation,
  Message,
  Subscription,
  Transaction,
  Attachment
} from "../src/types";

export class DatabaseManager {
  private db: D1Database;

  constructor(env: Env) {
    this.db = env.DATABASE;
  }

  // User operations
  async createUser(userData: Omit<User, "id" | "created_at" | "updated_at">): Promise<User> {
    const now = new Date().toISOString();
    const id = crypto.randomUUID();

    const user: User = {
      id,
      ...userData,
      subscription_tier: userData.subscription_tier || "free",
      credits: userData.credits || 10, // Default free tier credits
      created_at: now,
      updated_at: now,
    };

    const query = `
      INSERT INTO users (
        id, clerk_id, email, name, subscription_tier, credits,
        stripe_customer_id, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        user.id,
        user.clerk_id || null,
        user.email,
        user.name || null,
        user.subscription_tier,
        user.credits,
        user.stripe_customer_id || null,
        user.created_at,
        user.updated_at
      )
      .run();

    return user;
  }

  async getUserById(id: string): Promise<User | null> {
    const result = await this.db.prepare("SELECT * FROM users WHERE id = ?")
      .bind(id)
      .first();

    return result as User | null;
  }

  async getUserByClerkId(clerkId: string): Promise<User | null> {
    const result = await this.db.prepare("SELECT * FROM users WHERE clerk_id = ?")
      .bind(clerkId)
      .first();

    return result as User | null;
  }

  async getUserByEmail(email: string): Promise<User | null> {
    const result = await this.db.prepare("SELECT * FROM users WHERE email = ?")
      .bind(email)
      .first();

    return result as User | null;
  }

  async updateUser(id: string, updates: Partial<Omit<User, "id" | "created_at">>): Promise<User | null> {
    const now = new Date().toISOString();

    // Build dynamic query based on provided updates
    const fields = Object.keys(updates).filter(key => key !== "id" && key !== "created_at");
    if (fields.length === 0) {
      return await this.getUserById(id);
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const values = fields.map(field => (updates as Record<string, unknown>)[field]);

    const query = `UPDATE users SET ${setClause}, updated_at = ? WHERE id = ?`;

    await this.db.prepare(query)
      .bind(...values, now, id)
      .run();

    return await this.getUserById(id);
  }

  async deleteUser(id: string): Promise<boolean> {
    const result = await this.db.prepare("DELETE FROM users WHERE id = ?")
      .bind(id)
      .run();

    return result.changes > 0;
  }

  // Conversation operations
  async createConversation(conversationData: Omit<Conversation, "created_at" | "updated_at">): Promise<Conversation> {
    const now = new Date().toISOString();

    const conversation: Conversation = {
      ...conversationData,
      created_at: now,
      updated_at: now,
    };

    const query = `
      INSERT INTO conversations (id, user_id, title, model, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        conversation.id,
        conversation.user_id,
        conversation.title || null,
        conversation.model,
        conversation.created_at,
        conversation.updated_at
      )
      .run();

    return conversation;
  }

  async getConversationById(id: string): Promise<Conversation | null> {
    const result = await this.db.prepare("SELECT * FROM conversations WHERE id = ?")
      .bind(id)
      .first();

    return result as Conversation | null;
  }

  async getConversationsByUserId(
    userId: string,
    options: { page?: number; limit?: number; sortBy?: "created_at" | "updated_at"; order?: "ASC" | "DESC" } = {}
  ): Promise<{ conversations: Conversation[]; total: number }> {
    const { page = 1, limit = 20, sortBy = "updated_at", order = "DESC" } = options;
    const offset = (page - 1) * limit;

    // Get conversations
    const conversationsQuery = `
      SELECT * FROM conversations
      WHERE user_id = ?
      ORDER BY ${sortBy} ${order}
      LIMIT ? OFFSET ?
    `;

    const conversationsResult = await this.db.prepare(conversationsQuery)
      .bind(userId, limit, offset)
      .all();

    // Get total count
    const countResult = await this.db.prepare("SELECT COUNT(*) as total FROM conversations WHERE user_id = ?")
      .bind(userId)
      .first();

    return {
      conversations: conversationsResult.results as Conversation[],
      total: (countResult as { total: number })?.total || 0,
    };
  }

  async updateConversation(id: string, updates: Partial<Omit<Conversation, "id" | "user_id" | "created_at">>): Promise<Conversation | null> {
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(key => key !== "id" && key !== "user_id" && key !== "created_at");
    if (fields.length === 0) {
      return await this.getConversationById(id);
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const values = fields.map(field => (updates as Record<string, unknown>)[field]);

    const query = `UPDATE conversations SET ${setClause}, updated_at = ? WHERE id = ?`;

    await this.db.prepare(query)
      .bind(...values, now, id)
      .run();

    return await this.getConversationById(id);
  }

  async deleteConversation(id: string): Promise<boolean> {
    // Start transaction-like operations
    try {
      // Delete related messages first
      await this.db.prepare("DELETE FROM messages WHERE conversation_id = ?")
        .bind(id)
        .run();

      // Delete conversation
      const result = await this.db.prepare("DELETE FROM conversations WHERE id = ?")
        .bind(id)
        .run();

      return result.changes > 0;
    } catch (error) {
      console.error("Error deleting conversation:", error);
      throw error;
    }
  }

  // Message operations
  async createMessage(messageData: Omit<Message, "created_at">): Promise<Message> {
    const now = new Date().toISOString();

    const message: Message = {
      ...messageData,
      created_at: now,
    };

    const query = `
      INSERT INTO messages (id, conversation_id, user_id, role, content, tokens_used, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        message.id,
        message.conversation_id,
        message.user_id || null,
        message.role,
        message.content,
        message.tokens_used || null,
        message.created_at
      )
      .run();

    return message;
  }

  async getMessageById(id: string): Promise<Message | null> {
    const result = await this.db.prepare("SELECT * FROM messages WHERE id = ?")
      .bind(id)
      .first();

    return result as Message | null;
  }

  async getMessagesByConversationId(
    conversationId: string,
    options: { page?: number; limit?: number; order?: "ASC" | "DESC" } = {}
  ): Promise<{ messages: Message[]; total: number }> {
    const { page = 1, limit = 50, order = "ASC" } = options;
    const offset = (page - 1) * limit;

    // Get messages
    const messagesQuery = `
      SELECT * FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ${order}
      LIMIT ? OFFSET ?
    `;

    const messagesResult = await this.db.prepare(messagesQuery)
      .bind(conversationId, limit, offset)
      .all();

    // Get total count
    const countResult = await this.db.prepare("SELECT COUNT(*) as total FROM messages WHERE conversation_id = ?")
      .bind(conversationId)
      .first();

    return {
      messages: messagesResult.results as Message[],
      total: (countResult as { total: number })?.total || 0,
    };
  }

  async updateMessage(id: string, updates: Partial<Omit<Message, "id" | "conversation_id" | "created_at">>): Promise<Message | null> {
    const fields = Object.keys(updates).filter(key =>
      key !== "id" && key !== "conversation_id" && key !== "created_at"
    );

    if (fields.length === 0) {
      return await this.getMessageById(id);
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const values = fields.map(field => (updates as Record<string, unknown>)[field]);

    const query = `UPDATE messages SET ${setClause} WHERE id = ?`;

    await this.db.prepare(query)
      .bind(...values, id)
      .run();

    return await this.getMessageById(id);
  }

  async deleteMessage(id: string): Promise<boolean> {
    const result = await this.db.prepare("DELETE FROM messages WHERE id = ?")
      .bind(id)
      .run();

    return result.changes > 0;
  }

  async deleteMessagesByConversationId(conversationId: string): Promise<number> {
    const result = await this.db.prepare("DELETE FROM messages WHERE conversation_id = ?")
      .bind(conversationId)
      .run();

    return result.changes;
  }

  // Subscription operations
  async createSubscription(subscriptionData: Omit<Subscription, "created_at" | "updated_at">): Promise<Subscription> {
    const now = new Date().toISOString();

    const subscription: Subscription = {
      ...subscriptionData,
      created_at: now,
      updated_at: now,
    };

    const query = `
      INSERT INTO subscriptions (
        id, user_id, stripe_subscription_id, stripe_price_id, status,
        current_period_start, current_period_end, cancel_at_period_end,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        subscription.id,
        subscription.user_id,
        subscription.stripe_subscription_id || null,
        subscription.stripe_price_id || null,
        subscription.status,
        subscription.current_period_start || null,
        subscription.current_period_end || null,
        subscription.cancel_at_period_end,
        subscription.created_at,
        subscription.updated_at
      )
      .run();

    return subscription;
  }

  async getSubscriptionByUserId(userId: string): Promise<Subscription | null> {
    const result = await this.db.prepare("SELECT * FROM subscriptions WHERE user_id = ? ORDER BY created_at DESC LIMIT 1")
      .bind(userId)
      .first();

    return result as Subscription | null;
  }

  async updateSubscription(id: string, updates: Partial<Omit<Subscription, "id" | "user_id" | "created_at">>): Promise<Subscription | null> {
    const now = new Date().toISOString();

    const fields = Object.keys(updates).filter(key =>
      key !== "id" && key !== "user_id" && key !== "created_at"
    );

    if (fields.length === 0) {
      const result = await this.db.prepare("SELECT * FROM subscriptions WHERE id = ?")
        .bind(id)
        .first();
      return result as Subscription | null;
    }

    const setClause = fields.map(field => `${field} = ?`).join(", ");
    const values = fields.map(field => (updates as Record<string, unknown>)[field]);

    const query = `UPDATE subscriptions SET ${setClause}, updated_at = ? WHERE id = ?`;

    await this.db.prepare(query)
      .bind(...values, now, id)
      .run();

    const result = await this.db.prepare("SELECT * FROM subscriptions WHERE id = ?")
      .bind(id)
      .first();

    return result as Subscription | null;
  }

  // Transaction operations
  async createTransaction(transactionData: Omit<Transaction, "created_at">): Promise<Transaction> {
    const now = new Date().toISOString();

    const transaction: Transaction = {
      ...transactionData,
      created_at: now,
    };

    const query = `
      INSERT INTO transactions (
        id, user_id, stripe_payment_intent_id, amount, credits, status, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        transaction.id,
        transaction.user_id,
        transaction.stripe_payment_intent_id || null,
        transaction.amount,
        transaction.credits,
        transaction.status,
        transaction.created_at
      )
      .run();

    return transaction;
  }

  async getTransactionsByUserId(userId: string, limit: number = 20): Promise<Transaction[]> {
    const result = await this.db.prepare(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT ?"
    ).bind(userId, limit).all();

    return result.results as Transaction[];
  }

  // Attachment operations
  async createAttachment(attachmentData: Omit<Attachment, "created_at">): Promise<Attachment> {
    const now = new Date().toISOString();

    const attachment: Attachment = {
      ...attachmentData,
      created_at: now,
    };

    const query = `
      INSERT INTO attachments (
        id, message_id, user_id, filename, content_type, size, r2_key, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await this.db.prepare(query)
      .bind(
        attachment.id,
        attachment.message_id,
        attachment.user_id,
        attachment.filename,
        attachment.content_type || null,
        attachment.size || null,
        attachment.r2_key,
        attachment.created_at
      )
      .run();

    return attachment;
  }

  async getAttachmentsByMessageId(messageId: string): Promise<Attachment[]> {
    const result = await this.db.prepare("SELECT * FROM attachments WHERE message_id = ?")
      .bind(messageId)
      .all();

    return result.results as Attachment[];
  }

  // Utility functions
  async getUserStats(userId: string): Promise<{
    totalConversations: number;
    totalMessages: number;
    creditsUsed: number;
    creditsRemaining: number;
  }> {
    const [conversationsResult, messagesResult, user] = await Promise.all([
      this.db.prepare("SELECT COUNT(*) as total FROM conversations WHERE user_id = ?").bind(userId).first(),
      this.db.prepare("SELECT COUNT(*) as total FROM messages WHERE user_id = ?").bind(userId).first(),
      this.getUserById(userId)
    ]);

    const totalConversations = (conversationsResult as { total: number })?.total || 0;
    const totalMessages = (messagesResult as { total: number })?.total || 0;
    const creditsRemaining = user?.credits || 0;

    // Calculate used credits (assuming initial was 10 for free tier)
    const initialCredits = user?.subscription_tier === "free" ? 10 : 0;
    const creditsUsed = Math.max(0, initialCredits - creditsRemaining);

    return {
      totalConversations,
      totalMessages,
      creditsUsed,
      creditsRemaining,
    };
  }

  async cleanupOldData(retentionDays: number = 90): Promise<{
    deletedConversations: number;
    deletedMessages: number;
  }> {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);
    const cutoff = cutoffDate.toISOString();

    // Delete old messages first
    const messagesResult = await this.db.prepare(
      "DELETE FROM messages WHERE created_at < ? AND conversation_id IN (SELECT id FROM conversations WHERE updated_at < ?)"
    ).bind(cutoff, cutoff).run();

    // Delete old conversations
    const conversationsResult = await this.db.prepare(
      "DELETE FROM conversations WHERE updated_at < ?"
    ).bind(cutoff).run();

    return {
      deletedConversations: conversationsResult.changes,
      deletedMessages: messagesResult.changes,
    };
  }

  // Health check
  async healthCheck(): Promise<{ status: "healthy" | "unhealthy"; timestamp: string }> {
    try {
      await this.db.prepare("SELECT 1").first();
      return {
        status: "healthy",
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error("Database health check failed:", error);
      return {
        status: "unhealthy",
        timestamp: new Date().toISOString(),
      };
    }
  }
}

// Database schema initialization
export async function initializeDatabase(db: D1Database): Promise<void> {
  const tables = [
    // Users table
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      clerk_id TEXT UNIQUE,
      email TEXT NOT NULL UNIQUE,
      name TEXT,
      subscription_tier TEXT DEFAULT 'free',
      credits INTEGER DEFAULT 10,
      stripe_customer_id TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    )`,

    // Conversations table
    `CREATE TABLE IF NOT EXISTS conversations (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      title TEXT,
      model TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`,

    // Messages table
    `CREATE TABLE IF NOT EXISTS messages (
      id TEXT PRIMARY KEY,
      conversation_id TEXT NOT NULL,
      user_id TEXT,
      role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
      content TEXT NOT NULL,
      tokens_used INTEGER,
      created_at TEXT NOT NULL,
      FOREIGN KEY (conversation_id) REFERENCES conversations (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE SET NULL
    )`,

    // Subscriptions table
    `CREATE TABLE IF NOT EXISTS subscriptions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      stripe_subscription_id TEXT,
      stripe_price_id TEXT,
      status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
      current_period_start TEXT,
      current_period_end TEXT,
      cancel_at_period_end BOOLEAN DEFAULT FALSE,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`,

    // Transactions table
    `CREATE TABLE IF NOT EXISTS transactions (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      stripe_payment_intent_id TEXT,
      amount INTEGER NOT NULL,
      credits INTEGER NOT NULL,
      status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
      created_at TEXT NOT NULL,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`,

    // Attachments table
    `CREATE TABLE IF NOT EXISTS attachments (
      id TEXT PRIMARY KEY,
      message_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      filename TEXT NOT NULL,
      content_type TEXT,
      size INTEGER,
      r2_key TEXT NOT NULL,
      created_at TEXT NOT NULL,
      FOREIGN KEY (message_id) REFERENCES messages (id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
    )`,
  ];

  // Indexes for better performance
  const indexes = [
    "CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations (user_id)",
    "CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations (updated_at)",
    "CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages (conversation_id)",
    "CREATE INDEX IF NOT EXISTS idx_messages_user_id ON messages (user_id)",
    "CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages (created_at)",
    "CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions (user_id)",
    "CREATE INDEX IF NOT EXISTS idx_transactions_user_id ON transactions (user_id)",
    "CREATE INDEX IF NOT EXISTS idx_attachments_message_id ON attachments (message_id)",
    "CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users (clerk_id)",
    "CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)",
  ];

  try {
    // Create tables
    for (const tableSQL of tables) {
      await db.prepare(tableSQL).run();
    }

    // Create indexes
    for (const indexSQL of indexes) {
      await db.prepare(indexSQL).run();
    }

    console.log("Database initialized successfully");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  }
}