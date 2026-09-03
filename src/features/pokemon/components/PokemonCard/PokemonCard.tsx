import { Link } from 'react-router-dom'

import { TypeBadge } from '../TypeBadge'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { type PokemonSummary, type PokemonTypeName } from '../../pokemon-types'

interface PokemonCardProps {
  pokemon: PokemonSummary
}

const cardBackgroundClasses: Record<PokemonTypeName, string> = {
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

export function PokemonCard({ pokemon }: PokemonCardProps) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <Link
      className="group overflow-hidden rounded-card bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red"
      to={`/pokemon/${pokemon.name}`}
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-surface p-8">
        <img
          alt={formatPokemonName(pokemon.name)}
          className="h-full max-h-56 w-full object-contain drop-shadow-xl transition group-hover:scale-105"
          src={pokemon.imageUrl}
        />
      </div>

      <div className={`px-5 py-4 text-center ${cardBackgroundClasses[primaryType]}`}>
        <p className="text-sm font-black text-muted">
          {formatPokemonNumber(pokemon.id)}
        </p>
        <h2 className="mt-1 text-lg font-black text-ink">
          {formatPokemonName(pokemon.name)}
        </h2>
        <div className="mt-3 flex flex-wrap justify-center gap-1.5">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  )
}
