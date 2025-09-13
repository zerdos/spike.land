import { chromium } from "@playwright/test";
import type { FullConfig } from "@playwright/test";

async function globalSetup(config: FullConfig) {
  console.log("🚀 Starting global test setup for Next.js application...");

  // Set up test environment variables
  process.env.NODE_ENV = "test";
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY = "pk_test_publishable_key_for_testing";
  process.env.CLERK_SECRET_KEY = "sk_test_secret_key_for_testing";
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = "pk_test_stripe_publishable_key";
  process.env.STRIPE_SECRET_KEY = "sk_test_stripe_secret_key";

  // Ensure test directories exist
  const fs = await import("fs/promises");
  const path = await import("path");

  const testResultsDir = path.resolve("test-results");
  const playwrightReportDir = path.resolve("test-results/playwright-report");
  const cucumberReportDir = path.resolve("test-results/cucumber-report");

  try {
    await fs.mkdir(testResultsDir, { recursive: true });
    await fs.mkdir(playwrightReportDir, { recursive: true });
    await fs.mkdir(cucumberReportDir, { recursive: true });
  } catch (error) {
    console.warn("Failed to create test directories:", error);
  }

  // Clean up previous test artifacts
  try {
    const files = await fs.readdir(testResultsDir);
    for (const file of files) {
      if (file.endsWith(".db") || file.endsWith(".log")) {
        await fs.unlink(path.join(testResultsDir, file));
      }
    }
  } catch (error) {
    console.warn("Failed to clean up test artifacts:", error);
  }

  // Verify Next.js application is accessible (basic health check)
  if (config.webServer) {
    console.log("⏳ Waiting for Next.js application to be ready...");

    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Wait for the application to respond
      await page.goto(process.env.BASE_URL || "http://localhost:3000", {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Wait for React to hydrate
      await page.waitForFunction(
        () => {
          return document.readyState === "complete";
        },
        { timeout: 10000 }
      );

      console.log("✅ Next.js application is ready for testing");
    } catch (error) {
      console.error("❌ Failed to connect to Next.js application:", error);
      throw new Error("Next.js application is not accessible for testing");
    } finally {
      await page.close();
      await context.close();
      await browser.close();
    }
  }

  console.log("✅ Global test setup completed successfully");
}

export default globalSetup;