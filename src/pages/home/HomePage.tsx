import { useMemo } from 'react'
import { ArrowRight, Star } from 'lucide-react'

import heroCharizardImage from '../../assets/images/hero-charizard.png'
import { useAppSelector } from '../../app/hooks'
import { routes } from '../../app/routes'
import { PokemonCard } from '../../features/pokemon/components/PokemonCard'
import {
  usePokemonReferencesQuery,
  usePokemonSummariesQuery,
} from '../../features/pokemon/pokemon-query'
import { selectRecentlyVisitedPokemon } from '../../features/pokemon/pokemon-selectors'
import { selectIsAuthenticated } from '../../features/auth/auth-selectors'
import { ButtonLink } from '../../shared/components/ui'
import { getRandomPokemonReferences } from './home-page-utils'

const heroPokemonId = 6

function HomePopularSkeleton() {
  return (
    <div className="grid gap-5 tablet-sm:grid-cols-2 tablet:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <div
          className="h-80 animate-pulse overflow-hidden rounded-card bg-surface shadow-card tablet:h-[28rem]"
          key={index}
        >
          <div className="h-56 bg-gradient-to-b from-white to-[#f6f6f6] tablet:h-80" />
          <div className="h-32 bg-gradient-to-r from-white to-[#f4f4ed]" />
        </div>
      ))}
    </div>
  )
}

export function HomePage() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated)
  const recentlyVisitedPokemon = useAppSelector(selectRecentlyVisitedPokemon)
  const shouldShowRecentlyVisited = recentlyVisitedPokemon.length >= 3
  const referencesQuery = usePokemonReferencesQuery(null)
  const randomPopularReferences = useMemo(
    () =>
      referencesQuery.data
        ? getRandomPokemonReferences(referencesQuery.data.results, {
            count: 3,
            excludeIds: [heroPokemonId],
          })
        : [],
    [referencesQuery.data]
  )
  const popularPokemonQuery = usePokemonSummariesQuery(
    shouldShowRecentlyVisited ? [] : randomPopularReferences
  )
  const featuredSectionTitle = shouldShowRecentlyVisited
    ? 'Recently Visited'
    : 'Popular Pokémon'
  const featuredPokemon = shouldShowRecentlyVisited
    ? recentlyVisitedPokemon
    : popularPokemonQuery.data ?? []
  const isFeaturedPokemonLoading = shouldShowRecentlyVisited
    ? false
    : referencesQuery.isLoading || popularPokemonQuery.isLoading
  const isFeaturedPokemonError = shouldShowRecentlyVisited
    ? false
    : referencesQuery.isError || popularPokemonQuery.isError

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-page-bg">
      <section className="overflow-hidden bg-[linear-gradient(112deg,#ef2f10_0%,#d92a0d_50%,#9f2807_100%)] text-white shadow-inner">
        <div className="mx-auto grid max-w-page items-center gap-6 px-6 py-10 phone-lg:py-12 tablet-sm:min-h-[24rem] tablet-sm:grid-cols-[minmax(0,1fr)_minmax(18rem,28rem)] tablet-sm:gap-8 tablet-sm:py-0 tablet:min-h-[26rem] tablet:grid-cols-[minmax(0,1fr)_minmax(24rem,38rem)] tablet:gap-10 tablet:py-0 desktop:min-h-[28rem] wide:max-w-wide-page">
          <div className="relative z-10">
            <h1
              aria-label="Explore All Pokémon"
              className="max-w-2xl text-4xl font-bold leading-none phone-lg:text-5xl desktop:text-6xl"
            >
              Explore All
              <span className="mt-2 block text-avamon-yellow">Pokémon</span>
            </h1>
            <p className="mt-6 max-w-xl text-base text-white/90 tablet:text-xl">
              Search, filter, and explore the details of 1,000+ Pokémon.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink
                className="px-7"
                to={routes.pokemonList}
              >
                All Pokémon
                <ArrowRight aria-hidden className="size-5" />
              </ButtonLink>

              {!isAuthenticated ? (
                <ButtonLink
                  className="border-2 px-7 focus-visible:outline-white"
                  to={routes.login}
                  variant="secondary"
                >
                  Login
                </ButtonLink>
              ) : null}
            </div>
          </div>

          <div className="relative z-0 hidden items-center justify-end tablet-sm:flex tablet-sm:min-h-72 tablet:min-h-80">
            <div className="absolute right-0 top-1/2 h-56 w-80 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,200,8,0.34)_0%)] blur-2xl tablet:h-80 tablet:w-[30rem]" />
            <img
              alt="Charizard"
              className="relative h-72 w-full max-w-[28rem] object-contain object-right tablet:h-[23rem] tablet:max-w-[38rem] desktop:h-[30rem]"
              src={heroCharizardImage}
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-page px-6 py-12 tablet:py-16 wide:max-w-wide-page">
        <h2 className="flex items-center gap-2 text-2xl font-bold text-ink tablet:text-3xl">
          <Star
            aria-hidden
            className="size-7 fill-avamon-yellow text-avamon-yellow"
          />
          {featuredSectionTitle}
        </h2>

        {isFeaturedPokemonError ? (
          <div
            className="mt-8 rounded-card border border-avamon-red/30 bg-surface p-6 text-sm font-bold text-avamon-red shadow-card"
            role="alert"
          >
            Featured Pokémon could not be loaded. Please try again.
          </div>
        ) : null}

        {isFeaturedPokemonLoading ? (
          <div className="mt-8">
            <HomePopularSkeleton />
          </div>
        ) : null}

        {!isFeaturedPokemonLoading && !isFeaturedPokemonError ? (
          <div className="mt-8 grid gap-5 tablet-sm:grid-cols-2 tablet:grid-cols-3">
            {featuredPokemon.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} priority />
            ))}
          </div>
        ) : null}
      </section>
    </main>
  )
}
