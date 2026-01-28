#!/bin/bash

# Script tự động trigger indexing
# Trigger database indexing with Drizzle Kit

set -e

echo "=========================================="
echo "Trigger Indexing - Automated Script"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# 1. Generate Drizzle migrations
echo "📝 Generating database migrations..."
npx drizzle-kit generate

# 2. Run migrations
echo "🔄 Running database migrations..."
npx drizzle-kit migrate

# 3. Validate database schema
echo "✅ Validating database schema..."
npx drizzle-kit introspect

# 4. Drop and recreate indexes (if needed)
echo "🔍 Rebuilding database indexes..."
npx drizzle-kit push

echo ""
echo "=========================================="
echo "✨ Indexing completed successfully!"
echo "=========================================="
