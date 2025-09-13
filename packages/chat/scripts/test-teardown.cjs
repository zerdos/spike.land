#!/usr/bin/env node

/**
 * Test Teardown Script
 * Cleans up after test execution
 */

const fs = require("fs").promises;
const path = require("path");

async function teardownTestEnvironment() {
  console.log("🧹 Running test environment teardown...");

  try {
    // Clean up test database files
    const testDbFiles = ["test.db", "test-local.db"];
    for (const dbFile of testDbFiles) {
      try {
        await fs.unlink(dbFile);
        console.log(`🗑️ Removed test database: ${dbFile}`);
      } catch (error) {
        // File might not exist, which is fine
      }
    }

    // Clean up temporary files
    const tempFiles = [
      "test-results/*.tmp",
      "test-results/temp",
      ".nyc_output",
    ];

    for (const pattern of tempFiles) {
      try {
        // Use glob to find matching files
        const glob = require("glob");
        const files = glob.globSync(pattern);
        for (const file of files) {
          try {
            const stat = await fs.stat(file);
            if (stat.isDirectory()) {
              await fs.rmdir(file, { recursive: true });
            } else {
              await fs.unlink(file);
            }
            console.log(`🗑️ Removed: ${file}`);
          } catch (error) {
            // Ignore errors for individual file cleanup
          }
        }
      } catch (error) {
        // Glob might not be available or pattern might not match anything
      }
    }

    // Archive test results if in CI environment
    if (process.env.CI) {
      console.log("📦 Archiving test results for CI...");

      try {
        // Create test summary
        const testSummary = {
          timestamp: new Date().toISOString(),
          environment: "test",
          ci: true,
          nodeVersion: process.version,
          platform: process.platform,
        };

        await fs.writeFile(
          "test-results/test-summary.json",
          JSON.stringify(testSummary, null, 2)
        );

        console.log("✅ Test results archived");
      } catch (error) {
        console.warn("⚠️ Failed to archive test results:", error.message);
      }
    }

    // Stop any background processes that might still be running
    console.log("🔄 Checking for background processes...");

    // Kill any remaining Node.js processes on test ports
    const testPorts = [3000, 3001, 8787];
    for (const port of testPorts) {
      try {
        // This is a basic check - in a real environment you might want more robust process management
        const { exec } = require("child_process");
        exec(`lsof -ti:${port} | xargs kill -9 2>/dev/null || true`, (error) => {
          if (!error) {
            console.log(`🔌 Cleaned up processes on port ${port}`);
          }
        });
      } catch (error) {
        // Ignore errors - processes might not exist
      }
    }

    // Optional: Keep test results for debugging
    if (process.env.KEEP_TEST_RESULTS !== "true") {
      // Only clean up if not explicitly keeping results
      console.log("💾 Test results preserved in test-results/ directory");
    }

    console.log("✅ Test environment teardown completed successfully");

    // Return success
    process.exit(0);
  } catch (error) {
    console.error("❌ Test environment teardown failed:", error);
    // Don't fail the build due to cleanup issues
    process.exit(0);
  }
}

// Run teardown if this script is executed directly
if (require.main === module) {
  teardownTestEnvironment();
}

module.exports = { teardownTestEnvironment };