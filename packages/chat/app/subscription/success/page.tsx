import { useEffect } from "react";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SubscriptionSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to chat after 5 seconds
    const timeout = setTimeout(() => {
      router.push("/chat");
    }, 5000);

    return () => clearTimeout(timeout);
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />

        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Subscription Activated!
        </h1>

        <p className="text-gray-600 mb-8">
          Welcome to your new subscription plan. Your credits have been updated
          and you can now enjoy all the premium features.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => router.push("/chat")}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            Start Chatting
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>

          <button
            onClick={() => router.push("/subscription")}
            className="w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-200"
          >
            View Subscription Details
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-6">
          Redirecting to chat in 5 seconds...
        </p>
      </div>
    </div>
  );
}