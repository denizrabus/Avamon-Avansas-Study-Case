import { expect, test } from '@playwright/test'

import { mockPokemonDetailApi } from './mock-pokemon-detail-api'

test.beforeEach(async ({ page }) => {
  await mockPokemonDetailApi(page)
})

test('shows pokemon detail data for authenticated users', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Giriş Yap' }).click()

  await page.goto('/pokemon/pikachu')

  await expect(page.getByRole('heading', { name: 'Pikachu' })).toBeVisible()
  await expect(page.locator('main').getByText('#0025').first()).toBeVisible()
  await expect(page.getByText('Electric', { exact: true })).toBeVisible()
  await expect(page.getByText(/lightning storms/i)).toBeVisible()
  await expect(page.getByText('0.4 m')).toBeVisible()
  await expect(page.getByText('6.0 kg')).toBeVisible()
  await expect(page.getByText('112')).toBeVisible()
  await expect(page.getByText('Lightning Rod')).toBeVisible()
  await expect(page.getByText('Gizli')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'EVRİM ZİNCİRİ' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /Raichu/i })).toBeVisible()
})
