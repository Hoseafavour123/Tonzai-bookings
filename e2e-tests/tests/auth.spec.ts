import { test, expect } from '@playwright/test';
const UI_URL = "http://localhost:5173/"

test('should allow sign up', async ({ page }) => {
  await page.goto(UI_URL)

  await page.getByRole('link', {name: 'Sign Up'}).click()

  await expect(page.getByRole('heading', {name: 'Sign Up'})).toBeVisible()

  await page.locator('[name=firstName]').fill('Hosea')
  await page.locator('[name=lastName]').fill('Favour')
  await page.locator('[name=email]').fill('me@gmail.com')
  await page.locator('[name=password]').fill('12345678')
  await page.locator('[name=confirmPassword]').fill('12345678')

  await page.getByRole('link', {name: 'Sign Up'}).click()

  await expect(page.getByText('Registration successfull')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bookings'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Hotels'})).toBeVisible()
  await expect(page.getByRole('link', {name: 'Log Out'})).toBeVisible()
});


test('get started link', async ({ page }) => {
  await page.goto(`${UI_URL}/sign-in`)

  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible()
  await page.locator('[label=Email]').fill('me@gmail.com')
  await page.locator('[label=Password]').fill('12345678')
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Registration successfull')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Hotels' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible()
});
