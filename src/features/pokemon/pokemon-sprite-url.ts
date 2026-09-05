const pokemonSpriteBaseUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

export function getPokemonSpriteUrl(id: number) {
  return `${pokemonSpriteBaseUrl}/${id}.png`
}
