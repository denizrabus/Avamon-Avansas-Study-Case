import { Link } from 'react-router-dom'

import { PokemonImage } from '../PokemonImage'
import { TypeBadge } from '../TypeBadge'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { pokemonTypeRowBackgroundClasses } from '../../pokemon-type-styles'
import { type PokemonSummary } from '../../pokemon-types'

interface PokemonListRowProps {
  pokemon: PokemonSummary
}

export function PokemonListRow({ pokemon }: PokemonListRowProps) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <Link
      className={`grid min-h-20 grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-3 rounded-card px-3 py-2.5 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red tablet:grid-cols-[4rem_5rem_minmax(0,1fr)_auto] tablet:px-4 tablet:py-3 ${pokemonTypeRowBackgroundClasses[primaryType]}`}
      to={`/pokemon/${pokemon.name}`}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-surface/80 tablet:size-14">
        <PokemonImage
          alt={formatPokemonName(pokemon.name)}
          className="size-11 rounded-full tablet:size-12"
          fallbackClassName="size-8"
          imageClassName="size-11 object-contain tablet:size-12"
          src={pokemon.imageUrl}
        />
      </span>
      <span className="min-w-0 tablet:contents">
        <span className="block text-xs font-black text-muted tablet:text-sm">
          {formatPokemonNumber(pokemon.id)}
        </span>
        <span className="mt-1 block truncate text-sm font-black leading-tight text-ink tablet:mt-0 tablet:text-base">
          {formatPokemonName(pokemon.name)}
        </span>
      </span>
      <span className="flex shrink-0 flex-nowrap justify-end gap-1.5">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} size="compact" type={type} />
        ))}
      </span>
    </Link>
  )
}
