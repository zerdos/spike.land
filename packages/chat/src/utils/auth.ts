import { verifyToken } from "@clerk/backend";
import type { AuthContext, Env, User } from "../types";

export class AuthService {
  private env: Env;

  constructor(env: Env) {
    this.env = env;
  }

  async verifyRequest(request: Request): Promise<AuthContext | null> {
    try {
      const authorization = request.headers.get("Authorization");

      if (!authorization || !authorization.startsWith("Bearer ")) {
        return null;
      }

      const token = authorization.slice(7);

      const verified = await verifyToken(token, {
        secretKey: this.env.CLERK_SECRET_KEY,
      });

      if (!verified) {
        return null;
      }

      return {
        userId: verified.sub,
        clerkId: verified.sub,
        sessionId: verified.sid,
      };
    } catch (error) {
      console.error("Auth verification error:", error);
      return null;
    }
  }

  async getUserFromClerkId(clerkId: string): Promise<User | null> {
    try {
      const result = await this.env.DATABASE.prepare(
        "SELECT * FROM users WHERE clerk_id = ?",
      )
        .bind(clerkId)
        .first();

      return result ? result as unknown as User : null;
    } catch (error) {
      console.error("Database error:", error);
      return null;
    }
  }

  async createOrUpdateUser(userData: {
    clerk_id: string;
    email: string;
    name?: string;
  }): Promise<string> {
    const id = crypto.randomUUID();

    try {
      await this.env.DATABASE.prepare(
        `INSERT INTO users (id, clerk_id, email, name, created_at, updated_at)
         VALUES (?, ?, ?, ?, datetime('now'), datetime('now'))
         ON CONFLICT(clerk_id) DO UPDATE SET
         email = excluded.email,
         name = excluded.name,
         updated_at = datetime('now')`,
      )
        .bind(id, userData.clerk_id, userData.email, userData.name || null)
        .run();

      const user = await this.getUserFromClerkId(userData.clerk_id);
      return user?.id || id;
    } catch (error) {
      console.error("User creation error:", error);
      throw new Error("Failed to create or update user");
    }
  }

  async checkUserCredits(
    userId: string,
    required: number = 1,
  ): Promise<boolean> {
    try {
      const user = await this.env.DATABASE.prepare(
        "SELECT credits, subscription_tier FROM users WHERE id = ?",
      )
        .bind(userId)
        .first();

      if (!user) {
        return false;
      }

      if (user.subscription_tier === "enterprise") {
        return true;
      }

      return (user.credits as number) >= required;
    } catch (error) {
      console.error("Credits check error:", error);
      return false;
    }
  }

  async deductCredits(userId: string, amount: number = 1): Promise<void> {
    try {
      const user = await this.env.DATABASE.prepare(
        "SELECT subscription_tier FROM users WHERE id = ?",
      )
        .bind(userId)
        .first();

      if (user?.subscription_tier === "enterprise") {
        return;
      }

      await this.env.DATABASE.prepare(
        "UPDATE users SET credits = credits - ? WHERE id = ? AND credits >= ?",
      )
        .bind(amount, userId, amount)
        .run();
    } catch (error) {
      console.error("Credits deduction error:", error);
      throw new Error("Failed to deduct credits");
    }
  }

  async addCredits(userId: string, amount: number): Promise<void> {
    try {
      await this.env.DATABASE.prepare(
        "UPDATE users SET credits = credits + ? WHERE id = ?",
      )
        .bind(amount, userId)
        .run();
    } catch (error) {
      console.error("Credits addition error:", error);
      throw new Error("Failed to add credits");
    }
  }

  async updateSubscription(
    userId: string,
    tier: "free" | "pro" | "enterprise",
  ): Promise<void> {
    try {
      const creditsMap = {
        free: 100,
        pro: 2000,
        enterprise: 10000,
      };

      await this.env.DATABASE.prepare(
        "UPDATE users SET subscription_tier = ?, credits = ? WHERE id = ?",
      )
        .bind(tier, creditsMap[tier], userId)
        .run();
    } catch (error) {
      console.error("Subscription update error:", error);
      throw new Error("Failed to update subscription");
    }
  }
}
