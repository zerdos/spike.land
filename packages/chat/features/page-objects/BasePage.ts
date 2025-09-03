import { Locator, Page } from "@playwright/test";

export abstract class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(path: string = "") {
    await this.page.goto(path);
  }

  async waitForElement(selector: string, timeout: number = 5000) {
    await this.page.waitForSelector(selector, { timeout });
  }

  async isElementVisible(selector: string): Promise<boolean> {
    try {
      await this.page.waitForSelector(selector, { timeout: 1000 });
      return true;
    } catch {
      return false;
    }
  }

  async getText(selector: string): Promise<string> {
    return await this.page.textContent(selector) || "";
  }

  async click(selector: string) {
    await this.page.click(selector);
  }

  async fill(selector: string, text: string) {
    await this.page.fill(selector, text);
  }

  async selectOption(selector: string, value: string) {
    await this.page.selectOption(selector, value);
  }

  async pressKey(key: string) {
    await this.page.keyboard.press(key);
  }

  async screenshot(name: string) {
    await this.page.screenshot({ path: `test-results/${name}.png`, fullPage: true });
  }

  async waitForResponse(url: string | RegExp) {
    return await this.page.waitForResponse(url);
  }

  async mockAPIResponse(url: string | RegExp, response: any) {
    await this.page.route(url, async (route) => {
      await route.fulfill({
        status: response.status || 200,
        contentType: "application/json",
        body: JSON.stringify(response.body),
      });
    });
  }

  async getElementCount(selector: string): Promise<number> {
    return await this.page.locator(selector).count();
  }

  async waitForLoadState(state: "load" | "domcontentloaded" | "networkidle" = "networkidle") {
    await this.page.waitForLoadState(state);
  }

  async reload() {
    await this.page.reload();
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async evaluateScript<T>(script: string | Function, arg?: any): Promise<T> {
    return await this.page.evaluate(script, arg);
  }

  async setLocalStorageItem(key: string, value: string) {
    await this.page.evaluate(([k, v]) => {
      localStorage.setItem(k, v);
    }, [key, value]);
  }

  async getLocalStorageItem(key: string): Promise<string | null> {
    return await this.page.evaluate((k) => {
      return localStorage.getItem(k);
    }, key);
  }

  async waitForTimeout(milliseconds: number) {
    await this.page.waitForTimeout(milliseconds);
  }
}
