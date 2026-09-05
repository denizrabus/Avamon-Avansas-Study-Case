import { configureStore } from '@reduxjs/toolkit'

import { persistenceListenerMiddleware } from './persistence-listener'
import { authReducer } from '../features/auth/auth-slice'
import { pokemonPreferencesReducer } from '../features/pokemon/pokemon-preferences-slice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    pokemonPreferences: pokemonPreferencesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(persistenceListenerMiddleware.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
