import { useQuery } from '@tanstack/react-query'

interface PokemonSpriteResponse {
  sprites?: {
    front_default?: string | null
  }
}

function getFallbackSpriteUrl(pokemonId: number) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`
}

async function fetchPokemonSprite(pokemonId: number) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)

  if (!response.ok) {
    throw new Error('Pokemon avatarı yüklenemedi')
  }

  const data = (await response.json()) as PokemonSpriteResponse

  return data.sprites?.front_default ?? getFallbackSpriteUrl(pokemonId)
}

export function useDemoUserAvatar(pokemonId: number) {
  return useQuery({
    queryFn: () => fetchPokemonSprite(pokemonId),
    queryKey: ['demo-user-avatar', pokemonId],
  })
}

export { getFallbackSpriteUrl }
