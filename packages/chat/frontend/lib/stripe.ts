import { loadStripe, type Stripe as StripeClient } from "@stripe/stripe-js";

// Client-side Stripe instance
let stripePromise: Promise<StripeClient | null> | null = null;

export function getStripe(publishableKey: string): Promise<StripeClient | null> {
  if (!stripePromise) {
    stripePromise = loadStripe(publishableKey);
  }
  return stripePromise;
}

// Subscription tier configuration
export interface SubscriptionTier {
  id: "free" | "pro" | "enterprise";
  name: string;
  price: number;
  stripePriceId?: string;
  credits: number;
  features: string[];
  popular?: boolean;
}

export const SUBSCRIPTION_TIERS: SubscriptionTier[] = [
  {
    id: "free",
    name: "Free",
    price: 0,
    credits: 100,
    features: [
      "100 messages per month",
      "Basic AI models",
      "Community support",
      "Standard response time",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    price: 2000, // $20.00 in cents
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    credits: 2000,
    features: [
      "2,000 messages per month",
      "All AI models",
      "Priority support",
      "Faster response time",
      "Conversation history",
      "File attachments",
    ],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: 5000, // $50.00 in cents
    stripePriceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
    credits: 10000,
    features: [
      "10,000 messages per month",
      "All AI models",
      "Premium support",
      "Fastest response time",
      "Unlimited conversation history",
      "Advanced file attachments",
      "Team collaboration",
      "Custom integrations",
    ],
  },
];

// Helper to get tier configuration
export function getTierById(tierId: string): SubscriptionTier | undefined {
  return SUBSCRIPTION_TIERS.find(tier => tier.id === tierId);
}

// Format price for display
export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

// Check if user has sufficient credits
export function hasCredits(user: { credits?: number }, required: number = 1): boolean {
  return (user.credits || 0) >= required;
}

// Calculate credits for message (simple token-based estimation)
export function calculateCredits(content: string): number {
  // Simple estimation: ~4 characters per token, 1 credit per 100 tokens
  const estimatedTokens = Math.ceil(content.length / 4);
  return Math.max(1, Math.ceil(estimatedTokens / 100));
}