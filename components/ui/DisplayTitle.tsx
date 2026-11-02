import type { DisplayTitleProps } from '../types';

const sizes = {
  hero: {
    bold: 'text-[42px] min-[400px]:text-[50px] sm:text-[62px] md:text-[60px] lg:text-[74px] xl:text-[84px]',
    light: 'text-[33px] min-[400px]:text-[39px] sm:text-[48px] md:text-[47px] lg:text-[58px] xl:text-[66px]',
  },
  section: {
    bold: 'text-[38px] min-[400px]:text-[44px] sm:text-[56px] lg:text-[58px] xl:text-[68px]',
    light: 'text-[29px] min-[400px]:text-[34px] sm:text-[44px] lg:text-[42px] xl:text-[54px]',
  },
};

/**
 * Motrix display heading markup: heavy first line(s) split into letters + thin uppercase lines inside masks.
 * Animation is applied by the parent section via GSAP using:
 *   [data-title] (starts invisible), [data-title-char], [data-title-line]
 */
export default function DisplayTitle({ bold, light, as = 'h2', size = 'section', className = '' }: DisplayTitleProps) {
  const Tag = as;
  const boldLines = Array.isArray(bold) ? bold : [bold];
  const fullAria = [...boldLines, ...light].join(' ');

  return (
    <Tag data-title data-reveal aria-label={fullAria} className={`invisible font-heading uppercase text-ink ${className}`}>
      {boldLines.map((line, lIdx) => {
        const words = line.split(' ');
        return (
          <span
            key={`${line}-${lIdx}`}
            aria-hidden="true"
            className={`block overflow-hidden pb-[0.06em] font-black leading-[0.95] tracking-[-0.035em] ${sizes[size].bold}`}
          >
            {words.map((word, wIdx) => (
              <span key={`${word}-${wIdx}`}>
                <span className="inline-block whitespace-nowrap">
                  {word.split('').map((ch, cIdx) => (
                    <span key={`${ch}-${cIdx}`} data-title-char className="inline-block will-change-transform">
                      {ch}
                    </span>
                  ))}
                </span>
                {wIdx < words.length - 1 && ' '}
              </span>
            ))}
          </span>
        );
      })}
      {light.map((line, idx) => (
        <span key={`${line}-${idx}`} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
          <span data-title-line className={`mt-[0.08em] block font-light leading-[1.02] tracking-[-0.015em] ${sizes[size].light}`}>
            {line}
          </span>
        </span>
      ))}
    </Tag>
  );
}

