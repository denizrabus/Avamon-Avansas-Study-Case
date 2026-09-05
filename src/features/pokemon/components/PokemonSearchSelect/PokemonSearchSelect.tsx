import { type KeyboardEvent, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { type SelectInstance } from 'react-select'

import { formatPokemonName, formatPokemonNumber } from '../../pokemon-list-utils'
import { usePokemonReferencesQuery } from '../../pokemon-query'
import { type PokemonReference } from '../../pokemon-types'
import { routes } from '../../../../app/routes'
import {
  SelectInput,
  type SelectInputOption,
} from '../../../../shared/components/ui'

interface PokemonSearchSelectProps {
  className?: string
  onSelect?: () => void
  variant?: 'header' | 'surface'
}

interface PokemonSearchOption extends SelectInputOption<string> {
  imageUrl: string
  name: string
  number: string
}

const maxAutocompleteResults = 8
const minAutocompleteCharacters = 2
const pokemonSpriteBaseUrl =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

function getPokemonSpriteUrl(id: number) {
  return `${pokemonSpriteBaseUrl}/${id}.png`
}

function toPokemonSearchOption(pokemon: PokemonReference): PokemonSearchOption {
  const formattedName = formatPokemonName(pokemon.name)
  const number = formatPokemonNumber(pokemon.id)

  return {
    imageUrl: getPokemonSpriteUrl(pokemon.id),
    label: `${formattedName} ${number}`,
    name: formattedName,
    number,
    value: pokemon.name,
  }
}

function blurActiveElement() {
  if (document.activeElement instanceof HTMLElement) {
    document.activeElement.blur()
  }
}

export function PokemonSearchSelect({
  className,
  onSelect,
  variant = 'header',
}: PokemonSearchSelectProps) {
  const navigate = useNavigate()
  const selectRef = useRef<SelectInstance<PokemonSearchOption, false>>(null)
  const [inputValue, setInputValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const referencesQuery = usePokemonReferencesQuery(null)
  const references = useMemo(
    () => referencesQuery.data?.results ?? [],
    [referencesQuery.data]
  )
  const normalizedInputValue = inputValue.trim().toLowerCase()
  const canShowAutocomplete =
    normalizedInputValue.length >= minAutocompleteCharacters
  const options = useMemo(() => {
    if (!canShowAutocomplete) {
      return []
    }

    return references
      .filter((pokemon) => pokemon.name.includes(normalizedInputValue))
      .slice(0, maxAutocompleteResults)
      .map(toPokemonSearchOption)
  }, [canShowAutocomplete, normalizedInputValue, references])

  const exactMatch = useMemo(
    () =>
      references.find(
        (pokemon) => pokemon.name === normalizedInputValue
      ) ?? null,
    [normalizedInputValue, references]
  )

  function navigateToPokemon(pokemonName: string) {
    setInputValue('')
    setIsFocused(false)
    onSelect?.()
    selectRef.current?.blur()
    blurActiveElement()
    navigate(routes.pokemonDetail(pokemonName))
  }

  function handleChange(pokemonName: string | null) {
    if (!pokemonName) {
      return
    }

    navigateToPokemon(pokemonName)
  }

  function handleBlur() {
    setIsFocused(false)
    setInputValue('')
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key !== 'Enter') {
      return
    }

    event.preventDefault()

    if (exactMatch) {
      navigateToPokemon(exactMatch.name)
      return
    }

    setInputValue('')
    setIsFocused(false)
    selectRef.current?.blur()
    blurActiveElement()
  }

  return (
    <SelectInput
      ariaLabel="Search Pokémon"
      className={className}
      formatOptionLabel={(option, meta) =>
        meta.context === 'menu' ? (
          <div className="flex items-center gap-3">
            <img
              alt=""
              className="size-12 shrink-0 object-contain"
              src={option.imageUrl}
            />
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-ink">
              {option.name}
            </span>
            <span className="shrink-0 text-sm font-semibold text-muted">
              {option.number}
            </span>
          </div>
        ) : (
          option.label
        )
      }
      inputValue={inputValue}
      isSearchable
      menuIsOpen={isFocused && canShowAutocomplete}
      onBlur={handleBlur}
      onChange={handleChange}
      onFocus={() => setIsFocused(true)}
      onInputChange={setInputValue}
      onKeyDown={handleKeyDown}
      noOptionsMessage={
        canShowAutocomplete ? 'No results found' : 'Type at least 2 characters'
      }
      options={options}
      placeholder={
        referencesQuery.isLoading ? 'Loading Pokémon...' : 'Search Pokémon...'
      }
      selectRef={selectRef}
      value={null}
      variant={variant}
    />
  )
}
