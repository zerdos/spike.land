-- Migration: 001_initial_schema
-- Created: 2025-01-13
-- Description: Initial database schema for Spike Chat application

-- This migration sets up the core tables for the chat application
-- It includes users, conversations, messages, and related functionality

-- =============================================================================
-- ENABLE FOREIGN KEY CONSTRAINTS
-- =============================================================================
PRAGMA foreign_keys = ON;

-- =============================================================================
-- USERS TABLE
-- =============================================================================
CREATE TABLE users (
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
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_subscription_tier ON users(subscription_tier);

-- =============================================================================
-- CONVERSATIONS TABLE
-- =============================================================================
CREATE TABLE conversations (
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
CREATE INDEX idx_conversations_user_id ON conversations(user_id);
CREATE INDEX idx_conversations_created_at ON conversations(created_at);

-- =============================================================================
-- MESSAGES TABLE
-- =============================================================================
CREATE TABLE messages (
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
CREATE INDEX idx_messages_conversation_id ON messages(conversation_id);
CREATE INDEX idx_messages_role ON messages(role);
CREATE INDEX idx_messages_created_at ON messages(created_at);