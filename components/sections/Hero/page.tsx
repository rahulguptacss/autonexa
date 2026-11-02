'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ArrowRight } from 'lucide-react';
import type { HeroProps, HeroSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Full-screen home banner (fits the viewport below the fixed header).
 * GSAP: orange curtain image reveal + zoom-out, per-letter headline rise, masked light lines,
 * scroll parallax and subtle mouse-follow on the factory photo.
 */
export default function Hero({ data }: HeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const boldStr = Array.isArray(data.title_bold) ? data.title_bold.join(' ') : data.title_bold;
  const boldWords: string[] = boldStr.split(' ');
  const fullTitle = [boldStr, ...data.title_light].join(' ');

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      // Reduced motion: just show everything
      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-hero-reveal]'), { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        /* ---------- 1. Intro timeline ---------- */
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.15 });

        tl
          // Orange curtain sweeps in from the right…
          .fromTo(q('[data-hero-curtain]'), { scaleX: 0, transformOrigin: 'right center' }, { scaleX: 1, duration: 0.7, ease: 'power4.inOut' })
          // …photo appears behind it and zooms out while the curtain exits to the left
          .set(q('[data-hero-photo]'), { autoAlpha: 1 })
          .fromTo(q('[data-hero-img]'), { scale: 1.28 }, { scale: 1, duration: 2.2, ease: 'power2.out' }, '<')
          .to(q('[data-hero-curtain]'), { scaleX: 0, transformOrigin: 'left center', duration: 0.95, ease: 'power4.inOut' }, '<')

          // Eyebrow + accent line
          .fromTo(q('[data-hero-eyebrow]'), { autoAlpha: 0, y: 16 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 0.35)
          .fromTo(q('[data-hero-eyebrow-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.55)

          // Headline: letters of the heavy line rise one by one, light lines slide up from their masks
          .set(q('[data-hero-title]'), { autoAlpha: 1 }, 0.4)
          .fromTo(
            q('[data-hero-char]'),
            { yPercent: 115, rotate: 7 },
            { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.035, ease: 'power4.out' },
            0.45
          )
          .fromTo(q('[data-hero-line]'), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.13, ease: 'power4.out' }, 0.8)

          // Copy, CTA and scroll cue
          .fromTo(q('[data-hero-desc]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.1)
          .fromTo(q('[data-hero-cta]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.8 }, 1.25)
          .fromTo(q('[data-hero-arrow]'), { x: -10 }, { x: 0, duration: 0.8, ease: 'back.out(3)' }, 1.4)
          .fromTo(q('[data-hero-scroll]'), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.7 }, 1.6);

        // Looping dot on the scroll cue
        gsap.fromTo(
          q('[data-hero-scroll-dot]'),
          { y: 0, autoAlpha: 1 },
          { y: 34, autoAlpha: 0, duration: 1.5, ease: 'power1.in', repeat: -1, delay: 2 }
        );
      });

      // Desktop/tablet only: scroll parallax + mouse follow
      mm.add('(min-width: 768px) and (prefers-reduced-motion: no-preference)', () => {
        const scrub = { trigger: root, start: 'top 80', end: 'bottom top', scrub: true };

        gsap.to(q('[data-hero-parallax]'), { yPercent: 12, ease: 'none', scrollTrigger: scrub });
        gsap.to(q('[data-hero-content]'), { y: -90, opacity: 0.15, ease: 'none', scrollTrigger: scrub });

        const img = q('[data-hero-img]')[0];
        if (!img) return;
        const xTo = gsap.quickTo(img, 'x', { duration: 0.9, ease: 'power3' });
        const yTo = gsap.quickTo(img, 'y', { duration: 0.9, ease: 'power3' });

        const onMove = (e: MouseEvent) => {
          const r = root.getBoundingClientRect();
          xTo(((e.clientX - r.left) / r.width - 0.5) * -26);
          yTo(((e.clientY - r.top) / r.height - 0.5) * -18);
        };
        const onLeave = () => {
          xTo(0);
          yTo(0);
        };

        root.addEventListener('mousemove', onMove);
        root.addEventListener('mouseleave', onLeave);
        return () => {
          root.removeEventListener('mousemove', onMove);
          root.removeEventListener('mouseleave', onLeave);
        };
      });
    },
    { scope: rootRef }
  );

  return (
    <section
      ref={rootRef}
      className="relative flex w-full flex-col overflow-hidden bg-white h-[calc(100svh-76px)] min-h-[600px] sm:h-[calc(100svh-80px)] sm:min-h-[660px] md:block md:min-h-[560px]"
    >
      {/* ── Photo: fills the space under the text on mobile, faded background from md up ── */}
      <div className="relative order-2 min-h-[220px] w-full flex-1 overflow-hidden md:absolute md:inset-y-0 md:right-0 md:w-[84%] lg:w-[76%] xl:w-[72%]">
        <div data-hero-photo data-hero-reveal className="invisible absolute inset-0">
          <div data-hero-parallax className="absolute inset-0 will-change-transform">
            <div data-hero-img className="absolute -inset-[4%] will-change-transform">
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 76vw"
                className="object-cover object-[70%_center]"
              />
            </div>
          </div>
          {/* Mobile: soft white fade on top so the photo blends into the text block */}
          <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent md:hidden" />
          {/* md+: white haze from the left like the reference design */}
          <div className="absolute inset-0 hidden md:block bg-[linear-gradient(90deg,#ffffff_0%,rgba(255,255,255,0.94)_16%,rgba(255,255,255,0.6)_34%,rgba(255,255,255,0.12)_52%,rgba(255,255,255,0)_64%)]" />
          <div className="absolute inset-0 hidden md:block lg:hidden bg-white/25" />
        </div>
        {/* Orange curtain used by the reveal animation */}
        <div data-hero-curtain aria-hidden="true" className="absolute inset-0 z-10 origin-right scale-x-0 bg-primary" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 order-1 w-full max-w-7xl mx-auto px-5 sm:px-8 md:h-full">
        <div data-hero-content className="flex items-center pt-8 pb-7 sm:pt-12 sm:pb-9 md:h-full md:py-16">
          <div className="w-full max-w-[540px] lg:max-w-[600px]">
            {/* Eyebrow: text followed by an orange line */}
            <div data-hero-eyebrow data-hero-reveal className="invisible flex items-center gap-4">
              <span className="font-heading text-[10.5px] sm:text-[12px] font-medium uppercase tracking-[0.3em] sm:tracking-[0.34em] text-ink/65">
                {data.eyebrow}
              </span>
              <span data-hero-eyebrow-line className="h-[1.5px] w-7 sm:w-9 shrink-0 origin-left bg-primary" />
            </div>

            {/* Headline: heavy first line (split into letters), thin follow-up lines */}
            <h1 data-hero-title data-hero-reveal aria-label={fullTitle} className="invisible mt-5 sm:mt-7 font-heading uppercase text-ink">
              <span aria-hidden="true" className="block overflow-hidden pb-[0.06em] font-black leading-[0.95] tracking-[-0.035em] text-[42px] min-[400px]:text-[50px] sm:text-[62px] md:text-[60px] lg:text-[74px] xl:text-[84px]">
                {boldWords.map((word, wIdx) => (
                  <span key={`${word}-${wIdx}`}>
                    <span className="inline-block whitespace-nowrap">
                      {word.split('').map((ch, cIdx) => (
                        <span key={`${ch}-${cIdx}`} data-hero-char className="inline-block will-change-transform">
                          {ch}
                        </span>
                      ))}
                    </span>
                    {wIdx < boldWords.length - 1 && ' '}
                  </span>
                ))}
              </span>
              {data.title_light.map((line, idx) => (
                <span key={`${line}-${idx}`} aria-hidden="true" className="block overflow-hidden pb-[0.04em]">
                  <span
                    data-hero-line
                    className="mt-[0.1em] block font-light leading-[1.02] tracking-[-0.015em] text-[33px] min-[400px]:text-[39px] sm:text-[48px] md:text-[47px] lg:text-[58px] xl:text-[66px]"
                  >
                    {line}
                  </span>
                </span>
              ))}
            </h1>

            <p
              data-hero-desc
              data-hero-reveal
              className="invisible mt-5 sm:mt-7 max-w-[360px] lg:max-w-[390px] text-[14.5px] sm:text-[15px] lg:text-base leading-[1.6] text-ink/65"
            >
              {data.description}
            </p>

            <div data-hero-cta data-hero-reveal className="invisible mt-6 sm:mt-8">
              <Link
                href={data.cta_link}
                className="group inline-flex items-center gap-3 font-heading text-[15px] sm:text-base font-semibold text-ink transition-colors duration-300 hover:text-primary"
              >
                <span className="relative">
                  {data.cta_text}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <span data-hero-arrow className="inline-flex">
                  <ArrowRight className="h-[18px] w-[18px] text-primary transition-transform duration-300 group-hover:translate-x-1.5" strokeWidth={2} aria-hidden="true" />
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll cue (md+) */}
        <div
          data-hero-scroll
          data-hero-reveal
          className="invisible absolute bottom-7 left-5 sm:left-8 hidden md:flex items-center gap-3 font-heading text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/55"
        >
          <span className="relative h-10 w-px overflow-hidden bg-ink/15">
            <span data-hero-scroll-dot className="absolute left-0 top-0 h-3 w-px bg-primary" />
          </span>
          {data.scroll_text}
        </div>
      </div>
    </section>
  );
}
