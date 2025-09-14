#!/usr/bin/env node

/**
 * Test Data Seeder
 * Seeds the test database with test data for consistent testing
 */

require("dotenv").config({ path: ".env.test" });

const fs = require("fs").promises;

// Test data fixtures
const testUsers = [
  {
    id: "user_free123",
    email: "free@example.com",
    firstName: "Free",
    lastName: "User",
    createdAt: new Date().toISOString(),
    subscription: {
      tier: "free",
      credits: 10,
      status: "active",
    },
  },
  {
    id: "user_pro123",
    email: "pro@example.com",
    firstName: "Pro",
    lastName: "User",
    createdAt: new Date().toISOString(),
    subscription: {
      tier: "pro",
      credits: 1000,
      status: "active",
    },
  },
  {
    id: "user_enterprise123",
    email: "enterprise@example.com",
    firstName: "Enterprise",
    lastName: "User",
    createdAt: new Date().toISOString(),
    subscription: {
      tier: "enterprise",
      credits: 10000,
      status: "active",
    },
  },
  {
    id: "user_expired123",
    email: "expired@example.com",
    firstName: "Expired",
    lastName: "User",
    createdAt: new Date().toISOString(),
    subscription: {
      tier: "pro",
      credits: 0,
      status: "canceled",
    },
  },
];

const testConversations = [
  {
    id: "conv_test123",
    userId: "user_free123",
    title: "Test Conversation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "msg_test123",
        role: "user",
        content: "Hello, this is a test message",
        timestamp: new Date().toISOString(),
      },
      {
        id: "msg_test124",
        role: "assistant",
        content: "Hello! I'm a test AI assistant response.",
        timestamp: new Date().toISOString(),
      },
    ],
  },
  {
    id: "conv_test124",
    userId: "user_pro123",
    title: "Pro User Conversation",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    messages: [
      {
        id: "msg_test125",
        role: "user",
        content: "This is a pro user test conversation",
        timestamp: new Date().toISOString(),
      },
    ],
  },
];

const testSubscriptions = [
  {
    userId: "user_pro123",
    stripeCustomerId: "cus_pro_test123",
    stripeSubscriptionId: "sub_pro_test123",
    tier: "pro",
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    userId: "user_enterprise123",
    stripeCustomerId: "cus_enterprise_test123",
    stripeSubscriptionId: "sub_enterprise_test123",
    tier: "enterprise",
    status: "active",
    currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
  {
    userId: "user_expired123",
    stripeCustomerId: "cus_expired_test123",
    stripeSubscriptionId: "sub_expired_test123",
    tier: "pro",
    status: "canceled",
    currentPeriodEnd: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  },
];

/**
 * Seed test data for SQLite database (if using SQLite)
 */
async function seedSQLiteDatabase() {
  console.log("🌱 Seeding SQLite test database...");

  try {
    // This is a placeholder for actual database seeding
    // In a real implementation, you would:
    // 1. Connect to your test database
    // 2. Create tables if they don't exist
    // 3. Insert test data

    const testDataFile = "test-results/test-data.json";
    const allTestData = {
      users: testUsers,
      conversations: testConversations,
      subscriptions: testSubscriptions,
      seededAt: new Date().toISOString(),
    };

    await fs.writeFile(testDataFile, JSON.stringify(allTestData, null, 2));
    console.log(`✅ Test data saved to ${testDataFile}`);
  } catch (error) {
    console.error("❌ Failed to seed SQLite database:", error);
    throw error;
  }
}

/**
 * Seed test data for Cloudflare D1 database
 */
async function seedD1Database() {
  console.log("🌱 Seeding Cloudflare D1 test database...");

  try {
    // This would use Wrangler CLI to seed D1 database
    // For now, we'll just create the SQL commands that would be executed

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        first_name TEXT,
        last_name TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `;

    const createConversationsTable = `
      CREATE TABLE IF NOT EXISTS conversations (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        title TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    const createMessagesTable = `
      CREATE TABLE IF NOT EXISTS messages (
        id TEXT PRIMARY KEY,
        conversation_id TEXT NOT NULL,
        role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
        content TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (conversation_id) REFERENCES conversations(id)
      );
    `;

    const createSubscriptionsTable = `
      CREATE TABLE IF NOT EXISTS subscriptions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id TEXT NOT NULL,
        stripe_customer_id TEXT,
        stripe_subscription_id TEXT,
        tier TEXT NOT NULL DEFAULT 'free',
        status TEXT NOT NULL DEFAULT 'active',
        credits INTEGER DEFAULT 0,
        current_period_end DATETIME,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      );
    `;

    const sqlCommands = [
      createUsersTable,
      createConversationsTable,
      createMessagesTable,
      createSubscriptionsTable,
    ];

    // Generate insert statements for test users
    for (const user of testUsers) {
      sqlCommands.push(`
        INSERT OR REPLACE INTO users (id, email, first_name, last_name, created_at)
        VALUES ('${user.id}', '${user.email}', '${user.firstName}', '${user.lastName}', '${user.createdAt}');
      `);
    }

    // Generate insert statements for subscriptions
    for (const sub of testSubscriptions) {
      sqlCommands.push(`
        INSERT OR REPLACE INTO subscriptions (user_id, stripe_customer_id, stripe_subscription_id, tier, status, current_period_end, created_at)
        VALUES ('${sub.userId}', '${sub.stripeCustomerId}', '${sub.stripeSubscriptionId}', '${sub.tier}', '${sub.status}', '${sub.currentPeriodEnd}', '${sub.createdAt}');
      `);
    }

    // Generate insert statements for conversations and messages
    for (const conv of testConversations) {
      sqlCommands.push(`
        INSERT OR REPLACE INTO conversations (id, user_id, title, created_at, updated_at)
        VALUES ('${conv.id}', '${conv.userId}', '${conv.title}', '${conv.createdAt}', '${conv.updatedAt}');
      `);

      for (const msg of conv.messages) {
        sqlCommands.push(`
          INSERT OR REPLACE INTO messages (id, conversation_id, role, content, created_at)
          VALUES ('${msg.id}', '${conv.id}', '${msg.role}', '${msg.content}', '${msg.timestamp}');
        `);
      }
    }

    // Write SQL commands to file for manual execution if needed
    const sqlFile = "test-results/seed-test-data.sql";
    await fs.writeFile(sqlFile, sqlCommands.join("\\n\\n"));
    console.log(`✅ D1 seed SQL commands saved to ${sqlFile}`);

    // In a real implementation, you would execute these commands using:
    // wrangler d1 execute DATABASE --file=./test-results/seed-test-data.sql
  } catch (error) {
    console.error("❌ Failed to seed D1 database:", error);
    throw error;
  }
}

/**
 * Main seeding function
 */
async function seedTestData() {
  console.log("🌱 Starting test data seeding...");

  try {
    // Ensure test-results directory exists
    await fs.mkdir("test-results", { recursive: true });

    // Determine database type from environment
    const databaseUrl = process.env.DATABASE_URL || "";

    if (databaseUrl.includes("d1") || process.env.CLOUDFLARE_ACCOUNT_ID) {
      await seedD1Database();
    } else {
      await seedSQLiteDatabase();
    }

    console.log("✅ Test data seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("❌ Test data seeding failed:", error);
    process.exit(1);
  }
}

// Run seeding if this script is executed directly
if (require.main === module) {
  seedTestData();
}

module.exports = {
  seedTestData,
  testUsers,
  testConversations,
  testSubscriptions,
};
