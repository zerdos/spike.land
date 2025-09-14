"use client";

import { AlertCircle, ArrowLeft, CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionCancelPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Subscription Cancelled
        </h1>

        <p className="text-gray-600 mb-8">
          Your subscription setup was cancelled. No charges have been made to your account. You can
          try again anytime or continue with your current plan.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/subscription")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Try Again
          </button>

          <button
            onClick={() => router.push("/chat")}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200 flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Chat
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Need help? Contact our support team.
        </p>
      </div>
    </div>
  );
}
