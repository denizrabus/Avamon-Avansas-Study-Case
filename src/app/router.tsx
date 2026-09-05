import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'
import { routes } from './routes'
import { AppLayout } from '../shared/components/layout/AppLayout'

const HomePage = lazy(() =>
  import('../pages/home/HomePage').then((module) => ({
    default: module.HomePage,
  }))
)
const LoginPage = lazy(() =>
  import('../pages/login/LoginPage').then((module) => ({
    default: module.LoginPage,
  }))
)
const PokemonListPage = lazy(() =>
  import('../pages/pokemon-list/PokemonListPage').then((module) => ({
    default: module.PokemonListPage,
  }))
)
const PokemonDetailPage = lazy(() =>
  import('../pages/pokemon-detail/PokemonDetailPage').then((module) => ({
    default: module.PokemonDetailPage,
  }))
)

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={routes.home} element={<HomePage />} />
        <Route path={routes.login} element={<LoginPage />} />
        <Route path={routes.pokemonList} element={<PokemonListPage />} />
        <Route
          element={
            <ProtectedRoute>
              <PokemonDetailPage />
            </ProtectedRoute>
          }
          path="/pokemon/:pokemonNameOrId"
        />
      </Route>
    </Routes>
  )
}
