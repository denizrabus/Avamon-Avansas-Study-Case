import { describe, expect, it } from 'vitest'

import { getRandomPokemonReferences } from './home-page-utils'
import { type PokemonReference } from '../../features/pokemon/pokemon-types'

const references: PokemonReference[] = [
  { id: 1, name: 'bulbasaur', url: '/pokemon/1/' },
  { id: 2, name: 'ivysaur', url: '/pokemon/2/' },
  { id: 3, name: 'venusaur', url: '/pokemon/3/' },
  { id: 4, name: 'charmander', url: '/pokemon/4/' },
]

describe('getRandomPokemonReferences', () => {
  it('returns unique random references', () => {
    const selectedReferences = getRandomPokemonReferences(references, {
      count: 3,
      random: () => 0,
    })

    expect(selectedReferences.map((reference) => reference.id))
      .toEqual([1, 2, 3])
  })

  it('excludes provided pokemon ids', () => {
    const selectedReferences = getRandomPokemonReferences(references, {
      count: 3,
      excludeIds: [1],
      random: () => 0,
    })

    expect(selectedReferences.map((reference) => reference.id))
      .toEqual([2, 3, 4])
  })

  it('returns available references when count is larger than the list', () => {
    const selectedReferences = getRandomPokemonReferences(references.slice(0, 2), {
      count: 3,
      random: () => 0,
    })

    expect(selectedReferences).toHaveLength(2)
  })
})
