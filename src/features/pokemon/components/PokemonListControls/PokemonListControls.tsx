import { Grid2X2, List } from 'lucide-react'

import { formatPokemonName } from '../../pokemon-list-utils'
import {
  pokemonTypeNames,
  type PokemonDisplayMode,
  type PokemonSortOption,
  type PokemonTypeName,
} from '../../pokemon-types'
import {
  SelectInput,
  type SelectInputOption,
} from '../../../../shared/components/ui'

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
  { label: 'Number: Ascending', value: 'number-asc' },
  { label: 'Number: Descending', value: 'number-desc' },
  { label: 'Name: A - Z', value: 'name-asc' },
  { label: 'Name: Z - A', value: 'name-desc' },
]

type PokemonTypeFilterValue = PokemonTypeName | ''

const typeOptions: Array<SelectInputOption<PokemonTypeFilterValue>> = [
  { label: 'All Types', value: '' },
  ...pokemonTypeNames.map((type) => ({
    label: formatPokemonName(type),
    value: type,
  })),
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
      <SelectInput
        ariaLabel="Type filter"
        className="min-w-0 tablet:min-w-40"
        onChange={(value) => onTypeChange(value ? value : null)}
        options={typeOptions}
        value={typeFilter ?? ''}
      />

      <SelectInput
        ariaLabel="Sort order"
        className="min-w-0 tablet:min-w-44"
        onChange={(value) => {
          if (value) {
            onSortChange(value)
          }
        }}
        options={sortOptions}
        value={sortOption}
      />

      <div
        aria-label="View mode"
        className="inline-flex h-11 w-fit overflow-hidden rounded-lg border border-line bg-surface shadow-sm justify-self-end phone-lg:col-span-2 tablet:col-span-1"
        role="group"
      >
        <button
          aria-label="Grid view"
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
          aria-label="List view"
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
