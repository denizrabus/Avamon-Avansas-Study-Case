# Testing Strategy

Avamon uses a layered testing strategy.

## Tools

- Vitest for unit and component tests
- React Testing Library for user-facing component behavior
- MSW for API mocking
- Playwright for end-to-end browser flows

## Vitest Scope

Use Vitest for deterministic, fast feedback:

- formatting utilities
- sorting and pagination helpers
- Redux slices
- Zod schemas
- reusable UI components
- form behavior

## Playwright Scope

Use Playwright for critical user journeys:

- login with a demo user
- protected detail route redirects to login and returns after successful login
- autocomplete opens after two characters and navigates from an option
- exact search submit navigates to a detail page
- list filters, sorting, pagination, and display mode survive refresh

## Test Rules

- Prefer behavior-focused test names.
- Query by role, label, or visible text before using test ids.
- Keep component tests inside the component folder next to the component file.
- Keep feature-level logic tests next to the logic file they protect.
- Add a failing test before fixing a reported bug.
