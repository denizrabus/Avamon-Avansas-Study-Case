# Technical Decisions

This document records the main technical decisions behind Avamon. It is intended to make the implementation easier to review during the case evaluation and easier to continue in an AI-assisted team workflow.

## 2026-09-03 - React With Vite

The case explicitly asks for a React application, so the project is implemented as a React single-page application.

Vite was selected instead of Next.js because the brief focuses on client-side application behavior: search, filtering, sorting, pagination, login state, and protected routes. Next.js would add framework features such as server rendering and file-based routing that are not required for this case.

Trade-off:

- Vite keeps the app small, fast to run, and focused on React fundamentals.
- The app does not demonstrate SSR, server actions, or framework-level data loading because they are outside the requested scope.

## 2026-09-03 - TypeScript Strict Mode

TypeScript is used across the application to keep API responses, UI props, Redux state, and mapper functions explicit.

The PokeAPI response shape is represented separately from the app domain models. API-specific types live in `src/features/pokemon/pokemon-api-types.ts`, while UI-facing models live in `src/features/pokemon/pokemon-types.ts`.

Trade-off:

- Mapping adds a small amount of code.
- In return, components consume stable app models instead of depending directly on nested API response objects.

## 2026-09-03 - Redux Toolkit For Client State

Redux Toolkit is used for deterministic client/application state because state management is a high-weight evaluation area in the case.

Redux stores:

- authenticated user session
- recently visited Pokémon
- preferred Pokémon list display mode

Remote PokeAPI data is intentionally kept out of Redux.

Reasoning:

- Auth state and UI preferences are owned by the application.
- Recently visited Pokémon are derived from user navigation and should be available across pages.
- Redux Toolkit keeps reducers, actions, and selectors predictable without excessive boilerplate.

Trade-off:

- Zustand would be lighter for this app.
- Redux Toolkit is more explicit and easier to discuss in a case review where state management is a major criterion.

## 2026-09-03 - TanStack Query For Server State

TanStack Query is used for asynchronous server state from PokeAPI.

It owns:

- Pokémon reference queries
- type-filtered Pokémon reference queries
- visible-page Pokémon summary queries
- Pokémon detail queries
- loading and error state
- caching
- request deduplication

Reasoning:

- Server state has different lifecycle rules than client state.
- PokeAPI data should be cached, refetched, retried, and deduplicated without hand-written Redux async state.
- Keeping server state in TanStack Query prevents Redux from becoming a remote-data cache.

Trade-off:

- Using both Redux and TanStack Query adds one extra concept.
- The separation is intentional: Redux handles app state, TanStack Query handles remote data.

## 2026-09-03 - Native Fetch API

API requests use the native Fetch API through typed helper functions in `src/features/pokemon/pokemon-api.ts`.

Axios was intentionally avoided because this project does not require:

- request or response interceptors
- token refresh
- upload/download progress
- custom cancellation wrappers
- advanced transport configuration

Reasoning:

- Fetch is enough for the requested PokeAPI usage.
- A small typed `fetchJson` helper keeps error handling centralized.
- Avoiding Axios keeps the dependency list smaller.

## 2026-09-03 - Feature-Based Project Structure

The source code is organized by application responsibility:

- `src/app` contains providers, routes, store setup, and protected routing.
- `src/features/auth` contains authentication state, validation, mock auth service, demo users, and auth components.
- `src/features/pokemon` contains PokeAPI access, query hooks, mappers, types, list utilities, preferences, and Pokémon components.
- `src/pages` contains route-level screens.
- `src/shared` contains reusable UI, layout, brand, and utility code.

Reasoning:

- Feature folders keep business logic close to the UI that uses it.
- Shared components stay generic and should not know about Pokémon-specific behavior.
- Route pages compose features instead of owning too much logic.

Trade-off:

- For a tiny app, this is more structure than strictly necessary.
- For a case study, it makes boundaries clear and gives room to extend the app during the live session.

## 2026-09-03 - Component Folder Convention

Reusable and feature components use a folder-per-component structure:

```text
ComponentName/
  ComponentName.tsx
  ComponentName.test.tsx
  index.ts
```

Reasoning:

- Component implementation, tests, and exports stay together.
- The pattern scales better when a component later needs subcomponents, styles, or fixtures.
- `index.ts` keeps imports stable when internal files move.

Trade-off:

- It creates more folders than flat component files.
- The consistency is useful because this project includes focused component tests.

## 2026-09-03 - React Hook Form And Zod

React Hook Form manages the login form state. Zod defines schema-based validation.

Reasoning:

- The login form has required fields and submit-time validation.
- Zod keeps validation rules outside the JSX and makes them easy to test.
- React Hook Form keeps form state lightweight and avoids unnecessary re-renders.

Trade-off:

- A very small login form could be written with local component state.
- Using React Hook Form and Zod better represents how the same pattern would scale in production forms.

## 2026-09-04 - React Select For Selects And Autocomplete

React Select is used through the shared `SelectInput` wrapper.

It powers:

- header Pokémon autocomplete
- list type filter
- list sort select

Reasoning:

- The case requires autocomplete with keyboard/focus behavior and custom option rendering.
- React Select provides stable select and combobox primitives without hand-rolling menu positioning, focus handling, and keyboard navigation.
- A shared wrapper keeps library-specific details in one place and allows separate visual variants for header search and surface filters.

Trade-off:

- React Select adds bundle weight.
- The production build may show a Vite chunk-size warning because this is a small app with a rich select library.
- The warning does not break the build. If needed, it can be addressed later with route-level lazy loading or manual vendor chunks.

## 2026-09-04 - Tailwind CSS Theme Tokens

Tailwind v4 uses CSS-first configuration, so Avamon design tokens are defined in `src/index.css` with the `@theme` directive.

Tokens include:

- brand colors
- page and login backgrounds
- text colors
- card radius and shadows
- case-specific breakpoints
- Pokémon type badge colors
- Pokémon type soft background colors

Reasoning:

- Tokens keep visual decisions consistent across pages and components.
- Pokémon type visual styles are centralized in `src/features/pokemon/pokemon-type-styles.ts`; components do not define local type-to-style maps.

Trade-off:

- Some one-off visual refinements still use Tailwind arbitrary values when the design is highly specific.
- Core colors and breakpoints stay centralized.

## 2026-09-04 - URL State For List Filters

The Pokémon list stores `page`, `type`, and `sort` in URL search params.

Reasoning:

- The case expects refresh to preserve the same page with the same filters and settings.
- URL params make the list state shareable and browser-navigation friendly.
- Display mode is kept in local storage instead because it is a personal UI preference rather than a shareable query.

Trade-off:

- Page components need parsing and clamping utilities.
- The result is more robust than hiding all list state in Redux.

## 2026-09-04 - Local Storage Persistence

Local storage is used for:

- auth session
- recently visited Pokémon
- Pokémon list display mode

Reasoning:

- The app has no backend session service.
- Persisting auth state keeps the demo flow usable after refresh.
- Persisting recently visited Pokémon makes the home page behavior survive navigation and reload.

Trade-off:

- This is not secure authentication and is intentionally mock-only for the case.
- A production app would use a real auth backend, secure cookies, and token/session expiry rules.

## 2026-09-04 - Image Loading And Fallbacks

Pokémon images are loaded from PokeAPI-provided sprite/artwork URLs. A local Poké Ball SVG fallback is used when an image is missing or fails to load.

Reasoning:

- Card grids should remain stable while images load.
- Broken image icons are avoided.
- Local fallback assets prevent another remote dependency for error states.

Trade-off:

- Some Pokémon forms from PokeAPI have limited or missing artwork.
- The fallback keeps layout quality acceptable even when remote images are incomplete.

## 2026-09-05 - Home Hero Asset

The home hero uses a local Charizard image asset.

Reasoning:

- The hero is first-viewport content and should not visibly shift or appear late.
- A local image makes the hero more stable than fetching artwork at runtime.
- Charizard matches the provided reference screenshots closely.

Trade-off:

- The hero is not randomized.
- This was chosen because a stable hero is more important than novelty for a case-study landing page.

## 2026-09-05 - Responsive QA Targets

The case states that the app will be tested at these viewport widths:

- 360px
- 412px
- 1024px
- 1280px
- 2560px

Custom breakpoint tokens were added for these widths where useful.

Reasoning:

- The implementation prioritizes the exact requested review widths.
- Other intermediate widths should remain usable, but they are not the main acceptance target.

Trade-off:

- Some DevTools device presets such as iPad Air can show browser preview artifacts that are not direct case requirements.
- Final QA should focus on the widths listed above.

## 2026-09-05 - Testing Strategy

The project uses a layered testing strategy:

- Vitest for utilities, schemas, Redux slices, and component behavior.
- React Testing Library for user-facing component assertions.
- MSW for component/integration API mocks.
- Playwright for critical end-to-end flows.

Playwright covers:

- login with a demo user
- protected route redirect and return after login
- autocomplete behavior and navigation
- exact-match search submit
- list filtering, pagination, and display mode persistence
- home Popular Pokémon / Recently Visited behavior

Reasoning:

- Unit tests keep business logic easy to validate.
- E2E tests protect the flows that matter most in the PDF evaluation criteria.
- Network behavior is mocked in E2E tests to keep the suite stable.

Trade-off:

- Visual pixel-perfect testing is not automated.
- Manual responsive QA is still needed before final submission.
