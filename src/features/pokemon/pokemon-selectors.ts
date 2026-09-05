import { type RootState } from '../../app/store'

export function selectPokemonDisplayMode(state: RootState) {
  return state.pokemonPreferences.displayMode
}

export function selectRecentlyVisitedPokemonIds(state: RootState) {
  return state.pokemonPreferences.recentlyVisitedIds
}
