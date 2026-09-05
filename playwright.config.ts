import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'npm run dev -- --host 127.0.0.1',
    url: 'http://127.0.0.1:5173',
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: 'responsive.spec.ts',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'mobile-360',
      testIgnore: 'responsive.spec.ts',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 360, height: 800 },
      },
    },
    // The 1280px (chromium) and 360px (mobile-360) case-required widths are
    // already covered by the full suite above, so only the remaining
    // PDF-required widths get their own project here. Each is scoped to
    // responsive.spec.ts only (and chromium/mobile-360 ignore that file via
    // testIgnore above), so the smoke spec runs exactly once per required
    // width and the full functional suite never runs more than twice.
    {
      name: 'responsive-412',
      testMatch: 'responsive.spec.ts',
      use: { viewport: { width: 412, height: 915 } },
    },
    {
      name: 'responsive-1024',
      testMatch: 'responsive.spec.ts',
      use: { viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'responsive-2560',
      testMatch: 'responsive.spec.ts',
      use: { viewport: { width: 2560, height: 1440 } },
    },
  ],
})
