export interface NamedApiResource {
  name: string
  url: string
}

export interface PokemonListResponse {
  count: number
  results: NamedApiResource[]
}

export interface PokemonTypeResponse {
  pokemon: Array<{
    pokemon: NamedApiResource
  }>
}

export interface PokemonDetailResponse {
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

export interface PokemonSpeciesResponse {
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

export interface PokemonEvolutionChainResponse {
  chain: PokemonEvolutionChainNode
}

export interface PokemonEvolutionChainNode {
  evolves_to: PokemonEvolutionChainNode[]
  species: NamedApiResource
}
