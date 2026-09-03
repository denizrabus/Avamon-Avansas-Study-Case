import { describe, expect, it } from 'vitest'

import { loginWithCredentials } from './mock-auth-service'

describe('loginWithCredentials', () => {
  it('returns a mock auth session for valid credentials', () => {
    const session = loginWithCredentials({
      password: 'altuntas',
      username: 'guven',
    })

    expect(session).toEqual({
      token: 'mock-token-guven',
      user: {
        avatarPokemonId: 25,
        fullName: 'Güven Altuntaş',
        username: 'guven',
      },
    })
  })

  it('returns null for invalid credentials', () => {
    const session = loginWithCredentials({
      password: 'wrong-password',
      username: 'guven',
    })

    expect(session).toBeNull()
  })
})
