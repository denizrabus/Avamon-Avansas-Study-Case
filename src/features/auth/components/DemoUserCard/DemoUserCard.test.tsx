import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'

import { DemoUserCard } from './DemoUserCard'
import { demoUsers } from '../../demo-users'

function renderDemoUserCard(onSelect = vi.fn()) {
  render(<DemoUserCard onSelect={onSelect} user={demoUsers[0]} />)
}

describe('DemoUserCard', () => {
  it('renders demo user identity and credentials', () => {
    renderDemoUserCard()

    expect(screen.getByRole('button', { name: /Güven Altuntaş/i })).toBeVisible()
    expect(screen.getByText('guven / altuntas')).toBeVisible()
  })

  it('calls onSelect with the selected user', async () => {
    const user = userEvent.setup()
    const handleSelect = vi.fn()

    renderDemoUserCard(handleSelect)

    await user.click(screen.getByRole('button', { name: /Güven Altuntaş/i }))

    expect(handleSelect).toHaveBeenCalledWith(demoUsers[0])
  })
})
