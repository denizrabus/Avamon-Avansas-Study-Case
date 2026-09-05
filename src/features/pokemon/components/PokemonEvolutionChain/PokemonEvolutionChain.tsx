import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PokemonImage } from '../PokemonImage'
import { routes } from '../../../../app/routes'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { type PokemonEvolution } from '../../pokemon-types'

export function PokemonEvolutionChain({
  evolutions,
}: {
  evolutions: PokemonEvolution[]
}) {
  if (evolutions.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="pokemon-evolution-title" className="space-y-5">
      <h2
        className="text-sm font-semibold uppercase tracking-wide text-muted"
        id="pokemon-evolution-title"
      >
        EVOLUTION CHAIN
      </h2>
      <div className="flex items-center gap-2 overflow-x-auto pb-2 tablet:flex-wrap tablet:gap-4 tablet:overflow-visible tablet:pb-0">
        {evolutions.map((pokemon, index) => (
          <div className="flex shrink-0 items-center gap-2 tablet:contents" key={pokemon.id}>
            <Link
              className="grid min-h-28 w-20 place-items-center rounded-card bg-surface p-2 text-center shadow-card transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red tablet:min-h-36 tablet:w-28 tablet:p-4"
              to={routes.pokemonDetail(pokemon.name)}
            >
              <PokemonImage
                alt={formatPokemonName(pokemon.name)}
                className="size-12 tablet:size-16"
                fallbackClassName="size-8 tablet:size-10"
                imageClassName="size-full object-contain"
                src={pokemon.imageUrl}
              />
              <strong className="text-xs font-bold leading-tight text-ink tablet:text-sm">
                {formatPokemonName(pokemon.name)}
              </strong>
              <span className="text-[11px] font-semibold text-muted tablet:text-xs">
                {formatPokemonNumber(pokemon.id)}
              </span>
            </Link>
            {index < evolutions.length - 1 ? (
              <ArrowRight aria-hidden className="size-4 shrink-0 text-muted tablet:size-5" />
            ) : null}
          </div>
        ))}
      </div>
    </section>
  )
}
