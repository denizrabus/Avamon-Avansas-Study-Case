import { createListenerMiddleware } from '@reduxjs/toolkit'

import { loginSucceeded, logout } from '../features/auth/auth-slice'
import { clearAuthSession, saveAuthSession } from '../features/auth/auth-storage'
import {
  displayModeChanged,
  recentlyVisitedIdsChanged,
} from '../features/pokemon/pokemon-preferences-slice'
import {
  savePokemonDisplayMode,
  saveRecentlyVisitedPokemonIds,
} from '../features/pokemon/pokemon-preferences-storage'

export const persistenceListenerMiddleware = createListenerMiddleware()

persistenceListenerMiddleware.startListening({
  actionCreator: loginSucceeded,
  effect: (action) => {
    saveAuthSession(action.payload)
  },
})

persistenceListenerMiddleware.startListening({
  actionCreator: logout,
  effect: () => {
    clearAuthSession()
  },
})

persistenceListenerMiddleware.startListening({
  actionCreator: displayModeChanged,
  effect: (action) => {
    savePokemonDisplayMode(action.payload)
  },
})

persistenceListenerMiddleware.startListening({
  actionCreator: recentlyVisitedIdsChanged,
  effect: (action) => {
    saveRecentlyVisitedPokemonIds(action.payload)
  },
})
