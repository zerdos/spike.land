import { expect, test } from "@playwright/test";

test("basic test", async ({ page }) => {
  await page.goto("https://testing.spike.land");
  await wait(500);

const RCA =   fetch("https://testing.spike.land/live/rca/index.js").then(res=>res.text());

  await expect(page).toHaveURL("https://testing.spike.land/live/coder ");
  

  const editor = page.locator('[data-test-id=editor]');

  const message = "HELLO" + Math.random() + "Foo..." + Math.random();
  await editor.dblclick();
  await page.keyboard.press('Control+A');
  await editor.type(`export default () => <header> ${message} </header>;`);
  
  await expect( page.locator('[data-test-id=z-body]')).toHaveText(message, { timeout: 10000 });

  await page.keyboard.press('Control+A');

  const rca = await RCA;
  const rcaTrimmed = rca.split("\n").map(x=>x.trim()).join("\n");
  await editor.type(rcaTrimmed);


  await expect( page.locator('[data-test-id=z-body]')).toContainText("🔥", { timeout: 10000 });



  await page.screenshot({ path: `editor.png` });
});

export async function wait(delay: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
}
