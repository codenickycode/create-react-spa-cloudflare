/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly GIT_BRANCH: string;
  readonly GIT_SHA: string;
  readonly E2E: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
