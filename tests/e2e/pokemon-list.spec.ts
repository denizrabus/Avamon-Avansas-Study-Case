import { expect, test } from '@playwright/test'

import { mockPokemonListApi } from './mocks/pokemon-api'

test.beforeEach(async ({ page }) => {
  await mockPokemonListApi(page)
})

test('lists pokemon with pagination and remembered display mode', async ({
  page,
}) => {
  await page.goto('/pokemon')

  await expect(page.getByRole('heading', { name: 'All Pokémon' })).toBeVisible()
  await expect(page.getByText('25 Pokémon')).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Pikachu/i })).toBeHidden()

  await page.evaluate(() => window.scrollTo(0, 400))
  await page.getByRole('button', { name: 'Next page' }).click()

  await expect(page).toHaveURL('/pokemon?page=2')
  await expect(page.getByRole('link', { name: /Pikachu/i })).toBeVisible()
  await expect
    .poll(() => page.evaluate(() => window.scrollY))
    .toBe(0)

  await page.getByRole('button', { name: 'List view' }).click()
  await page.reload()

  await expect(page.getByRole('button', { name: 'List view' }))
    .toHaveAttribute('aria-pressed', 'true')
})

test('filters pokemon by type and keeps the selection in the URL', async ({
  page,
}) => {
  await page.goto('/pokemon')

  await page.getByText('All Types').click()
  await page.getByRole('option', { name: 'Fire' }).click()

  await expect(page).toHaveURL('/pokemon?type=fire')
  await expect(page.getByText('3 Pokémon')).toBeVisible()
  await expect(page.getByRole('link', { name: /Charmander/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeHidden()
})
