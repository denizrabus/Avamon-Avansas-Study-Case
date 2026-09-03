# Technical Decisions

This file records decisions that matter for the case study review and future AI-assisted changes.

## 2026-09-03 - React With Vite

The case explicitly asks for a React application. Vite was selected to keep the app focused on client-side React behavior without adding framework features that are not required by the brief.

## 2026-09-03 - Redux Toolkit For Client State

Redux Toolkit is used for predictable client/application state because state management is a high-weight evaluation area in the case. It will store auth state, recently visited Pokemon, and persisted UI preferences.

Remote PokeAPI data is intentionally kept out of Redux.

## 2026-09-03 - TanStack Query For Server State

TanStack Query is used for asynchronous server state from PokeAPI. It provides cache, loading/error state, retries, and request deduplication without hand-rolling those concerns in Redux.

## 2026-09-03 - Native Fetch API

The native Fetch API is used through typed helper functions. Axios was intentionally avoided because this project does not require interceptors, token refresh, or advanced transport behavior.

## 2026-09-03 - React Hook Form And Zod

React Hook Form manages form state and Zod defines schema-based validation. This keeps validation logic typed, declarative, and separate from the login form UI.

## 2026-09-03 - Headless UI Combobox

Headless UI Combobox is used for autocomplete behavior. It keeps keyboard and accessibility behavior reliable while allowing the Avamon visual design to remain custom.

## 2026-09-03 - Tailwind CSS Theme Tokens

Tailwind v4 uses CSS-first configuration, so Avamon design tokens are defined in `src/index.css` with the `@theme` directive instead of a separate JavaScript config file.

The initial color palette was sampled from the provided reference screenshots and normalized into reusable theme utilities for brand colors, surfaces, text, type badges, and type-tinted card backgrounds.

Custom breakpoint tokens were added for the case review widths: 360px, 412px, 1024px, 1280px, and 2560px.
