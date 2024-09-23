import type { KVNamespace } from '@cloudflare/workers-types';
import type { Context } from './types';

export const getDb = (c: Context): KVNamespace => {
  switch (c.env.ENV) {
    case 'dev':
      return c.env.LOCAL_DB;
    case 'test':
      return c.env.TEST_DB;
    default:
      return c.env.DB;
  }
};
