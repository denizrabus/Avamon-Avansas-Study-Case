import {
  isPokemonTypeName,
  parsePokemonIdFromUrl,
} from './pokemon-list-utils'
import {
  type PokemonDetail,
  type PokemonEvolution,
  type PokemonReference,
  type PokemonReferenceCollection,
  type PokemonSprite,
  type PokemonStat,
  type PokemonSummary,
  type PokemonTypeName,
} from './pokemon-types'

const pokemonApiBaseUrl = 'https://pokeapi.co/api/v2'
const pokemonListLimit = 2000
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
  abilities: Array<{
    ability: NamedApiResource
    is_hidden: boolean
  }>
  base_experience: number | null
  height: number
  id: number
  name: string
  species: NamedApiResource
  sprites: {
    back_default?: string | null
    back_shiny?: string | null
    front_default?: string | null
    front_shiny?: string | null
    other?: {
      home?: {
        front_default?: string | null
      }
      'official-artwork'?: {
        front_default?: string | null
      }
    }
  }
  stats: Array<{
    base_stat: number
    stat: {
      name: string
    }
  }>
  types: Array<{
    type: {
      name: string
    }
  }>
  weight: number
}

interface PokemonSpeciesResponse {
  evolution_chain: {
    url: string
  }
  flavor_text_entries: Array<{
    flavor_text: string
    language: {
      name: string
    }
  }>
}

interface PokemonEvolutionChainResponse {
  chain: PokemonEvolutionChainNode
}

interface PokemonEvolutionChainNode {
  evolves_to: PokemonEvolutionChainNode[]
  species: NamedApiResource
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
      response.sprites.other?.home?.front_default ??
      response.sprites.front_default ??
      `${officialArtworkBaseUrl}/${response.id}.png`,
    name: response.name,
    types,
  }
}

function getPokemonArtworkUrl(id: number) {
  return `${officialArtworkBaseUrl}/${id}.png`
}

function parsePokemonSpeciesIdFromUrl(url: string) {
  const id = Number(url.match(/\/pokemon-species\/(\d+)\/?$/)?.[1])

  return Number.isInteger(id) && id > 0 ? id : null
}

function formatDescription(description: string) {
  return description.replace(/\s+/g, ' ').trim()
}

function toPokemonDescription(response: PokemonSpeciesResponse) {
  const englishDescription = response.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  )

  return englishDescription
    ? formatDescription(englishDescription.flavor_text)
    : 'No description is available for this Pokemon.'
}

const statLabels: Record<string, string> = {
  attack: 'Atk',
  defense: 'Def',
  hp: 'HP',
  'special-attack': 'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed: 'Hız',
}

function toPokemonStats(response: PokemonDetailResponse): PokemonStat[] {
  return response.stats.map((stat) => ({
    label: statLabels[stat.stat.name] ?? stat.stat.name,
    name: stat.stat.name,
    value: stat.base_stat,
  }))
}

function toPokemonSprites(response: PokemonDetailResponse): PokemonSprite[] {
  const sprites = [
    { imageUrl: response.sprites.front_default, label: 'Ön' },
    { imageUrl: response.sprites.back_default, label: 'Arka' },
    { imageUrl: response.sprites.front_shiny, label: 'Parlak Ön' },
    { imageUrl: response.sprites.back_shiny, label: 'Parlak Arka' },
  ]

  return sprites.flatMap((sprite) =>
    sprite.imageUrl ? [{ imageUrl: sprite.imageUrl, label: sprite.label }] : []
  )
}

function collectEvolutionChain(
  node: PokemonEvolutionChainNode,
  evolutions: PokemonEvolution[] = []
) {
  const id = parsePokemonSpeciesIdFromUrl(node.species.url)

  if (id) {
    evolutions.push({
      id,
      imageUrl: getPokemonArtworkUrl(id),
      name: node.species.name,
    })
  }

  node.evolves_to.forEach((evolutionNode) => {
    collectEvolutionChain(evolutionNode, evolutions)
  })

  return evolutions
}

function toPokemonDetail(
  pokemon: PokemonDetailResponse,
  species: PokemonSpeciesResponse,
  evolutionChain: PokemonEvolutionChainResponse
): PokemonDetail {
  return {
    ...toPokemonSummary(pokemon),
    abilities: pokemon.abilities.map((ability) => ({
      isHidden: ability.is_hidden,
      name: ability.ability.name,
    })),
    baseExperience: pokemon.base_experience,
    description: toPokemonDescription(species),
    evolutionChain: collectEvolutionChain(evolutionChain.chain),
    heightInMeters: pokemon.height / 10,
    sprites: toPokemonSprites(pokemon),
    stats: toPokemonStats(pokemon),
    weightInKilograms: pokemon.weight / 10,
  }
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

export async function fetchPokemonSummaries(references: PokemonReference[]) {
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
