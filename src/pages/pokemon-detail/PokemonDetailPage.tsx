import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { routes } from '../../app/routes'
import { PokemonAbilities } from '../../features/pokemon/components/PokemonAbilities'
import { PokemonDetailHero } from '../../features/pokemon/components/PokemonDetailHero'
import { PokemonDetailStats } from '../../features/pokemon/components/PokemonDetailStats'
import { PokemonEvolutionChain } from '../../features/pokemon/components/PokemonEvolutionChain'
import { PokemonSprites } from '../../features/pokemon/components/PokemonSprites'
import {
  getNextRecentlyVisitedIds,
  recentlyVisitedIdsChanged,
} from '../../features/pokemon/pokemon-preferences-slice'
import { usePokemonDetailQuery } from '../../features/pokemon/pokemon-query'
import { selectRecentlyVisitedPokemonIds } from '../../features/pokemon/pokemon-selectors'
import { type PokemonDetail } from '../../features/pokemon/pokemon-types'

function PokemonDetailContent({ pokemon }: { pokemon: PokemonDetail }) {
  return (
    <>
      <PokemonDetailHero pokemon={pokemon} />

      <section className="bg-page-bg">
        <div className="mx-auto max-w-page space-y-8 px-6 py-8 tablet:space-y-10 tablet:py-10 wide:max-w-wide-page">
          <PokemonDetailStats stats={pokemon.stats} />

          <div className="border-t border-line pt-8 tablet:pt-10">
            <PokemonAbilities abilities={pokemon.abilities} />
          </div>

          <div className="border-t border-line pt-8 tablet:pt-10">
            <PokemonSprites sprites={pokemon.sprites} />
          </div>

          <div className="border-t border-line pt-8 tablet:pt-10">
            <PokemonEvolutionChain evolutions={pokemon.evolutionChain} />
          </div>
        </div>
      </section>
    </>
  )
}

export function PokemonDetailPage() {
  const dispatch = useAppDispatch()
  const recentlyVisitedIds = useAppSelector(selectRecentlyVisitedPokemonIds)
  const { pokemonNameOrId } = useParams()
  const detailQuery = usePokemonDetailQuery(pokemonNameOrId)

  useEffect(() => {
    if (!detailQuery.data || recentlyVisitedIds[0] === detailQuery.data.id) {
      return
    }

    const nextRecentlyVisitedIds = getNextRecentlyVisitedIds(
      recentlyVisitedIds,
      detailQuery.data.id
    )

    dispatch(recentlyVisitedIdsChanged(nextRecentlyVisitedIds))
  }, [detailQuery.data, dispatch, recentlyVisitedIds])

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-page-bg">
      <div className="mx-auto max-w-page px-6 py-5 wide:max-w-wide-page">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-avamon-red transition hover:text-avamon-red/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red"
          to={routes.pokemonList}
        >
          <ArrowLeft aria-hidden className="size-4" />
          All Pokémon
        </Link>
      </div>

      {detailQuery.isLoading ? (
        <section className="mx-auto grid max-w-page gap-10 px-6 py-12 tablet:grid-cols-[22rem_1fr] wide:max-w-wide-page">
          <div className="h-80 animate-pulse rounded-card bg-gradient-to-b from-white to-card-image-bg" />
          <div className="space-y-5">
            <div className="h-5 w-20 animate-pulse rounded-full bg-line" />
            <div className="h-14 w-64 animate-pulse rounded-full bg-line" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-line" />
            <div className="h-20 max-w-xl animate-pulse rounded-card bg-line/50" />
          </div>
        </section>
      ) : null}

      {detailQuery.isError ? (
        <section className="mx-auto max-w-page px-6 py-12 wide:max-w-wide-page">
          <div
            className="rounded-card border border-avamon-red/30 bg-surface p-6 text-sm font-bold text-avamon-red shadow-card"
            role="alert"
          >
            Pokémon detail could not be loaded. Please try again.
          </div>
        </section>
      ) : null}

      {detailQuery.data ? (
        <PokemonDetailContent pokemon={detailQuery.data} />
      ) : null}
    </main>
  )
}
