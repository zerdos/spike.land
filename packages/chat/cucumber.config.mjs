export default {
  paths: ["features/**/*.feature"],
  require: ["features/**/*.ts"],
  format: [
    "@cucumber/pretty-formatter",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json",
  ],
  formatOptions: {
    snippetInterface: "async-await",
  },
  publishQuiet: true,
  parallel: 1,  // Run tests sequentially to avoid timing conflicts
  retry: 1,
  retryTagFilter: "@flaky",
  timeout: 60000,  // 60 second timeout per step
};

export const ci = {
  paths: ["features/**/*.feature"],
  require: ["features/**/*.ts"],
  format: [
    "json:test-results/cucumber-report.json",
    "junit:test-results/cucumber-report.xml",
  ],
  publishQuiet: true,
  parallel: 5,
  retry: 2,
};
