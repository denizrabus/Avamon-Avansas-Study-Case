import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { SelectInput, type SelectInputOption } from './SelectInput'

type SortValue = 'name-asc' | 'number-asc' | 'number-desc'

const options: Array<SelectInputOption<SortValue>> = [
  { label: 'Numara: Artan', value: 'number-asc' },
  { label: 'Numara: Azalan', value: 'number-desc' },
  { label: 'İsim: A - Z', value: 'name-asc' },
]

describe('SelectInput', () => {
  it('does not render a dropdown indicator for header search variant', () => {
    const { container } = render(
      <SelectInput<SortValue>
        ariaLabel="Pokémon ara"
        isSearchable
        onChange={vi.fn()}
        options={options}
        value={null}
        variant="header"
      />
    )

    expect(container.querySelector('svg')).not.toBeInTheDocument()
  })

  it('renders the selected option and notifies parent on change', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <SelectInput<SortValue>
        ariaLabel="Sıralama"
        onChange={handleChange}
        options={options}
        value="number-asc"
      />
    )

    expect(screen.getByText('Numara: Artan')).toBeVisible()

    await user.click(screen.getByRole('combobox', { name: 'Sıralama' }))
    await user.click(screen.getByText('İsim: A - Z'))

    expect(handleChange).toHaveBeenCalledWith('name-asc')
  })
})
