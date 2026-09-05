import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { AppHeaderDesktopActions } from './AppHeaderDesktopActions'
import { AppHeaderMobileMenu } from './AppHeaderMobileMenu'
import { AppHeaderUserAvatar } from './AppHeaderUserAvatar'
import { AppLogo } from '../AppLogo'
import { useAppSelector } from '../../../../app/hooks'
import { routes } from '../../../../app/routes'
import { selectCurrentUser } from '../../../../features/auth/auth-selectors'
import { PokemonSearchSelect } from '../../../../features/pokemon/components/PokemonSearchSelect'

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
      <div className="mx-auto flex min-h-16 max-w-page items-center gap-6 px-6 tablet:gap-10 wide:max-w-wide-page">
        <AppLogo />

        <nav className="hidden items-center gap-6 text-sm  text-white tablet:flex">
          <Link to={routes.pokemonList}>Tüm Pokémonlar</Link>
        </nav>

        <div className="hidden flex-1 tablet:block">
          <PokemonSearchSelect className="w-full max-w-sm" />
        </div>

        <AppHeaderDesktopActions
          currentUser={currentUser}
          onLogout={handleLogout}
        />

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
            <AppHeaderUserAvatar avatarPokemonId={currentUser.avatarPokemonId} />
          ) : (
            <Menu aria-hidden className="size-5" />
          )}
        </button>
      </div>

      {isMobileMenuOpen ? (
        <AppHeaderMobileMenu
          currentUser={currentUser}
          onClose={closeMobileMenu}
          onLogout={handleLogout}
        />
      ) : null}
    </header>
  )
}
