import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { PokemonCard } from './PokemonCard'

describe('PokemonCard', () => {
  it('renders pokemon summary and links to detail page', () => {
    render(
      <MemoryRouter>
        <PokemonCard
          pokemon={{
            id: 25,
            imageUrl: 'https://example.com/pikachu.png',
            name: 'pikachu',
            types: ['electric'],
          }}
        />
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: /Pikachu/i })).toHaveAttribute(
      'href',
      '/pokemon/pikachu'
    )
    expect(screen.getByText('#0025')).toBeVisible()
    expect(screen.getByText('Electric')).toBeVisible()
  })
})
