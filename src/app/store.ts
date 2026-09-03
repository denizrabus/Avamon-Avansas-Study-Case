import { configureStore } from '@reduxjs/toolkit'

import { appReducer } from './app-slice'
import { authReducer } from '../features/auth/auth-slice'
import { pokemonPreferencesReducer } from '../features/pokemon/pokemon-preferences-slice'

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    pokemonPreferences: pokemonPreferencesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
