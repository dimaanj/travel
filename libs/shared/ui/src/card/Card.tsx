import type { HTMLAttributes } from 'react';
import styles from './Card.module.css';

export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  padding?: CardPadding;
  interactive?: boolean;
  children: React.ReactNode;
}

const paddingClass: Record<CardPadding, string> = {
  none: '',
  sm: styles['paddingSm'],
  md: styles['padding'],
  lg: styles['paddingLg'],
};

export function Card({
  padding = 'md',
  interactive = false,
  className = '',
  children,
  ...props
}: CardProps) {
  const classNames = [
    styles['card'],
    paddingClass[padding],
    interactive ? styles['interactive'] : '',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classNames} {...props}>
      {children}
    </div>
  );
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`${styles['header']} ${className}`.trim()}>{children}</div>;
}

export interface CardBodyProps {
  children: React.ReactNode;
  className?: string;
}

export function CardBody({ children, className = '' }: CardBodyProps) {
  return <div className={`${styles['body']} ${className}`.trim()}>{children}</div>;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return <div className={`${styles['footer']} ${className}`.trim()}>{children}</div>;
}
