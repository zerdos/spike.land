import type { Env, APIResponse } from "../../types";
import { createStripeServer, WEBHOOK_EVENTS, getTierByPriceId } from "../../lib/stripe";
import type Stripe from "stripe";

export async function handleStripeWebhook(
  request: Request,
  env: Env
): Promise<Response> {
  try {
    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing stripe-signature header",
        } as APIResponse),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const body = await request.text();
    const stripe = createStripeServer(env);

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid signature",
        } as APIResponse),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    console.log(`Processing webhook event: ${event.type}`);

    // Handle different event types
    switch (event.type) {
      case WEBHOOK_EVENTS.CHECKOUT_COMPLETED:
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session, env);
        break;

      case WEBHOOK_EVENTS.SUBSCRIPTION_CREATED:
        await handleSubscriptionCreated(event.data.object as Stripe.Subscription, env);
        break;

      case WEBHOOK_EVENTS.SUBSCRIPTION_UPDATED:
        await handleSubscriptionUpdated(event.data.object as Stripe.Subscription, env);
        break;

      case WEBHOOK_EVENTS.SUBSCRIPTION_DELETED:
        await handleSubscriptionDeleted(event.data.object as Stripe.Subscription, env);
        break;

      case WEBHOOK_EVENTS.INVOICE_PAYMENT_SUCCEEDED:
        await handlePaymentSucceeded(event.data.object as Stripe.Invoice, env);
        break;

      case WEBHOOK_EVENTS.INVOICE_PAYMENT_FAILED:
        await handlePaymentFailed(event.data.object as Stripe.Invoice, env);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook processed successfully",
      } as APIResponse),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook processing error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Webhook processing failed",
      } as APIResponse),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  env: Env
): Promise<void> {
  console.log("Processing checkout completed:", session.id);

  const userId = session.metadata?.userId;
  if (!userId) {
    console.error("No userId in checkout session metadata");
    return;
  }

  const subscriptionId = session.subscription as string;
  if (!subscriptionId) {
    console.error("No subscription ID in checkout session");
    return;
  }

  const tier = session.metadata?.tier as "pro" | "enterprise";
  if (!tier) {
    console.error("No tier in checkout session metadata");
    return;
  }

  try {
    const now = new Date().toISOString();

    // Create subscription record
    await env.DATABASE.prepare(`
      INSERT INTO subscriptions (id, user_id, stripe_subscription_id, status, current_period_start, current_period_end, cancel_at_period_end, created_at, updated_at)
      VALUES (?, ?, ?, 'active', ?, ?, false, ?, ?)
    `).bind(
      crypto.randomUUID(),
      userId,
      subscriptionId,
      now,
      now,
      now,
      now
    ).run();

    // Update user subscription tier and reset credits
    const tierConfig = getTierByPriceId(session.metadata?.tier || "") || { credits: 100 };
    await env.DATABASE.prepare(`
      UPDATE users
      SET subscription_tier = ?, credits = ?, updated_at = ?
      WHERE id = ?
    `).bind(tier, tierConfig.credits, now, userId).run();

    console.log(`Subscription created for user ${userId} with tier ${tier}`);
  } catch (error) {
    console.error("Error processing checkout completed:", error);
  }
}

async function handleSubscriptionCreated(
  subscription: Stripe.Subscription,
  env: Env
): Promise<void> {
  console.log("Processing subscription created:", subscription.id);
  // The subscription should already be created in handleCheckoutCompleted
  // This is mainly for logging and any additional processing
}

async function handleSubscriptionUpdated(
  subscription: Stripe.Subscription,
  env: Env
): Promise<void> {
  console.log("Processing subscription updated:", subscription.id);

  try {
    const now = new Date().toISOString();

    // Update subscription record
    await env.DATABASE.prepare(`
      UPDATE subscriptions
      SET status = ?,
          current_period_start = ?,
          current_period_end = ?,
          cancel_at_period_end = ?,
          updated_at = ?
      WHERE stripe_subscription_id = ?
    `).bind(
      subscription.status,
      new Date(subscription.current_period_start * 1000).toISOString(),
      new Date(subscription.current_period_end * 1000).toISOString(),
      subscription.cancel_at_period_end,
      now,
      subscription.id
    ).run();

    // If subscription is canceled or past due, update user tier
    if (subscription.status === "canceled" || subscription.status === "past_due") {
      const subRecord = await env.DATABASE.prepare(
        "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?"
      ).bind(subscription.id).first();

      if (subRecord) {
        await env.DATABASE.prepare(`
          UPDATE users
          SET subscription_tier = 'free', credits = 100, updated_at = ?
          WHERE id = ?
        `).bind(now, subRecord.user_id).run();
      }
    }

    console.log(`Subscription updated: ${subscription.id} - ${subscription.status}`);
  } catch (error) {
    console.error("Error processing subscription updated:", error);
  }
}

async function handleSubscriptionDeleted(
  subscription: Stripe.Subscription,
  env: Env
): Promise<void> {
  console.log("Processing subscription deleted:", subscription.id);

  try {
    const now = new Date().toISOString();

    // Update subscription status
    await env.DATABASE.prepare(`
      UPDATE subscriptions
      SET status = 'canceled', updated_at = ?
      WHERE stripe_subscription_id = ?
    `).bind(now, subscription.id).run();

    // Downgrade user to free tier
    const subRecord = await env.DATABASE.prepare(
      "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?"
    ).bind(subscription.id).first();

    if (subRecord) {
      await env.DATABASE.prepare(`
        UPDATE users
        SET subscription_tier = 'free', credits = 100, updated_at = ?
        WHERE id = ?
      `).bind(now, subRecord.user_id).run();
    }

    console.log(`Subscription deleted and user downgraded: ${subscription.id}`);
  } catch (error) {
    console.error("Error processing subscription deleted:", error);
  }
}

async function handlePaymentSucceeded(
  invoice: Stripe.Invoice,
  env: Env
): Promise<void> {
  console.log("Processing payment succeeded:", invoice.id);

  const subscriptionId = invoice.subscription as string;
  if (!subscriptionId) {
    return;
  }

  try {
    // Reset credits for the new billing period
    const subRecord = await env.DATABASE.prepare(
      "SELECT user_id, status FROM subscriptions WHERE stripe_subscription_id = ?"
    ).bind(subscriptionId).first();

    if (subRecord && subRecord.status === "active") {
      // Get user's current tier to determine credit amount
      const userRecord = await env.DATABASE.prepare(
        "SELECT subscription_tier FROM users WHERE id = ?"
      ).bind(subRecord.user_id).first();

      if (userRecord) {
        const tier = userRecord.subscription_tier as "free" | "pro" | "enterprise";
        let credits = 100; // default for free

        if (tier === "pro") credits = 2000;
        else if (tier === "enterprise") credits = 10000;

        await env.DATABASE.prepare(`
          UPDATE users
          SET credits = ?, updated_at = ?
          WHERE id = ?
        `).bind(credits, new Date().toISOString(), subRecord.user_id).run();

        console.log(`Credits reset for user ${subRecord.user_id}: ${credits}`);
      }
    }
  } catch (error) {
    console.error("Error processing payment succeeded:", error);
  }
}

async function handlePaymentFailed(
  invoice: Stripe.Invoice,
  env: Env
): Promise<void> {
  console.log("Processing payment failed:", invoice.id);

  const subscriptionId = invoice.subscription as string;
  if (!subscriptionId) {
    return;
  }

  try {
    // Update subscription status to past_due
    await env.DATABASE.prepare(`
      UPDATE subscriptions
      SET status = 'past_due', updated_at = ?
      WHERE stripe_subscription_id = ?
    `).bind(new Date().toISOString(), subscriptionId).run();

    console.log(`Subscription marked as past due: ${subscriptionId}`);
  } catch (error) {
    console.error("Error processing payment failed:", error);
  }
}