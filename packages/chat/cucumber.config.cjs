module.exports = {
  default: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
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
    parallel: 1,  // Run sequentially to avoid timing issues
    retry: 1,
    retryTagFilter: "@flaky",
    timeout: 60000,  // 60 second timeout per step
  },
  ci: {
    paths: ["features/**/*.feature"],
    requireModule: ["ts-node/register"],
    require: ["features/**/*.ts"],
    format: [
      "json:test-results/cucumber-report.json",
      "junit:test-results/cucumber-report.xml",
    ],
    publishQuiet: true,
    parallel: 5,
    retry: 2,
  },
};

// Set up ts-node configuration
process.env.TS_NODE_PROJECT = "./tsconfig.test.json";
