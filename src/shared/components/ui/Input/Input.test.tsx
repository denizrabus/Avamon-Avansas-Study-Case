import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { Input } from './Input'

describe('Input', () => {
  it('accepts typed text', async () => {
    const user = userEvent.setup()

    render(<Input aria-label="Kullanıcı Adı" />)

    await user.type(screen.getByLabelText('Kullanıcı Adı'), 'guven')

    expect(screen.getByLabelText('Kullanıcı Adı')).toHaveValue('guven')
  })

  it('marks the input as invalid when invalid is true', () => {
    render(<Input aria-label="Şifre" invalid />)

    expect(screen.getByLabelText('Şifre')).toHaveAttribute('aria-invalid', 'true')
  })
})
