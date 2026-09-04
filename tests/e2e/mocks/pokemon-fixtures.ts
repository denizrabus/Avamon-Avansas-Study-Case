export const emptyPixel =
  'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='

export interface PokemonListFixture {
  id: number
  name: string
  type: string
}

export interface PokemonDetailFixture extends PokemonListFixture {
  abilities: Array<{
    isHidden: boolean
    name: string
  }>
  baseExperience: number
  height: number
  speciesId: number
  stats: number[]
  weight: number
}

export const statNames = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
]

export const pokemonListFixtures: PokemonListFixture[] = [
  { id: 1, name: 'bulbasaur', type: 'grass' },
  { id: 2, name: 'ivysaur', type: 'grass' },
  { id: 3, name: 'venusaur', type: 'grass' },
  { id: 4, name: 'charmander', type: 'fire' },
  { id: 5, name: 'charmeleon', type: 'fire' },
  { id: 6, name: 'charizard', type: 'fire' },
  { id: 7, name: 'squirtle', type: 'water' },
  { id: 8, name: 'wartortle', type: 'water' },
  { id: 9, name: 'blastoise', type: 'water' },
  { id: 10, name: 'caterpie', type: 'bug' },
  { id: 11, name: 'metapod', type: 'bug' },
  { id: 12, name: 'butterfree', type: 'bug' },
  { id: 13, name: 'weedle', type: 'bug' },
  { id: 14, name: 'kakuna', type: 'bug' },
  { id: 15, name: 'beedrill', type: 'bug' },
  { id: 16, name: 'pidgey', type: 'normal' },
  { id: 17, name: 'pidgeotto', type: 'normal' },
  { id: 18, name: 'pidgeot', type: 'normal' },
  { id: 19, name: 'rattata', type: 'normal' },
  { id: 20, name: 'raticate', type: 'normal' },
  { id: 21, name: 'spearow', type: 'normal' },
  { id: 22, name: 'fearow', type: 'normal' },
  { id: 23, name: 'ekans', type: 'poison' },
  { id: 24, name: 'arbok', type: 'poison' },
  { id: 25, name: 'pikachu', type: 'electric' },
]

export const pokemonDetailFixtures: PokemonDetailFixture[] = [
  {
    abilities: [
      { isHidden: false, name: 'static' },
      { isHidden: true, name: 'lightning-rod' },
    ],
    baseExperience: 112,
    height: 4,
    id: 25,
    name: 'pikachu',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10080,
    name: 'pikachu-rock-star',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10081,
    name: 'pikachu-belle',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10082,
    name: 'pikachu-pop-star',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10083,
    name: 'pikachu-phd',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10084,
    name: 'pikachu-libre',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10085,
    name: 'pikachu-cosplay',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10094,
    name: 'pikachu-original-cap',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 112,
    height: 4,
    id: 10095,
    name: 'pikachu-hoenn-cap',
    speciesId: 25,
    stats: [35, 55, 40, 50, 50, 90],
    type: 'electric',
    weight: 60,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 41,
    height: 3,
    id: 172,
    name: 'pichu',
    speciesId: 172,
    stats: [20, 40, 15, 35, 35, 60],
    type: 'electric',
    weight: 20,
  },
  {
    abilities: [{ isHidden: false, name: 'static' }],
    baseExperience: 243,
    height: 8,
    id: 26,
    name: 'raichu',
    speciesId: 26,
    stats: [60, 90, 55, 90, 80, 110],
    type: 'electric',
    weight: 300,
  },
]
