# Avamon Agent Guidelines

Avamon is a React + TypeScript Pokedex case study for the Avansas frontend developer process.

This file is the canonical rule set for AI-assisted work in this repository. Any AI tool, coding assistant, or teammate should follow these conventions before changing source code, tests, or documentation.

## Product Context

- The project is a client-side Pokedex application.
- The remote data source is PokeAPI.
- The case prioritizes feature correctness, code quality, state management, responsive UX, performance, and clear documentation.
- The required review widths are 360px, 412px, 1024px, 1280px, and 2560px.
- UI copy should stay in English because the case brief is in English.
- Demo user names may keep their original Turkish characters.

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
- React Select
- Vitest
- React Testing Library
- MSW
- Playwright

## Source Layout

```text
src/
  app/                    # Providers, routes, store, protected routing
  assets/                 # Static assets imported by React
  features/
    auth/                 # Auth state, validation, mock service, demo users
    pokemon/              # PokeAPI layer, query hooks, mappers, Pokemon UI
  pages/                  # Route-level pages
  shared/
    components/           # Shared UI, brand, and layout components
    utils/                # Shared utilities
tests/
  e2e/                    # Playwright specs and network mocks
docs/
  ai/                     # AI usage and decision records
```

## Architecture Rules

- Server state belongs to TanStack Query.
- Client/application state belongs to Redux Toolkit.
- Remote PokeAPI data must not be stored in Redux.
- API requests must use the native Fetch API through typed helper functions.
- Route-level pages compose feature and shared components; avoid putting too much business logic inside page JSX.
- Shared UI components live in `src/shared/components/ui`.
- Brand/layout components live in `src/shared/components/brand` and `src/shared/components/layout`.
- Feature-specific components live under their feature folder in `src/features`.
- Feature-level logic files such as slices, schemas, mappers, types, and utilities may stay at the feature root.
- Keep business logic in testable utilities or feature modules instead of embedding it deeply in components.
- Pokemon type visual styles must be centralized in `src/features/pokemon/pokemon-type-styles.ts`; components must not define local type-to-style maps.

## State Rules

- Redux stores deterministic app state:
  - auth user/session
  - recently visited Pokemon
  - persisted list display mode
- TanStack Query stores remote server state:
  - Pokemon references
  - filtered Pokemon references
  - Pokemon summaries
  - Pokemon details
  - loading/error state
  - query cache and request deduplication
- URL search params store list-page state that should survive refresh and be shareable:
  - `page`
  - `type`
  - `sort`
- Local storage may be used only for state that must survive refresh:
  - auth session
  - recently visited Pokemon
  - display mode
- Do not persist temporary UI state such as open menus, focused fields, or transient loading states.

## API And Data Rules

- All API response shapes must be typed.
- Keep API response types separate from UI-facing domain types.
- Convert PokeAPI responses through mapper functions before rendering them in components.
- Use `encodeURIComponent` for dynamic API path segments.
- Handle non-OK Fetch responses by throwing an error from the API layer.
- Components should consume query hooks, not call Fetch directly.
- Keep query keys centralized in `pokemon-query.ts`.
- Avoid broad refetches when a narrower query key is available.

## Component Rules

- Reusable and feature components use a folder-per-component structure:

```text
ComponentName/
  ComponentName.tsx
  ComponentName.test.tsx
  index.ts
```

- Component files use PascalCase and match the component name.
- Folders and non-component files use kebab-case.
- Prefer named exports.
- Keep components focused; split a file before it becomes hard to scan.
- Shared components must stay domain-agnostic.
- Feature components may know about feature-specific types, labels, and selectors.
- Use `Button` and `ButtonLink` for button-like actions and navigation CTAs.
- Use `SelectInput` for React Select usage so third-party library details stay wrapped.
- Use `PokemonImage` for Pokemon artwork so loading and fallback behavior stays consistent.
- Use `TypeBadge` for type labels; do not duplicate badge markup.

## Styling Rules

- Tailwind v4 theme tokens live in `src/index.css` under the `@theme` directive.
- Use theme utilities such as `bg-avamon-red`, `bg-page-bg`, `text-ink`, and `text-muted` before arbitrary hex values.
- Prefer responsive tokens already defined in `src/index.css`.
- Use arbitrary Tailwind values only for highly specific visual tuning that does not deserve a reusable token.
- Avoid inline styles unless an external library requires them.
- Keep layouts responsive for 360px, 412px, 1024px, 1280px, and 2560px.
- Avoid UI text overflow by using stable dimensions, `min-w-0`, wrapping, or truncation where appropriate.
- Interactive elements should have visible focus states.
- Button-like and clickable controls should show pointer behavior.

## Forms Rules

- Use React Hook Form for form state.
- Use Zod for validation schemas.
- Keep validation schemas outside component JSX.
- Required-field and submit errors must be visible inside the form.
- Prefer accessible labels and error messages over placeholder-only forms.

## Routing Rules

- Public routes:
  - home
  - login
  - all Pokemon list
- Pokemon detail routes are protected.
- If an unauthenticated user opens a detail page, redirect to login.
- After successful login, return the user to the originally requested detail page.
- Logo navigation should go to the home page.
- Header search should navigate to the selected or exact-match detail page.

## Testing Rules

- Use TDD for critical logic and user flows.
- Use Vitest for:
  - utilities
  - Redux slices
  - validation schemas
  - component behavior
  - reusable UI components
- Use React Testing Library for user-visible behavior.
- Use MSW for component/integration tests that need API mocks.
- Use Playwright for critical end-to-end user journeys.
- Prefer role, label, and visible text queries over implementation details.
- New reusable UI components should include focused component tests before or alongside implementation.
- Add a failing test before fixing a reported behavioral bug when practical.
- Test accessibility-facing behavior:
  - roles
  - labels
  - disabled states
  - error messages
  - keyboard/user interactions

## E2E Coverage Expectations

Playwright should cover the flows that matter most for the case:

- Home page renders the hero and featured Pokemon.
- Home switches from Popular Pokemon to Recently Visited after 3 detail visits.
- Login works with a demo user.
- Protected detail routes redirect to login and return after login.
- Header autocomplete opens after 2 characters.
- Header autocomplete shows at most 8 results.
- Autocomplete options show image, name, and number.
- Clicking an autocomplete option navigates to detail.
- Exact-match search submit navigates to detail.
- Unknown search submit clears without navigation.
- List page supports pagination, filtering, sorting, and display mode persistence.

## Documentation Rules

- Keep `README.md` aligned with setup, scripts, key decisions, trade-offs, and AI assistance notes.
- Keep `docs/ai/DECISIONS.md` aligned with architecture or dependency changes.
- Keep `docs/ai/AI_USAGE.md` aligned with AI collaboration boundaries.
- Keep `docs/ai/AI_PIPELINE.md` aligned with the expected AI-assisted development workflow.
- If a dependency is added, removed, or replaced, update README and DECISIONS when relevant.
- If an implementation changes a previously documented decision, update the documentation in the same development slice.

## Dependency Rules

- Do not add dependencies without a clear reason.
- Prefer existing project tools and wrappers before introducing a new package.
- If a third-party package is used in app code, wrap it in a local component/helper when practical.
- Remove unused dependencies after replacing an implementation.
- React Select usage should go through `SelectInput`.
- Native Fetch usage should go through the API helper layer.

## AI Assistance Rules

- AI-generated changes must follow this document.
- AI must not introduce unrelated refactors.
- AI must not silently change architecture or dependencies.
- AI must keep source code, tests, and documentation aligned.
- AI should document non-obvious trade-offs in `docs/ai/DECISIONS.md`.
- AI workflow changes should be reflected in `docs/ai/AI_PIPELINE.md`.
- AI should run relevant verification commands before marking work complete.
- AI should not commit changes automatically; the developer reviews first.
- AI should explain important implementation choices in Turkish when discussing with the developer.
- Code, file names, route labels, and UI copy should remain in English unless the product direction changes.

## Git Rules

- Use conventional commit messages:
  - `feat(scope): description`
  - `fix(scope): description`
  - `chore(scope): description`
  - `docs(scope): description`
  - `test(scope): description`
- Keep commits focused on one concern.
- Do not commit generated reports or temporary files unless they are intentionally part of the deliverable.
- Do not revert user changes unless explicitly requested.

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

For delivery readiness, verify the requested viewport widths manually or through Playwright:

```text
360px
412px
1024px
1280px
2560px
```

Known acceptable build note:

- The production build may show a Vite chunk-size warning because React Select and related dependencies are included in the client bundle. This warning does not break the build.
