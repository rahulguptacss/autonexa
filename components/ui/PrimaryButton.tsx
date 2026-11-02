'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { PrimaryButtonProps } from '../types';

const variantClass = {
  solid: 'btn-primary',
  dark: 'btn-dark',
  outline: 'btn-outline',
};

/** Site-wide CTA: sharp orange rectangle with uppercase label + sliding arrow (styles in globals.css → .btn-primary) */
export default function PrimaryButton({
  href,
  text,
  variant = 'solid',
  className = '',
  onClick,
  type = 'button',
  disabled,
  'aria-label': ariaLabel,
}: PrimaryButtonProps) {
  const baseClass = `${variantClass[variant]} btn-shine cursor-pointer ${className}`;

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClass} aria-label={ariaLabel}>
        <span>{text}</span>
        <ArrowRight className="btn-arrow" aria-hidden="true" />
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={baseClass} disabled={disabled} aria-label={ariaLabel}>
      <span>{text}</span>
      <ArrowRight className="btn-arrow" aria-hidden="true" />
    </button>
  );
}

