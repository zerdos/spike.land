export default {
  paths: ["features/**/*.feature"],
  import: ["features/**/*.ts"],
  format: [
    "@cucumber/pretty-formatter",
    "html:test-results/cucumber-report.html",
    "json:test-results/cucumber-report.json",
  ],
  formatOptions: {
    snippetInterface: "async-await",
  },
  publishQuiet: true,
  parallel: 2,
  retry: 1,
  retryTagFilter: "@flaky",
};

export const ci = {
  paths: ["features/**/*.feature"],
  import: ["features/**/*.ts"],
  format: [
    "json:test-results/cucumber-report.json",
    "junit:test-results/cucumber-report.xml",
  ],
  publishQuiet: true,
  parallel: 5,
  retry: 2,
};
