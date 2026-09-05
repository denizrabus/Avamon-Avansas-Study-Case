import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { PokemonEvolutionChain } from './PokemonEvolutionChain'

describe('PokemonEvolutionChain', () => {
  it('renders evolution links', () => {
    render(
      <MemoryRouter>
        <PokemonEvolutionChain
          evolutions={[
            { id: 172, imageUrl: 'pichu.png', name: 'pichu' },
            { id: 25, imageUrl: 'pikachu.png', name: 'pikachu' },
          ]}
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('heading', { name: 'EVOLUTION CHAIN' })).toBeVisible()
    expect(screen.getByRole('link', { name: /Pikachu/i })).toHaveAttribute(
      'href',
      '/pokemon/pikachu'
    )
  })
})
