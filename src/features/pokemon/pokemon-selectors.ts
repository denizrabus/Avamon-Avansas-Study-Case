import { type RootState } from '../../app/store'

export function selectPokemonDisplayMode(state: RootState) {
  return state.pokemonPreferences.displayMode
}
