interface AppHeaderUserAvatarProps {
  avatarPokemonId: number
}

export function AppHeaderUserAvatar({
  avatarPokemonId,
}: AppHeaderUserAvatarProps) {
  return (
    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-avamon-yellow bg-avamon-yellow/20">
      <img
        alt=""
        className="size-6"
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${avatarPokemonId}.png`}
      />
    </span>
  )
}
