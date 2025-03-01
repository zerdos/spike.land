#!/bin/bash
set -e

# Build script for the DevContainer Generator

echo "Building DevContainer Generator..."

# Install dependencies
npm install

# Build the project
npm run build

# Create output directory for examples
mkdir -p output

echo "Build completed successfully!"
echo "You can now run examples with: npm run example:optimized-node"
