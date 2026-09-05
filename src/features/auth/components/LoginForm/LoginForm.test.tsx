import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { LoginForm } from './LoginForm'

function renderLoginForm(props: Parameters<typeof LoginForm>[0]) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  render(
    <QueryClientProvider client={queryClient}>
      <LoginForm {...props} />
    </QueryClientProvider>
  )
}

describe('LoginForm', () => {
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

  it('shows required field messages after empty submit', async () => {
    const user = userEvent.setup()

    renderLoginForm({ onSubmit: vi.fn() })

    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(await screen.findByText('Username is required')).toBeVisible()
    expect(screen.getByText('Password is required')).toBeVisible()
  })

  it('fills the form when a demo user is selected', async () => {
    const user = userEvent.setup()

    renderLoginForm({ onSubmit: vi.fn() })

    await user.click(screen.getByRole('button', { name: /Güven Altuntaş/i }))

    expect(screen.getByLabelText('Username')).toHaveValue('guven')
    expect(screen.getByLabelText('Password')).toHaveValue('altuntas')
  })

  it('submits username and password values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    renderLoginForm({ onSubmit: handleSubmit })

    await user.type(screen.getByLabelText('Username'), 'guven')
    await user.type(screen.getByLabelText('Password'), 'altuntas')
    await user.click(screen.getByRole('button', { name: 'Login' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      password: 'altuntas',
      username: 'guven',
    })
  })

  it('shows an invalid credentials error inside the form', () => {
    renderLoginForm({
      error: 'Invalid username or password',
      onSubmit: vi.fn(),
    })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Invalid username or password'
    )
  })
})
