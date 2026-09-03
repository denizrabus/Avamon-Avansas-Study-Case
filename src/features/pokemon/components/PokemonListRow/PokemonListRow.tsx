import { Link } from 'react-router-dom'

import { TypeBadge } from '../TypeBadge'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { type PokemonSummary, type PokemonTypeName } from '../../pokemon-types'

interface PokemonListRowProps {
  pokemon: PokemonSummary
}

const rowBackgroundClasses: Record<PokemonTypeName, string> = {
  bug: 'bg-type-bug-soft',
  dark: 'bg-surface',
  dragon: 'bg-surface',
  electric: 'bg-type-electric-soft',
  fairy: 'bg-type-fairy-soft',
  fighting: 'bg-surface',
  fire: 'bg-type-fire-soft',
  flying: 'bg-surface',
  ghost: 'bg-surface',
  grass: 'bg-type-grass-soft',
  ground: 'bg-surface',
  ice: 'bg-type-ice-soft',
  normal: 'bg-surface',
  poison: 'bg-type-poison-soft',
  psychic: 'bg-surface',
  rock: 'bg-surface',
  steel: 'bg-surface',
  water: 'bg-type-water-soft',
}

export function PokemonListRow({ pokemon }: PokemonListRowProps) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <Link
      className={`grid min-h-24 grid-cols-[4rem_4.5rem_1fr] items-center gap-4 rounded-card px-5 py-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red phone-lg:grid-cols-[5rem_5rem_1fr_auto] ${rowBackgroundClasses[primaryType]}`}
      to={`/pokemon/${pokemon.name}`}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-surface/80">
        <img
          alt={formatPokemonName(pokemon.name)}
          className="size-14 object-contain"
          src={pokemon.imageUrl}
        />
      </span>
      <span className="text-sm font-black text-muted">
        {formatPokemonNumber(pokemon.id)}
      </span>
      <span className="text-base font-black text-ink">
        {formatPokemonName(pokemon.name)}
      </span>
      <span className="col-span-3 flex flex-wrap justify-end gap-1.5 phone-lg:col-span-1">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </span>
    </Link>
  )
}
