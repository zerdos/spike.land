import { After, AfterAll, Before, BeforeAll, setDefaultTimeout, Status } from "@cucumber/cucumber";
import * as fs from "fs";
import * as path from "path";
import { CustomWorld } from "./world";

// Set default timeout for all steps
setDefaultTimeout(30 * 1000); // 30 seconds

// Global setup
BeforeAll(async function() {
  // Ensure test-results directory exists
  const testResultsDir = path.join(process.cwd(), "test-results");
  if (!fs.existsSync(testResultsDir)) {
    fs.mkdirSync(testResultsDir, { recursive: true });
  }

  console.log("Starting Cucumber tests...");
  console.log(`Base URL: ${process.env.BASE_URL || "http://localhost:8787"}`);
  console.log(`Browser: ${process.env.BROWSER || "chromium"}`);
});

// Before each scenario
Before(async function(this: CustomWorld) {
  await this.init();
});

// After each scenario
After(async function(this: CustomWorld, { result, pickle }) {
  // Take screenshot on failure
  if (result?.status === Status.FAILED) {
    const screenshot = await this.page.screenshot({
      fullPage: true,
    });

    const screenshotPath = `test-results/failed-${
      pickle.name.replace(/\s+/g, "-")
    }-${Date.now()}.png`;
    fs.writeFileSync(screenshotPath, screenshot);

    // Attach to report
    this.attach(screenshot, "image/png");

    // Log console errors
    const consoleLogs = await this.page.evaluate(() => {
      return (window as any).__consoleLogs || [];
    });

    if (consoleLogs.length > 0) {
      this.attach(`Console logs:\n${consoleLogs.join("\n")}`, "text/plain");
    }
  }

  await this.cleanup();
});

// After specific tags
After({ tags: "@payment" }, async function(this: CustomWorld) {
  // Clean up any test payment data
  console.log("Cleaning up payment test data...");
});

After({ tags: "@mobile" }, async function(this: CustomWorld) {
  // Reset viewport after mobile tests
  if (this.page) {
    await this.page.setViewportSize({ width: 1280, height: 720 });
  }
});

// Global cleanup
AfterAll(async function() {
  console.log("All tests completed.");
});
