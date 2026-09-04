import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonAbilities } from './PokemonAbilities'
import { type PokemonAbility } from '../../pokemon-types'

const abilities: PokemonAbility[] = [
  { isHidden: false, name: 'overgrow' },
  { isHidden: true, name: 'chlorophyll' },
]

describe('PokemonAbilities', () => {
  it('renders visible and hidden abilities', () => {
    render(<PokemonAbilities abilities={abilities} />)

    expect(screen.getByRole('heading', { name: 'YETENEKLER' })).toBeVisible()
    expect(screen.getByText('Overgrow')).toBeVisible()
    expect(screen.getByText('Chlorophyll')).toBeVisible()
    expect(screen.getByText('Gizli')).toBeVisible()
  })
})
