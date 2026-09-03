import { describe, expect, it } from 'vitest'

import { routes } from './routes'

describe('routes', () => {
  it('builds a pokemon detail path from name or id', () => {
    expect(routes.pokemonDetail('pikachu')).toBe('/pokemon/pikachu')
    expect(routes.pokemonDetail('25')).toBe('/pokemon/25')
  })
})
