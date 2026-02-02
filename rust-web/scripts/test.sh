#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

echo "=== DERON Rust Web — Test Suite ==="

# Clippy
echo "Running clippy..."
cargo clippy -- -D warnings

# Format check
echo "Checking formatting..."
cargo fmt -- --check

# Tests
echo "Running tests..."
cargo test

echo ""
echo "All checks passed."
