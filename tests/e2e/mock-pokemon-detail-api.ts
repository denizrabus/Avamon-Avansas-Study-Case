import { type Page } from '@playwright/test'

const emptyPixel =
  'data:image/gif;base64,R0lGODlhAQABAAAAACwAAAAAAQABAAA='

const pokemonById = new Map([
  [
    25,
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
  ],
  [
    172,
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
  ],
  [
    26,
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
  ],
])

const pokemonNameToId = new Map(
  Array.from(pokemonById.values()).map((pokemon) => [pokemon.name, pokemon.id])
)

const statNames = [
  'hp',
  'attack',
  'defense',
  'special-attack',
  'special-defense',
  'speed',
]

function getPokemonFixture(identifier: string) {
  const parsedId = Number(identifier)
  const id = Number.isInteger(parsedId)
    ? parsedId
    : pokemonNameToId.get(identifier)

  return pokemonById.get(id ?? 25) ?? pokemonById.get(25)
}

export async function mockPokemonDetailApi(page: Page) {
  await page.route(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[^/?]+\/?$/, async (
    route
  ) => {
    const identifier =
      route.request().url().match(/\/pokemon\/([^/?]+)\/?$/)?.[1] ?? 'pikachu'
    const pokemon = getPokemonFixture(identifier)

    await route.fulfill({
      contentType: 'application/json',
      json: {
        abilities: pokemon.abilities.map((ability) => ({
          ability: {
            name: ability.name,
            url: `https://pokeapi.co/api/v2/ability/${ability.name}/`,
          },
          is_hidden: ability.isHidden,
        })),
        base_experience: pokemon.baseExperience,
        height: pokemon.height,
        id: pokemon.id,
        name: pokemon.name,
        species: {
          name: pokemon.name,
          url: `https://pokeapi.co/api/v2/pokemon-species/${pokemon.speciesId}/`,
        },
        sprites: {
          back_default: emptyPixel,
          back_shiny: emptyPixel,
          front_default: emptyPixel,
          front_shiny: emptyPixel,
          other: {
            'official-artwork': {
              front_default: emptyPixel,
            },
          },
        },
        stats: pokemon.stats.map((value, index) => ({
          base_stat: value,
          stat: {
            name: statNames[index],
          },
        })),
        types: [
          {
            type: {
              name: pokemon.type,
            },
          },
        ],
        weight: pokemon.weight,
      },
    })
  })

  await page.route(
    /https:\/\/pokeapi\.co\/api\/v2\/pokemon-species\/\d+\/?$/,
    async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        json: {
          evolution_chain: {
            url: 'https://pokeapi.co/api/v2/evolution-chain/10/',
          },
          flavor_text_entries: [
            {
              flavor_text:
                'When several of these Pokemon gather, their electricity could build and cause lightning storms.',
              language: {
                name: 'en',
              },
            },
          ],
        },
      })
    }
  )

  await page.route(
    'https://pokeapi.co/api/v2/evolution-chain/10/',
    async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        json: {
          chain: {
            evolves_to: [
              {
                evolves_to: [
                  {
                    evolves_to: [],
                    species: {
                      name: 'raichu',
                      url: 'https://pokeapi.co/api/v2/pokemon-species/26/',
                    },
                  },
                ],
                species: {
                  name: 'pikachu',
                  url: 'https://pokeapi.co/api/v2/pokemon-species/25/',
                },
              },
            ],
            species: {
              name: 'pichu',
              url: 'https://pokeapi.co/api/v2/pokemon-species/172/',
            },
          },
        },
      })
    }
  )
}
