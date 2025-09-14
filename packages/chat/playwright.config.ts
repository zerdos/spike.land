import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["junit", { outputFile: "test-results/results.xml" }], ["github"]]
    : [["html", { outputFolder: "test-results/playwright-report" }], ["line"]],

  // Global test setup and teardown
  globalSetup: require.resolve("./features/support/global-setup.ts"),
  globalTeardown: require.resolve("./features/support/global-teardown.ts"),

  use: {
    // Use Next.js development server URL
    baseURL: process.env.BASE_URL || "http://localhost:3000",

    // Enhanced tracing for debugging
    trace: process.env.CI ? "retain-on-failure" : "on-first-retry",
    screenshot: "only-on-failure",
    video: process.env.CI ? "retain-on-failure" : "off",

    // Context options for Next.js
    ignoreHTTPSErrors: true,

    // Wait for network to be idle before considering page loaded
    actionTimeout: 10000,
    navigationTimeout: 15000,

    // Mock external services by default
    extraHTTPHeaders: {
      "x-test-mode": "true",
    },
  },

  // Test environment variables
  env: {
    NODE_ENV: "test",
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_publishable_key_for_testing",
    CLERK_SECRET_KEY: "sk_test_secret_key_for_testing",
    NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_stripe_publishable_key",
    STRIPE_SECRET_KEY: "sk_test_stripe_secret_key",
    DATABASE_URL: "file:./test.db",
    DISABLE_AUTH: "false",
    ENABLE_MOCK_SERVICES: "true",
  },

  projects: [
    // Desktop browsers
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        // Enable Chrome DevTools features
        launchOptions: {
          args: process.env.CI ? [] : ["--start-maximized"],
        },
      },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },

    // Mobile browsers
    {
      name: "Mobile Chrome",
      use: {
        ...devices["Pixel 5"],
        // Mobile-specific settings
        hasTouch: true,
      },
    },
    {
      name: "Mobile Safari",
      use: {
        ...devices["iPhone 12"],
        hasTouch: true,
      },
    },

    // Tablet testing
    {
      name: "Tablet",
      use: {
        ...devices["iPad Pro"],
        hasTouch: true,
      },
    },
  ],

  webServer: [
    // Start Next.js development server
    {
      command: process.env.CI ? "npm run build && npm run start" : "npm run dev",
      url: "http://localhost:3000",
      port: 3000,
      reuseExistingServer: !process.env.CI,
      timeout: 180 * 1000, // 3 minutes for Next.js to start
      env: {
        NODE_ENV: "test",
        NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: "pk_test_publishable_key_for_testing",
        CLERK_SECRET_KEY: "sk_test_secret_key_for_testing",
        NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: "pk_test_stripe_publishable_key",
        STRIPE_SECRET_KEY: "sk_test_stripe_secret_key",
        DISABLE_TELEMETRY: "1",
      },
    },

    // Start mock services server (if needed)
    {
      command: "node features/support/mock-server.js",
      url: "http://localhost:3001",
      port: 3001,
      reuseExistingServer: !process.env.CI,
      timeout: 30 * 1000,
    },
  ],

  // Output directories
  outputDir: "test-results/",

  // Test matching patterns
  testMatch: [
    "**/*.e2e.{js,ts}",
    "e2e/**/*.{js,ts}",
  ],

  // Expect configuration
  expect: {
    // Increase timeout for Next.js hydration
    timeout: 10 * 1000,
    // Take screenshots on assertion failures
    toHaveScreenshot: {
      threshold: 0.2,
      mode: "percent",
      animations: "disabled",
    },
  },
});
