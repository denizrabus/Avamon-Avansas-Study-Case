import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonDetailHero } from './PokemonDetailHero'
import { type PokemonDetail } from '../../pokemon-types'

const pikachu: PokemonDetail = {
  abilities: [],
  baseExperience: 112,
  description: 'Electric mouse Pokemon.',
  evolutionChain: [],
  heightInMeters: 0.4,
  id: 25,
  imageUrl: 'pikachu.png',
  name: 'pikachu',
  sprites: [],
  stats: [],
  types: ['electric'],
  weightInKilograms: 6,
}

describe('PokemonDetailHero', () => {
  it('renders core pokemon identity and measurements', () => {
    render(<PokemonDetailHero pokemon={pikachu} />)

    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeVisible()
    expect(screen.getByText('#0025')).toBeVisible()
    expect(screen.getByText('Electric')).toBeVisible()
    expect(screen.getByText('0.4 m')).toBeVisible()
    expect(screen.getByText('6.0 kg')).toBeVisible()
    expect(screen.getByText('112')).toBeVisible()
  })
})
