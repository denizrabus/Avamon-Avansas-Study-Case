export interface AuthenticatedUser {
  avatarPokemonId: number
  fullName: string
  username: string
}

export interface AuthSession {
  token: string
  user: AuthenticatedUser
}

export interface DemoUser extends AuthenticatedUser {
  password: string
}

export interface LoginCredentials {
  password: string
  username: string
}
