// const { test, expect } = require('@playwright/test');
import { test, expect } from '@playwright/test';

test('DesktopNav component renders correctly', async ({ page }) => {
  await page.goto('http://flash-ahead.vercel.app');

  const navItems = await page.$$eval('nav a', (links) =>
    links.map((link) => link.textContent.trim()),
  );

  expect(navItems).toEqual(['FlashAhead', 'Subjects']);
});
