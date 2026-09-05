import { expect, test, type Page } from '@playwright/test'

import { mockPokemonListApi } from './mocks/pokemon-api'
import { emptyPixel } from './mocks/pokemon-fixtures'

test.beforeEach(async ({ page }) => {
  await mockPokemonListApi(page)
})

function isMobileViewport(page: Page) {
  return (page.viewportSize()?.width ?? 0) < 768
}

test('renders home hero and popular pokemon cards', async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0
  })
  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Explore All Pokémon' })
  ).toBeVisible()
  await expect(
    page.locator('main').getByRole('link', { name: 'All Pokémon' })
  ).toHaveAttribute('href', '/pokemon')
  await expect(
    page.locator('main').getByRole('link', { name: 'Login' })
  ).toHaveAttribute('href', '/login')
  if (isMobileViewport(page)) {
    await expect(page.getByRole('img', { name: 'Charizard' }))
      .not.toBeVisible()
  } else {
    await expect(page.getByRole('img', { name: 'Charizard' })).toBeVisible()
  }

  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Ivysaur/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Venusaur/i })).toBeVisible()
})

test('shows recently visited pokemon after three detail visits', async ({
  page,
}) => {
  await page.addInitScript((imageUrl) => {
    Math.random = () => 0
    window.localStorage.setItem(
      'avamon.pokemon-preferences',
      JSON.stringify({
        displayMode: 'grid',
        recentlyVisited: [
          {
            id: 25,
            imageUrl,
            name: 'pikachu',
            types: ['electric'],
          },
          {
            id: 4,
            imageUrl,
            name: 'charmander',
            types: ['fire'],
          },
          {
            id: 1,
            imageUrl,
            name: 'bulbasaur',
            types: ['grass', 'poison'],
          },
        ],
      })
    )
  }, emptyPixel)

  await page.goto('/')

  await expect(
    page.getByRole('heading', { name: 'Recently Visited' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /Pikachu/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Charmander/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
})
