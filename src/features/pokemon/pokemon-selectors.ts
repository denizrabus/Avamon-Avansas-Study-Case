import { type RootState } from '../../app/store'

export function selectPokemonDisplayMode(state: RootState) {
  return state.pokemonPreferences.displayMode
}

export function selectRecentlyVisitedPokemon(state: RootState) {
  return state.pokemonPreferences.recentlyVisited
}
