import {
  parseDisplayMode,
} from './pokemon-list-utils'
import { type PokemonDisplayMode } from './pokemon-types'

const pokemonPreferencesKey = 'avamon.pokemon-preferences'

interface StoredPokemonPreferences {
  displayMode?: PokemonDisplayMode
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function loadPokemonDisplayMode(): PokemonDisplayMode {
  if (!canUseStorage()) {
    return 'grid'
  }

  const rawValue = window.localStorage.getItem(pokemonPreferencesKey)

  if (!rawValue) {
    return 'grid'
  }

  try {
    const preferences = JSON.parse(rawValue) as StoredPokemonPreferences

    return parseDisplayMode(preferences.displayMode ?? null)
  } catch {
    window.localStorage.removeItem(pokemonPreferencesKey)
    return 'grid'
  }
}

export function savePokemonDisplayMode(displayMode: PokemonDisplayMode) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(
    pokemonPreferencesKey,
    JSON.stringify({ displayMode })
  )
}
