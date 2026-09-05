import { PokemonImage } from '../PokemonImage'
import { type PokemonSprite } from '../../pokemon-types'

export function PokemonSprites({ sprites }: { sprites: PokemonSprite[] }) {
  if (sprites.length === 0) {
    return null
  }

  return (
    <section aria-labelledby="pokemon-sprites-title" className="space-y-5">
      <h2
        className="text-sm font-semibold uppercase tracking-wide text-muted"
        id="pokemon-sprites-title"
      >
        SPRITES
      </h2>
      <div className="grid grid-cols-4 gap-2 tablet:flex tablet:flex-wrap tablet:gap-3">
        {sprites.map((sprite) => (
          <div
            className="grid aspect-square place-items-center rounded-card bg-surface p-2 tablet:size-28 tablet:p-3"
            key={`${sprite.label}-${sprite.imageUrl}`}
          >
            <PokemonImage
              alt={sprite.label}
              className="size-14 phone-lg:size-16 tablet:size-24"
              fallbackClassName="size-10"
              imageClassName="size-full object-contain"
              src={sprite.imageUrl}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
