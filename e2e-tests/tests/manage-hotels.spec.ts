import { test, expect } from '@playwright/test'
import path from 'path'

const UI_URL = 'http://localhost:5173/'

test.beforeEach(async ({ page }) => {
  await page.goto(`${UI_URL}sign-in`)

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
  await page.locator('[label=Email]').fill('me@gmail.com')
  await page.locator('[label=Password]').fill('12345678')
  await page.getByRole('button', { name: 'Sign In' }).click()

  await expect(page.getByText('Registration successfull')).toBeVisible()
  await expect(page.getByRole('link', { name: 'Bookings' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Hotels' })).toBeVisible()
  await expect(page.getByRole('link', { name: 'Log Out' })).toBeVisible()
})

test('should allow user to add hotel', async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`)

  await page.locator('[name="name"]').fill('Test Hotel')
  await page.locator('[name="city"]').fill('Test City')
  await page.locator('[name="country"]').fill('Test Country')
  await page.locator('[name="description"]').fill('Test decription')
  await page.locator('[name="pricePerNight"]').fill('100')

  await page.selectOption('select[name="starRating"', '3')

  await page.getByText('Budget').click()

  await page.getByLabel('Free Wifi').check()
  await page.getByLabel('Parking').check()

  await page.locator('[name="adultCount"]').fill('2')
  await page.locator('[name="childCount"]').fill('1')

  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, 'files', 'church2.png'),
    path.join(__dirname, 'files', 'churxh1.png'),
  ])

  await page.getByRole('button', {name: 'Save'}).click();
  await expect(page.getByText('Hotel Saved')).toBeVisible()
})
