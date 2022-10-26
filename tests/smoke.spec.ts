import { expect, test } from "@playwright/test";

const RCA = fetch("https://testing.spike.land/live/rca/index.tsx").then(
  (res) => res.text(),
).then(x => x.split("\n").map((x) => x.trim()).join("\n "));

test("basic test", async ({ page }) => {
  await page.goto("https://testing.spike.land");
  await wait(5500);

  await expect(page).toHaveURL("https://testing.spike.land/live/coder ");

  await page.screenshot({ path: `editor.png` });
});

test("screens test", async ({ page }) => {
  await page.goto("https://testing.spike.land/live/pwtest1");
  await wait(500);

  await expect(page).toHaveURL("https://testing.spike.land/live/pwtest1");

  const editor = page.locator("[data-test-id=editor]");

  const message = "HELLO" + Math.random() + "Foo..." + Math.random();
  await editor.dblclick();
  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");
  await wait(1000);
  await editor.type(`export default () => <header css=""> ${message} </header>;`);
  await wait(1500);
  await expect(page.locator("[data-test-id=z-body]")).toHaveText(message, {
    timeout: 1000,
  });
});

test("rca test", async ({ page }) => {
  await page.goto("https://testing.spike.land/live/pwtest2");

  await wait(500);

  await expect(page).toHaveURL("https://testing.spike.land/live/pwtest2");

  const editor = page.locator("[data-test-id=editor]");

  const message = await RCA;
  await editor.dblclick();

  await page.keyboard.press("Control+A");
  await page.keyboard.press("Delete");

  await editor.type(`export default ()=> <div css={}>
  <h1>Hello You</h1> 
  </div>
  `);

  await wait(1500);

  await expect(page.locator("[data-test-id=z-body]")).toHaveText("Hello", {
    timeout: 1000,
  });
});

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
