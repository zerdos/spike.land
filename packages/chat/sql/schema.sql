-- =============================================================================
-- SPIKE CHAT DATABASE SCHEMA
-- =============================================================================
-- This file contains the database schema for the Spike Chat application
-- Run with: wrangler d1 execute DATABASE --file=./sql/schema.sql

-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT NOT NULL,
    username TEXT,
    first_name TEXT,
    last_name TEXT,
    avatar_url TEXT,
    subscription_tier TEXT DEFAULT 'free' CHECK (subscription_tier IN ('free', 'basic', 'premium', 'enterprise')),
    stripe_customer_id TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    last_active_at INTEGER
);

-- Create indexes for users table
CREATE INDEX IF NOT EXISTS idx_users_clerk_id ON users(clerk_id);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_subscription_tier ON users(subscription_tier);
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users(created_at);

-- =============================================================================
-- CONVERSATIONS TABLE
-- =============================================================================
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

-- Create indexes for conversations table
CREATE INDEX IF NOT EXISTS idx_conversations_user_id ON conversations(user_id);
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at);
CREATE INDEX IF NOT EXISTS idx_conversations_updated_at ON conversations(updated_at);
CREATE INDEX IF NOT EXISTS idx_conversations_archived ON conversations(is_archived);

-- =============================================================================
-- MESSAGES TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    conversation_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    token_count INTEGER,
    model TEXT,
    finish_reason TEXT,
    metadata TEXT, -- JSON string for additional data
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE CASCADE
);

-- Create indexes for messages table
CREATE INDEX IF NOT EXISTS idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX IF NOT EXISTS idx_messages_role ON messages(role);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at);

-- =============================================================================
-- ATTACHMENTS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS attachments (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL,
    filename TEXT NOT NULL,
    content_type TEXT NOT NULL,
    file_size INTEGER NOT NULL,
    r2_key TEXT NOT NULL, -- Key in R2 storage
    url TEXT, -- Public URL if applicable
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE CASCADE
);

-- Create indexes for attachments table
CREATE INDEX IF NOT EXISTS idx_attachments_message_id ON attachments(message_id);
CREATE INDEX IF NOT EXISTS idx_attachments_content_type ON attachments(content_type);

-- =============================================================================
-- USAGE TRACKING TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS usage_tracking (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    conversation_id TEXT,
    message_id TEXT,
    model TEXT NOT NULL,
    input_tokens INTEGER DEFAULT 0,
    output_tokens INTEGER DEFAULT 0,
    total_tokens INTEGER DEFAULT 0,
    cost_cents INTEGER DEFAULT 0, -- Cost in cents
    date TEXT NOT NULL, -- YYYY-MM-DD format for daily aggregation
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (conversation_id) REFERENCES conversations(id) ON DELETE SET NULL,
    FOREIGN KEY (message_id) REFERENCES messages(id) ON DELETE SET NULL
);

-- Create indexes for usage tracking
CREATE INDEX IF NOT EXISTS idx_usage_tracking_user_id ON usage_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_date ON usage_tracking(date);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_model ON usage_tracking(model);
CREATE INDEX IF NOT EXISTS idx_usage_tracking_created_at ON usage_tracking(created_at);

-- =============================================================================
-- SUBSCRIPTIONS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS subscriptions (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    stripe_subscription_id TEXT UNIQUE,
    stripe_price_id TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid', 'incomplete')),
    current_period_start INTEGER NOT NULL,
    current_period_end INTEGER NOT NULL,
    cancel_at_period_end BOOLEAN DEFAULT FALSE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for subscriptions table
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_stripe_id ON subscriptions(stripe_subscription_id);
CREATE INDEX IF NOT EXISTS idx_subscriptions_status ON subscriptions(status);

-- =============================================================================
-- API KEYS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS api_keys (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL,
    name TEXT NOT NULL,
    key_hash TEXT NOT NULL, -- SHA-256 hash of the API key
    key_prefix TEXT NOT NULL, -- First 8 characters for display
    permissions TEXT NOT NULL, -- JSON array of permissions
    last_used_at INTEGER,
    expires_at INTEGER,
    is_active BOOLEAN DEFAULT TRUE,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create indexes for API keys table
CREATE INDEX IF NOT EXISTS idx_api_keys_user_id ON api_keys(user_id);
CREATE INDEX IF NOT EXISTS idx_api_keys_key_hash ON api_keys(key_hash);
CREATE INDEX IF NOT EXISTS idx_api_keys_is_active ON api_keys(is_active);

-- =============================================================================
-- RATE LIMITS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS rate_limits (
    id TEXT PRIMARY KEY,
    identifier TEXT NOT NULL, -- user_id or IP address
    endpoint TEXT NOT NULL,
    requests_count INTEGER DEFAULT 0,
    window_start INTEGER NOT NULL,
    window_duration INTEGER NOT NULL, -- Duration in seconds
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    updated_at INTEGER NOT NULL DEFAULT (unixepoch())
);

-- Create indexes for rate limits table
CREATE INDEX IF NOT EXISTS idx_rate_limits_identifier ON rate_limits(identifier);
CREATE INDEX IF NOT EXISTS idx_rate_limits_endpoint ON rate_limits(endpoint);
CREATE INDEX IF NOT EXISTS idx_rate_limits_window_start ON rate_limits(window_start);

-- =============================================================================
-- AUDIT LOGS TABLE
-- =============================================================================
CREATE TABLE IF NOT EXISTS audit_logs (
    id TEXT PRIMARY KEY,
    user_id TEXT,
    action TEXT NOT NULL,
    resource_type TEXT NOT NULL,
    resource_id TEXT,
    details TEXT, -- JSON string for additional details
    ip_address TEXT,
    user_agent TEXT,
    created_at INTEGER NOT NULL DEFAULT (unixepoch()),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create indexes for audit logs table
CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_resource_type ON audit_logs(resource_type);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);

-- =============================================================================
-- TRIGGERS FOR UPDATED_AT COLUMNS
-- =============================================================================

-- Update updated_at timestamp for users
CREATE TRIGGER IF NOT EXISTS trigger_users_updated_at
    AFTER UPDATE ON users
    FOR EACH ROW
BEGIN
    UPDATE users SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Update updated_at timestamp for conversations
CREATE TRIGGER IF NOT EXISTS trigger_conversations_updated_at
    AFTER UPDATE ON conversations
    FOR EACH ROW
BEGIN
    UPDATE conversations SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Update updated_at timestamp for subscriptions
CREATE TRIGGER IF NOT EXISTS trigger_subscriptions_updated_at
    AFTER UPDATE ON subscriptions
    FOR EACH ROW
BEGIN
    UPDATE subscriptions SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- Update updated_at timestamp for rate_limits
CREATE TRIGGER IF NOT EXISTS trigger_rate_limits_updated_at
    AFTER UPDATE ON rate_limits
    FOR EACH ROW
BEGIN
    UPDATE rate_limits SET updated_at = unixepoch() WHERE id = NEW.id;
END;

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- View for user statistics
CREATE VIEW IF NOT EXISTS user_stats AS
SELECT
    u.id,
    u.email,
    u.subscription_tier,
    COUNT(DISTINCT c.id) as conversation_count,
    COUNT(DISTINCT m.id) as message_count,
    COALESCE(SUM(ut.total_tokens), 0) as total_tokens_used,
    COALESCE(SUM(ut.cost_cents), 0) as total_cost_cents,
    u.created_at,
    u.last_active_at
FROM users u
LEFT JOIN conversations c ON u.id = c.user_id
LEFT JOIN messages m ON c.id = m.conversation_id
LEFT JOIN usage_tracking ut ON u.id = ut.user_id
GROUP BY u.id;

-- View for conversation details with message counts
CREATE VIEW IF NOT EXISTS conversation_details AS
SELECT
    c.*,
    COUNT(m.id) as message_count,
    MAX(m.created_at) as last_message_at,
    u.email as user_email
FROM conversations c
LEFT JOIN messages m ON c.id = m.conversation_id
LEFT JOIN users u ON c.user_id = u.id
GROUP BY c.id;

-- =============================================================================
-- INITIAL DATA
-- =============================================================================

-- Insert default system user for internal operations
INSERT OR IGNORE INTO users (
    id,
    clerk_id,
    email,
    username,
    first_name,
    last_name,
    subscription_tier
) VALUES (
    'system',
    'system',
    'system@spike.land',
    'system',
    'System',
    'User',
    'enterprise'
);