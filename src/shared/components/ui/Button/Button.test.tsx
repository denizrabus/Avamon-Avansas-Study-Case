import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { Button } from './Button'

describe('Button', () => {
  it('renders an accessible button with content', () => {
    render(<Button>Giriş Yap</Button>)

    expect(screen.getByRole('button', { name: 'Giriş Yap' })).toBeVisible()
  })

  it('calls onClick when enabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button onClick={handleClick}>Tüm Pokemon</Button>)

    await user.click(screen.getByRole('button', { name: 'Tüm Pokemon' }))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('does not call onClick when disabled', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(
      <Button disabled onClick={handleClick}>
        Kaydet
      </Button>
    )

    await user.click(screen.getByRole('button', { name: 'Kaydet' }))

    expect(handleClick).not.toHaveBeenCalled()
  })
})
