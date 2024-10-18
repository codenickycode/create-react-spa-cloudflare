import type { KVNamespace } from '@cloudflare/workers-types';
import type { Context as HonoContext } from 'hono';

export interface Env {
  ALLOWED_HOST: string;
  DB: KVNamespace;
  LOCAL_DB: KVNamespace;
  TEST_DB: KVNamespace;
  ENV: 'dev' | 'prod' | 'stage' | 'test';
  GITHUB_REF_NAME: string;
  GITHUB_SHA: string;
}

export type Context = HonoContext<{
  Bindings: Env;
}>;
