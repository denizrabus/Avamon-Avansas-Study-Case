import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { loadAuthSession } from './auth-storage'
import { type AuthenticatedUser, type AuthSession } from './auth-types'

interface AuthState {
  currentUser: AuthenticatedUser | null
  token: string | null
}

const storedSession = loadAuthSession()

const initialState: AuthState = {
  currentUser: storedSession?.user ?? null,
  token: storedSession?.token ?? null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSucceeded(state, action: PayloadAction<AuthSession>) {
      state.currentUser = action.payload.user
      state.token = action.payload.token
    },
    logout(state) {
      state.currentUser = null
      state.token = null
    },
  },
})

export const authReducer = authSlice.reducer
export const { loginSucceeded, logout } = authSlice.actions
