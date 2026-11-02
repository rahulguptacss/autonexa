import type { LineEyebrowProps } from '../types';

/**
 * Small uppercase label followed by an orange accent line, e.g. "ABOUT US ——".
 * Parent section animates [data-eyebrow] (starts invisible) and [data-eyebrow-line] with GSAP.
 */
export default function LineEyebrow({ text, tone = 'primary', className = '' }: LineEyebrowProps) {
  return (
    <div data-eyebrow data-reveal className={`invisible flex items-center gap-4 ${className}`}>
      <span
        className={`font-heading text-[10.5px] sm:text-[12px] font-semibold uppercase tracking-[0.3em] sm:tracking-[0.34em] ${
          tone === 'primary' ? 'text-primary' : 'text-ink/65'
        }`}
      >
        {text}
      </span>
      <span data-eyebrow-line className="h-[1.5px] w-7 sm:w-9 shrink-0 origin-left bg-primary" />
    </div>
  );
}

