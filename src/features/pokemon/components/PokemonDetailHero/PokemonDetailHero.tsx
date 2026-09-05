import { PokemonImage } from '../PokemonImage'
import { TypeBadge } from '../TypeBadge'
import {
  formatPokemonName,
  formatPokemonNumber,
} from '../../pokemon-list-utils'
import { pokemonTypeDetailHeroBackgroundClasses } from '../../pokemon-type-styles'
import { type PokemonDetail } from '../../pokemon-types'

function formatMeasurement(value: number, unit: string) {
  return `${value.toFixed(1)} ${unit}`
}

function DetailMetric({
  label,
  value,
}: {
  label: string
  value: string | number
}) {
  return (
    <div className="grid min-h-20 min-w-24 place-items-center rounded-card border border-line bg-surface px-5 py-3 text-center">
      <strong className="text-xl font-bold text-ink tablet:text-2xl">
        {value}
      </strong>
      <span className="text-xs font-semibold text-muted">{label}</span>
    </div>
  )
}

export function PokemonDetailHero({ pokemon }: { pokemon: PokemonDetail }) {
  const primaryType = pokemon.types[0] ?? 'normal'

  return (
    <section className={pokemonTypeDetailHeroBackgroundClasses[primaryType]}>
      <div className="mx-auto grid max-w-page gap-6 px-6 pb-8 tablet:grid-cols-[22rem_1fr] tablet:items-center tablet:gap-10 desktop:py-10 wide:max-w-wide-page">
        <div className="grid min-h-56 place-items-center tablet:min-h-80">
          <PokemonImage
            alt={formatPokemonName(pokemon.name)}
            className="size-full max-h-72 tablet:max-h-96"
            fallbackClassName="size-32"
            imageClassName="h-full max-h-72 w-full object-contain tablet:max-h-96"
            priority
            src={pokemon.imageUrl}
          />
        </div>

        <div>
          <p className="text-base font-bold text-muted">
            {formatPokemonNumber(pokemon.id)}
          </p>
          <h1 className="mt-1 text-4xl font-bold leading-none text-ink tablet:text-5xl">
            {formatPokemonName(pokemon.name)}
          </h1>
          <div className="mt-4 flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <TypeBadge key={type} type={type} />
            ))}
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed italic text-muted tablet:text-lg">
            {pokemon.description}
          </p>
          <div className="mt-8 flex flex-wrap gap-4 tablet:gap-6">
            <DetailMetric
              label="Boy"
              value={formatMeasurement(pokemon.heightInMeters, 'm')}
            />
            <DetailMetric
              label="Kilo"
              value={formatMeasurement(pokemon.weightInKilograms, 'kg')}
            />
            <DetailMetric
              label="Taban XP"
              value={pokemon.baseExperience ?? '-'}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
