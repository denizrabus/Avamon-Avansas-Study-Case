import { useQuery } from '@tanstack/react-query'

import {
  fetchPokemonDetail,
  fetchPokemonReferences,
  fetchPokemonReferencesByType,
  fetchPokemonSummaries,
} from './pokemon-api'
import {
  type PokemonReference,
  type PokemonTypeName,
} from './pokemon-types'

export const pokemonQueryKeys = {
  all: ['pokemon'] as const,
  detail: (idOrName: string) =>
    [...pokemonQueryKeys.all, 'detail', idOrName] as const,
  references: (type: PokemonTypeName | null) =>
    [...pokemonQueryKeys.all, 'references', type ?? 'all'] as const,
  summaries: (references: PokemonReference[]) =>
    [
      ...pokemonQueryKeys.all,
      'summaries',
      references.map((reference) => reference.id),
    ] as const,
}

export function usePokemonReferencesQuery(type: PokemonTypeName | null) {
  return useQuery({
    queryFn: () =>
      type ? fetchPokemonReferencesByType(type) : fetchPokemonReferences(),
    queryKey: pokemonQueryKeys.references(type),
  })
}

export function usePokemonSummariesQuery(references: PokemonReference[]) {
  return useQuery({
    enabled: references.length > 0,
    queryFn: () => fetchPokemonSummaries(references),
    queryKey: pokemonQueryKeys.summaries(references),
  })
}

export function usePokemonDetailQuery(idOrName: string | undefined) {
  const normalizedIdOrName = idOrName?.trim().toLowerCase()

  return useQuery({
    enabled: Boolean(normalizedIdOrName),
    queryFn: () => fetchPokemonDetail(normalizedIdOrName ?? ''),
    queryKey: pokemonQueryKeys.detail(normalizedIdOrName ?? ''),
  })
}
