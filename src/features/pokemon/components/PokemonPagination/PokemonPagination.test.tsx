import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { PokemonPagination } from './PokemonPagination'
import { getPaginationItems } from './pokemon-pagination-utils'

describe('PokemonPagination', () => {
  it('builds compact pagination items', () => {
    expect(getPaginationItems(1, 3)).toEqual([1, 2, 3])
    expect(getPaginationItems(3, 55)).toEqual([1, 2, 3, 'ellipsis', 55])
    expect(getPaginationItems(55, 55)).toEqual([1, 'ellipsis', 53, 54, 55])
  })

  it('notifies parent when a page button is selected', async () => {
    const user = userEvent.setup()
    const handlePageChange = vi.fn()

    render(
      <PokemonPagination
        currentPage={1}
        onPageChange={handlePageChange}
        totalPages={3}
      />
    )

    await user.click(screen.getByRole('button', { name: '2' }))

    expect(handlePageChange).toHaveBeenCalledWith(2)
  })
})
