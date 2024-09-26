# Create React SPA Cloudflare

A starter project for building a pnpm monorepo with a client-side React SPA and a server-side Cloudflare Worker with KV storage. This project includes comprehensive testing, linting, and CI/CD setup, along with Sentry integration for error tracking.

## Features

- [React](https://react.dev) SPA for the client-side application
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Tanstack Query](https://tanstack.com/query/latest) for client http request state management
- [Hono](https://hono.dev/) server-side api framework
- [Prettier](https://prettier.io/) for code formatting
- [ESLint](https://eslint.org/) for linting
- [Vitest](https://vitest.dev/) for unit testing
- [Playwright](https://playwright.dev/) for end-to-end testing
- [TypeScript](https://www.typescriptlang.org/) for type checking
- [Cloudflare](https://cloudflare.com) Pages for hosting the client, Worker with KV storage for hosting the server
- [GitHub](https://github.com) workflows for CI and staging deployment
- [Sentry](https://sentry.io/) integration for client-side error tracking
- [pnpm](https://pnpm.io) for performant monorepo package management

## Installation

### Pre-requisites

1. [git](https://git-scm.com/downloads)
2. [pnpm](https://pnpm.io/installation) v9 and above
3. [node](https://nodejs.org/en/download/package-manager/current) v20.17.0 and above

### Install

1. Ensure you're using the correct version of Node:
   ```sh
   nvm use 20.17.0
   ```
2. Run the installation script:
   ```sh
   pnpm create react-spa-cloudflare@latest my-app
   ```
3. Check the console output for any warnings. The command will succeed unless the initial download fails.

## Getting Started

1. Navigate to your project directory and start the development server:

```sh
cd my-app
pnpm run dev
```

2. Navigate to the app at http://localhost:5173
3. You should see some hello text, components, and verified server connection
4. Follow your project's README for further setup instructions

## Debug

### ENOENT Error

If you encounter an ENOENT error when running the create command, make sure to include a version:

```sh
# ❌ Wrong! It's missing a version
pnpm create react-spa-cloudflare

# ✅ Correct!
pnpm create react-spa-cloudflare@latest
```
