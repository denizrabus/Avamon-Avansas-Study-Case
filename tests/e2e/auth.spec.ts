import { expect, test, type Page } from '@playwright/test'

import { mockPokemonDetailApi } from './mock-pokemon-detail-api'

async function expectAuthenticatedHeader(page: Page) {
  const mobileMenuButton = page.getByRole('button', { name: 'Menüyü aç' })

  if (await mobileMenuButton.isVisible()) {
    await mobileMenuButton.click()

    await expect(
      page
        .getByRole('region', { name: 'Mobil menü' })
        .getByRole('button', { name: 'Çıkış' })
    ).toBeVisible()

    return
  }

  await expect(page.getByRole('button', { name: 'Çıkış' })).toBeVisible()
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

  await expect(page.getByLabel('Kullanıcı Adı')).toHaveValue('guven')
  await expect(page.getByLabel('Şifre')).toHaveValue('altuntas')

  await page.locator('main').getByRole('button', { name: 'Giriş Yap' }).click()

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
  await page.locator('main').getByRole('button', { name: 'Giriş Yap' }).click()

  await expect(page).toHaveURL('/pokemon/pikachu')
  await expect(
    page.getByRole('heading', { name: 'Pikachu' })
  ).toBeVisible()
  await expect(
    page.getByRole('heading', { name: 'TEMEL İSTATİSTİKLER' })
  ).toBeVisible()
})
