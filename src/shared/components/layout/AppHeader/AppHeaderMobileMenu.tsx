import { Link } from 'react-router-dom'

import { AppHeaderUserAvatar } from './AppHeaderUserAvatar'
import { routes } from '../../../../app/routes'
import { type AuthenticatedUser } from '../../../../features/auth/auth-types'

interface AppHeaderMobileMenuProps {
  currentUser: AuthenticatedUser | null
  onClose: () => void
  onLogout: () => void
}

export function AppHeaderMobileMenu({
  currentUser,
  onClose,
  onLogout,
}: AppHeaderMobileMenuProps) {
  return (
    <div
      aria-label="Mobil menü"
      className="border-t border-white/15 bg-avamon-red px-6 pb-5 pt-4 tablet:hidden"
      role="region"
    >
      <div className="mx-auto flex max-w-page flex-col gap-4">
        <nav className="flex flex-col gap-3 text-sm font-bold text-white">
          <Link onClick={onClose} to={routes.pokemonList}>
            Tüm Pokémonlar
          </Link>
        </nav>

        <input
          className="h-10 rounded-full border-2 border-white/35 bg-white/15 px-5 text-sm font-semibold text-white outline-none placeholder:text-white/75 focus:border-avamon-yellow"
          placeholder="Pokémon ara..."
          type="search"
        />

        {currentUser ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2 text-sm font-bold text-white">
              <AppHeaderUserAvatar
                avatarPokemonId={currentUser.avatarPokemonId}
              />
              <span className="truncate">{currentUser.fullName}</span>
            </div>
            <button
              className="shrink-0 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow"
              onClick={onLogout}
              type="button"
            >
              Çıkış
            </button>
          </div>
        ) : (
          <Link
            className="inline-flex w-fit rounded-full bg-avamon-yellow px-5 py-2.5 text-sm font-black text-ink transition hover:bg-[#ffd83d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            onClick={onClose}
            to={routes.login}
          >
            Giriş Yap
          </Link>
        )}
      </div>
    </div>
  )
}
