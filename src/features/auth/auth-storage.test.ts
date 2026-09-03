import { afterEach, describe, expect, it } from 'vitest'

import {
  clearAuthSession,
  loadAuthSession,
  saveAuthSession,
} from './auth-storage'

describe('authStorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('saves and loads the auth session', () => {
    saveAuthSession({
      token: 'mock-token-guven',
      user: {
        avatarPokemonId: 25,
        fullName: 'Güven Altuntaş',
        username: 'guven',
      },
    })

    expect(loadAuthSession()).toEqual({
      token: 'mock-token-guven',
      user: {
        avatarPokemonId: 25,
        fullName: 'Güven Altuntaş',
        username: 'guven',
      },
    })
  })

  it('clears the auth session', () => {
    saveAuthSession({
      token: 'mock-token-guven',
      user: {
        avatarPokemonId: 25,
        fullName: 'Güven Altuntaş',
        username: 'guven',
      },
    })

    clearAuthSession()

    expect(loadAuthSession()).toBeNull()
  })
})
