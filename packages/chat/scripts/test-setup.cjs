#!/usr/bin/env node

/**
 * Test Setup Script
 * Prepares the test environment before running tests
 */

const fs = require("fs").promises;
const _path = require("path");

async function setupTestEnvironment() {
  console.log("🔧 Setting up test environment...");

  try {
    // Create test directories
    const testDirs = [
      "test-results",
      "test-results/screenshots",
      "test-results/videos",
      "test-results/traces",
      "test-results/cucumber-report",
      "test-results/playwright-report",
      "test-results/coverage",
    ];

    for (const dir of testDirs) {
      await fs.mkdir(dir, { recursive: true });
      console.log(`📁 Created directory: ${dir}`);
    }

    // Ensure .env.test exists
    const envTestPath = ".env.test";
    try {
      await fs.access(envTestPath);
      console.log("✅ Test environment file exists");
    } catch (_error) {
      console.warn("⚠️ .env.test file not found - using default settings");
    }

    // Clean up any existing test databases
    const testDbFiles = ["test.db", "test-local.db"];
    for (const dbFile of testDbFiles) {
      try {
        await fs.unlink(dbFile);
        console.log(`🗑️ Cleaned up existing database: ${dbFile}`);
      } catch (_error) {
        // File might not exist, which is fine
      }
    }

    // Verify required dependencies
    const packageJsonPath = "package.json";
    const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf-8"));

    const requiredDevDeps = [
      "@cucumber/cucumber",
      "@playwright/test",
      "dotenv-cli",
      "rimraf",
      "tsx",
    ];

    const missingDeps = requiredDevDeps.filter(
      (dep) => !packageJson.devDependencies || !packageJson.devDependencies[dep],
    );

    if (missingDeps.length > 0) {
      console.warn("⚠️ Missing required test dependencies:", missingDeps);
      console.log("Run: npm install --save-dev", missingDeps.join(" "));
    } else {
      console.log("✅ All required test dependencies are installed");
    }

    // Check if mock server script is executable
    const mockServerPath = "features/support/mock-server.js";
    try {
      await fs.access(mockServerPath);
      console.log("✅ Mock server script found");
    } catch (_error) {
      console.warn("⚠️ Mock server script not found at:", mockServerPath);
    }

    // Verify Next.js configuration exists
    const nextConfigPaths = ["next.config.js", "next.config.mjs", "next.config.ts"];
    let nextConfigFound = false;

    for (const configPath of nextConfigPaths) {
      try {
        await fs.access(configPath);
        console.log(`✅ Next.js configuration found: ${configPath}`);
        nextConfigFound = true;
        break;
      } catch (_error) {
        // Try next config file
      }
    }

    if (!nextConfigFound) {
      console.warn("⚠️ No Next.js configuration file found");
    }

    // Create test database schema (if needed)
    // This would be where you'd set up your test database schema

    console.log("✅ Test environment setup completed successfully");

    // Return success
    process.exit(0);
  } catch (error) {
    console.error("❌ Test environment setup failed:", error);
    process.exit(1);
  }
}

// Run setup if this script is executed directly
if (require.main === module) {
  setupTestEnvironment();
}

module.exports = { setupTestEnvironment };
