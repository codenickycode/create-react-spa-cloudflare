import { test, expect } from '@playwright/test';

test.use({
  actionTimeout: 5000,
  // add a user agent so server doesn't think playwright is a bot 🤖
  userAgent:
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36',
});

test.beforeEach(async () => {
  try {
    await fetch('http://localhost:8788/test/reset', { method: 'POST' });
    console.log('Successfully reset test db');
  } catch (error) {
    console.error('Failed to reset test db', error);
  }
});

test('smoke test', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle('todo: rename me');
});
