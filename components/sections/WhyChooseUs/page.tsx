'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Award, Cog, Users, Leaf } from 'lucide-react';
import type { WhyChooseUsProps } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function FeatureIcon({ name }: { name?: string }) {
  const key = (name || '').toLowerCase();
  const cls = 'h-8 w-8 sm:h-9 sm:w-9 text-primary shrink-0 transition-transform duration-300 group-hover:scale-110';
  if (key.includes('award') || key.includes('expert') || key.includes('proven')) {
    return <Award className={cls} strokeWidth={1.8} />;
  }
  if (key.includes('cog') || key.includes('quality') || key.includes('gear')) {
    return <Cog className={cls} strokeWidth={1.8} />;
  }
  if (key.includes('user') || key.includes('customer') || key.includes('people') || key.includes('team')) {
    return <Users className={cls} strokeWidth={1.8} />;
  }
  if (key.includes('leaf') || key.includes('sustain') || key.includes('green') || key.includes('eco')) {
    return <Leaf className={cls} strokeWidth={1.8} />;
  }
  return <Award className={cls} strokeWidth={1.8} />;
}

export default function WhyChooseUs({ data }: WhyChooseUsProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-reveal]'), { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        });

        tl.fromTo(
          q('[data-why-eyebrow]'),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 }
        )
          .fromTo(
            q('[data-why-title]'),
            { autoAlpha: 0, y: 20 },
            { autoAlpha: 1, y: 0, duration: 0.75 },
            0.15
          )
          .fromTo(
            q('[data-why-divider]'),
            { scaleY: 0 },
            { scaleY: 1, duration: 0.7, ease: 'power2.inOut' },
            0.25
          )
          .fromTo(
            q('[data-why-desc]'),
            { autoAlpha: 0, y: 16 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.3
          )
          .fromTo(
            q('[data-why-card]'),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' },
            0.4
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="why-choose-us"
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#f8fafd] py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ========================================================
            TOP HEADER AREA (Eyebrow + Two-Line Title | Divider | Desc)
           ======================================================== */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 lg:gap-8">
          {/* Left Column: Eyebrow + Bold Title */}
          <div className="lg:max-w-xl xl:max-w-2xl">
            {/* Eyebrow: Blue horizontal line + uppercase tracking text */}
            <div data-why-eyebrow data-reveal className="invisible flex items-center gap-2.5 mb-2.5 sm:mb-3">
              <span className="h-[2px] w-6 bg-primary shrink-0" />
              <span className="font-heading text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.18em] text-primary">
                {data.eyebrow}
              </span>
            </div>

            {/* Main Title: Exact two lines matching the reference */}
            <h2
              data-why-title
              data-reveal
              className="invisible font-heading text-[26px] xs:text-[30px] sm:text-[36px] lg:text-[40px] font-black text-[#0c1427] leading-[1.15] tracking-tight"
            >
              {data.title_line_1 && <span className="block">{data.title_line_1}</span>}
              {data.title_line_2 ? <span className="block">{data.title_line_2}</span> : data.title}
            </h2>
          </div>

          {/* Center Vertical Divider (Desktop Only) */}
          <div
            data-why-divider
            className="hidden lg:block w-[1px] h-16 xl:h-20 bg-slate-300/80 shrink-0 self-center mx-4 xl:mx-8 origin-top"
          />

          {/* Right Column: Supporting Description */}
          <div className="lg:max-w-[420px] xl:max-w-[460px]">
            <p
              data-why-desc
              data-reveal
              className="invisible text-[13.5px] sm:text-[14.5px] xl:text-[15px] leading-[1.65] text-[#475569]"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* ========================================================
            BOTTOM ROW: 4 Clean White Cards (Matching Screenshot)
           ======================================================== */}
        <div className="mt-8 sm:mt-10 lg:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 xl:gap-6">
          {data.items.map((item) => (
            <div
              key={item.id}
              data-why-card
              data-reveal
              className="invisible group relative flex items-center gap-4 p-5 sm:p-5.5 lg:p-6 bg-white rounded-[10px] sm:rounded-xl border border-slate-100/90 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-300 hover:shadow-[0_12px_28px_-6px_rgba(18,59,138,0.15)] hover:-translate-y-0.5 hover:border-primary/30 cursor-default"
            >
              {/* Left Blue Icon */}
              <div className="shrink-0 text-primary">
                <FeatureIcon name={item.icon || item.title} />
              </div>

              {/* Right Title + Subtitle */}
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-[15px] sm:text-[16px] font-bold text-[#0f172a] leading-tight tracking-[-0.01em] transition-colors duration-200 group-hover:text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 sm:mt-1.5 text-[12px] sm:text-[12.5px] leading-[1.4] text-[#64748b] font-normal">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
