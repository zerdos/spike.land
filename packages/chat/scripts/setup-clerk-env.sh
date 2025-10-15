#!/bin/bash

# Script to set up Clerk environment variables for Cloudflare Workers
# Usage: ./scripts/setup-clerk-env.sh

echo "Setting up Clerk environment variables for production..."
echo ""
echo "You'll need the following from your Clerk Dashboard:"
echo "1. Publishable Key (starts with pk_)"
echo "2. Secret Key (starts with sk_)"
echo "3. (Optional) Webhook Secret for syncing users"
echo ""

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "Error: wrangler CLI is not installed. Please install it first:"
    echo "npm install -g wrangler"
    exit 1
fi

echo "Please enter your Clerk credentials:"
echo ""

read -p "Enter your Clerk Publishable Key (pk_...): " CLERK_PK
read -p "Enter your Clerk Secret Key (sk_...): " CLERK_SK
read -p "Enter your Clerk Webhook Secret (optional, press enter to skip): " CLERK_WEBHOOK

echo ""
echo "Setting environment variables..."

# Set the publishable key as a regular variable (needed for client-side)
wrangler secret put NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY --env production <<< "$CLERK_PK"

# Set the secret key as a secret (for server-side)
wrangler secret put CLERK_SECRET_KEY --env production <<< "$CLERK_SK"

# Set webhook secret if provided
if [ ! -z "$CLERK_WEBHOOK" ]; then
    wrangler secret put CLERK_WEBHOOK_SECRET --env production <<< "$CLERK_WEBHOOK"
fi

echo ""
echo "✅ Clerk environment variables have been set!"
echo ""
echo "Next steps:"
echo "1. Deploy your application: yarn deploy --env production"
echo "2. Test Google OAuth at: https://chat.spike.land/signin"
echo ""
echo "Make sure Google OAuth is enabled in your Clerk Dashboard:"
echo "- Go to: https://dashboard.clerk.com"
echo "- Navigate to: Social Connections → Google"
echo "- Ensure it's enabled with your credentials"