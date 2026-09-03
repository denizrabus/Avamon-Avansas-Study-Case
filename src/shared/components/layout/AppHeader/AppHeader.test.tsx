import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { AppHeader } from './AppHeader'
import { authReducer } from '../../../../features/auth/auth-slice'

function renderHeader(preloadedAuthState?: ReturnType<typeof authReducer>) {
  const store = configureStore({
    preloadedState: preloadedAuthState
      ? {
          auth: preloadedAuthState,
        }
      : undefined,
    reducer: {
      auth: authReducer,
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter>
        <AppHeader onLogout={vi.fn()} />
      </MemoryRouter>
    </Provider>
  )
}

describe('AppHeader', () => {
  it('renders navigation and login link for visitors', () => {
    renderHeader()

    expect(screen.getByRole('link', { name: 'Avamon' })).toHaveAttribute(
      'href',
      '/'
    )
    expect(screen.getByRole('link', { name: 'Tüm Pokemonlar' })).toHaveAttribute(
      'href',
      '/pokemon'
    )
    expect(screen.getByRole('link', { name: 'Giriş Yap' })).toHaveAttribute(
      'href',
      '/login'
    )
    expect(screen.getByPlaceholderText('Pokemon ara...')).toBeVisible()
  })

  it('renders current user and calls logout', async () => {
    const user = userEvent.setup()
    const handleLogout = vi.fn()
    const store = configureStore({
      preloadedState: {
        auth: {
          currentUser: {
            avatarPokemonId: 25,
            fullName: 'Güven Altuntaş',
            username: 'guven',
          },
          token: 'mock-token-guven',
        },
      },
      reducer: {
        auth: authReducer,
      },
    })

    render(
      <Provider store={store}>
        <MemoryRouter>
          <AppHeader onLogout={handleLogout} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Güven Altuntaş')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Çıkış' }))

    expect(handleLogout).toHaveBeenCalledTimes(1)
  })
})
