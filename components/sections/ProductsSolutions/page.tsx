'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ProductsSolutionsProps, SolutionItem, SolutionsSectionData } from '../../types';
import LineEyebrow from '../../ui/LineEyebrow';
import DisplayTitle from '../../ui/DisplayTitle';
import PrimaryButton from '../../ui/PrimaryButton';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Individual Product / Solution Card:
 * - Left: High-precision automotive component image with hover zoom
 * - Right: Orange number + vertical accent divider + bold title & description
 * - Subtle elevation, border warm-up and orange accent line on hover
 */
function ProductSolutionCard({ item, href = '/products-solutions' }: { item: SolutionItem; href?: string }) {
  return (
    <Link
      href={href}
      data-solution-card
      data-reveal
      aria-label={`${item.number} ${item.title}`}
      className="group relative flex flex-col min-[480px]:flex-row overflow-hidden border border-[#e2e4e8] bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-[0_14px_34px_-16px_rgba(0,0,0,0.12)] cursor-pointer rounded-[4px] sm:rounded-[2px]"
    >
      {/* Image Area */}
      <div className="relative aspect-[16/10] min-[480px]:aspect-auto min-[480px]:w-[38%] lg:w-[40%] shrink-0 overflow-hidden bg-dark">
        <Image
          data-solution-img
          src={item.image}
          alt={item.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Right Content Area: Number + Vertical Divider + Title/Description */}
      <div className="flex-1 p-4 sm:p-5 lg:p-6 xl:p-7 flex items-center">
        <div className="flex items-center gap-3 sm:gap-4 w-full">
          {/* Number */}
          <span className="font-heading text-[18px] sm:text-[22px] lg:text-[24px] font-black text-primary shrink-0 leading-none">
            {item.number}
          </span>

          {/* Vertical Divider Line */}
          <div className="w-[1.5px] h-9 sm:h-12 bg-primary/30 shrink-0" />

          {/* Title & Description */}
          <div className="flex-1 min-w-0">
            <h3 className="font-heading text-[15px] sm:text-[17.5px] lg:text-[18.5px] font-black text-ink leading-tight tracking-[-0.01em] transition-colors duration-300 group-hover:text-primary">
              {item.title}
            </h3>
            <p className="mt-1 sm:mt-2 text-[12.5px] sm:text-[13.5px] leading-[1.6] text-[#646b7a]">
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Left orange accent line on hover */}
      <span className="absolute inset-y-0 left-0 w-[3px] origin-top scale-y-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-y-100 z-20" />
    </Link>
  );
}

export default function ProductsSolutions({
  data,
  variant = 'split',
  showButton = true,
}: ProductsSolutionsProps) {
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
        /* ---------- 1. Eyebrow + Heading + Text Reveal ---------- */
        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 78%', once: true },
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
          .fromTo(q('[data-solutions-copy]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, 0.35);

        /* ---------- 2. Solution Cards Staggered Slide In ---------- */
        const cards = q('[data-solution-card]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { autoAlpha: 0, x: -36, scale: 0.98 },
            {
              autoAlpha: 1,
              x: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 82%',
                once: true,
              },
            }
          );

          /* ---------- 3. Subtle Inner Image Parallax ---------- */
          cards.forEach((card) => {
            const img = card.querySelector('[data-solution-img]');
            if (img) {
              gsap.fromTo(
                img,
                { yPercent: -4 },
                {
                  yPercent: 4,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: card,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 1,
                  },
                }
              );
            }
          });
        }
      });
    },
    { scope: rootRef }
  );

  /* Products & Solutions full page: 2-column responsive grid */
  if (variant === 'grid') {
    return (
      <section ref={rootRef} className="relative w-full overflow-hidden bg-white py-8 sm:py-10 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-5 sm:gap-6 lg:grid-cols-2 lg:gap-16 items-end">
            <div>
              <LineEyebrow text={data.eyebrow} className="mb-3.5 sm:mb-5" />
              <DisplayTitle bold={data.title_bold} light={data.title_light} />
            </div>
            <p data-solutions-copy data-reveal className="text-[14px] sm:text-[15.5px] leading-relaxed text-[#646b7a] lg:pb-2">
              {data.description}
            </p>
          </div>

          <div className="mt-8 sm:mt-12 lg:mt-14 grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2">
            {data.items.map((item) => (
              <ProductSolutionCard key={item.id} item={item} href={data.button_link} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  /* Homepage Split: 3 Cards Left + Heading & CTA Right */
  const homepageItems = data.items.slice(0, data.homepage_count || 3);

  return (
    <section id="solutions" ref={rootRef} className="relative w-full overflow-hidden bg-[#f8fafd] py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Column (lg:col-span-7): Stacked Cards */}
          <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col gap-3.5 sm:gap-5">
            {homepageItems.map((item) => (
              <ProductSolutionCard key={item.id} item={item} href={data.button_link} />
            ))}
          </div>

          {/* Right Column (lg:col-span-5): Eyebrow + Heading + Copy + Button */}
          <div className="order-1 lg:order-2 lg:col-span-5">
            <LineEyebrow text={data.eyebrow} className="mb-3.5 sm:mb-5" />
            <DisplayTitle bold={data.title_bold} light={data.title_light} />

            <p data-solutions-copy data-reveal className="mt-4 sm:mt-6 text-[14px] sm:text-[16px] leading-[1.7] text-[#646b7a] max-w-[480px]">
              {data.description}
            </p>

            {showButton && (
              <div data-solutions-copy data-reveal className="mt-6 sm:mt-8 hidden lg:block">
                <PrimaryButton href={data.button_link} text={data.button_text} variant="solid" />
              </div>
            )}
          </div>

          {/* Mobile/Tablet CTA Button shown below cards */}
          {showButton && (
            <div data-solutions-copy data-reveal className="order-3 lg:hidden mt-2">
              <PrimaryButton href={data.button_link} text={data.button_text} variant="solid" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Re-export as Solutions for backward compatibility
export { ProductsSolutions as Solutions };

