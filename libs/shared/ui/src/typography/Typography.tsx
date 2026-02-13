import type { ElementType, HTMLAttributes } from 'react';
import styles from './Typography.module.css';

export type TypographyVariant =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'body1'
  | 'body2'
  | 'caption'
  | 'label'
  | 'code';

type ElementMap = {
  h1: 'h1';
  h2: 'h2';
  h3: 'h3';
  h4: 'h4';
  body1: 'p';
  body2: 'p';
  caption: 'span';
  label: 'span';
  code: 'code';
};

const variantClass: Record<TypographyVariant, string> = {
  h1: styles['h1'],
  h2: styles['h2'],
  h3: styles['h3'],
  h4: styles['h4'],
  body1: styles['body1'],
  body2: styles['body2'],
  caption: styles['caption'],
  label: styles['label'],
  code: styles['code'],
};

const defaultElement: ElementMap = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  body1: 'p',
  body2: 'p',
  caption: 'span',
  label: 'span',
  code: 'code',
};

export interface TypographyProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  component?: React.ElementType;
  muted?: boolean;
  children: React.ReactNode;
}

export function Typography({
  variant = 'body1',
  component,
  muted = false,
  className = '',
  children,
  ...props
}: TypographyProps) {
  const Component: ElementType =
    component ?? defaultElement[variant];
  const classNames = [
    styles['root'],
    variantClass[variant],
    muted ? styles['muted'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classNames} {...props}>
      {children}
    </Component>
  );
}
