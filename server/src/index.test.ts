import { describe, it, expect } from 'vitest';
import { testClient } from 'hono/testing';
import app from './index';

const mockEnv = {
  ALLOWED_HOST: '*',
  ENV: 'test',
};

describe('GET /', () => {
  it('should return status 200', async () => {
    const response = await testClient(app, mockEnv).index.$get();
    expect(response.status).toBe(200);
  });
  it('should return "ok" text', async () => {
    const response = await testClient(app, mockEnv).index.$get();
    expect(await response.text()).toBe('ok');
  });
});

describe('Not Found', () => {
  it('should return status 404', async () => {
    const response = await app.request('/foo', { method: 'GET' }, mockEnv);
    expect(response.status).toBe(404);
  });
  it('should return "Not Found" message', async () => {
    const response = await app.request('/foo', { method: 'GET' }, mockEnv);
    expect(await response.json()).toEqual({ message: 'Not Found' });
  });
});

describe.each(['stage', 'prod'])('when in %s', (ENV) => {
  it('should allow specified host, ignoring subdomains (since our preview branches have hash subdomains)', async () => {
    const response = await testClient(app, {
      ...mockEnv,
      ENV,
      ALLOWED_HOST: 'foo.com',
    }).index.$get(undefined, {
      headers: { referer: 'https://lj98w4f.foo.com' },
    });
    expect(response.status).toBe(200);
  });
  it('should allow any referer when env.ALLOWED_HOST is "*"', async () => {
    const response = await testClient(app, {
      ...mockEnv,
      ENV,
      ALLOWED_HOST: '*',
    }).index.$get(undefined, {
      headers: { referer: 'https://foo.com' },
    });
    expect(response.status).toBe(200);
  });
  it('should not allow any referer when env.ALLOWED_HOST is set', async () => {
    const response = await testClient(app, {
      ...mockEnv,
      ENV,
      ALLOWED_HOST: 'bar.com',
    }).index.$get(undefined, {
      headers: { referer: 'https://foo.com' },
    });
    expect(response.status).toBe(403);
  });
});

describe('unsupported method', () => {
  it.each(['PUT', 'PATCH', 'DELETE'])(
    '%s should return a 404',
    async (method) => {
      const response = await app.request('/', { method }, mockEnv);
      expect(response.status).toBe(404);
    },
  );
  it.each(['PUT', 'PATCH', 'DELETE'])(
    '%s should return "Not Found"',
    async (method) => {
      const response = await app.request('/', { method }, mockEnv);
      expect(await response.json()).toEqual({ message: 'Not Found' });
    },
  );
});
