import {
  isPokemonTypeName,
  parseDisplayMode,
} from './pokemon-list-utils'
import {
  type PokemonDisplayMode,
  type PokemonSummary,
} from './pokemon-types'

const pokemonPreferencesKey = 'avamon.pokemon-preferences'

interface StoredPokemonPreferences {
  displayMode?: PokemonDisplayMode
  recentlyVisited?: PokemonSummary[]
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function loadPokemonDisplayMode(): PokemonDisplayMode {
  const preferences = loadStoredPokemonPreferences()

  return parseDisplayMode(preferences?.displayMode ?? null)
}

export function loadRecentlyVisitedPokemon(): PokemonSummary[] {
  const preferences = loadStoredPokemonPreferences()

  return Array.isArray(preferences?.recentlyVisited)
    ? preferences.recentlyVisited.filter(isStoredPokemonSummary).slice(0, 3)
    : []
}

export function savePokemonDisplayMode(displayMode: PokemonDisplayMode) {
  saveStoredPokemonPreferences({
    ...loadStoredPokemonPreferences(),
    displayMode,
  })
}

export function saveRecentlyVisitedPokemon(recentlyVisited: PokemonSummary[]) {
  saveStoredPokemonPreferences({
    ...loadStoredPokemonPreferences(),
    recentlyVisited: recentlyVisited.slice(0, 3),
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

function isStoredPokemonSummary(value: unknown): value is PokemonSummary {
  if (!value || typeof value !== 'object') {
    return false
  }

  const pokemon = value as Record<string, unknown>

  return (
    typeof pokemon.id === 'number' &&
    typeof pokemon.imageUrl === 'string' &&
    typeof pokemon.name === 'string' &&
    Array.isArray(pokemon.types) &&
    pokemon.types.every(
      (type) => typeof type === 'string' && isPokemonTypeName(type)
    )
  )
}
