import {
  pokemonTypeBadgeClasses,
  pokemonTypeLabels,
} from '../../pokemon-type-styles'
import { type PokemonTypeName } from '../../pokemon-types'

interface TypeBadgeProps {
  type: PokemonTypeName
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-3 text-xs font-black ${pokemonTypeBadgeClasses[type]}`}
    >
      {pokemonTypeLabels[type]}
    </span>
  )
}
