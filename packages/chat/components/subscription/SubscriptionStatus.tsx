import { useState } from "react";
import { Crown, CreditCard, AlertCircle, ChevronDown, Settings } from "lucide-react";
import { useSubscription } from "../../contexts/SubscriptionContext";
import { SUBSCRIPTION_TIERS } from "../../lib/stripe";

interface SubscriptionStatusProps {
  compact?: boolean;
}

export function SubscriptionStatus({ compact = false }: SubscriptionStatusProps) {
  const { subscription, loading } = useSubscription();
  const [isExpanded, setIsExpanded] = useState(false);

  if (loading) {
    return (
      <div className="animate-pulse bg-gray-200 rounded-lg h-12 w-48"></div>
    );
  }

  if (!subscription) {
    return null;
  }

  const tier = SUBSCRIPTION_TIERS.find(t => t.id === subscription.tier);
  const isLowCredits = subscription.credits < 10;
  const creditsPercentage = tier
    ? Math.max(0, Math.min(100, (subscription.credits / tier.credits) * 100))
    : 0;

  const getTierIcon = () => {
    switch (subscription.tier) {
      case "pro":
        return <CreditCard className="w-4 h-4" />;
      case "enterprise":
        return <Crown className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getTierColor = () => {
    switch (subscription.tier) {
      case "pro":
        return "text-blue-600 bg-blue-50";
      case "enterprise":
        return "text-purple-600 bg-purple-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  if (compact) {
    return (
      <div className={`
        flex items-center px-3 py-2 rounded-lg text-sm
        ${getTierColor()}
        ${isLowCredits ? "ring-2 ring-orange-300" : ""}
      `}>
        {getTierIcon() && (
          <div className="mr-2">
            {getTierIcon()}
          </div>
        )}
        <span className="font-medium capitalize">{subscription.tier}</span>
        <span className="mx-2">•</span>
        <span className={isLowCredits ? "text-orange-600 font-medium" : ""}>
          {subscription.credits.toLocaleString()}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4">
      <div
        className="flex items-center justify-between cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center">
          <div className={`
            flex items-center px-3 py-1 rounded-full text-sm font-medium
            ${getTierColor()}
          `}>
            {getTierIcon() && (
              <div className="mr-2">
                {getTierIcon()}
              </div>
            )}
            <span className="capitalize">{subscription.tier} Plan</span>
          </div>

          {isLowCredits && (
            <div className="ml-2 flex items-center text-orange-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-xs font-medium">Low Credits</span>
            </div>
          )}
        </div>

        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">
            {subscription.credits.toLocaleString()} left
          </span>
          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${
            isExpanded ? "rotate-180" : ""
          }`} />
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-3">
          {/* Credit Usage Bar */}
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Monthly Credits Used</span>
              <span>{Math.round(100 - creditsPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-300 ${
                  creditsPercentage > 20 ? "bg-green-500" :
                  creditsPercentage > 10 ? "bg-yellow-500" : "bg-red-500"
                }`}
                style={{ width: `${creditsPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Subscription Details */}
          <div className="text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Status:</span>
              <span className={`capitalize font-medium ${
                subscription.status === "active" ? "text-green-600" :
                subscription.status === "past_due" ? "text-orange-600" : "text-gray-600"
              }`}>
                {subscription.status}
              </span>
            </div>

            {subscription.currentPeriodEnd && (
              <div className="flex justify-between">
                <span>{subscription.cancelAtPeriodEnd ? "Expires:" : "Renews:"}</span>
                <span>{new Date(subscription.currentPeriodEnd).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-2">
            {subscription.tier === "free" ? (
              <button
                onClick={() => window.location.href = "/subscription"}
                className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center justify-center"
              >
                <Crown className="w-3 h-3 mr-1" />
                Upgrade
              </button>
            ) : (
              <button
                onClick={() => {
                  // Handle manage subscription
                  console.log("Manage subscription");
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-lg text-sm font-medium hover:bg-gray-200 flex items-center justify-center"
              >
                <Settings className="w-3 h-3 mr-1" />
                Manage
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}