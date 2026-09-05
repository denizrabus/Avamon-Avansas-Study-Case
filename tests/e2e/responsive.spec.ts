import { expect, test, type Page } from '@playwright/test'

import { mockPokemonDetailApi, mockPokemonListApi } from './mocks/pokemon-api'

function isCompactHeader(page: Page) {
  return (page.viewportSize()?.width ?? 0) < 1024
}

async function openHeaderSearch(page: Page) {
  if (isCompactHeader(page)) {
    await page.getByRole('button', { name: 'Open menu' }).click()
  }

  return page.getByRole('combobox', { name: 'Search Pokémon' })
}

test('renders the home page hero and popular pokemon', async ({ page }) => {
  await mockPokemonListApi(page)
  await page.addInitScript(() => {
    Math.random = () => 0
  })

  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Explore All Pokémon' })
  ).toBeVisible()
  await expect(
    page.locator('main').getByRole('link', { name: 'All Pokémon' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
})

test('renders the login page with required fields and demo users', async ({
  page,
}) => {
  await mockPokemonListApi(page)

  await page.goto('/login')

  await expect(
    page.getByRole('heading', { name: 'Login to Avamon' })
  ).toBeVisible()
  await expect(page.getByLabel('Username')).toBeVisible()
  await expect(page.getByLabel('Password')).toBeVisible()
  await expect(
    page.getByRole('button', { name: /Güven Altuntaş/i })
  ).toBeVisible()
})

test('renders the pokemon list in grid and list display modes', async ({
  page,
}) => {
  await mockPokemonListApi(page)

  await page.goto('/pokemon')

  await expect(page.getByRole('heading', { name: 'All Pokémon' })).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()

  await page.getByRole('button', { name: 'List view' }).click()

  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
})

test('renders the protected pokemon detail page after login', async ({
  page,
}) => {
  await mockPokemonDetailApi(page)

  await page.goto('/login')
  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await page.goto('/pokemon/pikachu')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Pikachu' })
  ).toBeVisible()
  await expect(page.getByRole('heading', { name: 'BASE STATS' })).toBeVisible()
})

test('header search reaches the autocomplete menu', async ({ page }) => {
  await mockPokemonListApi(page)

  await page.goto('/pokemon')

  const searchInput = await openHeaderSearch(page)

  await searchInput.fill('bulba')

  await expect(page.getByRole('option', { name: /Bulbasaur/i })).toBeVisible()
})
