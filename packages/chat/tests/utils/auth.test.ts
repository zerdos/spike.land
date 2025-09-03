import { describe, it, expect, beforeEach, vi } from "vitest";
import { AuthService } from "../../src/utils/auth";
import type { Env } from "../../src/types";

vi.mock("@clerk/backend", () => ({
  verifyToken: vi.fn(),
}));

describe("AuthService", () => {
  let authService: AuthService;
  let mockEnv: Env;

  beforeEach(() => {
    mockEnv = {
      DATABASE: {
        prepare: vi.fn().mockReturnThis(),
        bind: vi.fn().mockReturnThis(),
        first: vi.fn(),
        run: vi.fn(),
      } as any,
      CLERK_SECRET_KEY: "test-clerk-secret",
      JWT_SECRET: "test-jwt-secret",
    } as Env;

    authService = new AuthService(mockEnv);
  });

  describe("verifyRequest", () => {
    it("should return null if no authorization header", async () => {
      const request = new Request("http://localhost", {
        method: "GET",
      });

      const result = await authService.verifyRequest(request);
      expect(result).toBeNull();
    });

    it("should return null if authorization header is invalid", async () => {
      const request = new Request("http://localhost", {
        method: "GET",
        headers: {
          Authorization: "InvalidToken",
        },
      });

      const result = await authService.verifyRequest(request);
      expect(result).toBeNull();
    });

    it("should return auth context for valid token", async () => {
      const { verifyToken } = await import("@clerk/backend");
      (verifyToken as any).mockResolvedValue({
        sub: "user-123",
        sid: "session-456",
      });

      const request = new Request("http://localhost", {
        method: "GET",
        headers: {
          Authorization: "Bearer valid-token",
        },
      });

      const result = await authService.verifyRequest(request);
      expect(result).toEqual({
        userId: "user-123",
        clerkId: "user-123",
        sessionId: "session-456",
      });
    });
  });

  describe("getUserFromClerkId", () => {
    it("should return user from database", async () => {
      const mockUser = {
        id: "user-1",
        clerk_id: "clerk-1",
        email: "test@example.com",
        name: "Test User",
        subscription_tier: "free",
        credits: 10,
      };

      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(mockUser);

      const result = await authService.getUserFromClerkId("clerk-1");
      expect(result).toEqual(mockUser);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "SELECT * FROM users WHERE clerk_id = ?"
      );
    });

    it("should return null if user not found", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const result = await authService.getUserFromClerkId("non-existent");
      expect(result).toBeNull();
    });
  });

  describe("createOrUpdateUser", () => {
    it("should create or update user in database", async () => {
      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        id: "new-user-id",
        clerk_id: "clerk-123",
        email: "new@example.com",
      });

      const userId = await authService.createOrUpdateUser({
        clerk_id: "clerk-123",
        email: "new@example.com",
        name: "New User",
      });

      expect(userId).toBe("new-user-id");
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("INSERT INTO users")
      );
    });
  });

  describe("checkUserCredits", () => {
    it("should return true if user has business subscription", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        credits: 5,
        subscription_tier: "business",
      });

      const result = await authService.checkUserCredits("user-1", 10);
      expect(result).toBe(true);
    });

    it("should return true if user has enough credits", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        credits: 10,
        subscription_tier: "free",
      });

      const result = await authService.checkUserCredits("user-1", 5);
      expect(result).toBe(true);
    });

    it("should return false if user has insufficient credits", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        credits: 3,
        subscription_tier: "free",
      });

      const result = await authService.checkUserCredits("user-1", 5);
      expect(result).toBe(false);
    });

    it("should return false if user not found", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue(null);

      const result = await authService.checkUserCredits("non-existent", 1);
      expect(result).toBe(false);
    });
  });

  describe("deductCredits", () => {
    it("should not deduct credits for business tier", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        subscription_tier: "business",
      });

      await authService.deductCredits("user-1", 5);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledTimes(1);
      expect(mockEnv.DATABASE.run).not.toHaveBeenCalled();
    });

    it("should deduct credits for non-business tiers", async () => {
      mockEnv.DATABASE.first = vi.fn().mockResolvedValue({
        subscription_tier: "pro",
      });
      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      await authService.deductCredits("user-1", 5);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        expect.stringContaining("UPDATE users SET credits = credits - ?")
      );
    });
  });

  describe("addCredits", () => {
    it("should add credits to user", async () => {
      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      await authService.addCredits("user-1", 100);
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "UPDATE users SET credits = credits + ? WHERE id = ?"
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith(100, "user-1");
    });
  });

  describe("updateSubscription", () => {
    it("should update user subscription tier and credits", async () => {
      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      await authService.updateSubscription("user-1", "pro");
      expect(mockEnv.DATABASE.prepare).toHaveBeenCalledWith(
        "UPDATE users SET subscription_tier = ?, credits = ? WHERE id = ?"
      );
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith("pro", 500, "user-1");
    });

    it("should set correct credits for each tier", async () => {
      mockEnv.DATABASE.run = vi.fn().mockResolvedValue({ success: true });

      await authService.updateSubscription("user-1", "free");
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith("free", 10, "user-1");

      await authService.updateSubscription("user-2", "business");
      expect(mockEnv.DATABASE.bind).toHaveBeenCalledWith("business", 999999, "user-2");
    });
  });
});