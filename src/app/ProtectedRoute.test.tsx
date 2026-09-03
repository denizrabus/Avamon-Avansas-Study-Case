import { configureStore } from '@reduxjs/toolkit'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { ProtectedRoute } from './ProtectedRoute'
import { authReducer } from '../features/auth/auth-slice'

function renderProtectedRoute(authState: ReturnType<typeof authReducer>) {
  const store = configureStore({
    preloadedState: {
      auth: authState,
    },
    reducer: {
      auth: authReducer,
    },
  })

  render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/pokemon/pikachu']}>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <h1>Pikachu</h1>
              </ProtectedRoute>
            }
            path="/pokemon/:pokemonNameOrId"
          />
          <Route element={<h1>Login</h1>} path="/login" />
        </Routes>
      </MemoryRouter>
    </Provider>
  )
}

describe('ProtectedRoute', () => {
  it('redirects visitors to login', () => {
    renderProtectedRoute({
      currentUser: null,
      token: null,
    })

    expect(screen.getByRole('heading', { name: 'Login' })).toBeVisible()
  })

  it('renders children for authenticated users', () => {
    renderProtectedRoute({
      currentUser: {
        avatarPokemonId: 25,
        fullName: 'Güven Altuntaş',
        username: 'guven',
      },
      token: 'mock-token-guven',
    })

    expect(screen.getByRole('heading', { name: 'Pikachu' })).toBeVisible()
  })
})
