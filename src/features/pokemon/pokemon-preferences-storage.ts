import { parseDisplayMode } from './pokemon-list-utils'
import { type PokemonDisplayMode } from './pokemon-types'

const pokemonPreferencesKey = 'avamon.pokemon-preferences'
const maxRecentlyVisitedPokemon = 3

interface StoredPokemonPreferences {
  displayMode?: PokemonDisplayMode
  recentlyVisitedIds?: number[]
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function loadPokemonDisplayMode(): PokemonDisplayMode {
  const preferences = loadStoredPokemonPreferences()

  return parseDisplayMode(preferences?.displayMode ?? null)
}

export function loadRecentlyVisitedPokemonIds(): number[] {
  const preferences = loadStoredPokemonPreferences()

  return Array.isArray(preferences?.recentlyVisitedIds)
    ? preferences.recentlyVisitedIds
        .filter((id): id is number => typeof id === 'number')
        .slice(0, maxRecentlyVisitedPokemon)
    : []
}

export function savePokemonDisplayMode(displayMode: PokemonDisplayMode) {
  saveStoredPokemonPreferences({
    ...loadStoredPokemonPreferences(),
    displayMode,
  })
}

export function saveRecentlyVisitedPokemonIds(recentlyVisitedIds: number[]) {
  saveStoredPokemonPreferences({
    ...loadStoredPokemonPreferences(),
    recentlyVisitedIds: recentlyVisitedIds.slice(0, maxRecentlyVisitedPokemon),
  })
}

function loadStoredPokemonPreferences(): StoredPokemonPreferences | null {
  if (!canUseStorage()) {
    return null
  }

  const rawValue = window.localStorage.getItem(pokemonPreferencesKey)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as StoredPokemonPreferences
  } catch {
    window.localStorage.removeItem(pokemonPreferencesKey)
    return null
  }
}

function saveStoredPokemonPreferences(preferences: StoredPokemonPreferences) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(pokemonPreferencesKey, JSON.stringify(preferences))
}
