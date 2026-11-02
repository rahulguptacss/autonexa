'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Check } from 'lucide-react';
import type { QualityProps } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Quality({ data }: QualityProps) {
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
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });

        tl.fromTo(
          q('[data-quality-eyebrow]'),
          { autoAlpha: 0, y: 12 },
          { autoAlpha: 1, y: 0, duration: 0.6 }
        )
          .fromTo(
            q('[data-quality-title]'),
            { autoAlpha: 0, y: 22 },
            { autoAlpha: 1, y: 0, duration: 0.75 },
            0.15
          )
          .fromTo(
            q('[data-quality-desc]'),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.7 },
            0.3
          )
          .fromTo(
            q('[data-quality-item]'),
            { autoAlpha: 0, x: -16 },
            { autoAlpha: 1, x: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out' },
            0.4
          )
          .fromTo(
            q('[data-quality-img-wrap]'),
            { autoAlpha: 0, scale: 0.96, x: 24 },
            { autoAlpha: 1, scale: 1, x: 0, duration: 0.85, ease: 'power3.out' },
            0.3
          );

        // Subtle Parallax on visual
        const img = q('[data-quality-img]')[0];
        const wrap = q('[data-quality-img-wrap]')[0];
        if (img && wrap) {
          gsap.fromTo(
            img,
            { yPercent: -4 },
            {
              yPercent: 4,
              ease: 'none',
              scrollTrigger: {
                trigger: wrap,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            }
          );
        }
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      id="quality"
      ref={rootRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
          {/* ========================================================
              LEFT COLUMN: Eyebrow + Two-Tone Title + Description + Checklist
             ======================================================== */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            {/* Eyebrow */}
            <div
              data-quality-eyebrow
              data-reveal
              className="invisible flex items-center gap-2.5 mb-2.5 sm:mb-3"
            >
              <span className="h-[2.5px] w-6 bg-primary shrink-0" />
              <span className="font-heading text-[11px] sm:text-[12.5px] font-bold uppercase tracking-[0.18em] text-primary">
                {data.eyebrow}
              </span>
            </div>

            {/* Title: 2 lines matching the reference */}
            <h2
              data-quality-title
              data-reveal
              className="invisible font-heading text-[28px] xs:text-[32px] sm:text-[38px] lg:text-[42px] xl:text-[44px] font-black text-[#0c1427] leading-[1.14] tracking-tight"
            >
              {data.title_line_1 && <span className="block">{data.title_line_1}</span>}
              {data.title_line_2 ? <span className="block">{data.title_line_2}</span> : data.title}
            </h2>

            {/* Supporting Paragraph */}
            <p
              data-quality-desc
              data-reveal
              className="invisible mt-4 sm:mt-5 text-[14.5px] sm:text-[15.5px] leading-[1.65] text-[#475569] max-w-xl"
            >
              {data.description}
            </p>

            {/* Checklist with Solid Blue Check Icons */}
            <ul className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-4">
              {data.checklist.map((item, idx) => (
                <li
                  key={idx}
                  data-quality-item
                  data-reveal
                  className="invisible flex items-center gap-3.5 sm:gap-4"
                >
                  <span className="flex h-6 w-6 sm:h-6.5 sm:w-6.5 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm shadow-primary/25">
                    <Check className="h-3.5 w-3.5 sm:h-4 sm:w-4 stroke-[3]" />
                  </span>
                  <span className="font-heading font-semibold text-[14.5px] sm:text-[15.5px] text-[#0f172a] tracking-tight">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Technical CMM Macro Image with Slanted Pill Accent
             ======================================================== */}
          <div className="lg:col-span-6 relative">
            <div
              data-quality-img-wrap
              data-reveal
              className="invisible relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[16/11] rounded-tl-[44px] sm:rounded-tl-[54px] rounded-tr-[16px] sm:rounded-tr-[20px] rounded-br-[28px] sm:rounded-br-[36px] rounded-bl-[16px] overflow-hidden shadow-[0_16px_40px_-16px_rgba(0,0,0,0.18)] border border-slate-200/80 bg-slate-100 group"
            >
              <Image
                data-quality-img
                src={data.image}
                alt={data.image_alt}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dynamic slanted electric blue accent pill on the lower-left edge (matching screenshot) */}
              <div
                className="absolute -left-2.5 sm:-left-3.5 bottom-8 sm:bottom-12 w-3 sm:w-4 h-24 sm:h-32 bg-primary rounded-full -rotate-[22deg] shadow-lg shadow-primary/40 z-20 pointer-events-none"
                aria-hidden="true"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

