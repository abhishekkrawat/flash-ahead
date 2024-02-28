import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/decks');
});

test('should navigate to corresponding flashcard with matching id', async ({ page }) => {
  // given
  const card = page.getByTestId('deckcard-label-22');
  // when
  await card.click();
  // then
  await expect(page).toHaveURL('http://localhost:5173/flashcard/22');
});
