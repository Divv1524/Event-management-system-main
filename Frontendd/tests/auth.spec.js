import { test, expect } from '@playwright/test';

test('user can open signup page', async ({ page }) => {
  await page.goto('/signup');

  await expect(page).toHaveURL(/signup/);

  await expect(
    page.getByRole('heading', { name: /create an account/i })
  ).toBeVisible();
});

test('user can open login page', async ({ page }) => {
  await page.goto('/login');

  await expect(page).toHaveURL(/login/);

  await expect(
    page.getByRole('heading', { name: /welcome back/i })
  ).toBeVisible();
});

test('user can fill login form', async ({ page }) => {
  await page.goto('/login');

  await page
    .locator('input[placeholder="name@example.com"]')
    .fill('test@gmail.com');

  await page.locator('input[type="password"]').fill('password123');

  await page.getByRole('button', { name: /sign in/i }).click();
});
test('user can fill signup form', async ({ page }) => {
  await page.goto('/signup');

  await page
    .locator('input[placeholder="John Doe"]')
    .fill('Test User');

  await page
    .locator('input[placeholder="name@example.com"]')
    .fill(`test${Date.now()}@gmail.com`);

  await page.locator('input[type="password"]').nth(0)
    .fill('password123');

  await page.locator('input[type="password"]').nth(1)
    .fill('password123');

  await page.locator('input[type="checkbox"]').check();

  await page.getByRole('button', {
    name: /create account/i,
  }).click();
});
test('signup button stays disabled for empty fields', async ({ page }) => {
  await page.goto('/signup');

  const button = page.getByRole('button', {
    name: /create account/i,
  });

  await expect(button).toBeDisabled();
});