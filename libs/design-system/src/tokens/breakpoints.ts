/**
 * Breakpoint tokens for responsive design.
 * Use with CSS media queries or with a useMediaQuery hook.
 */

export const breakpoints = {
  /** 640px - tablet and up */
  sm: 640,
  /** 768px */
  md: 768,
  /** 1024px - desktop */
  lg: 1024,
  /** 1280px */
  xl: 1280,
  /** 1536px */
  '2xl': 1536,
} as const;

export type Breakpoint = keyof typeof breakpoints;

/** Min-width media query strings for use in CSS-in-JS or style tags */
export const mediaQueries = {
  sm: `(min-width: ${breakpoints.sm}px)`,
  md: `(min-width: ${breakpoints.md}px)`,
  lg: `(min-width: ${breakpoints.lg}px)`,
  xl: `(min-width: ${breakpoints.xl}px)`,
  '2xl': `(min-width: ${breakpoints['2xl']}px)`,
} as const;

/** Max-width (mobile-first: use for "up to X" breakpoint) */
export const maxWidthQueries = {
  sm: `(max-width: ${breakpoints.sm - 1}px)`,
  md: `(max-width: ${breakpoints.md - 1}px)`,
  lg: `(max-width: ${breakpoints.lg - 1}px)`,
  xl: `(max-width: ${breakpoints.xl - 1}px)`,
  '2xl': `(max-width: ${breakpoints['2xl'] - 1}px)`,
} as const;
