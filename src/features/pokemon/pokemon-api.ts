import {
  type PokemonDetailResponse,
  type PokemonEvolutionChainResponse,
  type PokemonListResponse,
  type PokemonSpeciesResponse,
  type PokemonTypeResponse,
} from './pokemon-api-types'
import {
  toPokemonDetail,
  toPokemonReference,
  toPokemonSummary,
} from './pokemon-mappers'
import {
  type PokemonDetail,
  type PokemonReference,
  type PokemonReferenceCollection,
  type PokemonTypeName,
} from './pokemon-types'

const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2'
const pokemonListLimit = 2000

async function fetchJson<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Pokemon data could not be loaded')
  }

  return (await response.json()) as TResponse
}

export async function fetchPokemonReferences(): Promise<PokemonReferenceCollection> {
  const response = await fetchJson<PokemonListResponse>(
    `${pokemonApiBaseUrl}/pokemon?limit=${pokemonListLimit}&offset=0`
  )
  const results = response.results.flatMap((resource) => {
    const reference = toPokemonReference(resource)

    return reference ? [reference] : []
  })

  return {
    count: results.length,
    results,
  }
}

export async function fetchPokemonReferencesByType(
  type: PokemonTypeName
): Promise<PokemonReferenceCollection> {
  const response = await fetchJson<PokemonTypeResponse>(
    `${pokemonApiBaseUrl}/type/${type}`
  )

  const results = response.pokemon
    .flatMap(({ pokemon }) => {
      const reference = toPokemonReference(pokemon)

      return reference ? [reference] : []
    })

  return {
    count: results.length,
    results,
  }
}

export async function fetchPokemonSummary(idOrName: number | string) {
  const response = await fetchJson<PokemonDetailResponse>(
    `${pokemonApiBaseUrl}/pokemon/${encodeURIComponent(String(idOrName).toLowerCase())}`
  )

  return toPokemonSummary(response)
}

export async function fetchPokemonSummaries(
  references: Array<Pick<PokemonReference, 'id'>>
) {
  return Promise.all(
    references.map((reference) => fetchPokemonSummary(reference.id))
  )
}

export async function fetchPokemonDetail(
  idOrName: number | string
): Promise<PokemonDetail> {
  const pokemon = await fetchJson<PokemonDetailResponse>(
    `${pokemonApiBaseUrl}/pokemon/${encodeURIComponent(String(idOrName).toLowerCase())}`
  )
  const species = await fetchJson<PokemonSpeciesResponse>(pokemon.species.url)
  const evolutionChain = await fetchJson<PokemonEvolutionChainResponse>(
    species.evolution_chain.url
  )

  return toPokemonDetail(pokemon, species, evolutionChain)
}
