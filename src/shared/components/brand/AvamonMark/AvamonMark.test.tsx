import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AvamonMark } from './AvamonMark'

describe('AvamonMark', () => {
  it('renders as a decorative brand mark', () => {
    render(
      <div data-testid="brand-mark">
        <AvamonMark className="size-5 text-avamon-yellow" />
      </div>
    )

    expect(screen.getByTestId('brand-mark').querySelector('svg')).toBeVisible()
    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })
})
