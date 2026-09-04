import { type PokemonStat } from '../../pokemon-types'

const statMaxValue = 160
const totalStatMaxValue = 720

function getStatBarColor(stat: PokemonStat) {
  if (stat.name === 'total') {
    return 'text-avamon-yellow'
  }

  const { value } = stat

  if (value >= 80) {
    return 'text-type-grass'
  }

  if (value >= 50) {
    return 'text-avamon-yellow'
  }

  return 'text-avamon-red'
}

function StatBar({ stat }: { stat: PokemonStat }) {
  const maxValue = stat.name === 'total' ? totalStatMaxValue : statMaxValue

  return (
    <div className="grid grid-cols-[4rem_3rem_1fr] items-center gap-4">
      <span className="text-right text-sm font-semibold text-muted">
        {stat.label}
      </span>
      <span
        className={`text-sm font-semibold ${
          stat.name === 'total' ? 'text-avamon-red' : 'text-ink'
        }`}
      >
        {stat.value}
      </span>
      <progress
        aria-label={`${stat.label}: ${stat.value}`}
        className={`pokemon-stat-progress h-2 w-full ${getStatBarColor(stat)}`}
        max={maxValue}
        value={stat.value}
      />
    </div>
  )
}

export function PokemonDetailStats({ stats }: { stats: PokemonStat[] }) {
  const totalStat: PokemonStat = {
    label: 'Toplam',
    name: 'total',
    value: stats.reduce((total, stat) => total + stat.value, 0),
  }

  return (
    <section aria-labelledby="pokemon-stats-title" className="space-y-5">
      <h2
        className="text-sm font-semibold uppercase tracking-wide text-muted"
        id="pokemon-stats-title"
      >
        TEMEL İSTATİSTİKLER
      </h2>
      <div className="space-y-4">
        {[...stats, totalStat].map((stat) => (
          <StatBar key={stat.name} stat={stat} />
        ))}
      </div>
    </section>
  )
}
