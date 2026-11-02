'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import type { FooterProps } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

function SocialIcon({ icon }: { icon: string }) {
  const key = icon.toLowerCase();
  const cls = 'h-5 w-5 fill-current text-white/85 transition-all duration-200 group-hover:text-white group-hover:scale-110';

  if (key === 'linkedin' || key === 'linkdin') {
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
      </svg>
    );
  }
  if (key === 'youtube') {
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (key === 'x' || key === 'twitter') {
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (key === 'instagram') {
    return (
      <svg className={cls} viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    );
  }
  return null;
}

export default function Footer({ data }: FooterProps) {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add('(prefers-reduced-motion: reduce)', () => {
        gsap.set(q('[data-footer-reveal]'), { autoAlpha: 1 });
      });

      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.fromTo(
          q('[data-footer-reveal]'),
          { autoAlpha: 0, y: 15 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: root, start: 'top 90%', once: true },
          }
        );
      });
    },
    { scope: rootRef }
  );

  const menuTitle = data.menu_title || 'Quick Links';
  const connectTitle = data.connect_title || 'Connect With Us';

  return (
    <footer
      ref={rootRef}
      className="relative w-full overflow-hidden bg-[#061226] text-white/70"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* ========================================================
            TOP MAIN ROW (Logo | Quick Links | Connect With Us)
           ======================================================== */}
        <div className="pt-10 sm:pt-12 lg:pt-14 pb-8 sm:pb-10 flex flex-col lg:flex-row lg:items-start justify-between gap-8 lg:gap-10 xl:gap-14">
          {/* 1. Left: White Automotive Logo */}
          <div data-footer-reveal className="invisible shrink-0">
            <Link
              href="/"
              aria-label={data.logo_text || 'Autonexa'}
              className="relative block w-[180px] sm:w-[200px] lg:w-[220px] aspect-[960/280] transition-opacity duration-300 hover:opacity-90"
            >
              <Image
                src={data.logo}
                alt={data.logo_text || 'Autonexa'}
                fill
                priority
                sizes="(max-width: 640px) 180px, 220px"
                className="object-contain object-left"
              />
            </Link>
          </div>

          {/* 2. Middle: Quick Links + Horizontal Row of Links */}
          <div data-footer-reveal className="invisible flex-1 lg:max-w-2xl xl:max-w-3xl lg:px-4 xl:px-6">
            <h4 className="font-heading text-[15px] sm:text-[16px] font-bold text-white tracking-wide">
              {menuTitle}
            </h4>

            <ul className="mt-3.5 sm:mt-4 flex flex-wrap items-center gap-x-5 sm:gap-x-6 xl:gap-x-7 gap-y-2">
              {data.menu_links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[13px] sm:text-[13.5px] font-medium text-white/70 transition-colors duration-200 hover:text-white whitespace-nowrap"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Right: Connect With Us + Social Icons */}
          {data.socials && data.socials.length > 0 && (
            <div data-footer-reveal className="invisible shrink-0">
              <h4 className="font-heading text-[15px] sm:text-[16px] font-bold text-white tracking-wide">
                {connectTitle}
              </h4>

              <div className="mt-3.5 sm:mt-4 flex items-center gap-4 sm:gap-4.5">
                {data.socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.aria_label || social.name}
                    className="group flex items-center justify-center transition-transform duration-200"
                  >
                    <SocialIcon icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================
            BOTTOM BAR: Divider Line + Centered Copyright
           ======================================================== */}
        <div className="border-t border-white/10 py-5 sm:py-6 flex items-center justify-center text-[12px] sm:text-[12.5px] text-white/60">
          <p data-footer-reveal className="invisible tracking-wide text-center">
            {data.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
