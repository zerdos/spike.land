import type { Env, User, APIResponse } from "../types";
import { getAuth } from "@clerk/backend";
import { createStripeServer } from "../lib/stripe";

interface SubscriptionStatusResponse {
  tier: "free" | "pro" | "enterprise";
  credits: number;
  status: "active" | "canceled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  cancelAtPeriodEnd?: boolean;
}

export async function handleSubscriptionStatus(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    // Authenticate user
    const auth = getAuth(request);
    if (!auth.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized",
        } as APIResponse),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get user from database
    const user = await env.DATABASE.prepare(
      "SELECT * FROM users WHERE clerk_id = ?"
    ).bind(auth.userId).first() as User;

    if (!user) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "User not found",
        } as APIResponse),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get subscription if user has one
    let subscriptionStatus: SubscriptionStatusResponse = {
      tier: user.subscription_tier || "free",
      credits: user.credits || 100,
      status: "active",
    };

    if (user.subscription_tier !== "free") {
      const subscription = await env.DATABASE.prepare(
        "SELECT * FROM subscriptions WHERE user_id = ? AND status != 'canceled' ORDER BY created_at DESC LIMIT 1"
      ).bind(user.id).first();

      if (subscription) {
        subscriptionStatus = {
          tier: user.subscription_tier as "pro" | "enterprise",
          credits: user.credits || 0,
          status: subscription.status as any,
          currentPeriodEnd: subscription.current_period_end,
          cancelAtPeriodEnd: subscription.cancel_at_period_end,
        };
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        data: subscriptionStatus,
      } as APIResponse),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Subscription status error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to get subscription status",
      } as APIResponse),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

export async function handleCreatePortalSession(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    // Authenticate user
    const auth = getAuth(request);
    if (!auth.userId) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Unauthorized",
        } as APIResponse),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const body = await request.json();
    const { returnUrl } = body;

    if (!returnUrl) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing returnUrl",
        } as APIResponse),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    // Get user from database
    const user = await env.DATABASE.prepare(
      "SELECT * FROM users WHERE clerk_id = ?"
    ).bind(auth.userId).first() as User;

    if (!user || !user.stripe_customer_id) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "No Stripe customer found",
        } as APIResponse),
        {
          status: 404,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
    }

    const stripe = createStripeServer(env);

    // Create portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: user.stripe_customer_id,
      return_url: returnUrl,
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          url: session.url,
        },
      } as APIResponse),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      }
    );
  } catch (error) {
    console.error("Portal session error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to create portal session",
      } as APIResponse),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
  }
}

// Handle preflight requests
export async function handleOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}