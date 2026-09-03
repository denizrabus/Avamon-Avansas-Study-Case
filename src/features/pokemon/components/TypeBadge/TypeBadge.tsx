import { type PokemonTypeName } from '../../pokemon-types'

interface TypeBadgeProps {
  type: PokemonTypeName
}

const typeLabels: Record<PokemonTypeName, string> = {
  bug: 'Bug',
  dark: 'Dark',
  dragon: 'Dragon',
  electric: 'Electric',
  fairy: 'Fairy',
  fighting: 'Fighting',
  fire: 'Fire',
  flying: 'Flying',
  ghost: 'Ghost',
  grass: 'Grass',
  ground: 'Ground',
  ice: 'Ice',
  normal: 'Normal',
  poison: 'Poison',
  psychic: 'Psychic',
  rock: 'Rock',
  steel: 'Steel',
  water: 'Water',
}

const typeClasses: Record<PokemonTypeName, string> = {
  bug: 'bg-type-bug text-white',
  dark: 'bg-type-dark text-white',
  dragon: 'bg-type-dragon text-white',
  electric: 'bg-type-electric text-ink',
  fairy: 'bg-type-fairy text-white',
  fighting: 'bg-type-fighting text-white',
  fire: 'bg-type-fire text-white',
  flying: 'bg-type-flying text-white',
  ghost: 'bg-type-ghost text-white',
  grass: 'bg-type-grass text-white',
  ground: 'bg-type-ground text-white',
  ice: 'bg-type-ice text-ink',
  normal: 'bg-type-normal text-white',
  poison: 'bg-type-poison text-white',
  psychic: 'bg-type-psychic text-white',
  rock: 'bg-type-rock text-white',
  steel: 'bg-type-steel text-white',
  water: 'bg-type-water text-white',
}

export function TypeBadge({ type }: TypeBadgeProps) {
  return (
    <span
      className={`inline-flex h-6 items-center rounded-full px-3 text-xs font-black ${typeClasses[type]}`}
    >
      {typeLabels[type]}
    </span>
  )
}
