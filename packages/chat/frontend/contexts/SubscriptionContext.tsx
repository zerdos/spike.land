import { useUser } from "@clerk/clerk-react";
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

interface SubscriptionStatus {
  tier: "free" | "pro" | "enterprise";
  credits: number;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

interface SubscriptionContextValue {
  subscription: SubscriptionStatus | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  hasCredits: (required?: number) => boolean;
  deductCredits: (amount: number) => void;
}

const SubscriptionContext = createContext<SubscriptionContextValue | undefined>(undefined);

interface SubscriptionProviderProps {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProps) {
  const { user, isLoaded } = useUser();
  const [subscription, setSubscription] = useState<SubscriptionStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = useCallback(async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const response = await fetch("/api/subscription/status", {
        headers: {
          Authorization: `Bearer ${await user.getToken()}`,
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

  useEffect(() => {
    if (isLoaded && user) {
      fetchSubscription();
    } else if (isLoaded) {
      setLoading(false);
    }
  }, [isLoaded, user, fetchSubscription]);

  const hasCredits = (required: number = 1): boolean => {
    return (subscription?.credits || 0) >= required;
  };

  const deductCredits = (amount: number) => {
    if (subscription) {
      setSubscription({
        ...subscription,
        credits: Math.max(0, subscription.credits - amount),
      });
    }
  };

  const value: SubscriptionContextValue = {
    subscription,
    loading,
    error,
    refetch: fetchSubscription,
    hasCredits,
    deductCredits,
  };

  return (
    <SubscriptionContext.Provider value={value}>
      {children}
    </SubscriptionContext.Provider>
  );
}

export function useSubscription(): SubscriptionContextValue {
  const context = useContext(SubscriptionContext);
  if (context === undefined) {
    throw new Error("useSubscription must be used within a SubscriptionProvider");
  }
  return context;
}
