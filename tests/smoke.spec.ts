import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://testing.spike.land");
  await wait(5500);

  const RCA = fetch("https://testing.spike.land/live/rca/index.tsx").then(
    (res) => res.text(),
  );

  await expect(page).toHaveURL("https://testing.spike.land/live/coder ");

  await page.screenshot({ path: `editor.png` });
});

test("screens test", async ({ page }) => {
  await page.goto("https://testing.spike.land/live/pwtest/");
  await wait(500);

  const RCA = fetch("https://testing.spike.land/live/rca/index.tsx").then(
    (res) => res.text(),
  );

  await expect(page).toHaveURL("https://testing.spike.land/live/pwtest/ ");

  const editor = page.locator("[id=editor]");

  const message = "HELLO" + Math.random() + "Foo..." + Math.random();
  await editor.dblclick();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await editor.type(`export default () => <header> ${message} </header>;`);

  await expect(page.locator("[data-test-id=z-body]")).toHaveText(message, {
    timeout: 10000,
  });
});

test("rca test", async ({ page }) => {
  await page.goto("https://testing.spike.land/live/pwtest/");

  await wait(500);

  const RCA = fetch("https://testing.spike.land/live/rca/index.tsx").then(
    (res) => res.text(),
  );

  await expect(page).toHaveURL("https://testing.spike.land/live/pwtest/ ");

  const editor = page.locator("[data-test-id=editor]");

  const rca = await RCA;
  const rcaTrimmed = rca.split("\n").map((x) => x.trim()).join("\n ");
  const message = rcaTrimmed;
  await editor.dblclick();
  await wait(500);

  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await wait(500);

  await editor.type(`export default ()=><div><h1>Hello You</h1></div>`);

  await expect(page.locator("[data-test-id=z-body]")).toContainText("Hello", {
    timeout: 10000,
  });
});

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
