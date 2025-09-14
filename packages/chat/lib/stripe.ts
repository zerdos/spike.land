// Stripe configuration for frontend
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

export const SUBSCRIPTION_TIERS = {
  FREE: {
    name: "Free",
    priceId: null,
    price: 0,
    credits: 100,
    features: [
      "100 messages per month",
      "Basic AI models",
      "Community support",
    ],
  },
  PRO: {
    name: "Pro",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO,
    price: 20,
    credits: 2000,
    features: [
      "2,000 messages per month",
      "All AI models",
      "Priority support",
      "Advanced features",
    ],
  },
  ENTERPRISE: {
    name: "Enterprise",
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_ID_ENTERPRISE,
    price: 50,
    credits: 10000,
    features: [
      "10,000 messages per month",
      "Premium AI models",
      "Dedicated support",
      "Custom integrations",
      "Unlimited history",
    ],
  },
};
