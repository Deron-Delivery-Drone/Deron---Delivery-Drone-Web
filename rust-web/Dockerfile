# Stage 1: Build
FROM rust:1.83-slim AS builder

WORKDIR /app
COPY Cargo.toml Cargo.lock* ./
COPY src/ ./src/

# Build dependencies first (cache layer)
RUN mkdir -p src && echo "fn main() {}" > src/main.rs
RUN cargo build --release 2>/dev/null || true

# Build actual binary
COPY src/ ./src/
RUN cargo build --release

# Stage 2: Runtime
FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y ca-certificates && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=builder /app/target/release/deron-web ./
COPY public/ ./public/

ENV HOST=0.0.0.0
ENV PORT=3000

EXPOSE 3000

CMD ["./deron-web"]
