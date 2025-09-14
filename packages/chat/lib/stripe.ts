import { loadStripe } from "@stripe/stripe-js";

// Stripe configuration for frontend
export const STRIPE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "";

let stripePromise: ReturnType<typeof loadStripe> | null = null;

export const getStripe = () => {
  if (!stripePromise && STRIPE_PUBLISHABLE_KEY) {
    stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(amount);
};

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
