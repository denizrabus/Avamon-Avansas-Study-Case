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

## Responsive Viewport Coverage

The case requires review at 360px, 412px, 1024px, 1280px, and 2560px.

- `chromium` (1280px) and `mobile-360` (360px) run the full functional suite above. They exclude `responsive.spec.ts` via `testIgnore` so the smoke spec does not duplicate coverage at widths the functional suite already exercises.
- `responsive-412`, `responsive-1024`, and `responsive-2560` run only `tests/e2e/responsive.spec.ts` (via `testMatch`), a width-agnostic smoke spec that confirms the home, login, list (grid and list modes), protected detail, and header autocomplete flows render and are reachable at each width.
- Net effect: the full functional suite still runs exactly twice (`chromium`, `mobile-360`), and the smoke spec runs exactly once per required width — 15 additional test executions (5 tests × 3 widths), not a multiple of the full suite.
- This covers reachability at every required width in CI. Pixel-level layout correctness is still verified through manual QA at each width before submission.

## Test Rules

- Prefer behavior-focused test names.
- Query by role, label, or visible text before using test ids.
- Keep component tests inside the component folder next to the component file.
- Keep feature-level logic tests next to the logic file they protect.
- Add a failing test before fixing a reported bug.
