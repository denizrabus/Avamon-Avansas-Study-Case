import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'

import { Button, ButtonLink } from './Button'

describe('Button', () => {
  it('renders an accessible button with content', () => {
    render(<Button>Login</Button>)

    expect(screen.getByRole('button', { name: 'Login' })).toBeVisible()
  })

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>All Pokemon</Button>)

    await user.click(screen.getByRole('button', { name: 'All Pokemon' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Save
      </Button>
    )

    await user.click(screen.getByRole('button', { name: 'Save' }))

    expect(handleClick).not.toHaveBeenCalled()
  })

  it('renders a link with button styles for navigation actions', () => {
    render(
      <MemoryRouter>
        <ButtonLink to="/pokemon">All Pokémon</ButtonLink>
      </MemoryRouter>
    )

    expect(screen.getByRole('link', { name: 'All Pokémon' }))
      .toHaveAttribute('href', '/pokemon')
  })
})
