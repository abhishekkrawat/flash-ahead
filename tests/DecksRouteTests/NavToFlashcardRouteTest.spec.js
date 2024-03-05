import { test, expect } from '@playwright/test';

test('should navigate to corresponding flashcard with matching id', async ({ page }) => {
    await page.goto('http://localhost:5173/decks');
    const deckCard = page.getByTestId('deck-card-label-7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1');
    await deckCard.click();

    await expect(page).toHaveURL(
    'http://localhost:5173/flashcard/7a285fb4-13bf-4cea-a308-d2e6aaaa2aa1')
});