import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { FormField } from './FormField'
import { Input } from '../Input'

describe('FormField', () => {
  it('renders a label connected to the input', () => {
    render(
      <FormField label="Username" htmlFor="username">
        <Input id="username" />
      </FormField>
    )

    expect(screen.getByLabelText('Username')).toBeVisible()
  })

  it('renders helper and error messages', () => {
    render(
      <FormField
        error="Username is required"
        helperText="You can select a demo user"
        htmlFor="username"
        label="Username"
      >
        <Input id="username" invalid />
      </FormField>
    )

    expect(screen.getByText('You can select a demo user')).toBeVisible()
    expect(screen.getByText('Username is required')).toBeVisible()
  })
})
