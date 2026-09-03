export const routes = {
  home: '/',
  login: '/login',
  pokemonList: '/pokemon',
  pokemonDetail: (pokemonNameOrId: string) => `/pokemon/${pokemonNameOrId}`,
} as const
