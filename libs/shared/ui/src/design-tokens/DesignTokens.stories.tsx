import type { Meta, StoryObj } from '@storybook/react';

/**
 * Design System Tokens
 *
 * CSS custom properties (tokens) are defined in `libs/design-system/src/tokens/tokens.css`.
 */
const meta: Meta = {
  title: 'Design System/Tokens',
  parameters: {
    layout: 'padded',
  },
};

export default meta;

export const Colors: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h3 style={{ marginBottom: 12, fontFamily: 'var(--font-sans)' }}>
          Primary
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => (
            <div
              key={n}
              style={{
                width: 64,
                height: 64,
                borderRadius: 8,
                backgroundColor: `var(--color-primary-${n})`,
                boxShadow: 'var(--shadow-sm)',
              }}
              title={`--color-primary-${n}`}
            />
          ))}
        </div>
      </section>
      <section>
        <h3 style={{ marginBottom: 12, fontFamily: 'var(--font-sans)' }}>
          Semantic
        </h3>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: 'var(--color-success-muted)',
              color: 'var(--color-success)',
            }}
          >
            Success
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: 'var(--color-warning-muted)',
              color: 'var(--color-warning)',
            }}
          >
            Warning
          </div>
          <div
            style={{
              padding: 16,
              borderRadius: 8,
              backgroundColor: 'var(--color-error-muted)',
              color: 'var(--color-error)',
            }}
          >
            Error
          </div>
        </div>
      </section>
    </div>
  ),
};

export const TypographyScale: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-4xl)',
          fontWeight: 'var(--font-weight-bold)',
          margin: 0,
        }}
      >
        Text 4xl
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-weight-semibold)',
          margin: 0,
        }}
      >
        Text 2xl
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-base)',
          margin: 0,
        }}
      >
        Base text (body)
      </p>
      <p
        style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 'var(--text-sm)',
          margin: 0,
        }}
      >
        Small text
      </p>
      <p
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--text-sm)',
          margin: 0,
        }}
      >
        Monospace font
      </p>
    </div>
  ),
};

export const Spacing: StoryObj = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <p style={{ fontFamily: 'var(--font-sans)', margin: 0 }}>
        Spacing scale (4px base): 1=4px, 2=8px, 4=16px, 6=24px, 8=32px
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8 }}>
        {[1, 2, 4, 6, 8].map((n) => (
          <div
            key={n}
            style={{
              width: `var(--space-${n})`,
              height: 24,
              backgroundColor: 'var(--color-primary-400)',
              borderRadius: 4,
            }}
          />
        ))}
      </div>
    </div>
  ),
};

export const Breakpoints: StoryObj = {
  render: () => (
    <div style={{ fontFamily: 'var(--font-sans)' }}>
      <p style={{ marginBottom: 8 }}>
        Breakpoints (min-width) for responsive design:
      </p>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        <li>sm: 640px (tablet)</li>
        <li>md: 768px</li>
        <li>lg: 1024px (desktop)</li>
        <li>xl: 1280px</li>
        <li>2xl: 1536px</li>
      </ul>
      <p
        style={{
          marginTop: 16,
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
        }}
      >
        Use in CSS: <code>@media (min-width: 640px)</code> or import{' '}
        <code>mediaQueries</code> from <code>@org/design-system</code>.
      </p>
    </div>
  ),
};
