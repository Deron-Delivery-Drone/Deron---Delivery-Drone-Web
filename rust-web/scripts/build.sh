#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== DERON Rust Web — Production Build ==="

# Build Tailwind CSS (minified)
if command -v npx &> /dev/null; then
  echo "Building Tailwind CSS (minified)..."
  npx tailwindcss -i ./input.css -o ./public/static/style.css --minify
else
  echo "WARNING: npx not found, using existing style.css"
fi

# Build Rust binary
echo "Building Rust binary (release)..."
cargo build --release

echo ""
echo "Build complete!"
echo "Binary: target/release/deron-web"
echo "Static: public/"
