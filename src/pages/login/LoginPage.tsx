import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../app/hooks'
import { routes } from '../../app/routes'
import { loginSucceeded } from '../../features/auth/auth-slice'
import { saveAuthSession } from '../../features/auth/auth-storage'
import { LoginForm } from '../../features/auth/components/LoginForm/index'
import { type LoginFormValues } from '../../features/auth/login-schema'
import { loginWithCredentials } from '../../features/auth/mock-auth-service'

interface RedirectLocationState {
  from?: {
    pathname?: string
  }
}

function getRedirectPath(state: unknown) {
  if (!state || typeof state !== 'object') {
    return routes.home
  }

  const { from } = state as RedirectLocationState

  return from?.pathname ?? routes.home
}

export function LoginPage() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  const [error, setError] = useState<string>()
  const redirectPath = getRedirectPath(location.state)

  function handleLogin(values: LoginFormValues) {
    setError(undefined)

    const session = loginWithCredentials(values)

    if (!session) {
      setError('Kullanıcı adı veya şifre hatalı')
      return
    }

    saveAuthSession(session)
    dispatch(loginSucceeded(session))
    navigate(redirectPath, { replace: true })
  }

  return (
    <main className="flex min-h-[calc(100vh-4rem)] flex-col bg-login-bg px-6 py-16">
      <LoginForm
        error={error}
        footer={
          <Link className="text-sm font-semibold text-avamon-red-soft" to={routes.home}>
            ← Ana sayfaya dön
          </Link>
        }
        onSubmit={handleLogin}
      />
    </main>
  )
}
