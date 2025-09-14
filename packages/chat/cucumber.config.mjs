export default {
  paths: ["features/**/*.feature"],
  require: ["features/**/*.ts"],
  requireModule: ["tsx/cjs"],
  format: [
    "@cucumber/pretty-formatter",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json",
  ],
  formatOptions: {
    snippetInterface: "async-await",
    colorsEnabled: true,
  },
  publishQuiet: true,
  parallel: 1, // Run tests sequentially for Next.js stability
  retry: 2,
  retryTagFilter: "@flaky",
  timeout: 60000, // 60 second timeout per step
  worldParameters: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    testMode: true,
  },
  tags: "not @skip and not @wip",
};

export const ci = {
  paths: ["features/**/*.feature"],
  require: ["features/**/*.ts"],
  requireModule: ["tsx/cjs"],
  format: [
    "json:test-results/cucumber-report.json",
    "junit:test-results/cucumber-report.xml",
  ],
  formatOptions: {
    snippetInterface: "async-await",
  },
  publishQuiet: true,
  parallel: 3, // Reduced for Next.js CI stability
  retry: 3,
  retryTagFilter: "@flaky",
  timeout: 90000, // Longer timeout for CI
  worldParameters: {
    baseURL: process.env.BASE_URL || "http://localhost:3000",
    testMode: true,
    ci: true,
  },
  tags: "not @skip and not @wip and not @local-only",
};
