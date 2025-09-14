import { expect, test } from "@playwright/test";

test.describe("Chat Application E2E Tests", () => {
  test.beforeEach(async ({ page }) => {
    // Mock authentication by setting a token
    await page.addInitScript(() => {
      localStorage.setItem("auth_token", "test-token");
    });
  });

  test("should load the landing page", async ({ page }) => {
    await page.goto("/");

    // Check for key landing page elements
    await expect(page).toHaveTitle(/Chat/);
    await expect(page.locator("text=Start Chatting")).toBeVisible();
  });

  test("should navigate to chat interface after login", async ({ page }) => {
    await page.goto("/");

    // Click login button
    await page.click("button:has-text('Login')");

    // Mock successful authentication
    await page.evaluate(() => {
      window.dispatchEvent(
        new CustomEvent("auth-success", {
          detail: { userId: "test-user", token: "test-token" },
        }),
      );
    });

    // Should redirect to chat interface
    await expect(page).toHaveURL(/\/chat/);
  });

  test.describe("Conversation Management", () => {
    test.beforeEach(async ({ page }) => {
      // Navigate directly to chat interface
      await page.goto("/chat");
    });

    test("should create a new conversation", async ({ page }) => {
      // Click new chat button
      await page.click("button:has-text('New Chat')");

      // Check if new conversation is created
      await expect(page.locator(".conversation-item")).toHaveCount(1);
      await expect(page.locator(".conversation-title")).toContainText("New Conversation");
    });

    test("should list existing conversations", async ({ page }) => {
      // Mock API response for conversations
      await page.route("/api/conversations", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: [
              {
                id: "conv-1",
                user_id: "user-1",
                title: "First Chat",
                model: "llama-2-7b",
                created_at: "2024-01-01T00:00:00Z",
                updated_at: "2024-01-01T00:00:00Z",
              },
              {
                id: "conv-2",
                user_id: "user-1",
                title: "Second Chat",
                model: "mistral-7b",
                created_at: "2024-01-02T00:00:00Z",
                updated_at: "2024-01-02T00:00:00Z",
              },
            ],
          }),
        });
      });

      await page.reload();

      // Check conversations are displayed
      await expect(page.locator(".conversation-item")).toHaveCount(2);
      await expect(page.locator(".conversation-item").first()).toContainText("First Chat");
      await expect(page.locator(".conversation-item").nth(1)).toContainText("Second Chat");
    });

    test("should delete a conversation", async ({ page }) => {
      // Create a conversation first
      await page.click("button:has-text('New Chat')");

      // Click delete button
      await page.click(".conversation-item .delete-btn");

      // Confirm deletion
      await page.click("button:has-text('Confirm')");

      // Check conversation is removed
      await expect(page.locator(".conversation-item")).toHaveCount(0);
    });

    test("should select a conversation", async ({ page }) => {
      // Mock conversations
      await page.route("/api/conversations", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: [
              {
                id: "conv-1",
                title: "Test Conversation",
                model: "llama-2-7b",
              },
            ],
          }),
        });
      });

      await page.reload();

      // Click on conversation
      await page.click(".conversation-item");

      // Check if conversation is selected
      await expect(page.locator(".conversation-item.active")).toHaveCount(1);
      await expect(page.locator(".chat-header")).toContainText("Test Conversation");
    });
  });

  test.describe("Message Sending", () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/chat");

      // Create a conversation
      await page.click("button:has-text('New Chat')");
    });

    test("should send a message and receive AI response", async ({ page }) => {
      // Mock message send API
      await page.route("/api/messages", async (route) => {
        if (route.request().method() === "POST") {
          await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
              success: true,
              data: {
                id: "msg-ai-1",
                conversation_id: "conv-1",
                user_id: "user-1",
                role: "assistant",
                content: "Hello! How can I help you today?",
                tokens_used: 10,
                created_at: new Date().toISOString(),
              },
            }),
          });
        }
      });

      // Type message
      await page.fill(".chat-input", "Hello AI!");

      // Send message
      await page.press(".chat-input", "Enter");

      // Check user message appears
      await expect(page.locator(".message-user")).toContainText("Hello AI!");

      // Check AI response appears
      await expect(page.locator(".message-assistant")).toContainText(
        "Hello! How can I help you today?",
      );
    });

    test("should show typing indicator while AI is responding", async ({ page }) => {
      // Mock delayed response
      await page.route("/api/messages", async (route) => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: {
              role: "assistant",
              content: "Response after delay",
            },
          }),
        });
      });

      // Send message
      await page.fill(".chat-input", "Test message");
      await page.press(".chat-input", "Enter");

      // Check typing indicator appears
      await expect(page.locator(".typing-indicator")).toBeVisible();

      // Wait for response
      await expect(page.locator(".message-assistant")).toContainText("Response after delay");

      // Typing indicator should be gone
      await expect(page.locator(".typing-indicator")).not.toBeVisible();
    });

    test("should disable input while sending", async ({ page }) => {
      // Mock slow API
      await page.route("/api/messages", async (route) => {
        await new Promise(resolve => setTimeout(resolve, 2000));
        await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
      });

      // Send message
      await page.fill(".chat-input", "Test");
      await page.press(".chat-input", "Enter");

      // Check input is disabled
      await expect(page.locator(".chat-input")).toBeDisabled();
      await expect(page.locator(".send-btn")).toBeDisabled();
    });
  });

  test.describe("WebSocket Real-time Features", () => {
    test("should connect to WebSocket for real-time updates", async ({ page }) => {
      await page.goto("/chat");

      // Check WebSocket connection indicator
      await expect(page.locator(".connection-status")).toHaveClass(/connected/);
    });

    test("should show typing indicators from other users", async ({ page }) => {
      await page.goto("/chat");

      // Simulate WebSocket typing event
      await page.evaluate(() => {
        window.dispatchEvent(
          new CustomEvent("ws-message", {
            detail: {
              type: "typing",
              userId: "other-user",
              conversationId: "conv-1",
            },
          }),
        );
      });

      // Check typing indicator for other user
      await expect(page.locator(".other-user-typing")).toBeVisible();
    });
  });

  test.describe("Error Handling", () => {
    test("should show error when message fails to send", async ({ page }) => {
      await page.goto("/chat");

      // Mock API error
      await page.route("/api/messages", async (route) => {
        await route.fulfill({
          status: 500,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            error: "Failed to send message",
          }),
        });
      });

      // Try to send message
      await page.fill(".chat-input", "This will fail");
      await page.press(".chat-input", "Enter");

      // Check error message appears
      await expect(page.locator(".error-message")).toContainText("Failed to send message");
    });

    test("should show insufficient credits error", async ({ page }) => {
      await page.goto("/chat");

      // Mock insufficient credits error
      await page.route("/api/messages", async (route) => {
        await route.fulfill({
          status: 402,
          contentType: "application/json",
          body: JSON.stringify({
            success: false,
            error: "Insufficient credits",
          }),
        });
      });

      // Try to send message
      await page.fill(".chat-input", "Need more credits");
      await page.press(".chat-input", "Enter");

      // Check credits error appears
      await expect(page.locator(".error-message")).toContainText("Insufficient credits");
      await expect(page.locator("button:has-text('Buy Credits')")).toBeVisible();
    });
  });

  test.describe("Mobile Responsiveness", () => {
    test("should show mobile menu on small screens", async ({ page }) => {
      // Set mobile viewport
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/chat");

      // Mobile menu button should be visible
      await expect(page.locator(".mobile-menu-btn")).toBeVisible();

      // Desktop sidebar should be hidden
      await expect(page.locator(".conversation-list")).not.toBeVisible();

      // Open mobile menu
      await page.click(".mobile-menu-btn");

      // Sidebar should slide in
      await expect(page.locator(".conversation-list")).toBeVisible();
    });

    test("should have touch-friendly buttons on mobile", async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto("/chat");

      // Check button sizes
      const sendButton = page.locator(".send-btn");
      const box = await sendButton.boundingBox();

      expect(box?.height).toBeGreaterThanOrEqual(44); // iOS minimum touch target
    });
  });

  test.describe("Subscription and Credits", () => {
    test("should show subscription status", async ({ page }) => {
      // Mock user profile API
      await page.route("/api/user/profile", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: {
              subscription_tier: "pro",
              credits: 450,
            },
          }),
        });
      });

      await page.goto("/chat");

      // Check subscription display
      await expect(page.locator(".subscription-tier")).toContainText("Pro");
      await expect(page.locator(".credits-remaining")).toContainText("450");
    });

    test("should open Stripe checkout for subscription", async ({ page }) => {
      await page.goto("/chat");

      // Mock checkout session creation
      await page.route("/api/subscription/create", async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            success: true,
            data: {
              url: "https://checkout.stripe.com/test-session",
            },
          }),
        });
      });

      // Click upgrade button
      await page.click("button:has-text('Upgrade to Pro')");

      // Check if Stripe checkout URL is called
      await expect(page.url()).toContain("checkout.stripe.com");
    });
  });
});
