import Stripe from "stripe";
import type { Env } from "../types";
import { AuthService } from "../utils/auth";

export async function handleStripeWebhook(
  request: Request,
  env: Env,
): Promise<Response> {
  try {
    const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
      apiVersion: "2025-12-15.clover",
    });

    const signature = request.headers.get("stripe-signature");
    if (!signature) {
      return new Response("Missing signature", { status: 400 });
    }

    const body = await request.text();

    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        env.STRIPE_WEBHOOK_SECRET,
      );
    } catch (error) {
      console.error("Webhook signature verification failed:", error);
      return new Response("Invalid signature", { status: 400 });
    }

    const authService = new AuthService(env);

    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;

        if (session.mode === "subscription") {
          const customerId = session.customer as string;
          const subscriptionId = session.subscription as string;

          const user = await env.DATABASE.prepare(
            "SELECT id FROM users WHERE stripe_customer_id = ?",
          )
            .bind(customerId)
            .first();

          if (user) {
            const subscription = await stripe.subscriptions.retrieve(subscriptionId);
            const priceId = subscription.items.data[0]?.price.id;

            let tier: "free" | "pro" | "enterprise" = "free";
            if (priceId === env.STRIPE_PRICE_ID_PRO) {
              tier = "pro";
            } else if (priceId === env.STRIPE_PRICE_ID_ENTERPRISE) {
              tier = "enterprise";
            }

            await authService.updateSubscription(user.id as string, tier);

            await env.DATABASE.prepare(
              `INSERT INTO subscriptions (
                id, user_id, stripe_subscription_id, stripe_price_id,
                status, current_period_start, current_period_end,
                created_at, updated_at
              ) VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'), datetime('now'))
              ON CONFLICT(stripe_subscription_id) DO UPDATE SET
                status = excluded.status,
                current_period_start = excluded.current_period_start,
                current_period_end = excluded.current_period_end,
                updated_at = datetime('now')`,
            )
              .bind(
                crypto.randomUUID(),
                user.id as string,
                subscriptionId,
                priceId,
                subscription.status,
                new Date(
                  subscription.current_period_start * 1000,
                ).toISOString(),
                new Date(subscription.current_period_end * 1000).toISOString(),
              )
              .run();
          }
        } else if (session.mode === "payment") {
          const customerId = session.customer as string;
          const paymentIntentId = session.payment_intent as string;
          const amount = session.amount_total || 0;

          const creditsPerDollar = 20;
          const credits = Math.floor((amount / 100) * creditsPerDollar);

          const user = await env.DATABASE.prepare(
            "SELECT id FROM users WHERE stripe_customer_id = ?",
          )
            .bind(customerId)
            .first();

          if (user) {
            await authService.addCredits(user.id as string, credits);

            await env.DATABASE.prepare(
              `INSERT INTO transactions (
                id, user_id, stripe_payment_intent_id,
                amount, credits, status, created_at
              ) VALUES (?, ?, ?, ?, ?, 'completed', datetime('now'))`,
            )
              .bind(
                crypto.randomUUID(),
                user.id as string,
                paymentIntentId,
                amount,
                credits,
              )
              .run();
          }
        }
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;

        await env.DATABASE.prepare(
          `UPDATE subscriptions SET
            status = ?,
            current_period_start = ?,
            current_period_end = ?,
            cancel_at_period_end = ?,
            updated_at = datetime('now')
          WHERE stripe_subscription_id = ?`,
        )
          .bind(
            subscription.status,
            new Date(subscription.current_period_start * 1000).toISOString(),
            new Date(subscription.current_period_end * 1000).toISOString(),
            subscription.cancel_at_period_end ? 1 : 0,
            subscription.id,
          )
          .run();

        const dbSubscription = await env.DATABASE.prepare(
          "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?",
        )
          .bind(subscription.id)
          .first();

        if (dbSubscription) {
          if (
            subscription.status === "canceled" ||
            subscription.status === "unpaid"
          ) {
            await authService.updateSubscription(
              dbSubscription.user_id as string,
              "free",
            );
          }
        }
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;

        const dbSubscription = await env.DATABASE.prepare(
          "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?",
        )
          .bind(subscription.id)
          .first();

        if (dbSubscription) {
          await authService.updateSubscription(
            dbSubscription.user_id as string,
            "free",
          );

          await env.DATABASE.prepare(
            "UPDATE subscriptions SET status = 'canceled' WHERE stripe_subscription_id = ?",
          )
            .bind(subscription.id)
            .run();
        }
        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.subscription) {
          const subscription = await stripe.subscriptions.retrieve(
            invoice.subscription as string,
          );

          const dbSubscription = await env.DATABASE.prepare(
            "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?",
          )
            .bind(subscription.id)
            .first();

          if (dbSubscription) {
            const priceId = subscription.items.data[0]?.price.id;
            let tier: "free" | "pro" | "enterprise" = "free";

            if (priceId === env.STRIPE_PRICE_ID_PRO) {
              tier = "pro";
            } else if (priceId === env.STRIPE_PRICE_ID_ENTERPRISE) {
              tier = "enterprise";
            }

            await authService.updateSubscription(
              dbSubscription.user_id as string,
              tier,
            );
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object as Stripe.Invoice;

        if (invoice.subscription) {
          const dbSubscription = await env.DATABASE.prepare(
            "SELECT user_id FROM subscriptions WHERE stripe_subscription_id = ?",
          )
            .bind(invoice.subscription as string)
            .first();

          if (dbSubscription) {
            await env.DATABASE.prepare(
              "UPDATE subscriptions SET status = 'past_due' WHERE stripe_subscription_id = ?",
            )
              .bind(invoice.subscription as string)
              .run();
          }
        }
        break;
      }

      default:
        console.log("Unhandled Stripe webhook event:", event.type);
    }

    return new Response("OK", { status: 200 });
  } catch (error) {
    console.error("Stripe webhook error:", error);
    return new Response("Internal server error", { status: 500 });
  }
}
