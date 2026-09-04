import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  loadPokemonDisplayMode,
  loadRecentlyVisitedPokemon,
} from './pokemon-preferences-storage'
import {
  type PokemonDisplayMode,
  type PokemonSummary,
} from './pokemon-types'

interface PokemonPreferencesState {
  displayMode: PokemonDisplayMode
  recentlyVisited: PokemonSummary[]
}

const initialState: PokemonPreferencesState = {
  displayMode: loadPokemonDisplayMode(),
  recentlyVisited: loadRecentlyVisitedPokemon(),
}

export function getNextRecentlyVisitedPokemon(
  currentList: PokemonSummary[],
  pokemon: PokemonSummary
) {
  return [
    pokemon,
    ...currentList.filter((currentPokemon) => currentPokemon.id !== pokemon.id),
  ].slice(0, 3)
}

const pokemonPreferencesSlice = createSlice({
  name: 'pokemonPreferences',
  initialState,
  reducers: {
    displayModeChanged(state, action: PayloadAction<PokemonDisplayMode>) {
      state.displayMode = action.payload
    },
    recentlyVisitedChanged(state, action: PayloadAction<PokemonSummary[]>) {
      state.recentlyVisited = action.payload.slice(0, 3)
    },
  },
})

export const pokemonPreferencesReducer = pokemonPreferencesSlice.reducer
export const { displayModeChanged, recentlyVisitedChanged } =
  pokemonPreferencesSlice.actions
