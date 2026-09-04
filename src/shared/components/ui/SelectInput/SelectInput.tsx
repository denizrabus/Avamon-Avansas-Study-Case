import { type KeyboardEvent, type ReactNode, type Ref } from 'react'
import ReactSelect, {
  type ClassNamesConfig,
  type GroupBase,
  type SelectComponentsConfig,
  type SelectInstance,
  type SingleValue,
} from 'react-select'

import { cn } from '../../../utils/cn'

export interface SelectInputOption<TValue extends string = string> {
  label: string
  value: TValue
}

interface SelectInputProps<
  TValue extends string,
  TOption extends SelectInputOption<TValue> = SelectInputOption<TValue>,
> {
  ariaLabel: string
  className?: string
  formatOptionLabel?: (
    option: TOption,
    meta: { context: 'menu' | 'value' }
  ) => ReactNode
  inputValue?: string
  isClearable?: boolean
  isSearchable?: boolean
  menuIsOpen?: boolean
  noOptionsMessage?: string
  onBlur?: () => void
  onChange: (value: TValue | null) => void
  onFocus?: () => void
  onInputChange?: (value: string) => void
  onKeyDown?: (event: KeyboardEvent) => void
  options: TOption[]
  placeholder?: string
  selectRef?: Ref<SelectInstance<TOption, false>>
  value: TValue | null
  variant?: 'header' | 'surface'
}

function getSelectInputClassNames<
  TValue extends string,
  TOption extends SelectInputOption<TValue>,
>(variant: SelectInputProps<TValue, TOption>['variant']): ClassNamesConfig<
  TOption,
  false
> {
  const isHeader = variant === 'header'

  return {
    clearIndicator: () =>
      cn(
        'px-2 transition',
        isHeader ? 'text-white/80 hover:text-white' : 'text-muted hover:text-ink'
      ),
    control: ({ isFocused }) =>
      cn(
        'text-sm transition',
        isHeader
          ? 'min-h-9 rounded-full border-2 bg-white/15 px-4 font-semibold text-white'
          : 'h-11 rounded-lg border bg-surface px-3 font-semibold text-ink shadow-sm',
        isFocused && isHeader ? 'border-avamon-yellow' : null,
        !isFocused && isHeader ? 'border-white/35 hover:border-white/55' : null,
        isFocused && !isHeader
          ? 'border-avamon-red ring-2 ring-avamon-red/20'
          : null,
        !isFocused && !isHeader ? 'border-line hover:border-muted/40' : null
      ),
    dropdownIndicator: () =>
      cn('px-1 transition', isHeader ? null : 'text-muted hover:text-ink'),
    group: () => 'py-1',
    indicatorSeparator: () => 'hidden',
    input: () => cn('m-0', isHeader ? 'text-white' : 'text-ink'),
    menu: () =>
      'z-50 mt-2 overflow-hidden rounded-lg border border-line bg-surface py-1 shadow-lg',
    menuList: () =>
      cn('py-0', isHeader ? null : 'max-h-64 overflow-y-auto'),
    noOptionsMessage: () => 'px-3 py-2 text-sm font-semibold text-muted',
    option: ({ isFocused, isSelected }) =>
      cn(
        'cursor-pointer border-b border-line px-3 py-1.5 text-sm font-semibold transition last:border-b-0',
        isSelected
          ? 'bg-avamon-red text-white'
          : isFocused
            ? 'bg-page-bg text-ink'
            : 'bg-surface text-ink'
      ),
    placeholder: () => (isHeader ? 'text-white/75' : 'text-muted'),
    singleValue: () => (isHeader ? 'text-white' : 'text-ink'),
    valueContainer: () => 'items-center gap-1 p-0',
  }
}

function getSelectInputComponents<
  TValue extends string,
  TOption extends SelectInputOption<TValue>,
>(
  variant: SelectInputProps<TValue, TOption>['variant']
): SelectComponentsConfig<TOption, false, GroupBase<TOption>> {
  if (variant !== 'header') {
    return {}
  }

  return {
    DropdownIndicator: null,
  }
}

export function SelectInput<
  TValue extends string,
  TOption extends SelectInputOption<TValue> = SelectInputOption<TValue>,
>({
  ariaLabel,
  className,
  formatOptionLabel,
  inputValue,
  isClearable = false,
  isSearchable = false,
  menuIsOpen,
  onBlur,
  onChange,
  onFocus,
  onInputChange,
  onKeyDown,
  noOptionsMessage = 'Sonuç bulunamadı',
  options,
  placeholder,
  selectRef,
  value,
  variant = 'surface',
}: SelectInputProps<TValue, TOption>) {
  const selectedOption =
    options.find((option) => option.value === value) ?? null

  function handleChange(selectedValue: SingleValue<TOption>) {
    if (!selectedValue) {
      onChange(null)
      return
    }

    onChange(selectedValue.value)
  }

  return (
    <ReactSelect<TOption, false>
      aria-label={ariaLabel}
      className={className}
      classNames={getSelectInputClassNames<TValue, TOption>(variant)}
      components={getSelectInputComponents<TValue, TOption>(variant)}
      formatOptionLabel={formatOptionLabel}
      inputValue={inputValue}
      isClearable={isClearable}
      isSearchable={isSearchable}
      maxMenuHeight={variant === 'header' ? 520 : 256}
      menuIsOpen={menuIsOpen}
      noOptionsMessage={() => noOptionsMessage}
      onBlur={() => onBlur?.()}
      onChange={handleChange}
      onFocus={() => onFocus?.()}
      onInputChange={(nextValue, actionMeta) => {
        if (actionMeta.action === 'input-change') {
          onInputChange?.(nextValue)
        }
      }}
      onKeyDown={onKeyDown}
      options={options}
      placeholder={placeholder}
      ref={selectRef}
      unstyled
      value={selectedOption}
    />
  )
}
