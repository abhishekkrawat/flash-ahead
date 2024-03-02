import { test, expect } from '@playwright/test';

test('All the subjects are displayed on hover', async ({ page }) => {
  await page.goto('http://localhost:5173');

  const items = page.getByTestId('nav-items');
  await items.hover();

  const subjects = page.getByTestId('subject-label');
  expect(await subjects.allTextContents()).toEqual([
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'English Literature',
    'Geography',
  ]);
});
