# AI-Assisted Development Pipeline

This document describes how AI assistance is expected to fit into the Avamon development workflow. It exists so AI-supported work stays transparent, reviewable, and consistent across tools.

## Purpose

AI can help with implementation, tests, refactoring, documentation, and design comparison. It should not replace product judgment, final review, or ownership of architectural decisions.

## Workflow

1. Review the case requirement, reference screenshots, and existing implementation.
2. Check `AGENTS.md`, `README.md`, `docs/ai/DECISIONS.md`, and `docs/TESTING.md` before changing code.
3. Clarify the smallest useful behavior to implement.
4. Add or update focused tests when the change affects behavior.
5. Implement the change using existing project patterns.
6. Run the relevant checks.
7. Update documentation when the change affects setup, architecture, state management, API usage, testing, or AI workflow.
8. Leave the final decision and commit timing to the developer.

## Decision Rules

- Architectural changes must be documented in `docs/ai/DECISIONS.md`.
- New dependencies must include a short trade-off note.
- Reusable UI primitives should live under `src/shared/components/ui`.
- Feature-specific components should stay inside their feature folder.
- Server state belongs in TanStack Query.
- Client and app UI state belongs in Redux Toolkit.
- Persistent UI preferences must use explicit localStorage keys.
- URL-visible list state should remain in query parameters.

## Test Expectations

- Use Vitest and React Testing Library for components, helpers, reducers, schemas, and hooks.
- Use Playwright for user flows, routing, auth behavior, search, filtering, pagination, and responsive checks.
- Mock network-dependent E2E flows with shared fixtures where possible.
- Do not ignore failing tests without documenting why.

## AI Safety Boundaries

- Do not commit secrets, tokens, `.env` files, or local-only credentials.
- Do not make unrelated refactors while solving a narrow issue.
- Do not change generated build output manually.
- Do not remove user changes unless explicitly requested.
- Do not commit automatically; the developer reviews and commits.

## Review Checklist

- The behavior matches the PDF requirements.
- The visual result is close to the provided screenshots at the required viewport widths.
- The implementation follows the established folder and naming conventions.
- New or changed behavior has appropriate tests.
- Documentation reflects important decisions or workflow changes.
- `npm run lint`, `npm run test:run`, `npm run build`, and relevant Playwright tests have been considered.

## Related Files

- `AGENTS.md`: canonical repository rules for AI agents.
- `.cursor/rules/project-rules.mdc`: Cursor bridge file that points to `AGENTS.md`.
- `CLAUDE.md`: Claude bridge file that points to the same canonical rules.
- `docs/ai/AI_USAGE.md`: high-level AI usage principles.
- `docs/ai/DECISIONS.md`: architecture and trade-off log.
- `docs/TESTING.md`: testing strategy.
