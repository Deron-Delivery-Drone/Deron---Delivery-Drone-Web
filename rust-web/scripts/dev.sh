#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== DERON Rust Web — Development Mode ==="

# Build Tailwind CSS
if command -v npx &> /dev/null; then
  echo "Building Tailwind CSS..."
  npx tailwindcss -i ./input.css -o ./public/static/style.css --watch &
  TAILWIND_PID=$!
fi

# Run Rust server with auto-reload
if command -v cargo-watch &> /dev/null; then
  cargo watch -x run
else
  echo "Install cargo-watch for auto-reload: cargo install cargo-watch"
  cargo run
fi

# Cleanup
if [ -n "${TAILWIND_PID:-}" ]; then
  kill "$TAILWIND_PID" 2>/dev/null || true
fi
