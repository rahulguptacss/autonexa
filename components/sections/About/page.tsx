'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { AboutProps, AboutSectionData } from '../../types';
import LineEyebrow from '../../ui/LineEyebrow';
import DisplayTitle from '../../ui/DisplayTitle';
import TextLink from '../../ui/TextLink';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * About intro: heading left, lead copy right, wide factory banner below.
 * GSAP: letter-by-letter heading, staggered copy, banner clip-path expand + zoom-out on scroll, parallax.
 */
export default function About({ data, showButton = true }: AboutProps) {
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
        /* ---------- 1. Text intro (plays once when the section enters) ---------- */
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        });

        tl.fromTo(q('[data-eyebrow]'), { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.7 })
          .fromTo(q('[data-eyebrow-line]'), { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0.2)
          .set(q('[data-title]'), { autoAlpha: 1 }, 0.1)
          .fromTo(q('[data-title-char]'), { yPercent: 115, rotate: 7 }, { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.03, ease: 'power4.out' }, 0.15)
          .fromTo(q('[data-title-line]'), { yPercent: 110 }, { yPercent: 0, duration: 1, stagger: 0.12, ease: 'power4.out' }, 0.45)
          .fromTo(q('[data-about-copy]'), { autoAlpha: 0, y: 28 }, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, 0.35)
          .fromTo(q('[data-link-arrow]'), { x: -10 }, { x: 0, duration: 0.8, ease: 'back.out(3)' }, 0.9);

        /* ---------- 2. Banner: frame expands + photo zooms out while scrolling in ---------- */
        gsap.fromTo(
          q('[data-about-banner]'),
          { clipPath: 'inset(10% 7% 10% 7%)' },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'none',
            scrollTrigger: { trigger: q('[data-about-banner]')[0], start: 'top 95%', end: 'top 35%', scrub: 0.6 },
          }
        );
        gsap.fromTo(
          q('[data-about-banner-img]'),
          { scale: 1.25 },
          {
            scale: 1,
            ease: 'none',
            scrollTrigger: { trigger: q('[data-about-banner]')[0], start: 'top 95%', end: 'top 35%', scrub: 0.6 },
          }
        );

        /* ---------- 3. Subtle parallax for the photo inside the frame ---------- */
        gsap.fromTo(
          q('[data-about-banner-parallax]'),
          { yPercent: -7 },
          {
            yPercent: 7,
            ease: 'none',
            scrollTrigger: { trigger: q('[data-about-banner]')[0], start: 'top bottom', end: 'bottom top', scrub: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  return (
    <section id="about" ref={rootRef} className="relative w-full overflow-hidden bg-[#f8fafd] py-10 sm:py-14 lg:py-16 scroll-mt-20 border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-7 sm:gap-9 lg:grid-cols-[1.2fr_1fr] lg:gap-12 xl:gap-16 items-start">
          {/* Heading */}
          <div>
            <LineEyebrow text={data.eyebrow} className="mb-5 sm:mb-6" />
            <DisplayTitle bold={data.title_bold} light={data.title_light} />
          </div>

          {/* Copy (top-aligned with the heading on desktop) */}
          <div className="lg:pt-11 xl:pt-12">
            <p data-about-copy data-reveal className="invisible max-w-[520px] text-[17px] sm:text-lg xl:text-[19px] leading-[1.5] text-ink">
              {data.lead}
            </p>
            <p data-about-copy data-reveal className="invisible mt-4 sm:mt-5 max-w-[520px] text-[14.5px] sm:text-[15px] leading-[1.7] text-[#646b7a]">
              {data.description}
            </p>
            {showButton && (
              <div data-about-copy data-reveal className="invisible mt-6 sm:mt-7">
                <TextLink href={data.button_link} text={data.button_text} />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wide factory banner (near full-bleed like the reference) */}
      <div className="mt-6 sm:mt-7 lg:mt-8 px-3 sm:px-4">
        <div
          data-about-banner
          className="relative mx-auto aspect-[16/10] sm:aspect-[16/8] md:aspect-[16/6.5] lg:aspect-[4/1] w-full max-w-[1680px] overflow-hidden bg-soft"
        >
          <div data-about-banner-parallax className="absolute inset-x-0 -inset-y-[9%] will-change-transform">
            <div data-about-banner-img className="absolute inset-0 will-change-transform">
              <Image src={data.image} alt={data.image_alt} fill quality={90} sizes="(max-width: 1680px) 100vw, 1680px" className="object-cover object-[40%_60%]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
