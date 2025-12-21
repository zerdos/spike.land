import type {
  Ai,
  D1Database,
  D1PreparedStatement,
  D1Result,
  DurableObjectNamespace,
  KVNamespace,
  Queue,
  R2Bucket,
} from "@cloudflare/workers-types";
import { vi } from "vitest";
import type {
  Attachment,
  AuthContext,
  Conversation,
  Env,
  Message,
  Subscription,
  Transaction,
  User,
} from "./types";

/**
 * Create a mock D1Database for testing
 */
export function createMockD1Database(): D1Database {
  const mockStatement: D1PreparedStatement = {
    bind: vi.fn().mockReturnThis(),
    first: vi.fn().mockResolvedValue(null),
    run: vi.fn().mockResolvedValue({ success: true, meta: { changes: 0 } }),
    all: vi.fn().mockResolvedValue({ results: [], success: true, meta: {} }),
    raw: vi.fn().mockResolvedValue([]),
  };

  return {
    prepare: vi.fn().mockReturnValue(mockStatement),
    dump: vi.fn(),
    batch: vi.fn().mockResolvedValue([]),
    exec: vi.fn().mockResolvedValue({ count: 0, duration: 0 }),
  } as unknown as D1Database;
}

/**
 * Create a mock R2Bucket for testing
 */
export function createMockR2Bucket(): R2Bucket {
  return {
    head: vi.fn().mockResolvedValue(null),
    get: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue({
      key: "test-key",
      version: "test-version",
      size: 0,
      etag: "test-etag",
      httpEtag: "test-http-etag",
      checksums: {},
      uploaded: new Date(),
    }),
    delete: vi.fn().mockResolvedValue(undefined),
    list: vi.fn().mockResolvedValue({
      objects: [],
      truncated: false,
      cursor: undefined,
      delimitedPrefixes: [],
    }),
    createMultipartUpload: vi.fn(),
    resumeMultipartUpload: vi.fn(),
    abortMultipartUpload: vi.fn(),
    completeMultipartUpload: vi.fn(),
  } as unknown as R2Bucket;
}

/**
 * Create a mock KVNamespace for testing
 */
export function createMockKVNamespace(): KVNamespace {
  return {
    get: vi.fn().mockResolvedValue(null),
    put: vi.fn().mockResolvedValue(undefined),
    delete: vi.fn().mockResolvedValue(undefined),
    list: vi.fn().mockResolvedValue({
      keys: [],
      list_complete: true,
      cursor: undefined,
    }),
    getWithMetadata: vi.fn().mockResolvedValue({ value: null, metadata: null }),
  } as unknown as KVNamespace;
}

/**
 * Create a mock Queue for testing
 */
export function createMockQueue(): Queue {
  return {
    send: vi.fn().mockResolvedValue(undefined),
    sendBatch: vi.fn().mockResolvedValue(undefined),
  } as unknown as Queue;
}

/**
 * Create a mock DurableObjectNamespace for testing
 */
export function createMockDurableObjectNamespace(): DurableObjectNamespace {
  return {
    newUniqueId: vi.fn().mockReturnValue({
      toString: () => "test-id",
      equals: vi.fn(),
      name: undefined,
    }),
    idFromName: vi.fn().mockReturnValue({
      toString: () => "test-id",
      equals: vi.fn(),
      name: "test-name",
    }),
    idFromString: vi.fn().mockReturnValue({
      toString: () => "test-id",
      equals: vi.fn(),
      name: undefined,
    }),
    get: vi.fn().mockReturnValue({
      fetch: vi.fn().mockResolvedValue(new Response("OK")),
    }),
  } as unknown as DurableObjectNamespace;
}

/**
 * Create a mock Cloudflare AI binding for testing
 */
export function createMockAi(): Ai {
  return {
    run: vi.fn().mockResolvedValue({
      response: "Test AI response",
    }),
  } as unknown as Ai;
}

/**
 * Create a mock environment for chat workers
 */
export function createMockChatEnv(overrides?: Partial<Env>): Env {
  return {
    DATABASE: createMockD1Database(),
    R2_BUCKET: createMockR2Bucket(),
    KV_STORE: createMockKVNamespace(),
    QUEUE: createMockQueue(),
    CHAT_ROOM: createMockDurableObjectNamespace(),
    AI: createMockAi(),
    CLERK_SECRET_KEY: "test-clerk-secret",
    CLERK_WEBHOOK_SECRET: "test-clerk-webhook-secret",
    STRIPE_SECRET_KEY: "test-stripe-secret",
    STRIPE_WEBHOOK_SECRET: "test-stripe-webhook-secret",
    STRIPE_PRICE_ID_PRO: "price_pro_test",
    STRIPE_PRICE_ID_ENTERPRISE: "price_enterprise_test",
    JWT_SECRET: "test-jwt-secret",
    ...overrides,
  };
}

/**
 * Create a mock Stripe client for testing
 */
export function createMockStripe() {
  return {
    customers: {
      create: vi.fn().mockResolvedValue({
        id: "cus_test123",
        email: "test@example.com",
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: "cus_test123",
        email: "test@example.com",
      }),
      update: vi.fn().mockResolvedValue({
        id: "cus_test123",
        email: "test@example.com",
      }),
      del: vi.fn().mockResolvedValue({ id: "cus_test123", deleted: true }),
    },
    subscriptions: {
      create: vi.fn().mockResolvedValue({
        id: "sub_test123",
        customer: "cus_test123",
        status: "active",
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 2592000,
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: "sub_test123",
        customer: "cus_test123",
        status: "active",
        current_period_start: Math.floor(Date.now() / 1000),
        current_period_end: Math.floor(Date.now() / 1000) + 2592000,
      }),
      update: vi.fn().mockResolvedValue({
        id: "sub_test123",
        status: "active",
      }),
      cancel: vi.fn().mockResolvedValue({
        id: "sub_test123",
        status: "canceled",
      }),
    },
    paymentIntents: {
      create: vi.fn().mockResolvedValue({
        id: "pi_test123",
        status: "succeeded",
        amount: 1000,
      }),
      retrieve: vi.fn().mockResolvedValue({
        id: "pi_test123",
        status: "succeeded",
        amount: 1000,
      }),
    },
    checkout: {
      sessions: {
        create: vi.fn().mockResolvedValue({
          id: "cs_test123",
          url: "https://checkout.stripe.com/test",
        }),
        retrieve: vi.fn().mockResolvedValue({
          id: "cs_test123",
          url: "https://checkout.stripe.com/test",
        }),
      },
    },
    webhooks: {
      constructEvent: vi.fn(),
    },
  };
}

/**
 * Create a mock Clerk authentication context
 */
export function createMockClerkAuth(
  userId?: string,
  clerkId?: string,
  sessionId?: string,
): AuthContext {
  return {
    userId: userId ?? "test-user-id",
    clerkId: clerkId ?? "clerk-test-id",
    sessionId: sessionId ?? "test-session-id",
  };
}

/**
 * Create a mock user for testing
 */
export function createMockUser(overrides?: Partial<User>): User {
  const now = new Date().toISOString();
  return {
    id: "user-test-123",
    clerk_id: "clerk-test-123",
    email: "test@example.com",
    name: "Test User",
    subscription_tier: "free",
    credits: 10,
    stripe_customer_id: "cus_test123",
    created_at: now,
    updated_at: now,
    ...overrides,
  };
}

/**
 * Create a mock conversation for testing
 */
export function createMockConversation(overrides?: Partial<Conversation>): Conversation {
  const now = new Date().toISOString();
  return {
    id: "conv-test-123",
    user_id: "user-test-123",
    title: "Test Conversation",
    model: "llama-2-7b",
    created_at: now,
    updated_at: now,
    ...overrides,
  };
}

/**
 * Create a mock message for testing
 */
export function createMockMessage(overrides?: Partial<Message>): Message {
  return {
    id: "msg-test-123",
    conversation_id: "conv-test-123",
    user_id: "user-test-123",
    role: "user",
    content: "Test message content",
    tokens_used: 10,
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock subscription for testing
 */
export function createMockSubscription(overrides?: Partial<Subscription>): Subscription {
  const now = new Date().toISOString();
  const periodStart = new Date();
  const periodEnd = new Date(periodStart.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days

  return {
    id: "sub-test-123",
    user_id: "user-test-123",
    stripe_subscription_id: "sub_stripe_test123",
    stripe_price_id: "price_pro_test",
    status: "active",
    current_period_start: periodStart.toISOString(),
    current_period_end: periodEnd.toISOString(),
    cancel_at_period_end: false,
    created_at: now,
    updated_at: now,
    ...overrides,
  };
}

/**
 * Create a mock transaction for testing
 */
export function createMockTransaction(overrides?: Partial<Transaction>): Transaction {
  return {
    id: "txn-test-123",
    user_id: "user-test-123",
    stripe_payment_intent_id: "pi_test123",
    amount: 1000,
    credits: 100,
    status: "completed",
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock attachment for testing
 */
export function createMockAttachment(overrides?: Partial<Attachment>): Attachment {
  return {
    id: "att-test-123",
    message_id: "msg-test-123",
    user_id: "user-test-123",
    filename: "test-file.pdf",
    content_type: "application/pdf",
    size: 1024,
    r2_key: "attachments/test-file.pdf",
    created_at: new Date().toISOString(),
    ...overrides,
  };
}

/**
 * Create a mock Request with default headers
 */
export function createMockRequest(
  url: string,
  options?: RequestInit & {
    userId?: string;
    conversationId?: string;
  },
): Request {
  const headers = new Headers(options?.headers);

  // Add authorization header if not present
  if (!headers.has("Authorization") && options?.userId) {
    headers.set("Authorization", "Bearer test-token");
  }

  // Add user ID header for WebSocket requests
  if (options?.userId) {
    headers.set("X-User-Id", options.userId);
  }

  // Add conversation ID header for WebSocket requests
  if (options?.conversationId) {
    headers.set("X-Conversation-Id", options.conversationId);
  }

  return new Request(url, {
    ...options,
    headers,
  });
}

/**
 * Create a mock WebSocket for testing
 */
export function createMockWebSocket() {
  const READY_STATE_CONNECTING = 0;
  const READY_STATE_OPEN = 1;
  const READY_STATE_CLOSING = 2;
  const READY_STATE_CLOSED = 3;

  return {
    readyState: READY_STATE_CONNECTING,
    accept: vi.fn(function (this: { readyState: number }) {
      this.readyState = READY_STATE_OPEN;
    }),
    send: vi.fn(),
    close: vi.fn(function (this: { readyState: number }) {
      this.readyState = READY_STATE_CLOSED;
    }),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
    READY_STATE_CONNECTING,
    READY_STATE_OPEN,
    READY_STATE_CLOSING,
    READY_STATE_CLOSED,
  };
}

/**
 * Create a mock WebSocketPair for testing
 */
export function createMockWebSocketPair() {
  const client = createMockWebSocket();
  const server = createMockWebSocket();
  return [client, server];
}

/**
 * Create a mock AuthService for testing
 */
export function createMockAuthService() {
  return {
    verifyRequest: vi.fn().mockResolvedValue(createMockClerkAuth()),
    getUserFromClerkId: vi.fn().mockResolvedValue(createMockUser()),
    checkUserCredits: vi.fn().mockResolvedValue(true),
    deductCredits: vi.fn().mockResolvedValue(undefined),
    addCredits: vi.fn().mockResolvedValue(undefined),
    updateSubscription: vi.fn().mockResolvedValue(undefined),
    createOrUpdateUser: vi.fn().mockResolvedValue("user-test-123"),
  };
}

/**
 * Create a mock AIService for testing
 */
export function createMockAIService() {
  return {
    generateResponse: vi.fn().mockResolvedValue("Test AI response"),
    countTokens: vi.fn().mockResolvedValue(10),
    moderateContent: vi.fn().mockResolvedValue(true),
    generateTitle: vi.fn().mockResolvedValue("Test Conversation Title"),
    summarizeConversation: vi.fn().mockResolvedValue("Test summary"),
    extractKeywords: vi.fn().mockResolvedValue(["test", "keyword"]),
  };
}

/**
 * Setup global mocks for WebSocket testing
 */
export function setupWebSocketMocks() {
  // Mock WebSocket constants
  global.WebSocket = {
    READY_STATE_CONNECTING: 0,
    READY_STATE_OPEN: 1,
    READY_STATE_CLOSING: 2,
    READY_STATE_CLOSED: 3,
  } as unknown as typeof WebSocket;

  // Mock WebSocketPair as a constructor
  global.WebSocketPair = class MockWebSocketPair {
    constructor() {
      return createMockWebSocketPair() as unknown as InstanceType<typeof WebSocketPair>;
    }
  } as unknown as typeof WebSocketPair;
}

/**
 * Helper to wait for async operations in tests
 */
export async function waitForAsync(ms = 0): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Create a mock D1 result with custom data
 */
export function createMockD1Result<T = unknown>(
  results: T[],
  success = true,
): D1Result<T> {
  return {
    results,
    success,
    meta: {
      duration: 0,
      size_after: 0,
      rows_read: results.length,
      rows_written: 0,
    },
  } as D1Result<T>;
}

/**
 * Create a mock prepared statement with custom responses
 */
export function createMockPreparedStatement<T = unknown>(config?: {
  first?: T | null;
  all?: T[];
  run?: D1Result<unknown>;
}): D1PreparedStatement {
  return {
    bind: vi.fn().mockReturnThis(),
    first: vi.fn().mockResolvedValue(config?.first ?? null),
    all: vi.fn().mockResolvedValue(createMockD1Result(config?.all ?? [])),
    run: vi.fn().mockResolvedValue(
      config?.run ?? { success: true, meta: { changes: 0 } },
    ),
    raw: vi.fn().mockResolvedValue([]),
  } as unknown as D1PreparedStatement;
}
