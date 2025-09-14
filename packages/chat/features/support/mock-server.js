#!/usr/bin/env node

import http from "http";
import { parse as parseUrl } from "url";

const PORT = process.env.MOCK_SERVER_PORT || 3001;

// Mock data
const mockUsers = {
  "user_free123": {
    id: "user_free123",
    email: "free@example.com",
    firstName: "Free",
    lastName: "User",
    subscription: { tier: "free", credits: 10, status: "active" },
  },
  "user_pro123": {
    id: "user_pro123",
    email: "pro@example.com",
    firstName: "Pro",
    lastName: "User",
    subscription: { tier: "pro", credits: 1000, status: "active" },
  },
  "user_enterprise123": {
    id: "user_enterprise123",
    email: "enterprise@example.com",
    firstName: "Enterprise",
    lastName: "User",
    subscription: { tier: "enterprise", credits: 10000, status: "active" },
  },
};

const mockSessions = {
  "sess_active123": {
    id: "sess_active123",
    user: mockUsers["user_free123"],
    status: "active",
    lastActiveAt: new Date().toISOString(),
  },
};

const mockStripeCustomers = {
  "cus_free123": {
    id: "cus_free123",
    email: "free@example.com",
  },
  "cus_pro123": {
    id: "cus_pro123",
    email: "pro@example.com",
    subscription: {
      id: "sub_pro123",
      status: "active",
      current_period_end: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60,
    },
  },
};

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  });
  res.end(JSON.stringify(data));
}

// Request handler
function handleRequest(req, res) {
  const parsedUrl = parseUrl(req.url, true);
  const path = parsedUrl.pathname;
  const method = req.method;

  console.log(`[Mock Server] ${method} ${path}`);

  // Handle CORS preflight
  if (method === "OPTIONS") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    });
    res.end();
    return;
  }

  // Health check
  if (path === "/health") {
    sendJSON(res, 200, { status: "ok", timestamp: new Date().toISOString() });
    return;
  }

  // Clerk API mocks
  if (path.startsWith("/clerk/v1/")) {
    if (path.includes("/sessions")) {
      sendJSON(res, 200, {
        response: {
          sessions: Object.values(mockSessions),
        },
      });
      return;
    }

    if (path.includes("/users")) {
      const userId = path.split("/users/")[1];
      const user = mockUsers[userId] || mockUsers["user_free123"];
      sendJSON(res, 200, { response: user });
      return;
    }

    if (path.includes("/jwks")) {
      sendJSON(res, 200, {
        keys: [
          {
            kty: "RSA",
            kid: "test-key-id",
            use: "sig",
            n: "test-modulus",
            e: "AQAB",
          },
        ],
      });
      return;
    }
  }

  // Stripe API mocks
  if (path.startsWith("/stripe/v1/")) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer sk_test_")) {
      sendJSON(res, 401, { error: { message: "Invalid API key" } });
      return;
    }

    if (path.includes("/customers")) {
      const customerId = path.split("/customers/")[1];
      if (customerId) {
        const customer = mockStripeCustomers[customerId];
        if (customer) {
          sendJSON(res, 200, customer);
        } else {
          sendJSON(res, 404, { error: { message: "Customer not found" } });
        }
        return;
      }

      // List customers
      sendJSON(res, 200, {
        data: Object.values(mockStripeCustomers),
        has_more: false,
      });
      return;
    }

    if (path.includes("/subscriptions")) {
      // Mock subscription endpoints
      sendJSON(res, 200, {
        data: [],
        has_more: false,
      });
      return;
    }

    if (path.includes("/payment_methods")) {
      sendJSON(res, 200, {
        data: [
          {
            id: "pm_test123",
            type: "card",
            card: {
              brand: "visa",
              last4: "4242",
              exp_month: 12,
              exp_year: 2025,
            },
          },
        ],
        has_more: false,
      });
      return;
    }
  }

  // WebSocket mock endpoint
  if (path === "/ws") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("WebSocket mock endpoint - use WebSocket client for testing");
    return;
  }

  // Default 404
  sendJSON(res, 404, {
    error: {
      message: `Mock endpoint not found: ${method} ${path}`,
      available_endpoints: [
        "/health",
        "/clerk/v1/sessions",
        "/clerk/v1/users/:id",
        "/clerk/v1/jwks",
        "/stripe/v1/customers",
        "/stripe/v1/subscriptions",
        "/ws",
      ],
    },
  });
}

// Create and start server
const server = http.createServer(handleRequest);

server.listen(PORT, () => {
  console.log(`🎭 Mock server running on http://localhost:${PORT}`);
  console.log(`📋 Available endpoints:`);
  console.log(`   GET /health - Health check`);
  console.log(`   GET /clerk/v1/sessions - Mock Clerk sessions`);
  console.log(`   GET /clerk/v1/users/:id - Mock Clerk users`);
  console.log(`   GET /stripe/v1/customers - Mock Stripe customers`);
  console.log(`   GET /ws - WebSocket mock endpoint`);
});

// Graceful shutdown
process.on("SIGINT", () => {
  console.log("\n🛑 Shutting down mock server...");
  server.close(() => {
    console.log("✅ Mock server stopped");
    process.exit(0);
  });
});

process.on("SIGTERM", () => {
  console.log("\n🛑 Received SIGTERM, shutting down mock server...");
  server.close(() => {
    console.log("✅ Mock server stopped");
    process.exit(0);
  });
});
