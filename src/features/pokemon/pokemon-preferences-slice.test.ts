import { describe, expect, it } from 'vitest'

import {
  displayModeChanged,
  pokemonPreferencesReducer,
} from './pokemon-preferences-slice'

describe('pokemonPreferencesSlice', () => {
  it('stores the selected display mode', () => {
    const state = pokemonPreferencesReducer(
      { displayMode: 'grid' },
      displayModeChanged('list')
    )

    expect(state.displayMode).toBe('list')
  })
})
