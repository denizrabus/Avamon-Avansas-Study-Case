import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { TypeBadge } from './TypeBadge'

describe('TypeBadge', () => {
  it('renders the formatted type label', () => {
    render(<TypeBadge type="electric" />)

    expect(screen.getByText('Electric')).toBeVisible()
  })
})
