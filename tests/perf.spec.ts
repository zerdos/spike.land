import { expect, Page, test, TestInfo } from "@playwright/test";

test("performance test example", async ({ page }, TestInfo) => {
  // Perform actions
  await page.goto(`/`);
  // Measure performance
  await measurePerformance(page, TestInfo);
});

async function measurePerformance(page: Page, TestInfo: TestInfo) {
  // Use Performance API to measure performance
  // https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType
  const [performanceTiming] = await page.evaluate(() => {
    const [timing] = performance.getEntriesByType("navigation");
    return [timing];
  });
  // Get the start to load event end time
  const startToLoadEventEnd = performanceTiming.loadEventEnd
    - performanceTiming.startTime;
  // Add the performance annotation to the HTML report
  test.info().annotations.push({
    type: "Performance",
    description:
      `"${TestInfo.project.name}" - Navigation start to load event end: ${startToLoadEventEnd}ms`,
  });
}
