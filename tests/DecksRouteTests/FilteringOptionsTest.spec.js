import { test, expect } from '@playwright/test';

test('should filter the deckcards according to the selection of subjects', async ({ page }) => {
    await page.goto('http://localhost:5173/decks');
    const subjectSelection = page.getByRole('checkbox', { name: 'Mathematics' });
    await subjectSelection.check({ force: true }); // by passes the interception caused by the child
  
    const subjectName = await page.getByTestId('subject-name-label').allTextContents();
    expect(subjectName.every((v) => v === 'Mathematics'));
  });