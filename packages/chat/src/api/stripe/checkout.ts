import { getAuth } from "@clerk/backend";
import {
  createStripeServer,
  getTierById,
  SUBSCRIPTION_TIERS as _SUBSCRIPTION_TIERS,
} from "../../lib/stripe";
import type { APIResponse, Env, User } from "../../types";

interface CheckoutRequest {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  tier: "pro" | "enterprise";
}

export async function handleCheckoutSession(
  request: Request,
  env: Env,
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
        },
      );
    }

    const body = await request.json() as CheckoutRequest;
    const { priceId, successUrl, cancelUrl, tier } = body;

    // Validate input
    if (!priceId || !successUrl || !cancelUrl || !tier) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields: priceId, successUrl, cancelUrl, tier",
        } as APIResponse),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    // Validate tier
    const tierConfig = getTierById(tier);
    if (!tierConfig) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid subscription tier",
        } as APIResponse),
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    // Get or create user in database
    let user: User;
    try {
      const userQuery = await env.DATABASE.prepare(
        "SELECT * FROM users WHERE clerk_id = ?",
      ).bind(auth.userId).first();

      if (!userQuery) {
        // Create user if doesn't exist
        const userId = crypto.randomUUID();
        const now = new Date().toISOString();

        await env.DATABASE.prepare(`
          INSERT INTO users (id, clerk_id, email, subscription_tier, credits, created_at, updated_at)
          VALUES (?, ?, ?, 'free', 100, ?, ?)
        `).bind(userId, auth.userId, auth.sessionClaims?.email || "", now, now).run();

        user = {
          id: userId,
          clerk_id: auth.userId,
          email: auth.sessionClaims?.email || "",
          subscription_tier: "free",
          credits: 100,
          created_at: now,
          updated_at: now,
        };
      } else {
        user = userQuery as User;
      }
    } catch (error) {
      console.error("Database error:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Database error",
        } as APIResponse),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        },
      );
    }

    const stripe = createStripeServer(env);

    // Create or get Stripe customer
    let customerId = user.stripe_customer_id;
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user.id,
          clerkId: auth.userId,
        },
      });
      customerId = customer.id;

      // Update user with Stripe customer ID
      await env.DATABASE.prepare(
        "UPDATE users SET stripe_customer_id = ?, updated_at = ? WHERE id = ?",
      ).bind(customerId, new Date().toISOString(), user.id).run();
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: user.id,
        tier,
      },
      subscription_data: {
        metadata: {
          userId: user.id,
          tier,
        },
      },
    });

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          sessionId: session.id,
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
      },
    );
  } catch (error) {
    console.error("Checkout session error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to create checkout session",
      } as APIResponse),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      },
    );
  }
}

// Handle preflight requests
export async function handleOptions(): Promise<Response> {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
