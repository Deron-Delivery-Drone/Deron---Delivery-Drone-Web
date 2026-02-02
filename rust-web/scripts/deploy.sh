#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== DERON Rust Web — Deploy ==="

# Build first
./scripts/build.sh

# Package for deployment
echo "Packaging..."
mkdir -p dist
cp target/release/deron-web dist/
cp -r public dist/
cp .env.example dist/.env.example

echo ""
echo "Deployment package ready in dist/"
echo "To run: cd dist && ./deron-web"
echo ""
echo "For Docker deployment, use: docker build -t deron-web ."
