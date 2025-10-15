#!/bin/bash

# Initialize D1 database with schema
echo "Initializing D1 database..."

# Create database if it doesn't exist (development)
wrangler d1 create spike-chat-db-dev --env development 2>/dev/null || true

# Execute schema
echo "Applying schema..."
wrangler d1 execute spike-chat-db-dev --file=./sql/schema.sql --env development

# Execute seed data if exists
if [ -f "./sql/seed.sql" ]; then
  echo "Applying seed data..."
  wrangler d1 execute spike-chat-db-dev --file=./sql/seed.sql --env development
fi

echo "Database initialized successfully!"