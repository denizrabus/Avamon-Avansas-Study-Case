import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, describe, expect, it, vi } from 'vitest'

import { HomePage } from './HomePage'
import { authReducer } from '../../features/auth/auth-slice'
import { pokemonPreferencesReducer } from '../../features/pokemon/pokemon-preferences-slice'
import {
  type PokemonReference,
  type PokemonSummary,
} from '../../features/pokemon/pokemon-types'

const pokemonQueryMocks = vi.hoisted(() => {
  const summaries = [
    {
      id: 1,
      imageUrl: '/bulbasaur.png',
      name: 'bulbasaur',
      types: ['grass', 'poison'],
    },
    {
      id: 2,
      imageUrl: '/ivysaur.png',
      name: 'ivysaur',
      types: ['grass', 'poison'],
    },
    {
      id: 3,
      imageUrl: '/venusaur.png',
      name: 'venusaur',
      types: ['grass', 'poison'],
    },
    {
      id: 4,
      imageUrl: '/charmander.png',
      name: 'charmander',
      types: ['fire'],
    },
    {
      id: 6,
      imageUrl: '/charizard.png',
      name: 'charizard',
      types: ['fire', 'flying'],
    },
    {
      id: 7,
      imageUrl: '/squirtle.png',
      name: 'squirtle',
      types: ['water'],
    },
    {
      id: 25,
      imageUrl: '/pikachu.png',
      name: 'pikachu',
      types: ['electric'],
    },
    {
      id: 26,
      imageUrl: '/raichu.png',
      name: 'raichu',
      types: ['electric'],
    },
  ] satisfies PokemonSummary[]

  return {
    references: summaries.map((pokemon) => ({
      id: pokemon.id,
      name: pokemon.name,
      url: `/pokemon/${pokemon.id}/`,
    })) satisfies PokemonReference[],
    summariesById: new Map(summaries.map((pokemon) => [pokemon.id, pokemon])),
  }
})

vi.mock('../../features/pokemon/pokemon-query', () => ({
  usePokemonReferencesQuery: () => ({
    data: {
      count: pokemonQueryMocks.references.length,
      results: pokemonQueryMocks.references,
    },
    isError: false,
    isLoading: false,
  }),
  usePokemonSummariesQuery: (references: Array<Pick<PokemonReference, 'id'>>) => ({
    data: references.flatMap((reference) => {
      const pokemon = pokemonQueryMocks.summariesById.get(reference.id)

      return pokemon ? [pokemon] : []
    }),
    isError: false,
    isLoading: false,
  }),
}))

interface RenderHomePageOptions {
  isAuthenticated?: boolean
  recentlyVisitedIds?: number[]
}

function renderHomePage({
  isAuthenticated = false,
  recentlyVisitedIds = [],
}: RenderHomePageOptions = {}) {
  const store = configureStore({
    preloadedState: {
      auth: isAuthenticated
        ? {
            currentUser: {
              avatarPokemonId: 25,
              fullName: 'Güven Altuntaş',
              username: 'guven',
            },
            token: 'mock-token-guven',
          }
        : {
            currentUser: null,
            token: null,
          },
      pokemonPreferences: {
        displayMode: 'grid' as const,
        recentlyVisitedIds,
      },
    },
    reducer: {
      auth: authReducer,
      pokemonPreferences: pokemonPreferencesReducer,
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    </Provider>
  )
}

describe('HomePage', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('renders hero actions and random popular pokemon for visitors', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    renderHomePage()

    expect(
      screen.getByRole('heading', { name: /Explore All Pokémon/i })
    ).toBeVisible()
    expect(screen.getByRole('link', { name: 'All Pokémon' }))
      .toHaveAttribute('href', '/pokemon')
    expect(screen.getByRole('link', { name: 'Login' }))
      .toHaveAttribute('href', '/login')
    expect(screen.getByRole('heading', { name: 'Popular Pokémon' }))
      .toBeVisible()
    expect(screen.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /Ivysaur/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /Venusaur/i })).toBeVisible()
  })

  it('hides the login action for authenticated users', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0)

    renderHomePage({ isAuthenticated: true })

    expect(screen.getByRole('link', { name: 'All Pokémon' })).toBeVisible()
    expect(screen.queryByRole('link', { name: 'Login' }))
      .not.toBeInTheDocument()
  })

  it('shows recently visited pokemon after three detail page visits', () => {
    const recentlyVisitedIds = [25, 4, 1]

    vi.spyOn(Math, 'random').mockReturnValue(0)

    renderHomePage({ recentlyVisitedIds })

    expect(screen.getByRole('heading', { name: 'Recently Visited' }))
      .toBeVisible()
    expect(screen.queryByRole('heading', { name: 'Popular Pokémon' }))
      .not.toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Pikachu/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /Charmander/i })).toBeVisible()
    expect(screen.getByRole('link', { name: /Bulbasaur/i })).toBeVisible()
  })
})
