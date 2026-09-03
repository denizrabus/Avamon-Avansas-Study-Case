import { describe, expect, it } from 'vitest'

import { authReducer, loginSucceeded, logout } from './auth-slice'

describe('authSlice', () => {
  it('starts without an authenticated user', () => {
    const state = authReducer(undefined, { type: 'unknown' })

    expect(state.currentUser).toBeNull()
    expect(state.token).toBeNull()
  })

  it('stores the authenticated session after login', () => {
    const state = authReducer(
      undefined,
      loginSucceeded({
        token: 'mock-token-guven',
        user: {
          avatarPokemonId: 25,
          fullName: 'Güven Altuntaş',
          username: 'guven',
        },
      })
    )

    expect(state.currentUser?.username).toBe('guven')
    expect(state.token).toBe('mock-token-guven')
  })

  it('clears the authenticated user after logout', () => {
    const loggedInState = authReducer(
      undefined,
      loginSucceeded({
        token: 'mock-token-guven',
        user: {
          avatarPokemonId: 25,
          fullName: 'Güven Altuntaş',
          username: 'guven',
        },
      })
    )

    const loggedOutState = authReducer(loggedInState, logout())

    expect(loggedOutState.currentUser).toBeNull()
    expect(loggedOutState.token).toBeNull()
  })
})
