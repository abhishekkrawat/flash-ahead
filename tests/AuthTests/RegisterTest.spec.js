import { test, expect } from '@playwright/test';

test('navigates to login route post-registration', async ({ page }) => {
  await page.goto('http://localhost:5173/register');

  await page.getByTestId('first-name-label').fill('test1', { force: true });
  await page.getByTestId('last-name-label').fill('test', { force: true });
  await page.getByTestId('register-email-label').fill('test1@test.com', { force: true });
  await page.getByTestId('register-password-label').fill('test123', { force: true });
  await page.getByTestId('register-confirm-password-label').fill('test123', { force: true });
  await page.getByTestId('register-button-label').click({ force: true });

  await expect(page).toHaveURL('http://localhost:5173/login');
});
