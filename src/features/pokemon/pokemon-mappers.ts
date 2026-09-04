import {
  isPokemonTypeName,
  parsePokemonIdFromUrl,
} from './pokemon-list-utils'
import {
  type NamedApiResource,
  type PokemonDetailResponse,
  type PokemonEvolutionChainNode,
  type PokemonEvolutionChainResponse,
  type PokemonSpeciesResponse,
} from './pokemon-api-types'
import {
  type PokemonDetail,
  type PokemonEvolution,
  type PokemonReference,
  type PokemonSprite,
  type PokemonStat,
  type PokemonSummary,
} from './pokemon-types'

const officialArtworkBaseUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork'

const statLabels: Record<string, string> = {
  attack: 'Atk',
  defense: 'Def',
  hp: 'HP',
  'special-attack': 'Sp.Atk',
  'special-defense': 'Sp.Def',
  speed: 'Hız',
}

export function toPokemonReference(
  resource: NamedApiResource
): PokemonReference | null {
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

export function toPokemonSummary(
  response: PokemonDetailResponse
): PokemonSummary {
  const types = response.types
    .map((item) => item.type.name)
    .filter(isPokemonTypeName)

  return {
    id: response.id,
    imageUrl:
      response.sprites.other?.['official-artwork']?.front_default ??
      response.sprites.other?.home?.front_default ??
      response.sprites.front_default ??
      getPokemonArtworkUrl(response.id),
    name: response.name,
    types,
  }
}

export function toPokemonDetail(
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
