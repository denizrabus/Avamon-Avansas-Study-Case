import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { PokemonSprites } from './PokemonSprites'

describe('PokemonSprites', () => {
  it('renders available sprite images', () => {
    render(
      <PokemonSprites
        sprites={[
          { imageUrl: 'front.png', label: 'Ön' },
          { imageUrl: 'back.png', label: 'Arka' },
        ]}
      />
    )

    expect(screen.getByRole('heading', { name: /görünümler/i })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Ön' })).toBeVisible()
    expect(screen.getByRole('img', { name: 'Arka' })).toBeVisible()
  })
})
