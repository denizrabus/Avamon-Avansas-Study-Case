import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
  it('accepts typed text', async () => {
    const user = userEvent.setup()

    render(<Input aria-label="Username" />)

    await user.type(screen.getByLabelText('Username'), 'guven')

    expect(screen.getByLabelText('Username')).toHaveValue('guven')
  })

  it('marks the input as invalid when invalid is true', () => {
    render(<Input aria-label="Password" invalid />)

    expect(screen.getByLabelText('Password')).toHaveAttribute('aria-invalid', 'true')
  })
})
