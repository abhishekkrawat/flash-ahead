// import { test, expect } from '@playwright/test';

// test.beforeEach(async ({ page }) => {
//   await page.goto('http://localhost:5173');
// });

// test('All the subjects are displayed on hover', async ({ page }) => {
//   const items = page.getByTestId('nav-items');
//   await items.hover();

//   const subjects = page.getByTestId('subject-label');

//   expect(await subjects.allTextContents()).toEqual([
//     'Mathematics',
//     'Physics',
//     'Chemistry',
//     'Biology',
//     'Computer Science',
//     'English Literature',
//     'Geography',
//   ]);
// });

// test('Check if Login route is rendered after clicking on the Log in button ', async ({ page }) => {
//   await page.getByTestId('login-label').click();

//   await expect(page).toHaveURL('http://localhost:5173/login');
// });

// test('Check if Register route is rendered after clicking on the Register button ', async ({ page }) => {
//   await page.getByTestId('register-label').click();

//   await expect(page).toHaveURL('http://localhost:5173/register');
// });


