# Design System

CSS variables (tokens), base styles, and responsive utilities for the Travel Itinerary app.

## Usage

In your app root (e.g. `layout.tsx`), import styles once:

```ts
import '@org/design-system/styles';
```

Or import the main entry (includes styles and JS exports):

```ts
import '@org/design-system';
```

## Exports

- **Styles** – `tokens.css`, `base.css`, `responsive.css` (via `@org/design-system` or `@org/design-system/styles`)
- **Breakpoints** – `breakpoints`, `mediaQueries`, `maxWidthQueries` from `@org/design-system`

## Tokens

Defined in `src/tokens/tokens.css`:

- **Colors** – primary, secondary, neutral, semantic (success, warning, error, info), surface/text
- **Typography** – `--font-sans`, `--font-mono`, `--text-*`, `--font-weight-*`, `--leading-*`
- **Spacing** – 4px base scale (`--space-1` … `--space-24`)
- **Breakpoints** – `--breakpoint-sm` (640px) through `--breakpoint-2xl` (1536px)
- **Shadows** – `--shadow-xs` … `--shadow-xl`
- **Borders** – `--radius-*`, `--border-width`, `--border-color`
- **Transitions** – `--transition-fast`, `--transition-base`, `--transition-slow`

## Responsive utilities

- `src/responsive/responsive.css` – container and visibility helpers
- `breakpoints`, `mediaQueries`, `maxWidthQueries` in JS/TS for `useMediaQuery` or inline styles

## Storybook

Run `npm run storybook` and open **Design System / Tokens** and **Shared UI** for component docs.
