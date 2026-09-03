import { describe, expect, it } from 'vitest'

import {
  clampPage,
  formatPokemonName,
  formatPokemonNumber,
  getPokemonTotalPages,
  paginatePokemonReferences,
  parsePage,
  parsePokemonIdFromUrl,
  parseSortOption,
  parseTypeFilter,
  sortPokemonReferences,
} from './pokemon-list-utils'
import { type PokemonReference } from './pokemon-types'

const references: PokemonReference[] = [
  { id: 4, name: 'charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  { id: 1, name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
  { id: 7, name: 'squirtle', url: 'https://pokeapi.co/api/v2/pokemon/7/' },
]

describe('pokemon list utils', () => {
  it('formats pokemon number and name for display', () => {
    expect(formatPokemonNumber(25)).toBe('#0025')
    expect(formatPokemonName('pikachu-rock-star')).toBe('Pikachu-Rock-Star')
  })

  it('parses pokemon id from PokeAPI urls', () => {
    expect(parsePokemonIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(
      25
    )
    expect(parsePokemonIdFromUrl('https://pokeapi.co/api/v2/type/fire/')).toBeNull()
  })

  it('normalizes URL params', () => {
    expect(parsePage('3')).toBe(3)
    expect(parsePage('-1')).toBe(1)
    expect(parseSortOption('name-desc')).toBe('name-desc')
    expect(parseSortOption('unknown')).toBe('number-asc')
    expect(parseTypeFilter('fire')).toBe('fire')
    expect(parseTypeFilter('thunder')).toBeNull()
  })

  it('sorts pokemon references by selected option', () => {
    expect(sortPokemonReferences(references, 'number-asc').map((item) => item.id))
      .toEqual([1, 4, 7])
    expect(sortPokemonReferences(references, 'number-desc').map((item) => item.id))
      .toEqual([7, 4, 1])
    expect(sortPokemonReferences(references, 'name-asc').map((item) => item.name))
      .toEqual(['bulbasaur', 'charmander', 'squirtle'])
  })

  it('paginates and clamps page values', () => {
    expect(paginatePokemonReferences(references, 2, 2).map((item) => item.id))
      .toEqual([7])
    expect(getPokemonTotalPages(49, 24)).toBe(3)
    expect(clampPage(5, 3)).toBe(3)
    expect(clampPage(0, 3)).toBe(1)
  })
})
