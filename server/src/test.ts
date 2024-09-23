import { Hono } from 'hono';
import { HTTPException } from 'hono/http-exception';
import type { Env } from './types';

export const testRoute = new Hono<{ Bindings: Env }>()
  .post('/reset', async (c) => {
    if (c.env.ENV !== 'test') {
      console.warn(`cannot reset db in env: ${c.env.ENV}`);
      throw new HTTPException(404, { message: 'Not Found' });
    }
    // explicitly use c.env.TEST_DB and not getDb() to be sure we are only
    // adjusting the local test db binding
    await resetDb(c.env.TEST_DB);
    return new Response('ok', { status: 200 });
  })
  .notFound(() => {
    throw new HTTPException(404, { message: 'Not Found' });
  });

const resetDb = async (testDb: Env['TEST_DB']) => {
  await testDb.delete('highScore');
};
