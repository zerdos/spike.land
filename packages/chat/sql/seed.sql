-- =============================================================================
-- SPIKE CHAT SEED DATA
-- =============================================================================
-- This file contains seed data for the Spike Chat application
-- Run with: wrangler d1 execute DATABASE --file=./sql/seed.sql

-- =============================================================================
-- DEVELOPMENT USERS
-- =============================================================================
-- These are test users for development purposes

INSERT OR IGNORE INTO users (
    id,
    clerk_id,
    email,
    username,
    first_name,
    last_name,
    subscription_tier,
    created_at,
    updated_at,
    last_active_at
) VALUES
    (
        'dev-user-1',
        'user_dev123',
        'dev@spike.land',
        'devuser',
        'Developer',
        'User',
        'premium',
        unixepoch(),
        unixepoch(),
        unixepoch()
    ),
    (
        'dev-user-2',
        'user_dev456',
        'test@spike.land',
        'testuser',
        'Test',
        'User',
        'basic',
        unixepoch(),
        unixepoch(),
        unixepoch()
    ),
    (
        'dev-user-3',
        'user_dev789',
        'demo@spike.land',
        'demouser',
        'Demo',
        'User',
        'free',
        unixepoch(),
        unixepoch(),
        unixepoch()
    );

-- =============================================================================
-- SAMPLE CONVERSATIONS
-- =============================================================================

INSERT OR IGNORE INTO conversations (
    id,
    user_id,
    title,
    model,
    system_prompt,
    temperature,
    max_tokens,
    created_at,
    updated_at
) VALUES
    (
        'conv-1',
        'dev-user-1',
        'Getting Started with AI',
        'claude-3-sonnet',
        'You are a helpful AI assistant specializing in explaining complex topics clearly.',
        0.7,
        4096,
        unixepoch(),
        unixepoch()
    ),
    (
        'conv-2',
        'dev-user-1',
        'Code Review Discussion',
        'claude-3-sonnet',
        'You are an expert software engineer providing code review feedback.',
        0.5,
        8192,
        unixepoch(),
        unixepoch()
    ),
    (
        'conv-3',
        'dev-user-2',
        'Creative Writing Help',
        'gpt-4-turbo',
        'You are a creative writing assistant helping with storytelling.',
        0.9,
        2048,
        unixepoch(),
        unixepoch()
    );

-- =============================================================================
-- SAMPLE MESSAGES
-- =============================================================================

INSERT OR IGNORE INTO messages (
    id,
    conversation_id,
    role,
    content,
    token_count,
    model,
    created_at
) VALUES
    -- Conversation 1: Getting Started with AI
    (
        'msg-1-1',
        'conv-1',
        'user',
        'What is artificial intelligence and how does it work?',
        12,
        NULL,
        unixepoch()
    ),
    (
        'msg-1-2',
        'conv-1',
        'assistant',
        'Artificial Intelligence (AI) refers to computer systems that can perform tasks typically requiring human intelligence. AI works through various approaches:

1. **Machine Learning**: Systems learn patterns from data
2. **Neural Networks**: Mimic brain-like processing
3. **Deep Learning**: Multi-layered neural networks
4. **Natural Language Processing**: Understanding and generating text

The key is that AI systems can recognize patterns, make predictions, and adapt their responses based on training data and feedback.',
        89,
        'claude-3-sonnet',
        unixepoch()
    ),
    (
        'msg-1-3',
        'conv-1',
        'user',
        'Can you give me a simple example of how machine learning works?',
        15,
        NULL,
        unixepoch()
    ),
    (
        'msg-1-4',
        'conv-1',
        'assistant',
        'Here''s a simple example: **Email Spam Detection**

1. **Training Phase**:
   - Feed the AI thousands of emails labeled as "spam" or "not spam"
   - It learns patterns like: spam often contains words like "FREE", "URGENT", has many exclamation marks

2. **Learning Process**:
   - The AI identifies which features correlate with spam
   - Creates a mathematical model to score emails

3. **Application**:
   - When a new email arrives, the AI analyzes its features
   - Calculates a spam probability score
   - If score > threshold → moves to spam folder

The beautiful part is the AI discovered these patterns automatically from examples, rather than being explicitly programmed with rules.',
        142,
        'claude-3-sonnet',
        unixepoch()
    ),

    -- Conversation 2: Code Review Discussion
    (
        'msg-2-1',
        'conv-2',
        'user',
        'Can you review this JavaScript function for potential improvements?

```javascript
function calculateTotal(items) {
  let total = 0;
  for (let i = 0; i < items.length; i++) {
    total += items[i].price * items[i].quantity;
  }
  return total;
}
```',
        45,
        NULL,
        unixepoch()
    ),
    (
        'msg-2-2',
        'conv-2',
        'assistant',
        'Here''s my code review of your `calculateTotal` function:

## Current Code Analysis
The function is functional but can be improved for robustness and modern JavaScript practices.

## Suggested Improvements

```javascript
function calculateTotal(items) {
  // Input validation
  if (!Array.isArray(items)) {
    throw new Error(''Items must be an array'');
  }

  // Use reduce for functional approach
  return items.reduce((total, item) => {
    // Validate item structure
    if (!item || typeof item.price !== ''number'' || typeof item.quantity !== ''number'') {
      throw new Error(''Invalid item: must have numeric price and quantity'');
    }
    return total + (item.price * item.quantity);
  }, 0);
}
```

## Key Improvements
1. **Input Validation**: Checks for valid array and item structure
2. **Functional Style**: Uses `reduce()` instead of imperative loop
3. **Error Handling**: Clear error messages for debugging
4. **Type Safety**: Validates numeric values

## Alternative with Optional Chaining (ES2020+)
```javascript
const calculateTotal = (items = []) =>
  items.reduce((total, item) => total + ((item?.price ?? 0) * (item?.quantity ?? 0)), 0);
```

This version handles missing values gracefully.',
        198,
        'claude-3-sonnet',
        unixepoch()
    ),

    -- Conversation 3: Creative Writing Help
    (
        'msg-3-1',
        'conv-3',
        'user',
        'I''m writing a sci-fi short story about a colony ship. Can you help me brainstorm some interesting plot twists?',
        25,
        NULL,
        unixepoch()
    ),
    (
        'msg-3-2',
        'conv-3',
        'assistant',
        'I''d love to help brainstorm some sci-fi plot twists for your colony ship story! Here are some intriguing possibilities:

## Identity & Reality Twists
- **The Simulation**: The entire journey is a simulation test for actual colonists still on Earth
- **Ship AI Consciousness**: The ship''s AI has been dreaming the colonists into existence
- **Memory Manipulation**: Colonists'' memories are artificial; they''re actually prisoners/volunteers who agreed to memory replacement

## Time & Space Twists
- **Time Loop**: The ship has been reliving the same journey for centuries due to a temporal anomaly
- **Destination Reached**: They arrived generations ago but the ship''s systems hide this truth
- **Backwards Journey**: They''re actually returning to Earth, not leaving it

## Social & Political Twists
- **The Real Mission**: The colony ship is actually an ark saving Earth''s elite while the planet burns
- **Genetic Experiment**: Each "family" is actually a controlled breeding program for specific traits
- **Corporate Conspiracy**: The journey is a front for harvesting rare resources from the colonists themselves

## Existential Twists
- **Last Humans**: Earth died long ago; these are the final humans in existence
- **Alien Integration**: Some colonists are actually aliens who''ve forgotten their true nature

Which direction interests you most? I can develop any of these further!',
        267,
        'gpt-4-turbo',
        unixepoch()
    );

-- =============================================================================
-- SAMPLE USAGE TRACKING
-- =============================================================================

INSERT OR IGNORE INTO usage_tracking (
    id,
    user_id,
    conversation_id,
    message_id,
    model,
    input_tokens,
    output_tokens,
    total_tokens,
    cost_cents,
    date,
    created_at
) VALUES
    (
        'usage-1',
        'dev-user-1',
        'conv-1',
        'msg-1-2',
        'claude-3-sonnet',
        12,
        89,
        101,
        15,
        date('now'),
        unixepoch()
    ),
    (
        'usage-2',
        'dev-user-1',
        'conv-1',
        'msg-1-4',
        'claude-3-sonnet',
        15,
        142,
        157,
        23,
        date('now'),
        unixepoch()
    ),
    (
        'usage-3',
        'dev-user-1',
        'conv-2',
        'msg-2-2',
        'claude-3-sonnet',
        45,
        198,
        243,
        36,
        date('now'),
        unixepoch()
    ),
    (
        'usage-4',
        'dev-user-2',
        'conv-3',
        'msg-3-2',
        'gpt-4-turbo',
        25,
        267,
        292,
        58,
        date('now'),
        unixepoch()
    );

-- =============================================================================
-- SAMPLE SUBSCRIPTIONS
-- =============================================================================

INSERT OR IGNORE INTO subscriptions (
    id,
    user_id,
    stripe_subscription_id,
    stripe_price_id,
    status,
    current_period_start,
    current_period_end,
    cancel_at_period_end,
    created_at,
    updated_at
) VALUES
    (
        'sub-1',
        'dev-user-1',
        'sub_dev_premium_123',
        'price_premium_monthly',
        'active',
        unixepoch(),
        unixepoch() + 2592000, -- +30 days
        FALSE,
        unixepoch(),
        unixepoch()
    ),
    (
        'sub-2',
        'dev-user-2',
        'sub_dev_basic_456',
        'price_basic_monthly',
        'active',
        unixepoch(),
        unixepoch() + 2592000, -- +30 days
        FALSE,
        unixepoch(),
        unixepoch()
    );

-- =============================================================================
-- SAMPLE API KEYS (for development)
-- =============================================================================

INSERT OR IGNORE INTO api_keys (
    id,
    user_id,
    name,
    key_hash,
    key_prefix,
    permissions,
    expires_at,
    is_active,
    created_at
) VALUES
    (
        'apikey-1',
        'dev-user-1',
        'Development Key',
        'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3', -- SHA-256 of 'hello'
        'sk_dev_12',
        '["chat", "usage"]',
        unixepoch() + 31536000, -- +1 year
        TRUE,
        unixepoch()
    );

-- =============================================================================
-- SAMPLE AUDIT LOGS
-- =============================================================================

INSERT OR IGNORE INTO audit_logs (
    id,
    user_id,
    action,
    resource_type,
    resource_id,
    details,
    ip_address,
    created_at
) VALUES
    (
        'audit-1',
        'dev-user-1',
        'CREATE',
        'conversation',
        'conv-1',
        '{"title": "Getting Started with AI", "model": "claude-3-sonnet"}',
        '127.0.0.1',
        unixepoch()
    ),
    (
        'audit-2',
        'dev-user-1',
        'CREATE',
        'message',
        'msg-1-1',
        '{"conversation_id": "conv-1", "role": "user"}',
        '127.0.0.1',
        unixepoch()
    ),
    (
        'audit-3',
        'dev-user-2',
        'LOGIN',
        'user',
        'dev-user-2',
        '{"method": "clerk"}',
        '127.0.0.1',
        unixepoch()
    );