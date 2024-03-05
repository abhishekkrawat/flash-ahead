import { test, expect } from '@playwright/test';

test.describe('Views', () => {
  test('should increment when navigates to flashcard from deck card', async ({ page }) => {
    await page.goto('http://localhost:5173/decks');
    const deckCard = page.getByTestId('deck-card').first()
    const initialViews = await deckCard.getByTestId('deck-views').textContent()
    await deckCard.click();

    await new Promise((res) => {
        setTimeout(() => {
            res()
        }, 1000)
    })

    await page.goBack();

    // views count should be incremented by 1
    const viewsCount = page.getByTestId('deck-views').first()
    expect(await viewsCount.textContent()).toBe((Number(initialViews) + 1).toString())
  });
})