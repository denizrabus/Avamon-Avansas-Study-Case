import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { DemoUserCard } from './DemoUserCard'
import { demoUsers } from '../../demo-users'

function renderDemoUserCard(onSelect = vi.fn()) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <DemoUserCard onSelect={onSelect} user={demoUsers[0]} />
    </QueryClientProvider>
  )
}

describe('DemoUserCard', () => {
  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        json: () =>
          Promise.resolve({
            sprites: {
              front_default: 'https://example.com/pikachu.png',
            },
          }),
        ok: true,
      })
    )
  })

  it('renders demo user identity and credentials', () => {
    renderDemoUserCard()

    expect(screen.getByRole('button', { name: /Güven Altuntaş/i })).toBeVisible()
    expect(screen.getByText('guven / altuntas')).toBeVisible()
  })

  it('calls onSelect with the selected user', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    renderDemoUserCard(handleSelect)

    await user.click(screen.getByRole('button', { name: /Güven Altuntaş/i }))

    expect(handleSelect).toHaveBeenCalledWith(demoUsers[0])
  })
})
