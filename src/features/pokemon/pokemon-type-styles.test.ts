import { describe, expect, it } from 'vitest'

import {
  pokemonTypeBadgeClasses,
  pokemonTypeCardGradientClasses,
  pokemonTypeLabels,
  pokemonTypeRowBackgroundClasses,
} from './pokemon-type-styles'
import { pokemonTypeNames } from './pokemon-types'

describe('pokemon type styles', () => {
  it('defines label and style classes for every pokemon type', () => {
    pokemonTypeNames.forEach((type) => {
      expect(pokemonTypeLabels[type]).toBeTruthy()
      expect(pokemonTypeBadgeClasses[type]).toBeTruthy()
      expect(pokemonTypeCardGradientClasses[type]).toBeTruthy()
      expect(pokemonTypeRowBackgroundClasses[type]).toBeTruthy()
    })
  })
})
