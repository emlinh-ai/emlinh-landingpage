#!/bin/bash

# Deploy script for Cloudflare Pages
# Usage: ./scripts/deploy.sh [staging|production]

set -e

# Default to staging
ENVIRONMENT=${1:-staging}
PROJECT_NAME="emlinh-landingpage"

echo "🚀 Deploying to $ENVIRONMENT..."

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Build VRM library
echo "📦 Building VRM library..."
cd libs/vrm-character-controller
npm ci --legacy-peer-deps
npm run build
cd ../..

# Build the project
echo "🔨 Building the project..."
npm run build

# Deploy to Cloudflare Pages
if [ "$ENVIRONMENT" = "production" ]; then
    echo "🌐 Deploying to production..."
    wrangler pages deploy dist --project-name $PROJECT_NAME --compatibility-date=2024-01-01
else
    echo "👀 Deploying to staging..."
    wrangler pages deploy dist --project-name $PROJECT_NAME-staging --compatibility-date=2024-01-01
fi

echo "✅ Deployment completed!"

# Get the deployment URL
DEPLOYMENT_URL=$(wrangler pages deployment list --project-name $PROJECT_NAME | head -n 1 | awk '{print $1}')
echo "🌐 Deployment URL: https://$DEPLOYMENT_URL"
