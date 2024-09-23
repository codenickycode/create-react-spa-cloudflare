import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { testRoute } from './test';
import type { Env } from './types';

const app = new Hono<{ Bindings: Env }>()
  .use('*', async (c, next) => {
    await next();
    c.res.headers.set('X-Git-Branch', c.env.GITHUB_REF_NAME || '');
    c.res.headers.set('X-Git-Commit', c.env.GITHUB_SHA || '');
  })
  .use('*', async (c, next) => {
    const allowedHost = c.env.ALLOWED_HOST;
    const origin =
      allowedHost === '*' ? '*' : new URL(c.req.header('referer') || '').origin;
    if (origin.endsWith(allowedHost)) {
      return cors({
        origin,
        allowMethods: ['GET', 'POST', 'OPTIONS'],
        allowHeaders: ['Content-Type', 'baggage', 'sentry-trace'],
        exposeHeaders: ['Content-Type'],
      })(c, next);
    }
    // If referer is not allowed, fail the request
    throw new HTTPException(403, { message: 'Forbidden' });
  })
  .get('/', async (c) => c.text('ok', 200))
  .notFound(() => {
    throw new HTTPException(404, { message: 'Not Found' });
  })
  .onError((err, c) => {
    console.error(err);
    if (err instanceof HTTPException) {
      return c.json({ message: err.message }, err.status);
    }
    return c.json({ message: 'Unknown server error', cause: err }, 500);
  })
  .route('/test', testRoute);

export default app;
