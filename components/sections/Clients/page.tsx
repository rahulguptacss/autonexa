'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ShieldCheck, Globe, Zap } from 'lucide-react';
import type { ClientsProps } from '../../types';
import LineEyebrow from '../../ui/LineEyebrow';
import DisplayTitle from '../../ui/DisplayTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Clients({ data }: ClientsProps) {
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
        /* 1. Header Entrance */
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 82%', once: true },
        });

        tl.fromTo(q('[data-eyebrow]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 })
          .fromTo(q('[data-eyebrow-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.2)
          .set(q('[data-title]'), { autoAlpha: 1 }, 0.1)
          .fromTo(
            q('[data-title-char]'),
            { yPercent: 115, rotate: 6 },
            { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.025, ease: 'power4.out' },
            0.15
          )
          .fromTo(q('[data-title-line]'), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, 0.45)
          .fromTo(q('[data-clients-desc]'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 0.35);

        /* 2. Client Brand Cards Stagger */
        const cards = q('[data-brand-card]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 24, scale: 0.96 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.04,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 86%',
                once: true,
              },
            }
          );
        }

        /* 3. Bottom Stats Ribbon */
        const ribbon = q('[data-clients-ribbon]');
        if (ribbon.length > 0) {
          gsap.fromTo(
            ribbon,
            { autoAlpha: 0, y: 28 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: ribbon[0],
                start: 'top 92%',
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: rootRef }
  );

  const displayItems = data.items.slice(0, 12);

  return (
    <section
      id="clients"
      ref={rootRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ========================================================
            1. TOP HEADER (Left Title | Right Supporting Description)
           ======================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <LineEyebrow text={data.eyebrow} className="mb-4 sm:mb-5" />
            <DisplayTitle bold={data.title_bold} light={data.title_light} />
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p
              data-clients-desc
              data-reveal
              className="invisible text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.65] text-[#646b7a]"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* ========================================================
            2. TWO ROWS OF 6 CARDS EACH (6-Column Grid on Desktop)
           ======================================================== */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4 lg:gap-5">
          {displayItems.map((brand) => (
            <div
              key={brand.id}
              data-brand-card
              data-reveal
              className="invisible group relative flex flex-col items-center justify-center h-24 sm:h-28 rounded-2xl bg-[#fcfdff] border border-slate-200/80 shadow-[0_4px_16px_-4px_rgba(15,23,42,0.03)] hover:shadow-[0_16px_32px_-6px_rgba(18,59,138,0.18)] hover:border-primary/50 hover:bg-white hover:-translate-y-1 transition-all duration-300 p-4 sm:p-5 cursor-pointer overflow-hidden"
            >
              {/* Top Accent Shimmer Highlight on Hover */}
              <div className="absolute top-0 inset-x-4 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Brand Logo Image from /brand/ Folder */}
              <Image
                src={brand.logo}
                alt={brand.name}
                width={180}
                height={70}
                className="max-h-9 sm:max-h-11 w-auto max-w-[82%] object-contain filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
              />

              {/* Subtle Brand Name Tooltip on Hover */}
              <span className="absolute bottom-1.5 font-heading text-[10px] font-bold uppercase tracking-wider text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {brand.name}
              </span>
            </div>
          ))}
        </div>

        {/* ========================================================
            3. GLOBAL TRUST & STATS RIBBON
           ======================================================== */}
        {data.stats && data.stats.length > 0 && (
          <div
            data-clients-ribbon
            data-reveal
            className="invisible mt-10 sm:mt-14 lg:mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 p-6 sm:p-8 lg:p-10 rounded-2xl sm:rounded-3xl bg-[#091222] text-white border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.35)] relative overflow-hidden"
          >
            {/* Ambient Background Glow */}
            <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -left-20 -top-20 w-60 h-60 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            {data.stats.map((stat, idx) => (
              <div key={idx} className="relative z-10 flex flex-col justify-center">
                <span className="font-heading font-black text-[26px] sm:text-[32px] lg:text-[38px] text-white tracking-tight leading-none">
                  {stat.value}
                </span>
                <div className="mt-2 flex items-center gap-2">
                  <span className="h-[2px] w-3 bg-primary shrink-0" />
                  <span className="font-heading text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.14em] text-slate-300 leading-tight">
                    {stat.label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
