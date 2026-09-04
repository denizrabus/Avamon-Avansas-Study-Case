import { type PokemonAbility } from '../../pokemon-types'

function formatAbilityName(name: string) {
  return name
    .split('-')
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(' ')
}

export function PokemonAbilities({
  abilities,
}: {
  abilities: PokemonAbility[]
}) {
  return (
    <section aria-labelledby="pokemon-abilities-title" className="space-y-5">
      <h2
        className="text-sm font-semibold uppercase tracking-wide text-muted"
        id="pokemon-abilities-title"
      >
        YETENEKLER
      </h2>
      <div className="flex flex-wrap gap-3">
        {abilities.map((ability) => (
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
  )
}
