// Custom wrapper to fix SIGTRAP issues with ESLint in Yarn PnP
module.exports = (eslint) => {
  // Patch any potential issues with native modules on Apple Silicon
  if (process.platform === "darwin" && process.arch === "arm64") {
    // Disable code signing validation for Apple Silicon
    process.env.NODE_OPTIONS = "--no-node-snapshot --no-addons";

    // Force unsigned modules
    process.env.NODE_NO_WARNINGS = "1";
    process.env.ELECTRON_RUN_AS_NODE = "1";

    // Disable JIT compilation which can cause SIGTRAP
    process.env.NODE_COMPILER_OPTIONS = "--jitless";
  }

  // Ensure process doesn't crash on unhandled rejections
  process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
  });

  return eslint;
};
