import { Link } from 'react-router-dom'

import { AppHeaderUserAvatar } from './AppHeaderUserAvatar'
import { routes } from '../../../../app/routes'
import { type AuthenticatedUser } from '../../../../features/auth/auth-types'

interface AppHeaderDesktopActionsProps {
  currentUser: AuthenticatedUser | null
  onLogout: () => void
}

export function AppHeaderDesktopActions({
  currentUser,
  onLogout,
}: AppHeaderDesktopActionsProps) {
  return (
    <div className="ml-auto hidden items-center gap-3 tablet:flex">
      {currentUser ? (
        <>
          <div className="flex items-center gap-2 text-sm font-bold text-white">
            <AppHeaderUserAvatar
              avatarPokemonId={currentUser.avatarPokemonId}
            />
            <span>{currentUser.fullName}</span>
          </div>
          <button
            className="rounded-full bg-white/20 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/25 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-avamon-yellow"
            onClick={onLogout}
            type="button"
          >
            Logout
          </button>
        </>
      ) : (
        <Link
          className="rounded-full bg-avamon-yellow px-5 py-2.5 text-sm font-bold text-ink transition hover:bg-[#ffd83d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          to={routes.login}
        >
          Login
        </Link>
      )}
    </div>
  )
}
