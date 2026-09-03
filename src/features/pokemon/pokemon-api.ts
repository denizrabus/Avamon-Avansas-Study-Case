import {
  isPokemonTypeName,
  parsePokemonIdFromUrl,
} from './pokemon-list-utils'
import {
  type PokemonReference,
  type PokemonReferenceCollection,
  type PokemonSummary,
  type PokemonTypeName,
} from './pokemon-types'

const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2'
const officialArtworkBaseUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

interface NamedApiResource {
  name: string
  url: string
}

interface PokemonListResponse {
  count: number
  results: NamedApiResource[]
}

interface PokemonTypeResponse {
  pokemon: Array<{
    pokemon: NamedApiResource
  }>
}

interface PokemonDetailResponse {
  id: number
  name: string
  sprites: {
    front_default?: string | null
    other?: {
      'official-artwork'?: {
        front_default?: string | null
      }
    }
  }
  types: Array<{
    type: {
      name: string
    }
  }>
}

async function fetchJson<TResponse>(url: string): Promise<TResponse> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Pokemon verisi yüklenemedi')
  }

  return (await response.json()) as TResponse
}

function toPokemonReference(resource: NamedApiResource): PokemonReference | null {
  const id = parsePokemonIdFromUrl(resource.url)

  if (!id) {
    return null
  }

  return {
    id,
    name: resource.name,
    url: resource.url,
  }
}

function toPokemonSummary(response: PokemonDetailResponse): PokemonSummary {
  const types = response.types
    .map((item) => item.type.name)
    .filter(isPokemonTypeName)

  return {
    id: response.id,
    imageUrl:
      response.sprites.other?.['official-artwork']?.front_default ??
      response.sprites.front_default ??
      `${officialArtworkBaseUrl}/${response.id}.png`,
    name: response.name,
    types,
  }
}

export async function fetchPokemonReferences(): Promise<PokemonReferenceCollection> {
  const response = await fetchJson<PokemonListResponse>(
    `${pokemonApiBaseUrl}/pokemon?limit=1302&offset=0`
  )

  return {
    count: response.count,
    results: response.results.flatMap((resource) => {
      const reference = toPokemonReference(resource)

      return reference ? [reference] : []
    }),
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
    .filter((pokemon) => pokemon.id <= 1302)

  return {
    count: results.length,
    results,
  }
}

export async function fetchPokemonSummary(idOrName: number | string) {
  const response = await fetchJson<PokemonDetailResponse>(
    `${pokemonApiBaseUrl}/pokemon/${idOrName}`
  )

  return toPokemonSummary(response)
}

export async function fetchPokemonSummaries(references: PokemonReference[]) {
  return Promise.all(
    references.map((reference) => fetchPokemonSummary(reference.id))
  )
}
