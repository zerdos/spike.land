import { Check, Crown, Sparkles } from "lucide-react";
import { useState } from "react";
import type { SubscriptionTier } from "../../lib/stripe";
import { formatPrice } from "../../lib/stripe";
import { getStripe as _getStripe } from "../../lib/stripe";

interface PricingCardProps {
  tier: SubscriptionTier;
  currentTier?: string;
  onSubscribe?: (tierId: string) => Promise<void>;
  isLoading?: boolean;
}

export function PricingCard({
  tier,
  currentTier,
  onSubscribe,
  isLoading = false,
}: PricingCardProps) {
  const [loading, setLoading] = useState(false);
  const isCurrentTier = currentTier === tier.id;
  const isFreeTier = tier.id === "free";

  const handleSubscribe = async () => {
    if (isCurrentTier || isFreeTier || !onSubscribe) return;

    setLoading(true);
    try {
      await onSubscribe(tier.id);
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setLoading(false);
    }
  };

  const getTierIcon = () => {
    switch (tier.id) {
      case "pro":
        return <Sparkles className="w-6 h-6" />;
      case "enterprise":
        return <Crown className="w-6 h-6" />;
      default:
        return null;
    }
  };

  const getButtonText = () => {
    if (isCurrentTier) return "Current Plan";
    if (isFreeTier) return "Free Forever";
    return `Subscribe to ${tier.name}`;
  };

  const getButtonStyle = () => {
    if (isCurrentTier) {
      return "bg-gray-100 text-gray-500 cursor-not-allowed";
    }
    if (isFreeTier) {
      return "bg-gray-100 text-gray-700 cursor-not-allowed";
    }
    if (tier.popular) {
      return "bg-blue-600 text-white hover:bg-blue-700 transform hover:scale-105";
    }
    return "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50 transform hover:scale-105";
  };

  return (
    <div
      className={`
      relative bg-white rounded-2xl shadow-lg p-8 transition-all duration-300
      ${tier.popular ? "ring-2 ring-blue-500 scale-105" : ""}
      ${isCurrentTier ? "ring-2 ring-green-500" : ""}
    `}
    >
      {tier.popular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
            Most Popular
          </span>
        </div>
      )}

      {isCurrentTier && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Current Plan
          </span>
        </div>
      )}

      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          {getTierIcon() && (
            <div className="mr-2 text-blue-600">
              {getTierIcon()}
            </div>
          )}
          <h3 className="text-2xl font-bold text-gray-900">{tier.name}</h3>
        </div>

        <div className="flex items-center justify-center mb-2">
          <span className="text-4xl font-bold text-gray-900">
            {formatPrice(tier.price)}
          </span>
          {!isFreeTier && <span className="text-gray-500 ml-1">/month</span>}
        </div>

        <p className="text-gray-600">
          {tier.credits.toLocaleString()} messages per month
        </p>
      </div>

      <ul className="space-y-3 mb-8">
        {tier.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        onClick={handleSubscribe}
        disabled={isCurrentTier || isFreeTier || loading || isLoading}
        className={`
          w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200
          ${getButtonStyle()}
          ${(loading || isLoading) ? "opacity-50 cursor-not-allowed" : ""}
        `}
      >
        {loading || isLoading
          ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-current mr-2">
              </div>
              Processing...
            </div>
          )
          : (
            getButtonText()
          )}
      </button>

      {tier.id === "enterprise" && (
        <p className="text-xs text-gray-500 text-center mt-3">
          Need more? Contact us for custom pricing
        </p>
      )}
    </div>
  );
}
