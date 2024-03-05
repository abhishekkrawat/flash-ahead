import { test, expect } from '@playwright/test';

test('should open the ‘create a new flashcard/flashcards’ form after clicking on the button', async ({ page }) => {
    await page.goto('http://localhost:5173/login');
  
    await page.getByTestId('email-input-label').fill('test@test.com', { force: true });
    await page.getByTestId('password-input-label').fill('test123', { force: true });
    await page.getByTestId('login-button-label').click({ force: true });
  
    const addFlashcardButton = page.getByTestId('create-deck-label');
    await addFlashcardButton.click();
  
    expect(await page.getByTestId('create-deck-modal').isVisible());
  });