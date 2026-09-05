import { Suspense } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

import { AppHeader } from '../AppHeader'
import { RouteLoadingFallback } from '../RouteLoadingFallback'
import { useAppDispatch } from '../../../../app/hooks'
import { routes } from '../../../../app/routes'
import { logout } from '../../../../features/auth/auth-slice'
import { clearAuthSession } from '../../../../features/auth/auth-storage'

export function AppLayout() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  function handleLogout() {
    clearAuthSession()
    dispatch(logout())
    navigate(routes.home)
  }

  return (
    <>
      <AppHeader onLogout={handleLogout} />
      <Suspense fallback={<RouteLoadingFallback />}>
        <Outlet />
      </Suspense>
    </>
  )
}
