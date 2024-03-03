import { test, expect } from '@playwright/test';

test('navigates to decks route post-login', async ({ page }) => {
  await page.goto('http://localhost:5173/login');

  await page.getByTestId('email-input-label').fill('test@test.com', { force: true });
  await page.getByTestId('password-input-label').fill('test123', { force: true });
  await page.getByTestId('login-button-label').click({ force: true });

  await expect(page).toHaveURL('http://localhost:5173/decks');
});
