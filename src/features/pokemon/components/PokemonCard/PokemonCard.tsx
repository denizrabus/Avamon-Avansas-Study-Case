import { Link } from 'react-router-dom'

import { PokemonImage } from '../PokemonImage'
import { TypeBadge } from '../TypeBadge'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { type PokemonSummary, type PokemonTypeName } from '../../pokemon-types'

interface PokemonCardProps {
  pokemon: PokemonSummary
  priority?: boolean
}

const cardBackgroundClasses: Record<PokemonTypeName, string> = {
  bug: 'from-white to-type-bug-soft',
  dark: 'from-white to-type-dark-soft',
  dragon: 'from-white to-type-dragon-soft',
  electric: 'from-white to-type-electric-soft',
  fairy: 'from-white to-type-fairy-soft',
  fighting: 'from-white to-type-fighting-soft',
  fire: 'from-white to-type-fire-soft',
  flying: 'from-white to-type-flying-soft',
  ghost: 'from-white to-type-ghost-soft',
  grass: 'from-white to-type-grass-soft',
  ground: 'from-white to-type-ground-soft',
  ice: 'from-white to-type-ice-soft',
  normal: 'from-white to-type-normal-soft',
  poison: 'from-white to-type-poison-soft',
  psychic: 'from-white to-type-psychic-soft',
  rock: 'from-white to-type-rock-soft',
  steel: 'from-white to-type-steel-soft',
  water: 'from-white to-type-water-soft',
}

export function PokemonCard({ pokemon, priority = false }: PokemonCardProps) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <Link
      className="group flex h-full min-h-[20rem] flex-col overflow-hidden rounded-card bg-surface shadow-card transition hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red"
      to={`/pokemon/${pokemon.name}`}
    >
      <div className="flex aspect-[4/3] shrink-0 items-center justify-center bg-gradient-to-b from-white to-[#f6f6f6]">
        <PokemonImage
          alt={formatPokemonName(pokemon.name)}
          className="h-full w-full"
          fallbackClassName="desktop:size-18 wide:size-24"
          imageClassName="h-full max-h-56 w-full object-contain p-7 transition group-hover:scale-105 desktop:p-6 wide:p-8"
          priority={priority}
          src={pokemon.imageUrl}
        />
      </div>

      <div
        className={`flex min-h-32 flex-1 flex-col items-center bg-gradient-to-r px-5 py-4 text-center ${cardBackgroundClasses[primaryType]}`}
      >
        <p className="text-sm font-black text-muted">
          {formatPokemonNumber(pokemon.id)}
        </p>
        <h2 className="mt-1 grid min-h-14 place-items-center text-lg font-black leading-tight text-ink">
          <span className="overflow-hidden [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
            {formatPokemonName(pokemon.name)}
          </span>
        </h2>
        <div className="mt-auto flex min-h-6 justify-center gap-1.5">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>
      </div>
    </Link>
  )
}
