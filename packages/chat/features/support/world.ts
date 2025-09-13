import type { IWorldOptions } from "@cucumber/cucumber";
import { setWorldConstructor, World } from "@cucumber/cucumber";
import type { Browser, BrowserContext, Page } from "@playwright/test";
import { chromium, firefox, webkit } from "@playwright/test";
import { ChatPage } from "../page-objects/ChatPage.js";
import { ConversationPage } from "../page-objects/ConversationPage.js";
import { LandingPage } from "../page-objects/LandingPage.js";

export interface CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  chatPage: ChatPage;
  landingPage: LandingPage;
  conversationPage: ConversationPage;
}

export class CustomWorldImpl extends World implements CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  chatPage!: ChatPage;
  landingPage!: LandingPage;
  conversationPage!: ConversationPage;

  constructor(options: IWorldOptions) {
    super(options);
  }

  async init() {
    const browserType = process.env.BROWSER || "chromium";

    switch (browserType) {
      case "firefox":
        this.browser = await firefox.launch({ headless: process.env.HEADLESS !== "false" });
        break;
      case "webkit":
        this.browser = await webkit.launch({ headless: process.env.HEADLESS !== "false" });
        break;
      default:
        this.browser = await chromium.launch({ headless: process.env.HEADLESS !== "false" });
    }

    this.context = await this.browser.newContext({
      baseURL: process.env.BASE_URL || "http://localhost:3000",
      viewport: { width: 1280, height: 720 },
      ignoreHTTPSErrors: true,
      extraHTTPHeaders: {
        "x-test-mode": "true",
      },
      ...(process.env.DEVICE && {
        ...this.getDeviceConfig(process.env.DEVICE),
      }),
    });

    this.page = await this.context.newPage();

    // Initialize page objects
    this.chatPage = new ChatPage(this.page);
    this.landingPage = new LandingPage(this.page);
    this.conversationPage = new ConversationPage(this.page);

    // Initialize test environment in browser
    await this.page.addInitScript(() => {
      // Set test mode flag
      (window as any).__TEST_MODE__ = true;

      // Add auth token if needed
      if (process.env.AUTH_TOKEN) {
        localStorage.setItem("auth_token", process.env.AUTH_TOKEN);
      }

      // Mock console.error to capture errors during tests
      const originalConsoleError = console.error;
      (window as any).__TEST_CONSOLE_ERRORS__ = [];
      console.error = (...args) => {
        (window as any).__TEST_CONSOLE_ERRORS__.push(args);
        originalConsoleError.apply(console, args);
      };

      // Set up Next.js test environment
      (window as any).__NEXT_DATA__ = (window as any).__NEXT_DATA__ || {};
    });
  }

  async cleanup() {
    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }

  private getDeviceConfig(device: string) {
    const devices = {
      "iPhone 12": webkit.devices["iPhone 12"],
      "Pixel 5": chromium.devices["Pixel 5"],
      "iPad Mini": webkit.devices["iPad Mini landscape"],
      "Galaxy S21": chromium.devices["Galaxy S21"],
    };
    return devices[device as keyof typeof devices] || {};
  }
}

setWorldConstructor(CustomWorldImpl);
