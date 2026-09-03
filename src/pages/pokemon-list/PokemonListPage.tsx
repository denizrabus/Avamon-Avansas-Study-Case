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
  return new Intl.NumberFormat('tr-TR').format(count)
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
  const totalPages = getPokemonTotalPages(
    referencesQuery.data?.count ?? 0,
    itemsPerPage
  )
  const currentPage = clampPage(requestedPage, totalPages)
  const pageReferences = useMemo(
    () => paginatePokemonReferences(sortedReferences, currentPage, itemsPerPage),
    [currentPage, sortedReferences]
  )
  const summariesQuery = usePokemonSummariesQuery(pageReferences)

  useEffect(() => {
    if (requestedPage === currentPage) {
      return
    }

    setSearchParams(
      updateSearchParams(searchParams, { page: String(currentPage) }),
      { replace: true }
    )
  }, [currentPage, requestedPage, searchParams, setSearchParams])

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
    <main className="min-h-[calc(100vh-4rem)] bg-page-bg px-6 py-12">
      <section className="mx-auto max-w-page">
        <div className="flex flex-col gap-5 tablet:flex-row tablet:items-center tablet:justify-between">
          <div className="flex items-end gap-4">
            <h1 className="text-4xl font-black text-ink">Tüm Pokémon</h1>
            <p className="pb-1 text-base font-bold text-muted">
              {formatPokemonCount(referencesQuery.data?.count ?? 1302)} pokémon
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
            Pokémon listesi yüklenemedi. Lütfen tekrar deneyin.
          </div>
        ) : null}

        {isLoading ? (
          <div className="mt-8 grid gap-5 tablet:grid-cols-3 desktop:grid-cols-4 wide:grid-cols-6">
            {Array.from({ length: itemsPerPage }, (_, index) => (
              <div
                className="h-72 animate-pulse rounded-card bg-surface shadow-card"
                key={index}
              />
            ))}
          </div>
        ) : null}

        {!isLoading && !isError && summariesQuery.data ? (
          <>
            {displayMode === 'grid' ? (
              <div className="mt-8 grid gap-5 phone-lg:grid-cols-2 tablet:grid-cols-3 desktop:grid-cols-4 wide:grid-cols-6">
                {summariesQuery.data.map((pokemon) => (
                  <PokemonCard key={pokemon.id} pokemon={pokemon} />
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
