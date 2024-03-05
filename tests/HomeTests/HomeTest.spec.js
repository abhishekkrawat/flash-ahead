import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173');
});

test('Check if the decks route is rendered after clicking on the Get Started button', async ({
  page,
}) => {
  await page.getByTestId('get-started-label').click();

  await expect(page).toHaveURL('http://localhost:5173/decks');
});
