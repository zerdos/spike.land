import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://testing.spike.land");
  await expect(page).toHaveURL('https://testing.spike.land/live/coder ');
  await page.click("[data-test-id=editor]");
  await wait(500);
  await page.screenshot({ path: `editor.png` });
});


export async function wait (delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
