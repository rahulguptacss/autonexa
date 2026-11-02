import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { TextLinkProps } from '../types';

/** Text link with an orange arrow, e.g. "Learn More →" (underline grows + arrow slides on hover) */
export default function TextLink({ href, text, className = '' }: TextLinkProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-3 font-heading text-[15px] sm:text-base font-semibold text-ink transition-colors duration-300 hover:text-primary ${className}`}
    >
      <span className="relative">
        {text}
        <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
      </span>
      <span data-link-arrow className="inline-flex">
        <ArrowRight className="h-[18px] w-[18px] text-primary transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} aria-hidden="true" />
      </span>
    </Link>
  );
}
