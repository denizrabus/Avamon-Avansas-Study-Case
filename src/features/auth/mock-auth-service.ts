import { type AuthSession, type LoginCredentials } from './auth-types'
import { createMockAuthToken, getPublicUser } from './auth-utils'
import { demoUsers } from './demo-users'

export function loginWithCredentials({
  password,
  username,
}: LoginCredentials): AuthSession | null {
  const normalizedUsername = username.trim().toLowerCase()
  const normalizedPassword = password.trim()

  const matchingUser = demoUsers.find(
    (user) =>
      user.username.toLowerCase() === normalizedUsername &&
      user.password === normalizedPassword
  )

  if (!matchingUser) {
    return null
  }

  return {
    token: createMockAuthToken({ password, username }),
    user: getPublicUser(matchingUser),
  }
}
