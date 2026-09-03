# Development Plan

## Phase 1 - Foundation

- Set up Vite, React, TypeScript, Tailwind, routing, Redux, TanStack Query, tests, and AI guidance.
- Create the initial page routes and app providers.
- Verify the project with lint, test, and build commands.

## Phase 2 - Shared System

- Build reusable UI components: Button, Input, Select, IconButton, Badge, Card, FormField, Pagination, SegmentedControl, LoadingState, and ErrorState.
- Add unit/component tests for behavior-heavy components.

## Phase 3 - API Layer

- Create typed Fetch helpers.
- Add PokeAPI types and query functions.
- Add query keys for list, detail, species, evolution, types, and autocomplete source data.
- Add MSW handlers for tests.

## Phase 4 - Auth

- Build login schema and auth slice with tests.
- Build LoginForm and DemoUserCard with React Hook Form and Zod.
- Persist logged-in user.
- Implement ProtectedRoute and redirect-back behavior.

## Phase 5 - Pokemon List

- Build grid and list display modes.
- Implement 24-item pagination.
- Implement type filtering across the full dataset.
- Implement sort by number and name.
- Persist page, type, and sort in URL search params.
- Persist display mode across visits.

## Phase 6 - Header And Search

- Build AppHeader.
- Implement Headless UI autocomplete with max 8 results.
- Navigate to detail on option click.
- Navigate on exact search submit.
- Clear input when there is no exact match.

## Phase 7 - Detail Page

- Build protected Pokemon detail page.
- Show artwork, number, name, types, flavor text, height, weight, base XP, stats, abilities, sprites, and evolution chain.
- Update recently visited Pokemon on successful detail view.

## Phase 8 - Home Page

- Build reference-inspired hero area.
- Add All Pokemon and Login CTAs.
- Show three random popular Pokemon before enough visits.
- Show the last three visited Pokemon after three details have been viewed.

## Phase 9 - Responsive QA

- Verify desktop widths: 2560px, 1280px, 1024px.
- Verify mobile widths: 360px, 412px.
- Polish focus states, empty states, loading states, and error states.

## Phase 10 - Delivery

- Finalize README setup and decision notes.
- Run lint, Vitest, Playwright, and build.
- Prepare a concise walkthrough for the live interview.
