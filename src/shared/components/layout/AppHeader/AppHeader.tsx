import { Menu, X } from 'lucide-react'
import { useState } from 'react'
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  function closeMobileMenu() {
    setIsMobileMenuOpen(false)
  }

  function handleLogout() {
    closeMobileMenu()
    onLogout()
  }

  return (
    <header className="sticky top-0 z-40 bg-avamon-red shadow-md">
      <div className="mx-auto flex min-h-16 max-w-page items-center gap-6 px-6 tablet:gap-10">
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

        <div className="ml-auto hidden items-center gap-3 tablet:flex">
          {currentUser ? (
            <>
              <div className="flex items-center gap-2 text-sm font-bold text-white">
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
                onClick={handleLogout}
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

        <button
          aria-expanded={isMobileMenuOpen}
          aria-label={isMobileMenuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          className="ml-auto inline-flex size-10 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow tablet:hidden"
          onClick={() => setIsMobileMenuOpen((isOpen) => !isOpen)}
          type="button"
        >
          {isMobileMenuOpen ? (
            <X aria-hidden className="size-5" />
          ) : currentUser ? (
            <span className="flex size-8 items-center justify-center rounded-full border-2 border-avamon-yellow bg-avamon-yellow/20">
              <img
                alt=""
                className="size-6"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentUser.avatarPokemonId}.png`}
              />
            </span>
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <div
          aria-label="Mobil menü"
          className="border-t border-white/15 bg-avamon-red px-6 pb-5 pt-4 tablet:hidden"
          role="region"
        >
          <div className="mx-auto flex max-w-page flex-col gap-4">
            <nav className="flex flex-col gap-3 text-sm font-bold text-white">
              <Link onClick={closeMobileMenu} to={routes.pokemonList}>
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
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-avamon-yellow bg-avamon-yellow/20">
                    <img
                      alt=""
                      className="size-6"
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${currentUser.avatarPokemonId}.png`}
                    />
                  </span>
                  <span className="truncate">{currentUser.fullName}</span>
                </div>
                <button
                  className="shrink-0 rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow"
                  onClick={handleLogout}
                  type="button"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <Link
                className="inline-flex w-fit rounded-full bg-avamon-yellow px-5 py-2.5 text-sm font-black text-ink transition hover:bg-[#ffd83d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                onClick={closeMobileMenu}
                to={routes.login}
              >
                Giriş Yap
              </Link>
            )}
          </div>
        </div>
      ) : null}
    </header>
  )
}
