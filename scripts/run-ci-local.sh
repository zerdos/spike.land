#!/bin/bash
set -e

echo "🚀 Running CI locally..."
echo "================================"

# Check if running in CI or locally
if [ -z "$CI" ]; then
  echo "📦 Installing dependencies..."
  yarn install --immutable
fi

echo "🔍 Running linters..."
yarn lint --max-warnings=200

echo "🔍 Running type checking..."
yarn types:check

echo "🧪 Running code tests..."
(cd packages/code && yarn vitest run)

echo "🎭 Installing Playwright browsers..."
(cd packages/chat && npx playwright install chromium)

echo "🥒 Running chat Cucumber tests..."
(cd packages/chat && yarn test:cucumber)

echo "✅ All CI checks passed!"