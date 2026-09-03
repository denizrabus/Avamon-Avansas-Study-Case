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

    await user.click(screen.getByRole('button', { name: 'Giriş Yap' }))

    expect(await screen.findByText('Kullanıcı adı zorunludur')).toBeVisible()
    expect(screen.getByText('Şifre zorunludur')).toBeVisible()
  })

  it('fills the form when a demo user is selected', async () => {
    const user = userEvent.setup()

    renderLoginForm({ onSubmit: vi.fn() })

    await user.click(screen.getByRole('button', { name: /Güven Altuntaş/i }))

    expect(screen.getByLabelText('Kullanıcı Adı')).toHaveValue('guven')
    expect(screen.getByLabelText('Şifre')).toHaveValue('altuntas')
  })

  it('submits username and password values', async () => {
    const user = userEvent.setup()
    const handleSubmit = vi.fn()

    renderLoginForm({ onSubmit: handleSubmit })

    await user.type(screen.getByLabelText('Kullanıcı Adı'), 'guven')
    await user.type(screen.getByLabelText('Şifre'), 'altuntas')
    await user.click(screen.getByRole('button', { name: 'Giriş Yap' }))

    expect(handleSubmit).toHaveBeenCalledWith({
      password: 'altuntas',
      username: 'guven',
    })
  })

  it('shows an invalid credentials error inside the form', () => {
    renderLoginForm({
      error: 'Kullanıcı adı veya şifre hatalı',
      onSubmit: vi.fn(),
    })

    expect(screen.getByRole('alert')).toHaveTextContent(
      'Kullanıcı adı veya şifre hatalı'
    )
  })
})
