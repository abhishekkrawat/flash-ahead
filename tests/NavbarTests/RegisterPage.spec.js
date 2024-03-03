import { test, expect } from '@playwright/test';

test('Check if Register route is rendered after clicking on the Register button ', async ({
  page,
}) => {
  await page.goto('http://localhost:5173');

  await page.getByTestId('register-label').click();

  await expect(page).toHaveURL('http://localhost:5173/register');
});
