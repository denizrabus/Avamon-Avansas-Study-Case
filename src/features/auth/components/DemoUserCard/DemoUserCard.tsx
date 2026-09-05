import { getPokemonSpriteUrl } from '../../../pokemon/pokemon-sprite-url'
import { type DemoUser } from '../../auth-types'

interface DemoUserCardProps {
  onSelect: (user: DemoUser) => void
  user: DemoUser
}

export function DemoUserCard({ onSelect, user }: DemoUserCardProps) {
  return (
    <button
      className="flex min-h-14 items-center gap-3 rounded-lg border border-line bg-surface px-4 py-3 text-left transition hover:border-avamon-red/40 hover:bg-avamon-red/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow"
      onClick={() => onSelect(user)}
      type="button"
    >
      <img
        alt=""
        className="size-8 shrink-0"
        src={getPokemonSpriteUrl(user.avatarPokemonId)}
      />
      <span className="min-w-0">
        <span className="block truncate text-sm font-black text-ink">
          {user.fullName}
        </span>
        <span className="block truncate text-xs font-semibold text-muted">
          {user.username} / {user.password}
        </span>
      </span>
    </button>
  )
}
