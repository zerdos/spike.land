import type { FullConfig } from "@playwright/test";

async function globalTeardown(config: FullConfig) {
  console.log("🧹 Starting global test teardown...");

  // Clean up test files and temporary data
  const fs = await import("fs/promises");
  const path = await import("path");

  try {
    // Remove test database files
    const testDbPath = path.resolve("test.db");
    await fs.unlink(testDbPath).catch(() => {
      // File might not exist, ignore
    });

    // Clean up temporary test files
    const tempFiles = ["test-results/temp", "test-results/*.tmp"];
    for (const pattern of tempFiles) {
      try {
        const glob = await import("glob");
        const files = glob.globSync(pattern);
        await Promise.all(files.map((file) => fs.unlink(file).catch(() => {})));
      } catch (error) {
        console.warn(`Failed to clean up ${pattern}:`, error);
      }
    }

    // Archive test results in CI
    if (process.env.CI) {
      console.log("📦 Archiving test results for CI...");

      // Create a summary of test results
      const testSummary = {
        timestamp: new Date().toISOString(),
        config: {
          baseURL: config.use?.baseURL,
          browsers: config.projects?.map(p => p.name),
        },
        results: "See detailed reports in test-results/ directory",
      };

      await fs.writeFile(
        "test-results/test-summary.json",
        JSON.stringify(testSummary, null, 2),
      );
    }

    console.log("✅ Global test teardown completed successfully");
  } catch (error) {
    console.error("❌ Error during global teardown:", error);
    // Don't fail the entire test run due to cleanup issues
  }
}

export default globalTeardown;
