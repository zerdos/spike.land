#!/bin/bash
# Fix OpenNext HTML files to use correct asset hashes

echo "Fixing OpenNext HTML files..."

# Copy the correct HTML from Next.js build to OpenNext assets
if [ -f ".next/server/app/index.html" ]; then
  cp .next/server/app/index.html .open-next/assets/index.html
  echo "✓ Copied correct index.html"
else
  echo "✗ .next/server/app/index.html not found"
  exit 1
fi

echo "Done!"