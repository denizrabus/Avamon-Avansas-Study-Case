import { describe, expect, it } from 'vitest'

import {
  displayModeChanged,
  getNextRecentlyVisitedIds,
  pokemonPreferencesReducer,
  recentlyVisitedIdsChanged,
} from './pokemon-preferences-slice'

const bulbasaurId = 1
const charmanderId = 4
const squirtleId = 7
const pikachuId = 25

describe('pokemonPreferencesSlice', () => {
  it('stores the selected display mode', () => {
    const state = pokemonPreferencesReducer(
      { displayMode: 'grid', recentlyVisitedIds: [] },
      displayModeChanged('list')
    )

    expect(state.displayMode).toBe('list')
  })

  it('stores the last three visited pokemon ids', () => {
    const state = pokemonPreferencesReducer(
      { displayMode: 'grid', recentlyVisitedIds: [] },
      recentlyVisitedIdsChanged([
        bulbasaurId,
        charmanderId,
        squirtleId,
        pikachuId,
      ])
    )

    expect(state.recentlyVisitedIds).toEqual([
      bulbasaurId,
      charmanderId,
      squirtleId,
    ])
  })

  it('moves an existing visited pokemon id to the first position', () => {
    const recentlyVisitedIds = getNextRecentlyVisitedIds(
      [bulbasaurId, charmanderId, squirtleId],
      charmanderId
    )

    expect(recentlyVisitedIds).toEqual([
      charmanderId,
      bulbasaurId,
      squirtleId,
    ])
  })
})
