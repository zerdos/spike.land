#!/usr/bin/env node

/**
 * Build script for Next.js app deployment to Cloudflare Workers
 * This script builds the Next.js app and prepares it for Cloudflare Workers
 */

import { execSync } from "child_process";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const isDev = process.env.NODE_ENV === "development";

console.log("🚀 Building Next.js app for Cloudflare Workers...");

try {
  // Step 1: Build Next.js app
  console.log("📦 Building Next.js application...");
  execSync("next build", {
    stdio: "inherit",
    env: {
      ...process.env,
      NODE_ENV: "production",
    },
  });

  // Step 2: Use @cloudflare/next-on-pages to optimize for Workers
  console.log("⚡ Optimizing for Cloudflare Workers...");
  execSync("npx @cloudflare/next-on-pages", {
    stdio: "inherit",
  });

  // Step 3: Verify build output
  const buildPath = ".next";
  const workersPath = ".vercel/output/static";

  if (existsSync(buildPath)) {
    console.log("✅ Next.js build completed successfully");
  } else {
    throw new Error("Next.js build failed - missing .next directory");
  }

  // Step 4: Create wrangler compatibility layer if needed
  const wranglerConfigPath = "wrangler.toml";
  if (existsSync(wranglerConfigPath)) {
    console.log("📝 Wrangler configuration found");

    // Update wrangler.toml to point to correct assets
    let wranglerConfig = readFileSync(wranglerConfigPath, "utf8");

    // Ensure assets directory is set correctly for Next.js static files
    if (!wranglerConfig.includes("[site]")) {
      wranglerConfig += `
[site]
bucket = ".vercel/output/static"
`;
      writeFileSync(wranglerConfigPath, wranglerConfig);
      console.log("✅ Updated wrangler.toml with Next.js static assets path");
    }
  }

  console.log("🎉 Build completed successfully!");
  console.log("📁 Static files are in: .vercel/output/static");
  console.log("🚀 Ready for deployment with: wrangler deploy");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
