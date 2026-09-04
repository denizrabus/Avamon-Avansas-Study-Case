import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonDetailStats } from './PokemonDetailStats'
import { type PokemonStat } from '../../pokemon-types'

const stats: PokemonStat[] = [
  { label: 'HP', name: 'hp', value: 35 },
  { label: 'Atk', name: 'attack', value: 55 },
  { label: 'Hız', name: 'speed', value: 90 },
]

describe('PokemonDetailStats', () => {
  it('renders stat bars with a computed total', () => {
    render(<PokemonDetailStats stats={stats} />)

    expect(
      screen.getByRole('heading', { name: 'TEMEL İSTATİSTİKLER' })
    ).toBeVisible()
    expect(screen.getByLabelText('HP: 35')).toBeVisible()
    expect(screen.getByLabelText('Toplam: 180')).toBeVisible()
  })
})
