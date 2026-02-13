/**
 * Design System
 *
 * Exports design tokens (CSS variables), breakpoints, and base styles.
 * Import the CSS in your app root (e.g. layout.tsx):
 *
 *   import '@org/design-system/styles';
 *
 * Or import tokens only:
 *   import '@org/design-system/tokens';
 */

// Side-effect imports: consumers must import these for CSS to apply
import './tokens/tokens.css';
import './base.css';
import './responsive/responsive.css';

export { breakpoints, mediaQueries, maxWidthQueries } from './tokens/breakpoints';
export type { Breakpoint } from './tokens/breakpoints';
