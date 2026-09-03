import {
  pokemonTypeNames,
  type PokemonDisplayMode,
  type PokemonReference,
  type PokemonSortOption,
  type PokemonTypeName,
} from './pokemon-types'

const defaultPage = 1
const defaultSort: PokemonSortOption = 'number-asc'
const defaultDisplayMode: PokemonDisplayMode = 'grid'

export function formatPokemonNumber(id: number) {
  return `#${String(id).padStart(4, '0')}`
}

export function formatPokemonName(name: string) {
  return name
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join('-')
}

export function parsePokemonIdFromUrl(url: string) {
  const id = Number(url.match(/\/pokemon\/(\d+)\/?$/)?.[1])

  return Number.isInteger(id) && id > 0 ? id : null
}

export function isPokemonTypeName(value: string): value is PokemonTypeName {
  return pokemonTypeNames.includes(value as PokemonTypeName)
}

export function parseTypeFilter(value: string | null): PokemonTypeName | null {
  if (!value) {
    return null
  }

  return isPokemonTypeName(value) ? value : null
}

export function parseSortOption(value: string | null): PokemonSortOption {
  if (
    value === 'number-desc' ||
    value === 'name-asc' ||
    value === 'name-desc'
  ) {
    return value
  }

  return defaultSort
}

export function parseDisplayMode(value: string | null): PokemonDisplayMode {
  return value === 'list' ? 'list' : defaultDisplayMode
}

export function parsePage(value: string | null) {
  const page = Number(value)

  return Number.isInteger(page) && page > 0 ? page : defaultPage
}

export function sortPokemonReferences(
  references: PokemonReference[],
  sortOption: PokemonSortOption
) {
  const sortedReferences = [...references]

  sortedReferences.sort((first, second) => {
    if (sortOption === 'number-desc') {
      return second.id - first.id
    }

    if (sortOption === 'name-asc') {
      return first.name.localeCompare(second.name)
    }

    if (sortOption === 'name-desc') {
      return second.name.localeCompare(first.name)
    }

    return first.id - second.id
  })

  return sortedReferences
}

export function paginatePokemonReferences(
  references: PokemonReference[],
  page: number,
  perPage: number
) {
  const startIndex = (page - 1) * perPage

  return references.slice(startIndex, startIndex + perPage)
}

export function getPokemonTotalPages(totalCount: number, perPage: number) {
  return Math.max(1, Math.ceil(totalCount / perPage))
}

export function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), totalPages)
}

export { defaultDisplayMode, defaultPage, defaultSort }
