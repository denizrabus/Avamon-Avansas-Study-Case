import { Link } from 'react-router-dom'

import { PokemonImage } from '../PokemonImage'
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
  bug: '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-bug-soft)_100%)]',
  dark: '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-dark-soft)_100%)]',
  dragon:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-dragon-soft)_100%)]',
  electric:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-electric-soft)_100%)]',
  fairy:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-fairy-soft)_100%)]',
  fighting:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-fighting-soft)_100%)]',
  fire: '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-fire-soft)_100%)]',
  flying:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-flying-soft)_100%)]',
  ghost:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-ghost-soft)_100%)]',
  grass:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-grass-soft)_100%)]',
  ground:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-ground-soft)_100%)]',
  ice: '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-ice-soft)_100%)]',
  normal:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-normal-soft)_100%)]',
  poison:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-poison-soft)_100%)]',
  psychic:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-psychic-soft)_100%)]',
  rock: '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-rock-soft)_100%)]',
  steel:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-steel-soft)_100%)]',
  water:
    '[background:linear-gradient(90deg,#fff_0%,#fff_72%,var(--color-type-water-soft)_100%)]',
}

export function PokemonListRow({ pokemon }: PokemonListRowProps) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <Link
      className={`grid min-h-24 grid-cols-[4rem_4.5rem_1fr] items-center gap-4 rounded-card px-5 py-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red phone-lg:grid-cols-[5rem_5rem_1fr_auto] ${rowBackgroundClasses[primaryType]}`}
      to={`/pokemon/${pokemon.name}`}
    >
      <span className="flex size-16 items-center justify-center rounded-full bg-surface/80">
        <PokemonImage
          alt={formatPokemonName(pokemon.name)}
          className="size-14 rounded-full"
          fallbackClassName="size-10"
          imageClassName="size-14 object-contain"
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
