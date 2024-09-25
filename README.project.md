# React SPA Cloudflare

This project is a pnpm monorepo with a client-side React SPA and a server-side Cloudflare Worker with KV storage. This project includes comprehensive testing, linting, and CI/CD setup, along with Sentry integration for error tracking.

## Features

- [React](https://react.dev) SPA for the client-side application
- [Cloudflare](https://cloudflare.com) Worker with KV storage for the server
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for linting
- [Vitest](https://vitest.dev/) for unit testing
- [Playwright](https://playwright.dev/) for end-to-end testing
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [GitHub](https://github.com) workflows for CI and staging deployment
- [Sentry](https://sentry.io/) integration for client-side error tracking
- [pnpm](https://pnpm.io) for efficient package management

## Getting Started

### Pre-requisites

1. [pnpm](https://pnpm.io/installation) v9 and above
2. [node](https://nodejs.org/en/download/package-manager/current) v20.17.0 and above

### Installation

1. Ensure you're using the correct version of Node:

   ```sh
   nvm use 20.17.0
   ```

2. Install dependencies

   ```sh
   pnpm i
   ```

## Deployment Configuration

### Cloudflare

Follow instructions in [README.cloudflare](./README.cloudflare/README.cloudflare.md)

### Sentry

1. Add your `SENTRY_AUTH_TOKEN` in [client/.env](./client/.env)
2. Add your `SENTRY_DSN` in [client/src/services/monitor.tsx](./client/src/services/monitor.tsx)
3. Add your `org` and `project` values to Sentry Vite plugin in [client/vite.config.ts](./client/vite.config.ts)

## Scripts

- `pnpm run dev`: Start the development server
- `pnpm run lint`: Run ESLint
- `pnpm run test`: Run unit tests with Vitest
- `pnpm run typecheck`: Run TypeScript type checking
- `pnpm run format`: Format code with Prettier
- `pnpm run e2e`: Run end-to-end tests with Playwright

Some convenience scripts for shortcuts:

- `pnpm run clean`: Execute a clean install of package dependencies
- `pnpm run client <script>`: Run a script within the client package only
- `pnpm run server <script>`: Run a script within the server package only

## Debug

### Server starts on wrong port locally

Sometimes the server fails to shutdown, leaving an instance listening to port 8787. The next time you run `pnpm run server dev`, it will start a new instance and listen to a random port. Running `killall workerd` does not seem to fix it. Instead, get any `workerd` process ID listening to port 8787 (there may be several) and kill it. On macOS:

```sh
lsof -i :8787
kill -9 <pid>
```
