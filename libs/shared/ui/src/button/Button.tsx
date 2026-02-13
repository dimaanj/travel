import type { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.css';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  children: React.ReactNode;
}

const variantClass: Record<ButtonVariant, string> = {
  primary: styles['primary'],
  secondary: styles['secondary'],
  ghost: styles['ghost'],
};

const sizeClass: Record<ButtonSize, string> = {
  sm: styles['sm'],
  md: '',
  lg: styles['lg'],
};

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  children,
  ...props
}: ButtonProps) {
  const classNames = [
    styles['button'],
    variantClass[variant],
    sizeClass[size],
    fullWidth ? styles['fullWidth'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button type="button" className={classNames} {...props}>
      {children}
    </button>
  );
}
