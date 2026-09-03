import { expect, type Page, test } from '@playwright/test'

const emptyPixel =
  'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='

const pokemonFixtures = [
  { id: 1, name: 'bulbasaur', type: 'grass' },
  { id: 2, name: 'ivysaur', type: 'grass' },
  { id: 3, name: 'venusaur', type: 'grass' },
  { id: 4, name: 'charmander', type: 'fire' },
  { id: 5, name: 'charmeleon', type: 'fire' },
  { id: 6, name: 'charizard', type: 'fire' },
  { id: 7, name: 'squirtle', type: 'water' },
  { id: 8, name: 'wartortle', type: 'water' },
  { id: 9, name: 'blastoise', type: 'water' },
  { id: 10, name: 'caterpie', type: 'bug' },
  { id: 11, name: 'metapod', type: 'bug' },
  { id: 12, name: 'butterfree', type: 'bug' },
  { id: 13, name: 'weedle', type: 'bug' },
  { id: 14, name: 'kakuna', type: 'bug' },
  { id: 15, name: 'beedrill', type: 'bug' },
  { id: 16, name: 'pidgey', type: 'normal' },
  { id: 17, name: 'pidgeotto', type: 'normal' },
  { id: 18, name: 'pidgeot', type: 'normal' },
  { id: 19, name: 'rattata', type: 'normal' },
  { id: 20, name: 'raticate', type: 'normal' },
  { id: 21, name: 'spearow', type: 'normal' },
  { id: 22, name: 'fearow', type: 'normal' },
  { id: 23, name: 'ekans', type: 'poison' },
  { id: 24, name: 'arbok', type: 'poison' },
  { id: 25, name: 'pikachu', type: 'electric' },
]

async function mockPokemonApi(page: Page) {
  await page.route('https://pokeapi.co/api/v2/type/fire', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      json: {
        pokemon: pokemonFixtures
          .filter((pokemon) => pokemon.type === 'fire')
          .map((pokemon) => ({
            pokemon: {
              name: pokemon.name,
              url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
            },
          })),
      },
    })
  })

  await page.route(
    'https://pokeapi.co/api/v2/pokemon?limit=1302&offset=0',
    async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        json: {
          count: pokemonFixtures.length,
          results: pokemonFixtures.map((pokemon) => ({
            name: pokemon.name,
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
          })),
        },
      })
    }
  )

  await page.route(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/?$/, async (
    route
  ) => {
    const id = Number(route.request().url().match(/\/pokemon\/(\d+)\/?$/)?.[1])
    const pokemon = pokemonFixtures.find((item) => item.id === id)

    if (!pokemon) {
      await route.fulfill({ status: 404 })
      return
    }

    await route.fulfill({
      contentType: 'application/json',
      json: {
        id: pokemon.id,
        name: pokemon.name,
        sprites: {
          front_default: emptyPixel,
          other: {
            'official-artwork': {
              front_default: emptyPixel,
            },
          },
        },
        types: [
          {
            type: {
              name: pokemon.type,
            },
          },
        ],
      },
    })
  })
}

test.beforeEach(async ({ page }) => {
  await mockPokemonApi(page)
})

test('lists pokemon with pagination and remembered display mode', async ({
  page,
}) => {
  await page.goto('/pokemon')

  await expect(page.getByRole('heading', { name: 'Tüm Pokémon' })).toBeVisible()
  await expect(page.getByText('25 pokémon')).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Pikachu/i })).toBeHidden()

  await page.getByRole('button', { name: 'Sonraki sayfa' }).click()

  await expect(page).toHaveURL('/pokemon?page=2')
  await expect(page.getByRole('link', { name: /Pikachu/i })).toBeVisible()

  await page.getByRole('button', { name: 'Liste görünüm' }).click()
  await page.reload()

  await expect(page.getByRole('button', { name: 'Liste görünüm' }))
    .toHaveAttribute('aria-pressed', 'true')
})

test('filters pokemon by type and keeps the selection in the URL', async ({
  page,
}) => {
  await page.goto('/pokemon')

  await page.getByLabel('Tür filtresi').selectOption('fire')

  await expect(page).toHaveURL('/pokemon?type=fire')
  await expect(page.getByText('3 pokémon')).toBeVisible()
  await expect(page.getByRole('link', { name: /Charmander/i })).toBeVisible()
  await expect(page.getByRole('link', { name: /Bulbasaur/i })).toBeHidden()
})
