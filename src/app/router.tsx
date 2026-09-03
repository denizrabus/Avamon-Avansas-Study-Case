import { Route, Routes } from 'react-router-dom'

import { ProtectedRoute } from './ProtectedRoute'
import { routes } from './routes'
import { HomePage } from '../pages/home/HomePage'
import { LoginPage } from '../pages/login/LoginPage'
import { PokemonDetailPage } from '../pages/pokemon-detail/PokemonDetailPage'
import { PokemonListPage } from '../pages/pokemon-list/PokemonListPage'
import { AppLayout } from '../shared/components/layout/AppLayout'

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
