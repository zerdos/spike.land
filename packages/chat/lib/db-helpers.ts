import type { D1Database } from "@cloudflare/workers-types";

export interface DatabaseEnv {
  DATABASE?: D1Database;
}

// Helper to get D1 database from the environment
export function getD1Database(): D1Database | null {
  // In Cloudflare Workers/Pages, the D1 database is available through the platform
  if (typeof process !== "undefined" && process.env) {
    const platformEnv = ((globalThis as Record<string, unknown>).__env__ ||
                        (globalThis as Record<string, unknown>).env ||
                        process.env) as Record<string, unknown>;
    if (platformEnv?.DATABASE) {
      return platformEnv.DATABASE as D1Database;
    }
  }

  // Check if it's available on globalThis (for Cloudflare Workers)
  if ((globalThis as Record<string, unknown>).DATABASE) {
    return (globalThis as Record<string, unknown>).DATABASE as D1Database;
  }

  // In development or when not properly configured
  console.warn("D1 Database not available - using in-memory storage");
  return null;
}

// User operations
export async function getUserByClerkId(db: D1Database, clerkId: string) {
  const result = await db
    .prepare("SELECT * FROM users WHERE clerk_id = ? LIMIT 1")
    .bind(clerkId)
    .first();
  return result;
}

export async function createOrUpdateUser(
  db: D1Database,
  userData: {
    clerk_id: string;
    email: string;
    username?: string;
    first_name?: string;
    last_name?: string;
    avatar_url?: string;
  }
) {
  const existingUser = await getUserByClerkId(db, userData.clerk_id);

  if (existingUser) {
    // Update existing user
    await db
      .prepare(`
        UPDATE users
        SET email = ?, username = ?, first_name = ?, last_name = ?,
            avatar_url = ?, updated_at = unixepoch()
        WHERE clerk_id = ?
      `)
      .bind(
        userData.email,
        userData.username || null,
        userData.first_name || null,
        userData.last_name || null,
        userData.avatar_url || null,
        userData.clerk_id
      )
      .run();
    return getUserByClerkId(db, userData.clerk_id);
  } else {
    // Create new user
    const userId = crypto.randomUUID();
    await db
      .prepare(`
        INSERT INTO users (
          id, clerk_id, email, username, first_name, last_name,
          avatar_url, subscription_tier, created_at, updated_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?, 'free', unixepoch(), unixepoch())
      `)
      .bind(
        userId,
        userData.clerk_id,
        userData.email,
        userData.username || null,
        userData.first_name || null,
        userData.last_name || null,
        userData.avatar_url || null
      )
      .run();
    return getUserByClerkId(db, userData.clerk_id);
  }
}

// Conversation operations
export async function getConversationsByUserId(db: D1Database, userId: string) {
  const result = await db
    .prepare(`
      SELECT c.*, COUNT(m.id) as message_count
      FROM conversations c
      LEFT JOIN messages m ON c.id = m.conversation_id
      WHERE c.user_id = ?
      GROUP BY c.id
      ORDER BY c.updated_at DESC
      LIMIT 50
    `)
    .bind(userId)
    .all();
  return result.results || [];
}

export async function getConversationById(db: D1Database, conversationId: string) {
  const result = await db
    .prepare("SELECT * FROM conversations WHERE id = ? LIMIT 1")
    .bind(conversationId)
    .first();
  return result;
}

export async function createConversation(
  db: D1Database,
  data: {
    user_id: string;
    title?: string;
    model?: string;
  }
) {
  const conversationId = crypto.randomUUID();
  await db
    .prepare(`
      INSERT INTO conversations (
        id, user_id, title, model, created_at, updated_at
      ) VALUES (?, ?, ?, ?, unixepoch(), unixepoch())
    `)
    .bind(
      conversationId,
      data.user_id,
      data.title || "New Conversation",
      data.model || "claude-3-sonnet"
    )
    .run();
  return getConversationById(db, conversationId);
}

export async function updateConversation(
  db: D1Database,
  conversationId: string,
  updates: {
    title?: string;
    model?: string;
  }
) {
  const fields = [];
  const values = [];

  if (updates.title !== undefined) {
    fields.push("title = ?");
    values.push(updates.title);
  }

  if (updates.model !== undefined) {
    fields.push("model = ?");
    values.push(updates.model);
  }

  if (fields.length === 0) return;

  fields.push("updated_at = unixepoch()");
  values.push(conversationId);

  await db
    .prepare(`UPDATE conversations SET ${fields.join(", ")} WHERE id = ?`)
    .bind(...values)
    .run();
}

export async function deleteConversation(db: D1Database, conversationId: string) {
  // Messages will be deleted automatically due to ON DELETE CASCADE
  const result = await db
    .prepare("DELETE FROM conversations WHERE id = ?")
    .bind(conversationId)
    .run();
  return result.meta.changes > 0;
}

// Message operations
export async function getMessagesByConversationId(db: D1Database, conversationId: string) {
  const result = await db
    .prepare(`
      SELECT * FROM messages
      WHERE conversation_id = ?
      ORDER BY created_at ASC
      LIMIT 100
    `)
    .bind(conversationId)
    .all();
  return result.results || [];
}

export async function createMessage(
  db: D1Database,
  data: {
    conversation_id: string;
    role: "user" | "assistant" | "system";
    content: string;
    model?: string;
    token_count?: number;
  }
) {
  const messageId = crypto.randomUUID();
  await db
    .prepare(`
      INSERT INTO messages (
        id, conversation_id, role, content, model, token_count, created_at
      ) VALUES (?, ?, ?, ?, ?, ?, unixepoch())
    `)
    .bind(
      messageId,
      data.conversation_id,
      data.role,
      data.content,
      data.model || null,
      data.token_count || null
    )
    .run();

  // Update conversation's updated_at timestamp
  await db
    .prepare("UPDATE conversations SET updated_at = unixepoch() WHERE id = ?")
    .bind(data.conversation_id)
    .run();

  return {
    id: messageId,
    ...data,
    created_at: new Date().toISOString()
  };
}

// Combined operations
export async function getConversationWithMessages(db: D1Database, conversationId: string) {
  const [conversation, messages] = await Promise.all([
    getConversationById(db, conversationId),
    getMessagesByConversationId(db, conversationId)
  ]);

  if (!conversation) return null;

  return {
    ...conversation,
    messages
  };
}

// Initialize database schema (run once during setup)
export async function initializeSchema(db: D1Database) {
  try {
    // Check if tables exist
    const tablesResult = await db
      .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name='users'")
      .first();

    if (tablesResult) {
      console.log("Database schema already initialized");
      return;
    }

    // Read and execute the schema file
    const schemaSQL = `
      -- Users table
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        clerk_id TEXT UNIQUE NOT NULL,
        email TEXT NOT NULL,
        username TEXT,
        first_name TEXT,
        last_name TEXT,
        avatar_url TEXT,
        subscription_tier TEXT DEFAULT 'free',
        stripe_customer_id TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        last_active_at INTEGER
      );

      -- Conversations table
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT,
        model TEXT NOT NULL DEFAULT 'claude-3-sonnet',
        system_prompt TEXT,
        temperature REAL DEFAULT 0.7,
        max_tokens INTEGER DEFAULT 4096,
        is_archived BOOLEAN DEFAULT FALSE,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );

      -- Messages table
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
        content TEXT NOT NULL,
        token_count INTEGER,
        model TEXT,
        finish_reason TEXT,
        metadata TEXT,
        created_at INTEGER NOT NULL DEFAULT (unixepoch()),
        FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
      );

      -- Create indexes
      CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
      CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
      CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at);
      CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
      CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);
    `;

    // Execute schema
    const statements = schemaSQL.split(';').filter(s => s.trim());
    for (const statement of statements) {
      if (statement.trim()) {
        await db.prepare(statement).run();
      }
    }

    console.log("Database schema initialized successfully");
  } catch (error) {
    console.error("Failed to initialize database schema:", error);
    throw error;
  }
}