'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { ProjectItem, ProjectsProps } from '../../types';
import LineEyebrow from '../../ui/LineEyebrow';
import DisplayTitle from '../../ui/DisplayTitle';

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Individual Project Card:
 * - High-definition image with subtle parallax and hover zoom
 * - Dark gradient overlay for optimal text contrast
 * - Uppercase bold title + orange accent dash with subtext
 * - Orange bottom reveal line on hover
 */
function ProjectCard({
  item,
  aspect = 'aspect-square',
  href = '#contact',
}: {
  item: ProjectItem;
  aspect?: string;
  href?: string;
}) {
  const sublabel = item.subtext || item.category;
  const targetHref = item.slug ? `/manufacturing-capabilities/${item.slug}` : href;

  return (
    <Link
      href={targetHref}
      data-project-card
      data-reveal
      aria-label={`${item.title} - ${sublabel}`}
      className={`group relative block w-full overflow-hidden bg-[#0d121c] cursor-pointer rounded-none sm:rounded-[2px] ${aspect}`}
    >
      {/* Inner overflow container with bleed for GSAP parallax scroll */}
      <div className="absolute -inset-y-[8%] inset-x-0 overflow-hidden">
        <Image
          data-project-img
          src={item.image}
          alt={item.alt || item.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>

      {/* Dark gradient for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/10 pointer-events-none" />

      {/* Card Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 lg:p-7 flex flex-col justify-end pointer-events-none z-10">
        <h3 className="font-heading text-[16px] sm:text-[18px] lg:text-[19px] xl:text-[21px] font-black uppercase leading-[1.18] tracking-[-0.01em] text-white">
          {item.title}
        </h3>
        <div className="mt-2.5 sm:mt-3 flex items-start gap-2.5">
          <span className="mt-[7px] sm:mt-[8px] h-[2px] w-3.5 sm:w-4 shrink-0 bg-primary transition-all duration-300 group-hover:w-6" />
          <p className="font-heading text-[10.5px] sm:text-[11.5px] lg:text-[12px] font-semibold uppercase tracking-[0.14em] sm:tracking-[0.16em] text-white/90 leading-tight">
            {sublabel}
          </p>
        </div>
      </div>

      {/* Bottom orange highlight bar */}
      <span className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 bg-primary transition-transform duration-500 ease-out group-hover:scale-x-100 z-20" />
    </Link>
  );
}

export default function Projects({ data, variant = 'grid' }: ProjectsProps) {
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
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
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
          .fromTo(q('[data-projects-copy]'), { autoAlpha: 0, y: 22 }, { autoAlpha: 1, y: 0, duration: 0.85, stagger: 0.12 }, 0.35);

        /* ---------- 2. Card Entrances Staggered ---------- */
        const cards = q('[data-project-card]');
        if (cards.length > 0) {
          gsap.fromTo(
            cards,
            { autoAlpha: 0, y: 40, scale: 0.98 },
            {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              stagger: 0.1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: cards[0],
                start: 'top 85%',
                once: true,
              },
            }
          );

          /* ---------- 3. Card Image Parallax on Scroll ---------- */
          cards.forEach((card) => {
            const img = card.querySelector('[data-project-img]');
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

  const displayItems = data.items;

  return (
    <section
      id="capabilities"
      ref={rootRef}
      className="relative w-full overflow-hidden bg-white py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header: Left Title block & Right Description */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-10 sm:mb-12 lg:mb-14">
          <div className="lg:col-span-7">
            <LineEyebrow text={data.eyebrow} className="mb-4 sm:mb-5" />
            <DisplayTitle bold={data.title_bold} light={data.title_light} />
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p
              data-projects-copy
              data-reveal
              className="invisible text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.65] text-[#646b7a]"
            >
              {data.description}
            </p>
          </div>
        </div>

        {/* 3x2 Grid of Capabilities Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7">
          {displayItems.map((item) => (
            <ProjectCard
              key={item.id}
              item={item}
              aspect="aspect-square"
              href={data.button_link || '#contact'}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
