import { useParams } from 'react-router-dom'

export function PokemonDetailPage() {
  const { pokemonNameOrId } = useParams()

  return (
    <main className="min-h-screen bg-page-bg px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <p className="text-sm font-semibold text-muted">Pokemon Detail</p>
        <h1 className="text-4xl font-black capitalize text-ink">
          {pokemonNameOrId}
        </h1>
      </section>
    </main>
  )
}
