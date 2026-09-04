import { Grid2X2, List } from 'lucide-react'

import { formatPokemonName } from '../../pokemon-list-utils'
import {
  pokemonTypeNames,
  type PokemonDisplayMode,
  type PokemonSortOption,
  type PokemonTypeName,
} from '../../pokemon-types'

interface PokemonListControlsProps {
  displayMode: PokemonDisplayMode
  onDisplayModeChange: (displayMode: PokemonDisplayMode) => void
  onSortChange: (sortOption: PokemonSortOption) => void
  onTypeChange: (type: PokemonTypeName | null) => void
  sortOption: PokemonSortOption
  typeFilter: PokemonTypeName | null
}

const sortOptions: Array<{
  label: string
  value: PokemonSortOption
}> = [
  { label: 'Numara: Artan', value: 'number-asc' },
  { label: 'Numara: Azalan', value: 'number-desc' },
  { label: 'İsim: A - Z', value: 'name-asc' },
  { label: 'İsim: Z - A', value: 'name-desc' },
]

export function PokemonListControls({
  displayMode,
  onDisplayModeChange,
  onSortChange,
  onTypeChange,
  sortOption,
  typeFilter,
}: PokemonListControlsProps) {
  return (
    <div className="grid gap-3 phone-lg:grid-cols-2 tablet:flex tablet:items-center">
      <select
        aria-label="Tür filtresi"
        className="h-11 min-w-0 rounded-lg border border-line bg-surface px-4 text-sm font-bold text-ink shadow-sm outline-none focus:border-avamon-red focus:ring-2 focus:ring-avamon-red/20 tablet:min-w-40"
        onChange={(event) =>
          onTypeChange(
            event.target.value === ''
              ? null
              : (event.target.value as PokemonTypeName)
          )
        }
        value={typeFilter ?? ''}
      >
        <option value="">Tüm Türler</option>
        {pokemonTypeNames.map((type) => (
          <option key={type} value={type}>
            {formatPokemonName(type)}
          </option>
        ))}
      </select>

      <select
        aria-label="Sıralama"
        className="h-11 min-w-0 rounded-lg border border-line bg-surface px-4 text-sm font-bold text-ink shadow-sm outline-none focus:border-avamon-red focus:ring-2 focus:ring-avamon-red/20 tablet:min-w-44"
        onChange={(event) =>
          onSortChange(event.target.value as PokemonSortOption)
        }
        value={sortOption}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <div
        aria-label="Görünüm modu"
        className="inline-flex h-11 w-fit overflow-hidden rounded-lg border border-line bg-surface shadow-sm justify-self-end phone-lg:col-span-2 tablet:col-span-1"
        role="group"
      >
        <button
          aria-label="Grid görünüm"
          aria-pressed={displayMode === 'grid'}
          className={`grid size-11 place-items-center transition ${
            displayMode === 'grid'
              ? 'bg-avamon-red text-white'
              : 'text-muted hover:bg-page-bg'
          }`}
          onClick={() => onDisplayModeChange('grid')}
          type="button"
        >
          <Grid2X2 aria-hidden="true" size={16} />
        </button>
        <button
          aria-label="Liste görünüm"
          aria-pressed={displayMode === 'list'}
          className={`grid size-11 place-items-center transition ${
            displayMode === 'list'
              ? 'bg-avamon-red text-white'
              : 'text-muted hover:bg-page-bg'
          }`}
          onClick={() => onDisplayModeChange('list')}
          type="button"
        >
          <List aria-hidden="true" size={18} />
        </button>
      </div>
    </div>
  )
}
