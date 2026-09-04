import { describe, expect, it } from 'vitest'

import {
  displayModeChanged,
  getNextRecentlyVisitedPokemon,
  pokemonPreferencesReducer,
  recentlyVisitedChanged,
} from './pokemon-preferences-slice'
import { type PokemonSummary } from './pokemon-types'

const bulbasaur: PokemonSummary = {
  id: 1,
  imageUrl: 'bulbasaur.png',
  name: 'bulbasaur',
  types: ['grass'],
}

const charmander: PokemonSummary = {
  id: 4,
  imageUrl: 'charmander.png',
  name: 'charmander',
  types: ['fire'],
}

const squirtle: PokemonSummary = {
  id: 7,
  imageUrl: 'squirtle.png',
  name: 'squirtle',
  types: ['water'],
}

const pikachu: PokemonSummary = {
  id: 25,
  imageUrl: 'pikachu.png',
  name: 'pikachu',
  types: ['electric'],
}

describe('pokemonPreferencesSlice', () => {
  it('stores the selected display mode', () => {
    const state = pokemonPreferencesReducer(
      { displayMode: 'grid', recentlyVisited: [] },
      displayModeChanged('list')
    )

    expect(state.displayMode).toBe('list')
  })

  it('stores the last three visited pokemon', () => {
    const state = pokemonPreferencesReducer(
      { displayMode: 'grid', recentlyVisited: [] },
      recentlyVisitedChanged([bulbasaur, charmander, squirtle, pikachu])
    )

    expect(state.recentlyVisited).toEqual([bulbasaur, charmander, squirtle])
  })

  it('moves an existing visited pokemon to the first position', () => {
    const recentlyVisited = getNextRecentlyVisitedPokemon(
      [bulbasaur, charmander, squirtle],
      charmander
    )

    expect(recentlyVisited).toEqual([charmander, bulbasaur, squirtle])
  })
})
