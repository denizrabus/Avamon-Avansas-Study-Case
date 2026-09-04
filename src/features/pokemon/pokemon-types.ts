export const pokemonTypeNames = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

export type PokemonTypeName = (typeof pokemonTypeNames)[number]

export type PokemonSortOption =
  | 'number-asc'
  | 'number-desc'
  | 'name-asc'
  | 'name-desc'

export type PokemonDisplayMode = 'grid' | 'list'

export interface PokemonReference {
  id: number
  name: string
  url: string
}

export interface PokemonSummary {
  id: number
  imageUrl: string
  name: string
  types: PokemonTypeName[]
}

export interface PokemonAbility {
  isHidden: boolean
  name: string
}

export interface PokemonEvolution {
  id: number
  imageUrl: string
  name: string
}

export interface PokemonSprite {
  imageUrl: string
  label: string
}

export interface PokemonStat {
  label: string
  name: string
  value: number
}

export interface PokemonDetail extends PokemonSummary {
  abilities: PokemonAbility[]
  baseExperience: number | null
  description: string
  evolutionChain: PokemonEvolution[]
  heightInMeters: number
  sprites: PokemonSprite[]
  stats: PokemonStat[]
  weightInKilograms: number
}

export interface PokemonReferenceCollection {
  count: number
  results: PokemonReference[]
}
