import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import {
  loadPokemonDisplayMode,
  loadRecentlyVisitedPokemonIds,
} from './pokemon-preferences-storage'
import { type PokemonDisplayMode } from './pokemon-types'

const maxRecentlyVisitedPokemon = 3

interface PokemonPreferencesState {
  displayMode: PokemonDisplayMode
  recentlyVisitedIds: number[]
}

const initialState: PokemonPreferencesState = {
  displayMode: loadPokemonDisplayMode(),
  recentlyVisitedIds: loadRecentlyVisitedPokemonIds(),
}

export function getNextRecentlyVisitedIds(currentIds: number[], id: number) {
  return [id, ...currentIds.filter((currentId) => currentId !== id)].slice(
    0,
    maxRecentlyVisitedPokemon
  )
}

const pokemonPreferencesSlice = createSlice({
  name: 'pokemonPreferences',
  initialState,
  reducers: {
    displayModeChanged(state, action: PayloadAction<PokemonDisplayMode>) {
      state.displayMode = action.payload
    },
    recentlyVisitedIdsChanged(state, action: PayloadAction<number[]>) {
      state.recentlyVisitedIds = action.payload.slice(
        0,
        maxRecentlyVisitedPokemon
      )
    },
  },
})

export const pokemonPreferencesReducer = pokemonPreferencesSlice.reducer
export const { displayModeChanged, recentlyVisitedIdsChanged } =
  pokemonPreferencesSlice.actions
