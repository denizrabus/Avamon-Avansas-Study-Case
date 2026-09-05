import {
  pokemonTypeBadgeClasses,
  pokemonTypeLabels,
} from '../../pokemon-type-styles'
import { type PokemonTypeName } from '../../pokemon-types'

interface TypeBadgeProps {
  type: PokemonTypeName
  size?: 'default' | 'compact'
}

const sizeClasses = {
  default: 'h-6 px-3 text-xs',
  compact: 'h-5 px-2.5 text-[11px]',
}

export function TypeBadge({ type, size = 'default' }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full font-black ${sizeClasses[size]} ${pokemonTypeBadgeClasses[type]}`}
    >
      {pokemonTypeLabels[type]}
    </span>
  )
}
