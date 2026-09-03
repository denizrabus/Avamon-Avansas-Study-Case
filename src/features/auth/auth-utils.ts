import {
  type AuthenticatedUser,
  type DemoUser,
  type LoginCredentials,
} from './auth-types'

export function getPublicUser(user: DemoUser): AuthenticatedUser {
  return {
    avatarPokemonId: user.avatarPokemonId,
    fullName: user.fullName,
    username: user.username,
  }
}

export function createMockAuthToken({ username }: LoginCredentials) {
  return `mock-token-${username.trim().toLowerCase()}`
}
