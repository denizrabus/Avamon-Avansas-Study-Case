import { expect, test, type Page } from '@playwright/test'

import { mockPokemonDetailApi } from './mocks/pokemon-api'

async function expectAuthenticatedHeader(page: Page) {
  const mobileMenuButton = page.getByRole('button', { name: 'Open menu' })

  if (await mobileMenuButton.isVisible()) {
    await mobileMenuButton.click()

    await expect(
      page
        .getByRole('region', { name: 'Mobile menu' })
        .getByRole('button', { name: 'Logout' })
    ).toBeVisible()

    return
  }

  await expect(page.getByRole('button', { name: 'Logout' })).toBeVisible()
}

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
  })

  await mockPokemonDetailApi(page)
})

test('logs in with a demo user', async ({ page }) => {
  await page.goto('/login')

  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()

  await expect(page.getByLabel('Username')).toHaveValue('guven')
  await expect(page.getByLabel('Password')).toHaveValue('altuntas')

  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/')
  await expectAuthenticatedHeader(page)

  const storedSession = await page.evaluate(() =>
    window.localStorage.getItem('avamon.auth-session')
  )

  expect(storedSession).toContain('mock-token-guven')
})

test('redirects visitors from protected pokemon detail to login', async ({
  page,
}) => {
  await page.goto('/pokemon/pikachu')

  await expect(page).toHaveURL('/login')

  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()
  await page.locator('main').getByRole('button', { name: 'Login' }).click()

  await expect(page).toHaveURL('/pokemon/pikachu')
  await expect(
    page.getByRole('heading', { name: 'Pikachu' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'BASE STATS' })
  ).toBeVisible()
})
