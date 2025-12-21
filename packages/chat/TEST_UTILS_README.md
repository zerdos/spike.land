# Chat Package Test Utilities

This document describes the test utilities available in `/packages/chat/src/test-utils.ts` for writing tests in the chat package.

## Overview

The test utilities provide comprehensive mocking capabilities for:
- Cloudflare Workers environment (D1 Database, R2, KV, Durable Objects, AI)
- Chat-specific data models (Users, Conversations, Messages, Subscriptions, etc.)
- External services (Stripe, Clerk)
- WebSocket connections
- Authentication contexts

## Installation

The test utilities are available directly in the chat package:

```typescript
import {
  createMockChatEnv,
  createMockUser,
  createMockConversation,
  // ... other utilities
} from "../src/test-utils";
```

## Core Mock Functions

### Environment Mocking

#### `createMockChatEnv(overrides?: Partial<Env>): Env`

Creates a complete mock Cloudflare Workers environment with all required bindings.

```typescript
import { createMockChatEnv } from "../src/test-utils";

const mockEnv = createMockChatEnv();

// With custom overrides
const customEnv = createMockChatEnv({
  CLERK_SECRET_KEY: "custom-key",
  STRIPE_PRICE_ID_PRO: "custom-price",
});
```

Default values:
- `DATABASE`: Mock D1 database
- `R2_BUCKET`: Mock R2 bucket
- `KV_STORE`: Mock KV namespace
- `QUEUE`: Mock queue
- `CHAT_ROOM`: Mock Durable Object namespace
- `AI`: Mock Cloudflare AI binding
- `CLERK_SECRET_KEY`: "test-clerk-secret"
- `CLERK_WEBHOOK_SECRET`: "test-clerk-webhook-secret"
- `STRIPE_SECRET_KEY`: "test-stripe-secret"
- `STRIPE_WEBHOOK_SECRET`: "test-stripe-webhook-secret"
- `STRIPE_PRICE_ID_PRO`: "price_pro_test"
- `STRIPE_PRICE_ID_BUSINESS`: "price_business_test"
- `JWT_SECRET`: "test-jwt-secret"

### Database Mocking

#### `createMockD1Database(): D1Database`

Creates a mock D1 database with chainable methods.

```typescript
import { createMockD1Database } from "../src/test-utils";

const db = createMockD1Database();

// All methods return vi.fn() mocks
db.prepare("SELECT * FROM users")
  .bind("user-123")
  .first(); // Returns null by default
```

#### `createMockPreparedStatement<T>(config?: {...}): D1PreparedStatement`

Creates a mock prepared statement with custom responses.

```typescript
import { createMockPreparedStatement, createMockUser } from "../src/test-utils";

const mockUser = createMockUser();
const stmt = createMockPreparedStatement({
  first: mockUser,
  all: [mockUser],
  run: { success: true, meta: { changes: 1 } },
});

mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(stmt);
```

#### `createMockD1Result<T>(results: T[], success?: boolean): D1Result<T>`

Creates a properly formatted D1 result object.

```typescript
import { createMockD1Result, createMockMessage } from "../src/test-utils";

const messages = [
  createMockMessage({ content: "Hello" }),
  createMockMessage({ content: "World" }),
];

const result = createMockD1Result(messages);
// result.results === messages
// result.success === true
// result.meta is populated
```

### Storage Mocking

#### `createMockR2Bucket(): R2Bucket`

Creates a mock R2 bucket for file storage operations.

```typescript
import { createMockR2Bucket } from "../src/test-utils";

const bucket = createMockR2Bucket();

// All methods are vi.fn() mocks
await bucket.put("key", "data");
await bucket.get("key");
```

#### `createMockKVNamespace(): KVNamespace`

Creates a mock KV namespace for key-value storage.

```typescript
import { createMockKVNamespace } from "../src/test-utils";

const kv = createMockKVNamespace();

await kv.put("session:123", "data");
await kv.get("session:123");
```

### Data Model Mocking

#### `createMockUser(overrides?: Partial<User>): User`

Creates a mock user with realistic defaults.

```typescript
import { createMockUser } from "../src/test-utils";

const user = createMockUser();
// Default: free tier, 10 credits, test email

const proUser = createMockUser({
  subscription_tier: "pro",
  credits: 500,
  email: "pro@example.com",
});
```

#### `createMockConversation(overrides?: Partial<Conversation>): Conversation`

Creates a mock conversation.

```typescript
import { createMockConversation } from "../src/test-utils";

const conversation = createMockConversation({
  title: "My Chat",
  model: "gpt-4",
});
```

#### `createMockMessage(overrides?: Partial<Message>): Message`

Creates a mock message.

```typescript
import { createMockMessage } from "../src/test-utils";

const userMessage = createMockMessage({
  role: "user",
  content: "Hello AI!",
});

const assistantMessage = createMockMessage({
  role: "assistant",
  content: "Hello! How can I help?",
});
```

#### `createMockSubscription(overrides?: Partial<Subscription>): Subscription`

Creates a mock subscription.

```typescript
import { createMockSubscription } from "../src/test-utils";

const subscription = createMockSubscription({
  status: "active",
  stripe_price_id: "price_business_test",
});
```

#### `createMockTransaction(overrides?: Partial<Transaction>): Transaction`

Creates a mock transaction record.

#### `createMockAttachment(overrides?: Partial<Attachment>): Attachment`

Creates a mock file attachment.

### Service Mocking

#### `createMockAuthService()`

Creates a mock AuthService with all methods stubbed.

```typescript
import { createMockAuthService } from "../src/test-utils";

const authService = createMockAuthService();

// All methods are vi.fn() mocks with sensible defaults
const auth = await authService.verifyRequest(request); // Returns mock auth context
const user = await authService.getUserFromClerkId("clerk-123"); // Returns mock user
const hasCredits = await authService.checkUserCredits("user-123", 10); // Returns true
```

#### `createMockAIService()`

Creates a mock AIService with all methods stubbed.

```typescript
import { createMockAIService } from "../src/test-utils";

const aiService = createMockAIService();

const response = await aiService.generateResponse({
  model: "llama-2-7b",
  messages: [{ role: "user", content: "Hello" }],
});
// Returns: "Test AI response"

const tokens = await aiService.countTokens("Hello"); // Returns: 10
const isSafe = await aiService.moderateContent("Hello"); // Returns: true
```

#### `createMockStripe()`

Creates a mock Stripe client.

```typescript
import { createMockStripe } from "../src/test-utils";

const stripe = createMockStripe();

const customer = await stripe.customers.create({ email: "test@example.com" });
const subscription = await stripe.subscriptions.create({
  customer: customer.id,
  items: [{ price: "price_test" }],
});
```

#### `createMockClerkAuth(userId?, clerkId?, sessionId?): AuthContext`

Creates a mock authentication context.

```typescript
import { createMockClerkAuth } from "../src/test-utils";

const auth = createMockClerkAuth("user-123", "clerk-123");
// Returns: { userId: "user-123", clerkId: "clerk-123", sessionId: "test-session-id" }
```

### WebSocket Mocking

#### `setupWebSocketMocks()`

Sets up global WebSocket mocks for testing WebSocket connections.

```typescript
import { setupWebSocketMocks } from "../src/test-utils";

beforeEach(() => {
  setupWebSocketMocks();
});

// Now you can use WebSocket and WebSocketPair in tests
const [client, server] = new WebSocketPair();
```

#### `createMockWebSocket()`

Creates a single mock WebSocket.

```typescript
import { createMockWebSocket } from "../src/test-utils";

const ws = createMockWebSocket();

ws.accept(); // Changes readyState to OPEN
ws.send("message");
ws.close(); // Changes readyState to CLOSED
```

#### `createMockWebSocketPair()`

Creates a pair of mock WebSockets (client and server).

### Request Mocking

#### `createMockRequest(url: string, options?: RequestInit & {...}): Request`

Creates a mock Request with convenient helpers.

```typescript
import { createMockRequest } from "../src/test-utils";

// Simple request
const req = createMockRequest("http://localhost/api/conversations");

// With authentication
const authReq = createMockRequest("http://localhost/api/messages", {
  userId: "user-123",
  method: "POST",
  body: JSON.stringify({ content: "Hello" }),
});

// WebSocket request
const wsReq = createMockRequest("http://localhost/websocket", {
  userId: "user-123",
  conversationId: "conv-456",
  headers: { Upgrade: "websocket" },
});
```

## Common Patterns

### Testing API Endpoints

```typescript
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ConversationsAPI } from "../src/api/conversations";
import {
  createMockChatEnv,
  createMockConversation,
  createMockPreparedStatement,
  createMockRequest,
} from "../src/test-utils";

describe("ConversationsAPI", () => {
  let api: ConversationsAPI;
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = createMockChatEnv();
    api = new ConversationsAPI(mockEnv);
  });

  it("should list user conversations", async () => {
    const conversations = [
      createMockConversation({ id: "conv-1" }),
      createMockConversation({ id: "conv-2" }),
    ];

    mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(
      createMockPreparedStatement({
        all: conversations,
      }),
    );

    const request = createMockRequest("http://localhost/api/conversations", {
      userId: "user-123",
    });

    const response = await api.list(request);
    const data = await response.json();

    expect(data.success).toBe(true);
    expect(data.data).toHaveLength(2);
  });
});
```

### Testing with Authentication

```typescript
import { createMockAuthService, createMockUser } from "../src/test-utils";

vi.mock("../src/utils/auth", () => ({
  AuthService: vi.fn().mockImplementation(() => createMockAuthService()),
}));

it("should authenticate requests", async () => {
  const mockAuth = createMockAuthService();
  mockAuth.verifyRequest.mockResolvedValue({
    userId: "user-123",
    clerkId: "clerk-123",
    sessionId: "session-123",
  });

  const user = createMockUser({ id: "user-123" });
  mockAuth.getUserFromClerkId.mockResolvedValue(user);

  // Test authenticated endpoint
});
```

### Testing WebSocket Handlers

```typescript
import { setupWebSocketMocks, createMockWebSocket } from "../src/test-utils";

describe("ChatRoom", () => {
  beforeEach(() => {
    setupWebSocketMocks();
  });

  it("should handle WebSocket connections", () => {
    const ws = createMockWebSocket();

    ws.accept();
    expect(ws.readyState).toBe(ws.READY_STATE_OPEN);

    ws.send(JSON.stringify({ type: "message", content: "Hello" }));
    expect(ws.send).toHaveBeenCalled();
  });
});
```

### Testing Database Queries

```typescript
import {
  createMockChatEnv,
  createMockPreparedStatement,
  createMockUser,
} from "../src/test-utils";

it("should query database", async () => {
  const mockEnv = createMockChatEnv();
  const mockUser = createMockUser({ id: "user-123" });

  mockEnv.DATABASE.prepare = vi.fn().mockReturnValue(
    createMockPreparedStatement({
      first: mockUser,
    }),
  );

  const stmt = mockEnv.DATABASE.prepare("SELECT * FROM users WHERE id = ?");
  const result = await stmt.bind("user-123").first();

  expect(result).toEqual(mockUser);
  expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
    "SELECT * FROM users WHERE id = ?",
  );
});
```

## Complete Example

See `/packages/chat/tests/test-utils.example.test.ts` for a comprehensive example showing all utilities in action.

## Tips

1. **Always use `beforeEach`** to reset mocks between tests
2. **Chain mock methods** for D1 database operations (`prepare().bind().first()`)
3. **Override defaults** when needed using the overrides parameter
4. **Setup WebSocket mocks** in `beforeEach` for consistent behavior
5. **Use `createMockRequest`** for consistent header setup
6. **Mock services** at the module level using `vi.mock()`

## Reference

For type definitions, see:
- `/packages/chat/src/types/index.ts` - All data model types
- `/packages/chat/src/test-utils.ts` - Complete test utility implementation
