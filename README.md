# Avamon

Avamon is a React + TypeScript Pokedex case study application for the Avansas frontend developer process.

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
- Headless UI
- Vitest
- React Testing Library
- MSW
- Playwright

## Scripts

```bash
npm install
npm run dev
npm run lint
npm run test:run
npm run test:e2e
npm run build
```

## Architecture Notes

Redux Toolkit is used for predictable client/application state such as authentication, recently visited Pokemon, and persisted UI preferences.

TanStack Query is used for server state from PokeAPI: remote data, cache, loading/error states, retries, and request deduplication.

API requests use the native Fetch API through typed helper functions because the project does not require Axios interceptors or advanced transport behavior.

## AI Assistance

AI assistance was used during development. To keep the workflow transparent and team-oriented, repository-level AI guidelines are included in `AGENTS.md`.

Supporting documentation lives under `docs/ai` and records usage boundaries and technical decisions.
