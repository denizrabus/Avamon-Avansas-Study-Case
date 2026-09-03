import { Link } from 'react-router-dom'

import { AppLogo } from '../AppLogo'
import { useAppSelector } from '../../../../app/hooks'
import { routes } from '../../../../app/routes'
import { selectCurrentUser } from '../../../../features/auth/auth-selectors'

interface AppHeaderProps {
  onLogout: () => void
}

export function AppHeader({ onLogout }: AppHeaderProps) {
  const currentUser = useAppSelector(selectCurrentUser)

  return (
    <header className="sticky top-0 z-40 bg-avamon-red shadow-md">
      <div className="mx-auto flex min-h-16 max-w-page items-center gap-10">
        <AppLogo />

        <nav className="hidden items-center gap-6 text-sm  text-white tablet:flex">
          <Link to={routes.pokemonList}>Tüm Pokémonlar</Link>
        </nav>

        <div className="hidden flex-1 tablet:block">
          <input
            className="h-9 w-full max-w-sm rounded-full border-2 border-white/35 bg-white/15 px-5 text-sm font-semibold text-white outline-none placeholder:text-white/75 focus:border-avamon-yellow"
            placeholder="Pokémon ara..."
            type="search"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          {currentUser ? (
            <>
              <div className="hidden items-center gap-2 text-sm font-bold text-white phone-lg:flex">
                <span className="flex size-8 items-center justify-center rounded-full border-2 border-avamon-yellow bg-avamon-yellow/20">
                  <img
                    alt=""
                    className="size-6"
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentUser.avatarPokemonId}.png`}
                  />
                </span>
                <span>{currentUser.fullName}</span>
              </div>
              <button
                className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow"
                onClick={onLogout}
                type="button"
              >
                Çıkış
              </button>
            </>
          ) : (
            <Link
              className="rounded-full bg-avamon-yellow px-5 py-2.5 text-sm font-black text-ink transition hover:bg-[#ffd83d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              to={routes.login}
            >
              Giriş Yap
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}
