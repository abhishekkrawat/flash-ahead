import { test, expect } from '@playwright/test';

test.describe('Search component', () => {   
  test('handles search query change correctly for filtering by topic name', async ({ page }) => {
    await page.goto('http://localhost:5173/decks');
    await page.getByTestId('search-input-label').fill('Romeo', {timeout: 2000, force: true});

    const topicName = page.getByTestId('deck-name-label')
    expect(await topicName.textContent()).toContain('Romeo');
  });

  test('handles search query change correctly for filtering by subject name', async ({ page }) => {
    await page.goto('http://localhost:5173/decks');
    // delay for 100ms so that decks can load
    await page.getByTestId('search-input-label').pressSequentially('physics', {delay: 100})

    const subjectName = page.getByTestId('subject-name-label')

    const subjects = await subjectName.allInnerTexts()
    expect(subjects.every((v) => v.toLocaleLowerCase() === 'physics' && v !== 'mathematics')).toBeTruthy();
  });
})
