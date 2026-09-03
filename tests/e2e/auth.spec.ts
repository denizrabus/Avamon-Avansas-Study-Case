import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.clear()
  })
})

test('logs in with a demo user', async ({ page }) => {
  await page.goto('/login')

  await page.getByRole('button', { name: /Güven Altuntaş/i }).click()

  await expect(page.getByLabel('Kullanıcı Adı')).toHaveValue('guven')
  await expect(page.getByLabel('Şifre')).toHaveValue('altuntas')

  await page.locator('main').getByRole('button', { name: 'Giriş Yap' }).click()

  await expect(page).toHaveURL('/')
  await expect(page.getByRole('button', { name: 'Çıkış' })).toBeVisible()

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
    page.getByRole('heading', { name: 'pikachu' })
  ).toBeVisible()
})
