import { useUser } from "@clerk/clerk-react";
import { AlertCircle, CheckCircle, CreditCard } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { getStripe, SUBSCRIPTION_TIERS } from "../../lib/stripe";
import { PricingCard } from "./PricingCard";

interface SubscriptionStatus {
  tier: "free" | "pro" | "enterprise";
  credits: number;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export function SubscriptionManager() {
  const { user, isLoaded } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (isLoaded && user) {
      fetchSubscriptionStatus();
    }
  }, [isLoaded, user, fetchSubscriptionStatus]);

  const fetchSubscriptionStatus = useCallback(async () => {
    try {
      const response = await fetch("/api/subscription/status", {
        headers: {
          Authorization: `Bearer ${await user?.getToken()}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch subscription status");
      }

      const data = await response.json();
      if (data.success) {
        setSubscription(data.data);
      } else {
        throw new Error(data.error || "Unknown error");
      }
    } catch (err) {
      console.error("Error fetching subscription:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [user]);

  const handleSubscribe = async (tierId: string) => {
    if (!user) return;

    setIsProcessing(true);
    setError(null);

    try {
      const tier = SUBSCRIPTION_TIERS.find(t => t.id === tierId);
      if (!tier || !tier.stripePriceId) {
        throw new Error("Invalid subscription tier");
      }

      // Create checkout session
      const response = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getToken()}`,
        },
        body: JSON.stringify({
          priceId: tier.stripePriceId,
          tier: tierId,
          successUrl: `${window.location.origin}/subscription/success`,
          cancelUrl: `${window.location.origin}/subscription/cancel`,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to create checkout session");
      }

      // Redirect to Stripe Checkout
      const stripe = await getStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error: stripeError } = await stripe.redirectToCheckout({
        sessionId: data.data.sessionId,
      });

      if (stripeError) {
        throw new Error(stripeError.message);
      }
    } catch (err) {
      console.error("Subscription error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/stripe/portal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${await user.getToken()}`,
        },
        body: JSON.stringify({
          returnUrl: window.location.origin,
        }),
      });

      const data = await response.json();

      if (data.success) {
        window.location.href = data.data.url;
      } else {
        throw new Error(data.error || "Failed to create portal session");
      }
    } catch (err) {
      console.error("Portal error:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }
  };

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 text-center mb-2">
            Error Loading Subscription
          </h2>
          <p className="text-gray-600 text-center mb-4">{error}</p>
          <button
            onClick={fetchSubscriptionStatus}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Choose Your Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Unlock the full potential of AI-powered conversations with our flexible pricing plans.
          </p>
        </div>

        {/* Current Subscription Status */}
        {subscription && subscription.tier !== "free" && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6 max-w-md mx-auto">
              <div className="flex items-center mb-4">
                {subscription.status === "active"
                  ? <CheckCircle className="w-6 h-6 text-green-500 mr-3" />
                  : <AlertCircle className="w-6 h-6 text-yellow-500 mr-3" />}
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Current Plan: {subscription.tier.toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {subscription.credits.toLocaleString()} messages remaining
                  </p>
                </div>
              </div>

              {subscription.currentPeriodEnd && (
                <p className="text-sm text-gray-600 mb-4">
                  {subscription.cancelAtPeriodEnd ? "Expires" : "Renews"} on{" "}
                  {new Date(subscription.currentPeriodEnd).toLocaleDateString()}
                </p>
              )}

              <button
                onClick={handleManageSubscription}
                className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Manage Subscription
              </button>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {SUBSCRIPTION_TIERS.map((tier) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              currentTier={subscription?.tier}
              onSubscribe={handleSubscribe}
              isLoading={isProcessing}
            />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                How do credits work?
              </h3>
              <p className="text-gray-600">
                Credits are consumed based on the length and complexity of your messages. Typically,
                a standard message uses 1-2 credits. Your credits reset monthly.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I change or cancel my plan?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade, downgrade, or cancel your subscription at any time. Changes
                take effect at the next billing cycle.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-2">
                What happens if I run out of credits?
              </h3>
              <p className="text-gray-600">
                If you exhaust your monthly credits, you can upgrade your plan or wait until your
                next billing cycle for credits to reset.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
