import { type PokemonReference } from '../../features/pokemon/pokemon-types'

interface RandomPokemonReferenceOptions {
  count: number
  excludeIds?: number[]
  random?: () => number
}

export function getRandomPokemonReferences(
  references: PokemonReference[],
  {
    count,
    excludeIds = [],
    random = Math.random,
  }: RandomPokemonReferenceOptions
) {
  const excludedIdSet = new Set(excludeIds)
  const remainingReferences = references.filter(
    (reference) => !excludedIdSet.has(reference.id)
  )
  const selectedReferences: PokemonReference[] = []

  while (selectedReferences.length < count && remainingReferences.length > 0) {
    const selectedIndex = Math.floor(random() * remainingReferences.length)
    const selectedReference = remainingReferences.splice(selectedIndex, 1)[0]

    if (selectedReference) {
      selectedReferences.push(selectedReference)
    }
  }

  return selectedReferences
}
