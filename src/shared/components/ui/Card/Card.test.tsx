import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { Card } from './Card'

describe('Card', () => {
  it('renders children inside a section', () => {
    render(<Card>Bulbasaur</Card>)

    expect(screen.getByText('Bulbasaur')).toBeVisible()
  })

  it('renders a title when provided', () => {
    render(<Card title="Popular Pokemon">Charmander</Card>)

    expect(screen.getByRole('heading', { name: 'Popular Pokemon' })).toBeVisible()
  })
})
