import { describe, expect, it } from 'vitest'

import { createMockAuthToken, getPublicUser } from './auth-utils'
import { demoUsers } from './demo-users'

describe('getPublicUser', () => {
  it('returns user information without exposing the password', () => {
    const user = getPublicUser(demoUsers[0])

    expect(user).toEqual({
      avatarPokemonId: 25,
      fullName: 'Güven Altuntaş',
      username: 'guven',
    })
  })
})

describe('createMockAuthToken', () => {
  it('creates a stable mock token for the username', () => {
    const token = createMockAuthToken({
      username: 'guven',
      password: 'altuntas',
    })

    expect(token).toBe('mock-token-guven')
  })
})
