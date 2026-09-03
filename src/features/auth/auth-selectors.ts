import { type RootState } from '../../app/store'

export function selectCurrentUser(state: RootState) {
  return state.auth.currentUser
}

export function selectAuthToken(state: RootState) {
  return state.auth.token
}

export function selectIsAuthenticated(state: RootState) {
  return Boolean(state.auth.token && state.auth.currentUser)
}
