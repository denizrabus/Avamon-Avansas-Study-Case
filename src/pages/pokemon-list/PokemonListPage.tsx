import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { PokemonCard } from '../../features/pokemon/components/PokemonCard'
import { PokemonListControls } from '../../features/pokemon/components/PokemonListControls'
import { PokemonListRow } from '../../features/pokemon/components/PokemonListRow'
import { PokemonPagination } from '../../features/pokemon/components/PokemonPagination'
import {
  clampPage,
  defaultSort,
  getPokemonTotalPages,
  paginatePokemonReferences,
  parsePage,
  parseSortOption,
  parseTypeFilter,
  sortPokemonReferences,
} from '../../features/pokemon/pokemon-list-utils'
import { displayModeChanged } from '../../features/pokemon/pokemon-preferences-slice'
import { savePokemonDisplayMode } from '../../features/pokemon/pokemon-preferences-storage'
import { usePokemonReferencesQuery, usePokemonSummariesQuery } from '../../features/pokemon/pokemon-query'
import { selectPokemonDisplayMode } from '../../features/pokemon/pokemon-selectors'
import {
  type PokemonDisplayMode,
  type PokemonSortOption,
  type PokemonTypeName,
} from '../../features/pokemon/pokemon-types'

const itemsPerPage = 24

function formatPokemonCount(count: number) {
  return new Intl.NumberFormat('en-US').format(count)
}

function updateSearchParams(
  searchParams: URLSearchParams,
  updates: Record<string, string | null>
) {
  const nextParams = new URLSearchParams(searchParams)

  Object.entries(updates).forEach(([key, value]) => {
    if (!value) {
      nextParams.delete(key)
      return
    }

    nextParams.set(key, value)
  })

  return nextParams
}

export function PokemonListPage() {
  const dispatch = useAppDispatch()
  const displayMode = useAppSelector(selectPokemonDisplayMode)
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFilter = parseTypeFilter(searchParams.get('type'))
  const sortOption = parseSortOption(searchParams.get('sort'))
  const requestedPage = parsePage(searchParams.get('page'))
  const referencesQuery = usePokemonReferencesQuery(typeFilter)
  const sortedReferences = useMemo(
    () =>
      referencesQuery.data
        ? sortPokemonReferences(referencesQuery.data.results, sortOption)
        : [],
    [referencesQuery.data, sortOption]
  )
  const totalPages = referencesQuery.data
    ? getPokemonTotalPages(sortedReferences.length, itemsPerPage)
    : requestedPage
  const currentPage = referencesQuery.data
    ? clampPage(requestedPage, totalPages)
    : requestedPage
  const pageReferences = useMemo(
    () => paginatePokemonReferences(sortedReferences, currentPage, itemsPerPage),
    [currentPage, sortedReferences]
  )
  const summariesQuery = usePokemonSummariesQuery(pageReferences)

  useEffect(() => {
    if (!referencesQuery.data) {
      return
    }

    if (requestedPage === currentPage) {
      return
    }

    setSearchParams(
      updateSearchParams(searchParams, { page: String(currentPage) }),
      { replace: true }
    )
  }, [
    currentPage,
    referencesQuery.data,
    requestedPage,
    searchParams,
    setSearchParams,
  ])

  function handleTypeChange(type: PokemonTypeName | null) {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: null,
        type,
      })
    )
  }

  function handleSortChange(nextSortOption: PokemonSortOption) {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: null,
        sort: nextSortOption === defaultSort ? null : nextSortOption,
      })
    )
  }

  function handleDisplayModeChange(nextDisplayMode: PokemonDisplayMode) {
    savePokemonDisplayMode(nextDisplayMode)
    dispatch(displayModeChanged(nextDisplayMode))
  }

  function handlePageChange(page: number) {
    setSearchParams(
      updateSearchParams(searchParams, {
        page: page === 1 ? null : String(page),
      })
    )
  }

  const isLoading = referencesQuery.isLoading || summariesQuery.isLoading
  const isError = referencesQuery.isError || summariesQuery.isError

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-page-bg py-8 tablet:py-12">
      <section className="mx-auto max-w-page px-6 wide:max-w-wide-page">
        <div className="flex flex-col gap-5 tablet:flex-row tablet:items-center tablet:justify-between">
          <div className="flex items-start justify-between gap-4 tablet:items-end tablet:justify-start">
            <h1 className="text-3xl font-bold leading-tight text-ink tablet:text-4xl">
              All Pokémon
            </h1>
            <p className="shrink-0 pt-2 text-sm text-muted tablet:pb-1 tablet:pt-0 tablet:text-base">
              {formatPokemonCount(referencesQuery.data?.count ?? 1302)} Pokémon
            </p>
          </div>

          <PokemonListControls
            displayMode={displayMode}
            onDisplayModeChange={handleDisplayModeChange}
            onSortChange={handleSortChange}
            onTypeChange={handleTypeChange}
            sortOption={sortOption}
            typeFilter={typeFilter}
          />
        </div>

        {isError ? (
          <div
            className="mt-8 rounded-card border border-avamon-red/30 bg-surface p-6 text-sm font-bold text-avamon-red shadow-card"
            role="alert"
          >
            Pokémon list could not be loaded. Please try again.
          </div>
        ) : null}

        {isLoading ? (
          displayMode === 'grid' ? (
            <div className="mt-8 grid grid-cols-2 gap-4 tablet:grid-cols-3 tablet:gap-5 desktop:grid-cols-6">
              {Array.from({ length: itemsPerPage }, (_, index) => (
                <div
                  className="h-64 animate-pulse overflow-hidden rounded-card bg-surface shadow-card desktop:h-80"
                  key={index}
                >
                  <div className="h-48 bg-gradient-to-b from-white to-[#f6f6f6]" />
                  <div className="h-32 bg-gradient-to-r from-white to-[#f4f4ed]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-8 flex flex-col gap-4">
              {Array.from({ length: itemsPerPage }, (_, index) => (
                <div
                  className="grid min-h-24 animate-pulse grid-cols-[4rem_4.5rem_1fr] items-center gap-4 rounded-card bg-gradient-to-r from-white to-[#f4f4ed] px-5 py-4 shadow-card phone-lg:grid-cols-[5rem_5rem_1fr_auto]"
                  key={index}
                >
                  <div className="size-16 rounded-full bg-line/40" />
                  <div className="h-4 w-14 rounded-full bg-line/50" />
                  <div className="h-5 w-40 rounded-full bg-line/50" />
                  <div className="col-span-3 flex justify-end gap-2 phone-lg:col-span-1">
                    <div className="h-6 w-16 rounded-full bg-line/50" />
                    <div className="h-6 w-16 rounded-full bg-line/40" />
                  </div>
                </div>
              ))}
            </div>
          )
        ) : null}

        {!isLoading && !isError && summariesQuery.data ? (
          <>
            {displayMode === 'grid' ? (
              <div className="mt-8 grid grid-cols-2 gap-4 tablet:grid-cols-3 tablet:gap-5 desktop:grid-cols-6">
                {summariesQuery.data.map((pokemon, index) => (
                  <PokemonCard
                    key={pokemon.id}
                    pokemon={pokemon}
                    priority={index < 12}
                  />
                ))}
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-4">
                {summariesQuery.data.map((pokemon) => (
                  <PokemonListRow key={pokemon.id} pokemon={pokemon} />
                ))}
              </div>
            )}

            <div className="mt-10">
              <PokemonPagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalPages={totalPages}
              />
            </div>
          </>
        ) : null}
      </section>
    </main>
  )
}
