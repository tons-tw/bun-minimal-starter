# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Bun minimal starter template using TypeScript. Default to using Bun instead of Node.js.

- Use `bun <file>` instead of `node <file>` or `ts-node <file>`
- Use `bun test` instead of `jest` or `vitest`
- Use `bun build <file.html|file.ts|file.css>` instead of `webpack` or `esbuild`
- Use `bun install` instead of `npm install` or `yarn install` or `pnpm install`
- Use `bun run <script>` instead of `npm run <script>` or `yarn run <script>` or `pnpm run <script>`
- Bun automatically loads .env, so don't use dotenv.

## Common Commands

```bash
# Install dependencies
bun install

# Run the application
bun app:start

# Development mode with watch
bun app:dev

# Format code (Prettier + ESLint)
bun tool:fmt

# Lint code
bun tool:lint

# Run tests
bun test
```

## Code Style

This project uses ESLint and Prettier with the following conventions:

- No semicolons
- Single quotes
- No trailing commas
- TypeScript strict mode enabled

## APIs

- `Bun.serve()` supports WebSockets, HTTPS, and routes. Don't use `express`.
- `bun:sqlite` for SQLite. Don't use `better-sqlite3`.
- `Bun.redis` for Redis. Don't use `ioredis`.
- `Bun.sql` for Postgres. Don't use `pg` or `postgres.js`.
- `WebSocket` is built-in. Don't use `ws`.
- Prefer `Bun.file` over `node:fs`'s readFile/writeFile
- Bun.$`ls` instead of execa.

## Testing

Use `bun test` to run tests.

```ts#index.test.ts
import { test, expect } from "bun:test";

test("hello world", () => {
  expect(1).toBe(1);
});
```

## Frontend

Use HTML imports with `Bun.serve()`. Don't use `vite`. HTML imports fully support React, CSS, Tailwind.

Server:

```ts#index.ts
import index from "./index.html"

Bun.serve({
  routes: {
    "/": index,
    "/api/users/:id": {
      GET: (req) => {
        return new Response(JSON.stringify({ id: req.params.id }));
      },
    },
  },
  // optional websocket support
  websocket: {
    open: (ws) => {
      ws.send("Hello, world!");
    },
    message: (ws, message) => {
      ws.send(message);
    },
    close: (ws) => {
      // handle close
    }
  },
  development: {
    hmr: true,
    console: true,
  }
})
```

HTML files can import .tsx, .jsx or .js files directly and Bun's bundler will transpile & bundle automatically. `<link>` tags can point to stylesheets and Bun's CSS bundler will bundle.

```html#index.html
<html>
  <body>
    <h1>Hello, world!</h1>
    <script type="module" src="./frontend.tsx"></script>
  </body>
</html>
```

With the following `frontend.tsx`:

```tsx#frontend.tsx
import React from "react";

// import .css files directly and it works
import './index.css';

import { createRoot } from "react-dom/client";

const root = createRoot(document.body);

export default function Frontend() {
  return <h1>Hello, world!</h1>;
}

root.render(<Frontend />);
```

Then, run index.ts

```sh
bun --hot ./index.ts
```

For more information, read the Bun API docs in `node_modules/bun-types/docs/**.md`.

## Project Structure

```
src/
└── index.ts         # Main entry point

Key configuration files:
- tsconfig.json      # TypeScript config with strict mode and ESNext target
- eslint.config.js   # ESLint configuration
- .prettierrc.json   # Prettier formatting rules
- Dockerfile         # Multi-stage Docker build for production deployment
```

## Architecture Notes

This is a minimal starter template designed to showcase Bun's capabilities. When building applications:

1. **Server Development**: Use `Bun.serve()` with its built-in routing and WebSocket support instead of adding Express or other frameworks.

2. **Database Access**: Use Bun's native database APIs (`bun:sqlite`, `Bun.sql`, `Bun.redis`) instead of traditional Node.js database packages.

3. **Frontend Development**: Leverage Bun's HTML imports for bundling React/CSS/TypeScript without needing Vite or Webpack.

4. **TypeScript**: The project is configured with strict TypeScript settings. Bun handles TypeScript natively without requiring a build step.
