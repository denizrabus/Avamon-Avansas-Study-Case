# Avamon Agent Guidelines

Avamon is a React + TypeScript Pokedex case study for the Avansas frontend developer process.

These rules are the canonical source for AI-assisted development in this repository. Tool-specific files should point here instead of duplicating the rules.

## Tech Stack

- Vite
- React
- TypeScript strict mode
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

## Architecture Rules

- Server state belongs to TanStack Query.
- Client/application state belongs to Redux Toolkit.
- API requests use the native Fetch API through typed helper functions.
- Shared UI components live in `src/shared/components/ui`.
- Feature-specific components live under `src/features`.
- Route-level pages live under `src/pages`.
- Keep business logic in testable utilities or feature modules instead of embedding it deeply in components.
- Reusable and feature components use a folder-per-component structure.
- Each component folder contains `ComponentName.tsx`, `ComponentName.test.tsx`, and `index.ts`.
- Feature-level logic files such as slices, schemas, types, and utilities may stay at the feature root.
- Pokemon type visual styles must be centralized in `src/features/pokemon/pokemon-type-styles.ts`; components must not define local type-to-style maps.

## Styling Rules

- Tailwind v4 theme tokens live in `src/index.css` under the `@theme` directive.
- Use theme utilities such as `bg-avamon-red`, `bg-page-bg`, `text-ink`, and `text-muted` before arbitrary hex values.
- React component files use PascalCase and match the component name.
- Folders and non-component files use kebab-case.
- Target the case viewport widths during QA: 360px, 412px, 1024px, 1280px, and 2560px.

## State Rules

- Redux stores deterministic client state: auth user, recently visited Pokemon, and persisted UI preferences.
- TanStack Query stores remote PokeAPI data, loading state, error state, request deduplication, and cache.
- URL search params store list-page state that should survive refresh and be shareable: page, type, and sort.
- Local storage may be used for auth session, recently visited Pokemon, and display mode.

## Coding Rules

- Use TypeScript for all source files.
- Do not use `any`; use `unknown` and narrow when needed.
- Prefer named exports.
- Use PascalCase for React component files and match the component name to the file name.
- Use kebab-case for folders and non-component files.
- Keep files focused; split a file before it becomes hard to scan.
- Use Tailwind utilities for styling.
- Do not use inline styles unless an external library requires them.
- Do not add dependencies without updating `docs/ai/DECISIONS.md` and the README when relevant.

## Testing Rules

- Use TDD for critical logic and user flows.
- Use Vitest for utilities, Redux slices, validation schemas, and component behavior.
- Use Playwright for critical end-to-end user journeys.
- Prefer user-visible assertions over implementation details.
- Mock network behavior with MSW in component/integration tests.
- New reusable UI components should include focused component tests before or alongside implementation.
- Test accessibility-facing behavior: roles, labels, disabled states, error messages, and user interactions.

## AI Assistance Rules

- AI-generated changes must follow this document.
- AI must not introduce unrelated refactors.
- AI must keep source code, tests, and documentation aligned.
- AI should document non-obvious trade-offs in `docs/ai/DECISIONS.md`.
- AI should run the relevant verification commands before marking work complete.

## Verification Gate

Before considering a development slice complete, run the relevant commands:

```bash
npm run lint
npm run test:run
npm run build
```

For completed user flows, also run:

```bash
npm run test:e2e
```
