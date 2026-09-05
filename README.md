# Avamon

Avamon is a React + TypeScript Pokédex case study application built for the Avansas frontend developer process.

The application uses [PokeAPI](https://pokeapi.co/) as the remote data source and covers the requested home, login, list, autocomplete, and protected detail flows.

## Tech Stack

- Vite
- React
- TypeScript
- React Router
- Redux Toolkit
- TanStack Query
- Tailwind CSS
- React Hook Form
- Zod
- React Select
- Vitest
- React Testing Library
- MSW
- Playwright

## Getting Started

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

Open the app at:

```text
http://localhost:5173
```

## Available Scripts

```bash
npm run dev       # Start the Vite development server
npm run lint      # Run Oxlint
npm run test:run  # Run Vitest unit and component tests
npm run test:e2e  # Run Playwright end-to-end tests
npm run build     # Type-check and create a production build
npm run preview   # Preview the production build locally
```

## Demo Users

The case does not require a backend authentication service, so demo users are kept in code and authenticated through a typed mock auth service.

| Name | Username | Password |
| --- | --- | --- |
| Güven Altuntaş | `guven` | `altuntas` |
| Emre Baysal | `emre` | `baysal` |
| Aykut Erdoğan | `aykut` | `erdogan` |
| Super Admin | `admin` | `admin` |

## Implemented Features

- Home page with a reference-inspired welcome hero.
- Popular Pokémon section with 3 random Pokémon.
- Recently Visited section after the user has viewed 3 Pokémon detail pages.
- Login page with required username/password validation.
- Demo user cards that fill the login form automatically.
- Protected Pokémon detail page.
- Redirect back to the originally requested detail page after login.
- Header autocomplete search with a minimum of 2 characters and maximum of 8 results.
- Autocomplete options with Pokémon image, name, and number.
- Exact-match search submit navigation.
- All Pokémon list with 24 items per page.
- Type filtering.
- Sorting by number and name.
- Grid/list display mode selection.
- Remembered display mode across visits.
- URL-backed list state for page, type filter, and sort order.
- Loading, error, and image fallback states.
- Responsive layouts targeting the requested widths: 360px, 412px, 1024px, 1280px, and 2560px.
- Route-level code splitting (`React.lazy` + `Suspense`) for Home, Login, List, and Detail pages.
- Playwright smoke coverage for all five requested viewport widths.

## Project Structure

```text
src/
  app/                    # App providers, routes, store, protected routing
  assets/                 # Static assets imported by React
  features/
    auth/                 # Auth state, mock service, schemas, auth components
    pokemon/              # PokeAPI layer, query hooks, mappers, Pokémon components
  pages/                  # Route-level pages
  shared/
    components/           # Shared UI, brand, and layout components
    utils/                # Shared utilities
  test-setup.ts           # Vitest setup
tests/
  e2e/                    # Playwright tests and network mocks
docs/
  ai/                     # AI usage notes and technical decisions
```

Reusable React components use a folder-per-component structure:

```text
ComponentName/
  ComponentName.tsx
  ComponentName.test.tsx
  index.ts
```

Feature-level logic such as slices, schemas, mappers, and utilities stays at the feature root when that keeps the module easier to scan.

## Data And API Flow

Avamon uses [PokeAPI](https://pokeapi.co/) as the only remote data source. API calls are kept in `src/features/pokemon/pokemon-api.ts`, query hooks are kept in `src/features/pokemon/pokemon-query.ts`, and raw API responses are converted into UI-friendly models in `src/features/pokemon/pokemon-mappers.ts`.

### PokeAPI Endpoints

The app uses these PokeAPI endpoints:

- `/pokemon?limit=2000&offset=0` to load the available Pokémon references.
- `/type/{type}` to load Pokémon references for a selected type filter.
- `/pokemon/{idOrName}` to load summary and detail data for a Pokémon.
- `pokemon.species.url` to load species data, including the English description and evolution chain URL.
- `species.evolution_chain.url` to load and flatten the evolution chain for the detail page.

### List Page Flow

The list page first loads Pokémon references instead of fetching all detailed Pokémon records at once. Each reference contains the Pokémon name, URL, and parsed ID.

The page then applies type filtering, sorting, and pagination before requesting detailed summaries for the visible page items. This keeps the list page closer to an e-commerce product listing flow: the app can show stable pagination and filters while only enriching the currently visible cards or rows.

List state is split by responsibility:

- Page, type filter, and sort order are stored in URL search params.
- Grid/list display mode is stored in Redux and local storage as a personal UI preference.
- Fetched Pokémon references and summaries are cached by TanStack Query.

### Detail Page Flow

The detail page loads `/pokemon/{idOrName}` first. The response includes basic profile data, stats, abilities, sprites, types, and the species URL.

After that, the app requests the species resource and then the evolution chain resource. These responses are combined into a single `PokemonDetail` model before being rendered by the detail components.

The detail page uses this combined model for:

- hero content
- type badges
- description
- height, weight, and base XP
- base stats
- abilities
- sprites
- evolution chain

### Home Page Flow

The home page uses Pokémon references and summaries for the featured section below the hero.

Before the user has visited 3 Pokémon detail pages, the section is shown as `Popular Pokémon` and displays 3 random Pokémon from the available references. After 3 detail page visits, the section changes to `Recently Visited` and renders the last 3 visited Pokémon from Redux/localStorage.

The hero image is stored locally in `src/assets/images` to keep the first viewport stable and avoid a late-loading remote hero asset.

### Autocomplete Flow

The header autocomplete uses the Pokémon reference list. Search starts after at least 2 characters and shows up to 8 matching results.

Each result includes:

- Pokémon image
- Pokémon name
- formatted Pokémon number

Selecting a result navigates to the matching detail page. Pressing Enter also navigates when the current input exactly matches a Pokémon name.

### Data Mapping And Fallbacks

PokeAPI responses are not used directly in components. They are mapped into local TypeScript models so the UI can stay stable even if the API shape is verbose.

The image strategy is:

1. Use official artwork when available.
2. Fall back to Home/front sprite data.
3. Fall back to a generated official artwork URL when possible.
4. Show the local Poké Ball fallback if the remote image cannot be loaded.

This protects the card, row, autocomplete, and detail layouts from broken or missing remote images.

## Architecture Decisions

### State Management

Redux Toolkit is used for deterministic client/application state:

- authenticated user session
- recently visited Pokémon
- persisted list display mode

Remote PokeAPI data is intentionally not stored in Redux.

### Server State

TanStack Query is used for server state:

- Pokémon references
- filtered Pokémon references
- Pokémon summaries
- Pokémon details
- loading and error states
- cache and request deduplication

This keeps async API behavior separate from client UI preferences.

### API Layer

API requests use the native Fetch API through typed helper functions in `src/features/pokemon/pokemon-api.ts`.

Axios was intentionally avoided because this case does not require interceptors, token refresh, request cancellation wrappers, or custom transport behavior.

### Forms

React Hook Form manages login form state. Zod defines the validation schema so required-field rules are typed, reusable, and testable outside the component.

### Styling

Tailwind CSS is used with theme tokens defined in `src/index.css`. Pokémon type colors and type-based backgrounds are centralized in `src/features/pokemon/pokemon-type-styles.ts` so list rows, cards, and badges do not duplicate style maps.

### Autocomplete And Selects

React Select is used through the shared `SelectInput` wrapper. The wrapper keeps select/autocomplete behavior consistent while still allowing separate visual variants for the header search and surface filters.

## Persistence

- Auth session is stored in local storage.
- Recently visited Pokémon are stored in Redux and local storage.
- Display mode is stored in Redux and local storage.
- Page, type filter, and sort order are stored in URL search params so the list page survives refresh and can be shared.

## Submission Checklist

The implementation covers the main case requirements:

- Home page with welcome highlight area.
- Login page with demo user flow.
- Protected Pokémon detail page.
- All Pokémon list with pagination, filtering, sorting, and grid/list modes.
- Header autocomplete with image, name, number, keyboard submit, and detail navigation.
- Popular Pokémon section before 3 detail visits.
- Recently Visited section after 3 detail visits.
- Responsive layouts for the requested viewport widths: 360px, 412px, 1024px, 1280px, and 2560px.
- README setup notes, technical decisions, trade-offs, and AI assistance documentation.

## Testing Strategy

Vitest covers deterministic logic and component behavior:

- formatting helpers
- pagination helpers
- Redux slices
- Zod schemas
- reusable UI components
- login behavior
- Pokémon detail sections

Playwright covers critical user journeys:

- login with a demo user
- protected route redirect and return after login
- autocomplete result rendering and navigation
- exact-match search submit
- list filtering, pagination, and display mode persistence
- home Popular Pokémon / Recently Visited behavior

Network-dependent browser flows are mocked in Playwright so the tests remain stable.

## Trade-Offs

- PokeAPI does not provide a single endpoint with all card details, so the list page first loads references and then fetches the visible page summaries.
- The app keeps page, filter, and sort in the URL, while display mode is stored locally because it is a personal UI preference.
- Popular Pokémon are randomized from the loaded references. Recently visited Pokémon replace them once the user has viewed 3 detail pages.
- The hero image is stored locally to keep the first viewport stable and avoid a visible late image load.
- React Select adds bundle weight, but it provides reliable keyboard, focus, and menu behavior for autocomplete and select controls.
- Route-level code splitting reduces each page's own JS, but `react-select` still ships in the shared entry chunk because the header search (`AppHeader` → `PokemonSearchSelect`) mounts on every route through `AppLayout`. Lazy-loading the search control itself was intentionally skipped to avoid a visible flash in a control that is always in the first viewport.
- Automated responsive coverage (`tests/e2e/responsive.spec.ts`) checks that critical flows render and are reachable at each required width; pixel-level layout correctness is still confirmed through manual QA at each width.

## Known Limitations

- Authentication is intentionally mocked because the case does not provide a real auth backend.
- PokeAPI image availability differs between Pokémon forms, so the app includes local image fallback handling.
- Some Pokémon have high API IDs because PokeAPI includes forms and variants in the `/pokemon` resource.
- `react-select` still ships in the shared entry chunk because the header search mounts on every route (see Trade-Offs). Route-level code splitting keeps every other page's own code out of that chunk.

## AI Assistance

AI assistance was used during development.

Team-oriented AI configuration and documentation are included in the repository:

- `AGENTS.md` defines shared engineering, architecture, naming, styling, and testing rules.
- `CLAUDE.md` provides a Claude-compatible entry point that redirects to the same canonical rules.
- `.cursor/rules/project-rules.mdc` provides a Cursor-compatible entry point.
- `docs/ai/AI_USAGE.md` explains how AI assistance is allowed to participate in the workflow.
- `docs/ai/AI_PIPELINE.md` describes the expected AI-assisted development loop.
- `docs/ai/DECISIONS.md` records technical decisions and trade-offs that matter for future contributors.

Human review owns final product decisions, architecture trade-offs, and submission quality.

## Final Verification

Before submission, run:

```bash
npm run lint
npm run test:run
npm run build
npm run test:e2e
```
