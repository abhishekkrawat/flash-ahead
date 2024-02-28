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

test('should filter the deckcards according to the selection of subjects', async ({ page }) => {
  const subjectSelection = page.getByRole('checkbox', { name: 'Mathematics' });
  await subjectSelection.check({ force: true }); // by passes the interception caused by the child

  const subjectName = await page.getByTestId('subject-name-label').allTextContents();
  expect(subjectName.every((v) => v === 'Mathematics')).toBeTruthy();
});
