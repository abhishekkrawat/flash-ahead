import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:5173/decks');
});

// test('should navigate to corresponding flashcard with matching id', async ({ page }) => {
// const deckCard = page.getByTestId('deck-card-label-7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1');
// await deckCard.click();

// await expect(page).toHaveURL(
//   'http://localhost:5173/flashcard/7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1',
// });

// test('should filter the deckcards according to the selection of subjects', async ({ page }) => {
//   await page.goto('http://localhost:5173/decks');
//   const subjectSelection = page.getByRole('checkbox', { name: 'Mathematics' });
//   await subjectSelection.check({ force: true }); // by passes the interception caused by the child

//   const subjectName = await page.getByTestId('subject-name-label').allTextContents();
//   expect(subjectName.every((v) => v === 'Mathematics'));
// });

/*
SEARCH COMPONENT TESTS

test('handles search query change correctly for filtering by topic name', async ({ page }) => {
  await page.getByLabel('search-input-label').fill('Romeo');

  const topicName = await page.getByTestId('deck-name-label').textContent();
  expect(topicName).toContain('Romeo');
});

test('handles search query change correctly for filtering by subject name', async ({ page }) => {
  await page.getByLabel('search-input-label').fill('physics');

  const subjectName = await page.getByTestId('subject-name-label').allTextContents();
  expect(subjectName.every((v) => v === 'physics' && v !== 'mathematics')).toBeTruthy();
});

test('handles search query change correctly for filtering by subject name', async ({ page }) => {
  await page.getByLabel('search-input-label').fill('Physics');

  const subjectName = await page.getByTestId('subject-name-label').allTextContents();
  expect(subjectName.every((v) => v === 'physics' && v !== 'mathematics')).toBeTruthy();
});

test('handles search query change correctly for filtering by subject name', async ({ page }) => {
  const searchInput = page.getByLabel('search-input');
  await searchInput.fill('physics');

  const subjectName = await page.getByTestId('subject-name-label').textContent();
  expect(subjectName.every((v) => v === 'physics'));
});

*/

// PAGINATION TEST

// test("should navgiate to next page on selection of '>' button", async ({ page }) => {
//   const nextPageButton = page.getByTestId('next-page-label');
//   await nextPageButton.click();

// const currentPageButton = page.getByTestId('current-page-button-label');
// });

// 'CREATE A NEW FLASHCARD' WINDOW

// test('should open the window after clicking on the button', async ({ page }) => {
//   await page.goto('http://localhost:5173/login');

//   await page.getByTestId('email-input-label').fill('sps_rawat@yahoo.com', { force: true });
//   await page.getByTestId('password-input-label').fill('Strong@1432', { force: true });
//   await page.getByTestId('login-button-label').click({ force: true });

//   const addFlashcardButton = page.getByTestId('create-deck-label');
//   await addFlashcardButton.click();

//   expect(await page.getByTestId('create-deck-modal'));
// });

// INCREMENT IN VIEWS

test('should increment when navigates to flashcard from deck card', async ({ page }) => {
  // const deckViews = page.getByTestId('deck-views-label');
  const deckCard = page.getByTestId('deck-card-label-7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1');
  await deckCard.click();

  await expect(page).toHaveURL(
    'http://localhost:5173/flashcard/7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1',
  );

  await page.goto('http://localhost:5173/decks');

  // await expect(page.getByTestId('deck-views-label') === deckViews + 1);
});

