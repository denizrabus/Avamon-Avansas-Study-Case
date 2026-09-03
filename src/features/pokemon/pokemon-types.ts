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

export interface PokemonReferenceCollection {
  count: number
  results: PokemonReference[]
}
