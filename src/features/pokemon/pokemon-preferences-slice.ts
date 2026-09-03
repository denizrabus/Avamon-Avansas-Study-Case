import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { loadPokemonDisplayMode } from './pokemon-preferences-storage'
import { type PokemonDisplayMode } from './pokemon-types'

interface PokemonPreferencesState {
  displayMode: PokemonDisplayMode
}

const initialState: PokemonPreferencesState = {
  displayMode: loadPokemonDisplayMode(),
}

const pokemonPreferencesSlice = createSlice({
  name: 'pokemonPreferences',
  initialState,
  reducers: {
    displayModeChanged(state, action: PayloadAction<PokemonDisplayMode>) {
      state.displayMode = action.payload
    },
  },
})

export const pokemonPreferencesReducer = pokemonPreferencesSlice.reducer
export const { displayModeChanged } = pokemonPreferencesSlice.actions
