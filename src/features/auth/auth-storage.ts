import { type AuthSession } from './auth-types'

const authSessionKey = 'avamon.auth-session'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function loadAuthSession(): AuthSession | null {
  if (!canUseStorage()) {
    return null
  }

  const rawValue = window.localStorage.getItem(authSessionKey)

  if (!rawValue) {
    return null
  }

  try {
    return JSON.parse(rawValue) as AuthSession
  } catch {
    window.localStorage.removeItem(authSessionKey)
    return null
  }
}

export function saveAuthSession(session: AuthSession) {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(authSessionKey, JSON.stringify(session))
}

export function clearAuthSession() {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(authSessionKey)
}
