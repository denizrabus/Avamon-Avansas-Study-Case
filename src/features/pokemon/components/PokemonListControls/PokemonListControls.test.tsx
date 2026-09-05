import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PokemonListControls } from './PokemonListControls'

describe('PokemonListControls', () => {
  it('notifies parent when filter, sort, and display mode change', async () => {
    const user = userEvent.setup()
    const handleDisplayModeChange = vi.fn()
    const handleSortChange = vi.fn()
    const handleTypeChange = vi.fn()

    render(
      <PokemonListControls
        displayMode="grid"
        onDisplayModeChange={handleDisplayModeChange}
        onSortChange={handleSortChange}
        onTypeChange={handleTypeChange}
        sortOption="number-asc"
        typeFilter={null}
      />
    )

    await user.click(screen.getByRole('combobox', { name: 'Type filter' }))
    await user.click(screen.getByText('Fire'))

    await user.click(screen.getByRole('combobox', { name: 'Sort order' }))
    await user.click(screen.getByText('Name: Z - A'))

    await user.click(screen.getByRole('button', { name: 'List view' }))

    expect(handleTypeChange).toHaveBeenCalledWith('fire')
    expect(handleSortChange).toHaveBeenCalledWith('name-desc')
    expect(handleDisplayModeChange).toHaveBeenCalledWith('list')
  })
})
