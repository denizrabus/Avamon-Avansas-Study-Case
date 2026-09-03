# AI Usage

AI assistance is used as a development aid in this repository. The goal is to make AI-assisted work transparent, reviewable, and safe for a team environment.

## Principles

- Human decisions own product scope, architecture trade-offs, and final review.
- AI may assist with implementation, test drafting, refactoring suggestions, and documentation.
- AI-generated changes must follow `AGENTS.md`.
- AI should not add dependencies, change architecture, or broaden scope without documenting the reason.

## Workflow

1. Read the case requirements and existing project rules.
2. Create or update tests for the behavior being implemented.
3. Implement the smallest useful slice.
4. Run relevant checks.
5. Update documentation when decisions or setup steps change.

## Boundaries

- Do not commit secrets or environment files.
- Do not introduce unrelated refactors.
- Do not leave generated or experimental code unexplained.
- Do not bypass failing tests without documenting the reason.
