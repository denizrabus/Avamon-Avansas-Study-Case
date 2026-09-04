import { type Page } from '@playwright/test'

import {
  emptyPixel,
  type PokemonListFixture,
  pokemonDetailFixtures,
  pokemonListFixtures,
  statNames,
} from './pokemon-fixtures'

const defaultPokemonDetail = pokemonDetailFixtures[0]

if (!defaultPokemonDetail) {
  throw new Error('Default pokemon detail fixture is missing')
}

const pokemonDetailById = new Map(
  pokemonDetailFixtures.map((pokemon) => [pokemon.id, pokemon])
)

const pokemonDetailNameToId = new Map(
  pokemonDetailFixtures.map((pokemon) => [pokemon.name, pokemon.id])
)

function toPokemonResource(pokemon: PokemonListFixture) {
  return {
    name: pokemon.name,
    url: `https://pokeapi.co/api/v2/pokemon/${pokemon.id}/`,
  }
}

function getPokemonDetailFixture(identifier: string) {
  const parsedId = Number(identifier)
  const id = Number.isInteger(parsedId)
    ? parsedId
    : pokemonDetailNameToId.get(identifier)

  return (
    pokemonDetailById.get(id ?? defaultPokemonDetail.id) ??
    defaultPokemonDetail
  )
}

async function mockPokemonReferenceList(
  page: Page,
  fixtures: PokemonListFixture[]
) {
  await page.route(
    'https://pokeapi.co/api/v2/pokemon?limit=2000&offset=0',
    async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        json: {
          count: fixtures.length,
          results: fixtures.map(toPokemonResource),
        },
      })
    }
  )
}

export async function mockPokemonListApi(page: Page) {
  await page.route('https://pokeapi.co/api/v2/type/fire', async (route) => {
    await route.fulfill({
      contentType: 'application/json',
      json: {
        pokemon: pokemonListFixtures
          .filter((pokemon) => pokemon.type === 'fire')
          .map((pokemon) => ({
            pokemon: toPokemonResource(pokemon),
          })),
      },
    })
  })

  await mockPokemonReferenceList(page, pokemonListFixtures)

  await page.route(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/\d+\/?$/, async (
    route
  ) => {
    const id = Number(route.request().url().match(/\/pokemon\/(\d+)\/?$/)?.[1])
    const pokemon = pokemonListFixtures.find((item) => item.id === id)

    if (!pokemon) {
      await route.fulfill({ status: 404 })
      return
    }

    await route.fulfill({
      contentType: 'application/json',
      json: {
        id: pokemon.id,
        name: pokemon.name,
        sprites: {
          front_default: emptyPixel,
          other: {
            'official-artwork': {
              front_default: emptyPixel,
            },
          },
        },
        types: [
          {
            type: {
              name: pokemon.type,
            },
          },
        ],
      },
    })
  })
}

export async function mockPokemonDetailApi(page: Page) {
  await mockPokemonReferenceList(page, pokemonDetailFixtures)

  await page.route(/https:\/\/pokeapi\.co\/api\/v2\/pokemon\/[^/?]+\/?$/, async (
    route
  ) => {
    const identifier =
      route.request().url().match(/\/pokemon\/([^/?]+)\/?$/)?.[1] ?? 'pikachu'
    const pokemon = getPokemonDetailFixture(identifier)

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
