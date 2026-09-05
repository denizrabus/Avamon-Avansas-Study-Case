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

## 2026-09-05 - Route-Level Code Splitting

`HomePage`, `LoginPage`, `PokemonListPage`, and `PokemonDetailPage` are loaded through `React.lazy()` in `src/app/router.tsx`, with a single `Suspense` boundary around the routed `Outlet` in `AppLayout`. `AppHeader` stays outside the boundary so the header never unmounts between route transitions.

Reasoning:

- The production build previously emitted a single ~534 kB (168 kB gzip) JS chunk and a Vite chunk-size warning, mainly because every page's code shipped together regardless of which route was visited.
- Splitting by route lets page-specific code (list filtering/pagination UI, detail stats/sprites/evolution chain, the login form's React Hook Form + Zod stack) load only when that page is actually visited.
- After splitting, the shared entry chunk dropped to ~393 kB (128 kB gzip) and the chunk-size warning no longer appears, since no single chunk exceeds the 500 kB threshold.

Trade-off:

- `react-select` is not removed from the shared entry chunk by this change. `PokemonSearchSelect` (built on `SelectInput` / `react-select`) is rendered by `AppHeader`, which is part of `AppLayout` and mounts on every route, including Home and Login. Route-level splitting therefore reduces each page's *own* code, not the header's shared dependencies.
- A further optimization would lazy-load the search control itself and swap it in once loaded, but that risks a visible flash/placeholder in a control that sits in the first viewport on every page. Given the case explicitly asks for a working search box in the header at all times, this was intentionally left out.
- A `react-select` vendor chunk via bundler-level manual chunking was considered (see below) but not applied, since it does not reduce first-visit bytes and this is a one-time case submission rather than an app with repeat deploys that would benefit from the resulting cache-hit improvement.

## 2026-09-05 - Manual Vendor Chunking Was Considered And Skipped

Separating `react-select` into its own chunk (via Rolldown's `build.rolldownOptions.output` config — this project's Vite 8 build uses Rolldown, not classic Rollup, so the equivalent of `manualChunks` lives under `rolldownOptions`, not `rollupOptions`) was evaluated after route-level code splitting.

Reasoning it was not applied:

- The chunk-size warning was already resolved by route-level splitting alone; a vendor chunk was no longer solving an existing problem.
- Its main benefit is long-term cache-hit rate across repeat deploys (vendor code changes less often than app code), which does not apply to a one-time case submission with no production redeploy cadence.
- It does not reduce the number of bytes a first-time visitor downloads before the app is interactive, since the header search still needs `react-select` immediately on every route.

Trade-off:

- If Avamon became a long-lived, repeatedly deployed app, revisiting this with Rolldown's manual chunking API would be worth doing.

## 2026-09-05 - Responsive Viewport E2E Coverage

The case requires the app to be reviewed at 360px, 412px, 1024px, 1280px, and 2560px. Before this change, Playwright only ran the full functional suite at the default desktop size (`chromium`, effectively 1280px) and at 360px (`mobile-360`); 412px, 1024px, and 2560px were only checked manually.

`tests/e2e/responsive.spec.ts` was added with smoke assertions (home hero, login form, list grid/list modes, protected detail page, header autocomplete) that do not depend on a specific viewport width. Three new Playwright projects (`responsive-412`, `responsive-1024`, `responsive-2560`) run only this file via `testMatch`, and `chromium`/`mobile-360` exclude it via `testIgnore` so the same 5 smoke tests do not also run redundantly at the 1280px/360px widths the full functional suite already covers.

Reasoning:

- 1280px and 360px are already exercised by the full functional suite (`chromium`, `mobile-360`), so those two widths did not need new projects, and the smoke spec should not duplicate that coverage there either.
- Running the entire existing suite at three more viewport widths would have multiplied CI time for marginal benefit; a small width-agnostic smoke spec gives real coverage of the missing widths without that cost.
- `testMatch: 'responsive.spec.ts'` on the new projects plus `testIgnore: 'responsive.spec.ts'` on the existing two projects keeps each project running exactly what it should: `chromium`/`mobile-360` keep running only the 12 functional tests each (24 total, unchanged), and the smoke spec runs exactly once per required width (5 tests × 3 widths = 15 new test executions), for 39 tests total.

Trade-off:

- The new projects check that critical content renders and is reachable at each width, not pixel-level layout correctness. Manual QA is still the way visual layout is verified at each width.

## 2026-09-05 - Recently Visited Stores Ids, Not Full Summaries

`pokemonPreferences.recentlyVisitedIds` now stores `number[]` instead of full `PokemonSummary[]` objects. `HomePage` resolves the displayed cards through `usePokemonSummariesQuery(recentlyVisitedIds.map((id) => ({ id })))`, the same TanStack Query hook already used for the list page and the "Popular Pokémon" section.

Reasoning:

- Storing full summaries (image URL, name, types) in Redux/localStorage duplicated data that TanStack Query already owns and caches, and drifted from this project's own rule that remote PokeAPI data must not be stored in Redux.
- `fetchPokemonSummaries`/`usePokemonSummariesQuery`/`pokemonQueryKeys.summaries` only ever used `reference.id` internally, so narrowing their parameter type to `Array<Pick<PokemonReference, 'id'>>` was a safe, low-cost change that made the existing list-page usage and the new id-only usage both type-check without fabricating placeholder `name`/`url` values.
- `Promise.all` in `fetchPokemonSummaries` resolves in input order, so passing `recentlyVisitedIds` (already most-recent-first from `getNextRecentlyVisitedIds`) preserves the expected display order with no extra sorting.

Trade-off:

- The "Recently Visited" section now has a real loading/error state on first render (a `usePokemonSummariesQuery` call, sharing the existing `HomePopularSkeleton` and error UI) instead of rendering already-available Redux data synchronously. This only matters for the brief window before that query resolves.
- Older `avamon.pokemon-preferences` localStorage payloads (the previous `recentlyVisited: PokemonSummary[]` shape) are silently ignored by the new loader rather than migrated, since this is a case-study demo with no real user data to preserve.

## 2026-09-05 - Centralized LocalStorage Sync With A Listener Middleware

Local storage writes for auth session, display mode, and recently visited ids used to be paired manually at each call site: `LoginPage` called `saveAuthSession` next to `dispatch(loginSucceeded(...))`, `AppLayout`'s logout handler called `clearAuthSession` next to `dispatch(logout())`, `PokemonListPage` called `savePokemonDisplayMode` next to `dispatch(displayModeChanged(...))`, and `PokemonDetailPage` called `saveRecentlyVisitedPokemonIds` next to `dispatch(recentlyVisitedIdsChanged(...))`.

`src/app/persistence-listener.ts` now uses Redux Toolkit's built-in `createListenerMiddleware` (no new dependency) to listen for `loginSucceeded`, `logout`, `displayModeChanged`, and `recentlyVisitedIdsChanged`, and performs the matching storage write/clear in one place. `store.ts` prepends `persistenceListenerMiddleware.middleware`. All four call sites now only dispatch; none of them import a storage function anymore.

Reasoning:

- The manual pairing was easy to forget at a new call site: a component that dispatched one of these actions without also calling the matching storage function would silently stop persisting, with no error or test failure pointing at the cause.
- Centralizing persistence in a middleware makes it a cross-cutting concern instead of a responsibility every dispatching component has to remember, and keeps reducers pure (state updates) separate from side effects (storage writes).
- `createListenerMiddleware` is already part of `@reduxjs/toolkit`, so this added no new dependency.

Trade-off:

- Storage writes are now one step removed from the dispatching component, so tracing "who persists this" means checking `persistence-listener.ts` rather than the component itself. This is an acceptable trade for removing the duplicated, easy-to-forget pairing.
- The initial state hydration (`loadAuthSession`, `loadPokemonDisplayMode`, `loadRecentlyVisitedPokemonIds` read at slice/module init time) is intentionally left as-is; the middleware only owns writes, not the initial read.

## 2026-09-05 - Testing Strategy

The project uses a layered testing strategy:

- Vitest for utilities, schemas, Redux slices, and component behavior.
- React Testing Library for user-facing component assertions.
- `vi.mock` to stub query hooks in component tests that need API data, instead of a network-mocking library.
- Playwright for critical end-to-end flows, using `page.route` to mock network requests.

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

## 2026-09-05 - Scroll To Top On Pagination

Changing pages in the Pokémon list (`PokemonListPage`) previously left the scroll position untouched, so users who paginated from the bottom of a long grid landed on the new page already scrolled past its first rows, with no visual signal that the content had changed.

`PokemonListPage` now scrolls the window to the top with `window.scrollTo({ behavior: 'smooth', top: 0 })` whenever `currentPage` changes, guarded by an `isInitialRender` ref so the initial mount (including a deep link like `/pokemon?page=3`) does not trigger an unwanted scroll.

Reasoning:

- This matches common e-commerce/listing UX, where a page change should bring the user back to the top of the new result set.
- Scrolling on `currentPage` (not on every render) also covers the clamp-redirect case (an out-of-range `page` param snapping back to a valid page) since that changes `currentPage` too.

Trade-off:

- No explicit focus management or `aria-live` announcement was added for screen reader users; the scroll is a visual affordance only. This was scoped out to keep the change small, but is a reasonable follow-up if accessibility auditing becomes a priority.

## 2026-09-06 - Removed Unused Dependencies

`@headlessui/react` and `msw` were listed in `package.json` but had zero imports anywhere in `src` or `tests`. `@headlessui/react` was never adopted (React Select and native elements cover every interactive control). `msw` was an earlier plan for API mocking that was superseded by simpler approaches: component tests stub query hooks directly with `vi.mock`, and Playwright tests mock network calls with `page.route`.

Both packages were removed from `package.json`, and every doc that listed MSW as part of the stack (`README.md`, `AGENTS.md`, `docs/TESTING.md`, and the earlier Testing Strategy entry in this file) was corrected to describe the mocking approach actually in use.

Reasoning:

- Unused dependencies add install time and bundle-audit noise without providing value.
- Documentation should describe the testing approach that is actually implemented, not a plan that was replaced during development.
