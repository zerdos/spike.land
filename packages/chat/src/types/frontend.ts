// Frontend-only types that don't require Cloudflare Workers types

export interface User {
  id: string;
  clerk_id?: string;
  email: string;
  name?: string;
  subscription_tier?: "free" | "pro" | "business" | "enterprise";
  credits?: number;
  stripe_customer_id?: string;
  created_at: string;
  updated_at: string;
}

export interface Conversation {
  id: string;
  user_id: string;
  title?: string;
  model: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  user_id?: string;
  role: "user" | "assistant" | "system";
  content: string;
  tokens_used?: number;
  created_at: string;
}

export interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id?: string;
  stripe_price_id?: string;
  status: "active" | "canceled" | "past_due" | "trialing";
  current_period_start?: string;
  current_period_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface Transaction {
  id: string;
  user_id: string;
  stripe_payment_intent_id?: string;
  amount: number;
  credits: number;
  status: "pending" | "completed" | "failed";
  created_at: string;
}

export interface Attachment {
  id: string;
  message_id: string;
  user_id: string;
  filename: string;
  content_type?: string;
  size?: number;
  r2_key: string;
  created_at: string;
}

export interface WebSocketMessage {
  type: "message" | "typing" | "presence" | "error";
  conversationId?: string;
  message?: Message;
  userId?: string;
  error?: string;
}

export interface APIResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}
