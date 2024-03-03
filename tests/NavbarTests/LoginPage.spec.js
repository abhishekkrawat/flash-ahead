import { test, expect } from '@playwright/test';

test('Check if Login route is rendered after clicking on the Log in button ', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.getByTestId('login-label').click();

  await expect(page).toHaveURL('http://localhost:5173/login');
});
