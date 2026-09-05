import { expect, test, type Page } from '@playwright/test'

import { mockPokemonDetailApi } from './mocks/pokemon-api'

async function getHeaderSearch(page: Page) {
  const mobileMenuButton = page.getByRole('button', { name: 'Open menu' })

  if (await mobileMenuButton.isVisible()) {
    await mobileMenuButton.click()
  }

  return page.getByRole('combobox', { name: 'Search Pokémon' })
}

test.beforeEach(async ({ page }) => {
  await mockPokemonDetailApi(page)
})

test('shows pokemon detail data for authenticated users', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await page.goto('/pokemon/pikachu')

  await expect(
    page.getByRole('heading', { level: 1, name: 'Pikachu' })
  ).toBeVisible()
  await expect(page.locator('main').getByText('#0025').first()).toBeVisible()
  await expect(page.getByText('Electric', { exact: true })).toBeVisible()
  await expect(page.getByText(/lightning storms/i)).toBeVisible()
  await expect(page.getByText('0.4 m')).toBeVisible()
  await expect(page.getByText('6.0 kg')).toBeVisible()
  await expect(page.getByText('112')).toBeVisible()
  await expect(page.getByText('Lightning Rod')).toBeVisible()
  await expect(page.getByText('Hidden')).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'EVOLUTION CHAIN' })
  ).toBeVisible()
  await expect(page.getByRole('link', { name: /Raichu/i })).toBeVisible()
})

test('navigates to pokemon detail from header search', async ({ page }) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await (await getHeaderSearch(page)).fill('rai')
  await page.getByRole('option', { name: 'Raichu #0026' }).click()

  await expect(page).toHaveURL('/pokemon/raichu')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Raichu' })
  ).toBeVisible()
})

test('limits header autocomplete results and renders option artwork', async ({
  page,
}) => {
  await page.goto('/pokemon')

  const searchInput = await getHeaderSearch(page)

  await searchInput.fill('pika')

  await expect(page.getByRole('option')).toHaveCount(8)
  await expect(
    page.getByRole('option', { name: 'Pikachu #0025' }).locator('img')
  ).toBeVisible()

  const firstOptionBox = await page
    .getByRole('option', { name: 'Pikachu #0025' })
    .boundingBox()
  const lastOptionBox = await page
    .getByRole('option', { name: 'Pikachu-Original-Cap #10094' })
    .boundingBox()

  expect(firstOptionBox).not.toBeNull()
  expect(lastOptionBox).not.toBeNull()
  expect(lastOptionBox?.y).toBeGreaterThan(firstOptionBox?.y ?? 0)

  await page.mouse.click(20, 500)

  await expect(page.getByRole('option')).toHaveCount(0)
  await expect(searchInput).toHaveValue('')
})

test('requires at least two characters before showing autocomplete options', async ({
  page,
}) => {
  await page.goto('/pokemon')

  await (await getHeaderSearch(page)).fill('p')

  await expect(page.getByRole('option')).toHaveCount(0)
})

test('submits exact search matches and clears unknown searches', async ({
  page,
}) => {
  await page.goto('/login')
  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await page.goto('/pokemon')

  const searchInput = await getHeaderSearch(page)

  await searchInput.fill('pikachu')
  await searchInput.press('Enter')

  await expect(page).toHaveURL('/pokemon/pikachu')
  await expect(
    page.getByRole('heading', { level: 1, name: 'Pikachu' })
  ).toBeVisible()
  await expect
    .poll(() =>
      page.evaluate(() => document.activeElement?.getAttribute('aria-label'))
    )
    .not.toBe('Search Pokémon')
  await expect(page.getByText('Type at least 2 characters')).toBeHidden()

  const nextSearchInput = await getHeaderSearch(page)

  await nextSearchInput.fill('missing')
  await nextSearchInput.press('Enter')

  await expect(page).toHaveURL('/pokemon/pikachu')
  await expect(nextSearchInput).toHaveValue('')
})
