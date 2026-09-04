import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { routes } from '../../app/routes'
import { PokemonDetailHero } from '../../features/pokemon/components/PokemonDetailHero'
import { PokemonDetailStats } from '../../features/pokemon/components/PokemonDetailStats'
import { PokemonEvolutionChain } from '../../features/pokemon/components/PokemonEvolutionChain'
import { PokemonSprites } from '../../features/pokemon/components/PokemonSprites'
import {
  getNextRecentlyVisitedPokemon,
  recentlyVisitedChanged,
} from '../../features/pokemon/pokemon-preferences-slice'
import { saveRecentlyVisitedPokemon } from '../../features/pokemon/pokemon-preferences-storage'
import { usePokemonDetailQuery } from '../../features/pokemon/pokemon-query'
import { selectRecentlyVisitedPokemon } from '../../features/pokemon/pokemon-selectors'
import { type PokemonDetail } from '../../features/pokemon/pokemon-types'

function formatAbilityName(name: string) {
  return name
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

function PokemonDetailContent({ pokemon }: { pokemon: PokemonDetail }) {
  return (
    <>
      <PokemonDetailHero pokemon={pokemon} />

      <section className="bg-page-bg">
        <div className="mx-auto max-w-page space-y-8 px-6 py-8 tablet:space-y-10 tablet:py-10">
          <PokemonDetailStats stats={pokemon.stats} />

          <section
            aria-labelledby="pokemon-abilities-title"
            className="space-y-5 border-t border-line pt-8 tablet:pt-10"
          >
            <h2
              className="text-sm font-semibold uppercase tracking-wide text-muted"
              id="pokemon-abilities-title"
            >
              Yetenekler
            </h2>
            <div className="flex flex-wrap gap-3">
              {pokemon.abilities.map((ability) => (
                <span
                  className={`inline-flex h-10 items-center gap-2 rounded-full border px-5 text-sm font-semibold ${
                    ability.isHidden
                      ? 'border-avamon-yellow bg-avamon-yellow/10 text-ink'
                      : 'border-line bg-surface text-ink'
                  }`}
                  key={ability.name}
                >
                  {formatAbilityName(ability.name)}
                  {ability.isHidden ? (
                    <span className="rounded-full bg-avamon-yellow px-2 py-0.5 text-[10px] font-semibold text-ink">
                      Gizli
                    </span>
                  ) : null}
                </span>
              ))}
            </div>
          </section>

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
  const recentlyVisited = useAppSelector(selectRecentlyVisitedPokemon)
  const { pokemonNameOrId } = useParams()
  const detailQuery = usePokemonDetailQuery(pokemonNameOrId)

  useEffect(() => {
    if (!detailQuery.data || recentlyVisited[0]?.id === detailQuery.data.id) {
      return
    }

    const nextRecentlyVisited = getNextRecentlyVisitedPokemon(
      recentlyVisited,
      detailQuery.data
    )

    saveRecentlyVisitedPokemon(nextRecentlyVisited)
    dispatch(recentlyVisitedChanged(nextRecentlyVisited))
  }, [detailQuery.data, dispatch, recentlyVisited])

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-page-bg">
      <div className="mx-auto max-w-page px-6 py-5">
        <Link
          className="inline-flex items-center gap-2 text-sm font-semibold text-avamon-red transition hover:text-avamon-red/80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-red"
          to={routes.pokemonList}
        >
          <ArrowLeft aria-hidden className="size-4" />
          Tüm Pokémonlar
        </Link>
      </div>

      {detailQuery.isLoading ? (
        <section className="mx-auto grid max-w-page gap-10 px-6 py-12 tablet:grid-cols-[22rem_1fr]">
          <div className="h-80 animate-pulse rounded-card bg-gradient-to-b from-white to-[#f6f6f6]" />
          <div className="space-y-5">
            <div className="h-5 w-20 animate-pulse rounded-full bg-line" />
            <div className="h-14 w-64 animate-pulse rounded-full bg-line" />
            <div className="h-5 w-24 animate-pulse rounded-full bg-line" />
            <div className="h-20 max-w-xl animate-pulse rounded-card bg-line/50" />
          </div>
        </section>
      ) : null}

      {detailQuery.isError ? (
        <section className="mx-auto max-w-page px-6 py-12">
          <div
            className="rounded-card border border-avamon-red/30 bg-surface p-6 text-sm font-bold text-avamon-red shadow-card"
            role="alert"
          >
            Pokémon detayı yüklenemedi. Lütfen tekrar deneyin.
          </div>
        </section>
      ) : null}

      {detailQuery.data ? (
        <PokemonDetailContent pokemon={detailQuery.data} />
      ) : null}
    </main>
  )
}
