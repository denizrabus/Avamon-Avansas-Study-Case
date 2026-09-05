import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonImage } from './PokemonImage'

describe('PokemonImage', () => {
  it('renders a lazy image with async decoding', () => {
    render(<PokemonImage alt="Pikachu" src="https://example.com/pikachu.png" />)

    const image = screen.getByRole('img', { name: 'Pikachu' })

    expect(image).toHaveAttribute('loading', 'lazy')
    expect(image).toHaveAttribute('decoding', 'async')
  })

  it('can prioritize images that are visible above the fold', () => {
    render(
      <PokemonImage alt="Pikachu" priority src="https://example.com/pikachu.png" />
    )

    const image = screen.getByRole('img', { name: 'Pikachu' })

    expect(image).toHaveAttribute('loading', 'eager')
    expect(image).toHaveAttribute('fetchpriority', 'high')
  })

  it('renders a fallback when image loading fails', () => {
    render(<PokemonImage alt="Missingno" src="https://example.com/missing.png" />)

    fireEvent.error(screen.getByRole('img', { name: 'Missingno' }))

    expect(
      screen.getByRole('img', { name: 'Missingno image not available' })
    ).toBeVisible()
  })
})
