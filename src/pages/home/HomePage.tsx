import { Link } from 'react-router-dom'

import { routes } from '../../app/routes'

export function HomePage() {
  return (
    <main className="min-h-screen bg-page-bg">
      <section className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-16">
        <p className="text-sm font-semibold uppercase text-avamon-red">Avamon</p>
        <h1 className="max-w-2xl text-5xl font-black text-ink">
          Explore All Pokemon
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Search, filter, and explore the details of 1,000+ Pokemon.
        </p>
        <Link
          className="mt-4 inline-flex w-fit rounded-lg bg-avamon-yellow px-5 py-3 font-bold text-ink"
          to={routes.pokemonList}
        >
          All Pokemon
        </Link>
      </section>
    </main>
  )
}
