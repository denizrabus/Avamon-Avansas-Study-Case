import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormField } from './FormField'
import { Input } from '../Input'

describe('FormField', () => {
  it('renders a label connected to the input', () => {
    render(
      <FormField label="Kullanıcı Adı" htmlFor="username">
        <Input id="username" />
      </FormField>
    )

    expect(screen.getByLabelText('Kullanıcı Adı')).toBeVisible()
  })

  it('renders helper and error messages', () => {
    render(
      <FormField
        error="Kullanıcı adı zorunludur"
        helperText="Demo kullanıcı seçebilirsin"
        htmlFor="username"
        label="Kullanıcı Adı"
      >
        <Input id="username" invalid />
      </FormField>
    )

    expect(screen.getByText('Demo kullanıcı seçebilirsin')).toBeVisible()
    expect(screen.getByText('Kullanıcı adı zorunludur')).toBeVisible()
  })
})
