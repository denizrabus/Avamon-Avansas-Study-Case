import { configureStore } from '@reduxjs/toolkit'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { AppHeader } from './AppHeader'
import { authReducer } from '../../../../features/auth/auth-slice'

vi.mock('../../../../features/pokemon/pokemon-query', () => ({
  usePokemonReferencesQuery: () => ({
    data: {
      count: 2,
      results: [
        {
          id: 1,
          name: 'bulbasaur',
          url: 'https://pokeapi.co/api/v2/pokemon/1/',
        },
        {
          id: 25,
          name: 'pikachu',
          url: 'https://pokeapi.co/api/v2/pokemon/25/',
        },
      ],
    },
    isLoading: false,
  }),
}))

function renderHeader({
  onLogout = vi.fn(),
  preloadedAuthState,
}: {
  onLogout?: () => void
  preloadedAuthState?: ReturnType<typeof authReducer>
} = {}) {
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
        <AppHeader onLogout={onLogout} />
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
    expect(screen.getByRole('link', { name: 'All Pokémon' })).toHaveAttribute(
      'href',
      '/pokemon'
    )
    expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute(
      'href',
      '/login'
    )
    expect(screen.getByRole('combobox', { name: 'Search Pokémon' })).toBeVisible()
  })

  it('opens mobile menu with visitor actions', async () => {
    const user = userEvent.setup()

    renderHeader()

    expect(
      screen.queryByRole('region', { name: 'Mobile menu' })
    ).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const mobileMenu = screen.getByRole('region', { name: 'Mobile menu' })

    expect(
      within(mobileMenu).getByRole('link', { name: 'All Pokémon' })
    ).toHaveAttribute('href', '/pokemon')
    expect(
      within(mobileMenu).getByRole('combobox', { name: 'Search Pokémon' })
    ).toBeVisible()
    expect(within(mobileMenu).getByRole('link', { name: 'Login' }))
      .toHaveAttribute('href', '/login')
  })

  it('renders current user and calls logout', async () => {
    const user = userEvent.setup()
    const handleLogout = vi.fn()

    renderHeader({
      onLogout: handleLogout,
      preloadedAuthState: {
        currentUser: {
          avatarPokemonId: 25,
          fullName: 'Güven Altuntaş',
          username: 'guven',
        },
        token: 'mock-token-guven',
      },
    })

    expect(screen.getByText('Güven Altuntaş')).toBeVisible()

    await user.click(screen.getByRole('button', { name: 'Logout' }))

    expect(handleLogout).toHaveBeenCalledTimes(1)
  })

  it('shows authenticated user actions in the mobile menu', async () => {
    const user = userEvent.setup()
    const handleLogout = vi.fn()

    renderHeader({
      onLogout: handleLogout,
      preloadedAuthState: {
        currentUser: {
          avatarPokemonId: 25,
          fullName: 'Güven Altuntaş',
          username: 'guven',
        },
        token: 'mock-token-guven',
      },
    })

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    const mobileMenu = screen.getByRole('region', { name: 'Mobile menu' })

    expect(within(mobileMenu).getByText('Güven Altuntaş')).toBeVisible()

    await user.click(
      within(mobileMenu).getByRole('button', { name: 'Logout' })
    )

    expect(handleLogout).toHaveBeenCalledTimes(1)
  })
})
