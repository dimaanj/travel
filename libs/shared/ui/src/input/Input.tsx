import type { InputHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
}

export function Input({
  label,
  hint,
  error,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? `input-${Math.random().toString(36).slice(2, 9)}`;
  const hasError = Boolean(error);

  return (
    <div className={styles['wrapper']}>
      {label && (
        <label htmlFor={inputId} className={styles['label']}>
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`${styles['input']} ${hasError ? styles['inputError'] : ''} ${className}`.trim()}
        aria-invalid={hasError}
        aria-describedby={hint ? `${inputId}-hint` : undefined}
        {...props}
      />
      {error && (
        <span id={`${inputId}-hint`} className={styles['error']} role="alert">
          {error}
        </span>
      )}
      {hint && !error && (
        <span id={`${inputId}-hint`} className={styles['hint']}>
          {hint}
        </span>
      )}
    </div>
  );
}
