'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import {
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ChevronDown,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import type { ContactProps, ContactSectionData } from '../../types';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Contact({ data }: ContactProps) {
  const rootRef = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [selectedInterest, setSelectedInterest] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneValue, setPhoneValue] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { form, help_badge, info_cards } = data;

  const rawOptions = form.interest_options || [
    'Advanced Manufacturing',
    'Precision Engineering',
    'Quality Assurance',
    'Scalable Production',
    'Advanced Automation',
    'End-to-End Capabilities',
    'Powertrain Components',
    'Chassis & Safety Solutions',
    'EV Drive Systems',
  ];
  const placeholderText = form.interest_placeholder || 'Product / Solution of Interest';
  const cleanOptions = rawOptions.filter(
    (opt) =>
      opt &&
      opt.trim().length > 0 &&
      opt.trim().toLowerCase() !== placeholderText.trim().toLowerCase()
  );

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow navigation / editing keys
    const allowedControlKeys = [
      'Backspace',
      'Delete',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Tab',
      'Enter',
      'Home',
      'End',
    ];
    if (allowedControlKeys.includes(e.key) || e.ctrlKey || e.metaKey) {
      return;
    }
    // Allow '+' only if it's at index 0 and no '+' already exists
    if (e.key === '+' && (e.currentTarget.selectionStart === 0 && !e.currentTarget.value.includes('+'))) {
      return;
    }
    // Only allow numbers 0-9
    if (!/^[0-9]$/.test(e.key)) {
      e.preventDefault();
    }
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Strip all non-numeric characters except optional leading '+'
    let value = e.target.value.replace(/[^0-9+]/g, '');
    if (value.includes('+')) {
      const hasLeadingPlus = value.startsWith('+');
      value = (hasLeadingPlus ? '+' : '') + value.replace(/\+/g, '');
    }
    setPhoneValue(value);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
        // 1. Top Header Reveal
        const headTl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root, start: 'top 80%', once: true },
        });

        headTl
          .fromTo(
            q('[data-contact-eyebrow]'),
            { autoAlpha: 0, y: 12 },
            { autoAlpha: 1, y: 0, duration: 0.6 }
          )
          .fromTo(
            q('[data-contact-title]'),
            { autoAlpha: 0, y: 24 },
            { autoAlpha: 1, y: 0, duration: 0.8 },
            0.1
          )
          .fromTo(
            q('[data-contact-desc]'),
            { autoAlpha: 0, y: 18 },
            { autoAlpha: 1, y: 0, duration: 0.75 },
            0.2
          );

        // 2. Left Column (Image + Phone Badge) Reveal
        gsap.fromTo(
          q('[data-contact-left]'),
          { autoAlpha: 0, y: 35, scale: 0.98 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: q('[data-contact-left]')[0],
              start: 'top 85%',
              once: true,
            },
          }
        );

        // 3. Right Column (Form Box) Reveal
        gsap.fromTo(
          q('[data-contact-form]'),
          { autoAlpha: 0, y: 35 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.85,
            delay: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: q('[data-contact-form]')[0],
              start: 'top 85%',
              once: true,
            },
          }
        );

        // 4. Info Cards Stagger
        const infoCards = q('[data-info-card]');
        if (infoCards.length > 0) {
          gsap.fromTo(
            infoCards,
            { autoAlpha: 0, y: 25 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.75,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: infoCards[0],
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });
    },
    { scope: rootRef }
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const target = e.currentTarget;
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setSelectedInterest('');
      setPhoneValue('');
      setDropdownOpen(false);
      target.reset();
    }, 850);
  };

  return (
    <section id="contact" ref={rootRef} className="relative w-full bg-[#f8fafd] py-12 sm:py-16 lg:py-20 scroll-mt-20 border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ========================================================
            1. SECTION HEADER (Eyebrow, Two-Tone Heading, Subtitle)
           ======================================================== */}
        <div className="max-w-3xl">
          <div data-contact-eyebrow className="flex items-center gap-2 sm:gap-2.5">
            <span className="h-[2px] w-5 bg-primary shrink-0" />
            <span className="font-heading text-[11.5px] sm:text-[13px] font-bold uppercase tracking-[0.18em] text-primary">
              {data.eyebrow}
            </span>
          </div>

          <h1
            data-contact-title
            className="font-heading text-[28px] xs:text-[34px] sm:text-[42px] lg:text-[48px] font-black uppercase tracking-tight leading-[1.12] mt-3 sm:mt-4 text-[#0f172a]"
          >
            {data.title_black || data.title_bold}{' '}
            <span className="text-primary">{data.title_orange || (data.title_light && data.title_light[0])}</span>
          </h1>

          <p
            data-contact-desc
            className="mt-3.5 sm:mt-4 text-[14px] sm:text-[15.5px] leading-[1.7] text-[#555d6e]"
          >
            {data.description}
          </p>
        </div>

        {/* ========================================================
            2. MAIN CONTENT (Left Image + Phone Badge | Right Form)
           ======================================================== */}
        <div className="mt-8 sm:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* ── LEFT COLUMN: Engineers Photo + Bottom Phone Bar ── */}
          <div
            data-contact-left
            className="lg:col-span-5 relative flex flex-col justify-between rounded-2xl sm:rounded-3xl overflow-hidden bg-[#0c1424] border border-slate-200/90 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.18)] group transition-all duration-300 hover:shadow-[0_24px_60px_-20px_rgba(18,59,138,0.22)]"
          >
            {/* Top Image Container with Parallax Zoom and Dark Gradient */}
            <div className="relative aspect-[4/4.4] sm:aspect-[4/4.5] lg:flex-1 lg:min-h-[380px] w-full overflow-hidden bg-slate-950">
              <Image
                src={data.image}
                alt={data.image_alt}
                fill
                priority
                quality={92}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Gradient Vignette for Depth & seamless transition */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c1424] via-black/20 to-black/10 pointer-events-none" />

              {/* Top Floating Badge: Engineers Online / Active */}
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 shadow-lg pointer-events-none">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="font-heading text-[10.5px] sm:text-[11px] font-bold uppercase tracking-[0.14em] text-white/95">
                  Senior Engineers On-Site
                </span>
              </div>

              {/* Dynamic Slanted Brand Accent Pill */}
              <div
                className="absolute -right-2 top-14 w-2.5 sm:w-3 h-16 sm:h-20 bg-primary rounded-full rotate-[18deg] shadow-lg shadow-primary/50 z-20 pointer-events-none"
                aria-hidden="true"
              />
            </div>

            {/* Bottom Dark Luxury Navy Bar with Phone Icon Box and Number */}
            {help_badge && (
              <a
                href={help_badge.phone_href || `tel:${help_badge.phone.replace(/[^0-9+]/g, '')}`}
                className="relative z-10 flex items-center gap-4 sm:gap-5 bg-gradient-to-b from-[#0c1424] to-[#070c16] p-5 sm:p-6 lg:p-7 border-t border-white/10 transition-colors duration-300 hover:bg-[#111c33]"
              >
                {/* Glowing Primary Phone Icon Box */}
                <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shrink-0 text-white shadow-lg shadow-primary/30 transition-all duration-300 group-hover:scale-105 group-hover:shadow-primary/50 ring-4 ring-primary/20">
                  <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-white fill-white" />
                </div>

                {/* Question Label + Phone Number */}
                <div className="flex flex-col justify-center min-w-0 flex-1">
                  <span className="text-primary font-heading text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.18em] leading-tight">
                    {help_badge.label}
                  </span>
                  <span className="font-heading font-black text-[20px] sm:text-[23px] lg:text-[25px] text-white tracking-tight leading-tight mt-1 transition-colors duration-200 group-hover:text-primary">
                    {help_badge.phone}
                  </span>
                </div>

                {/* Interactive Arrow Action Pill */}
                <div className="shrink-0 w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all duration-300 group-hover:translate-x-0.5">
                  <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                </div>
              </a>
            )}
          </div>

          {/* ── RIGHT COLUMN: Request a Quote Form (Card matching screenshot) ── */}
          <div
            data-contact-form
            className="lg:col-span-7 bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 border border-slate-200/90 shadow-[0_10px_35px_-5px_rgba(15,23,42,0.06)] flex flex-col justify-between"
          >
            {/* Form Header */}
            <div>
              {form.eyebrow && (
                <div className="flex items-center gap-2.5">
                  <span className="h-[2.5px] w-6 bg-primary shrink-0" />
                  <span className="font-heading text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.16em] text-primary">
                    {form.eyebrow}
                  </span>
                </div>
              )}

              <h2 className="font-heading text-[30px] sm:text-[36px] lg:text-[40px] font-black tracking-tight text-[#0f172a] mt-2.5 leading-tight">
                {form.title_black && `${form.title_black} `}
                <span className="text-primary">{form.title_orange || form.title}</span>
              </h2>

              {form.subtitle && (
                <p className="mt-2.5 text-[14px] sm:text-[15px] leading-relaxed text-[#555d6e]">
                  {form.subtitle}
                </p>
              )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-6 sm:mt-8 flex flex-col gap-4 sm:gap-4.5">
              {/* Row 1: Name & Company */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
                <input
                  type="text"
                  name="name"
                  required
                  placeholder={form.name_placeholder}
                  className="w-full h-[52px] sm:h-[56px] px-5 rounded-[4px] border border-slate-200 bg-[#f8fafc] text-[14px] sm:text-[14.5px] text-[#1e293b] placeholder:text-[#64748b] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
                <input
                  type="text"
                  name="company"
                  placeholder={form.company_placeholder}
                  className="w-full h-[52px] sm:h-[56px] px-5 rounded-[4px] border border-slate-200 bg-[#f8fafc] text-[14px] sm:text-[14.5px] text-[#1e293b] placeholder:text-[#64748b] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Row 2: Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder={form.email_placeholder}
                  className="w-full h-[52px] sm:h-[56px] px-5 rounded-[4px] border border-slate-200 bg-[#f8fafc] text-[14px] sm:text-[14.5px] text-[#1e293b] placeholder:text-[#64748b] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  value={phoneValue}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  inputMode="numeric"
                  pattern="[0-9+]*"
                  placeholder={form.phone_placeholder}
                  className="w-full h-[52px] sm:h-[56px] px-5 rounded-[4px] border border-slate-200 bg-[#f8fafc] text-[14px] sm:text-[14.5px] text-[#1e293b] placeholder:text-[#64748b] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Row 3: Product / Solution of Interest (Custom Select matching screenshot) */}
              <div ref={dropdownRef} className="relative w-full">
                <input type="hidden" name="interest" value={selectedInterest} />
                <button
                  type="button"
                  aria-haspopup="listbox"
                  aria-expanded={dropdownOpen}
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className={`w-full h-[52px] sm:h-[56px] px-5 rounded-[4px] border bg-[#f8fafc] flex items-center justify-between text-[14px] sm:text-[14.5px] transition-all shadow-[0_1px_2px_rgba(0,0,0,0.02)] cursor-pointer text-left select-none outline-none ${
                    dropdownOpen
                      ? 'border-primary bg-white ring-2 ring-primary/15'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <span
                    className={
                      selectedInterest
                        ? 'text-[#1e293b] font-medium truncate'
                        : 'text-[#64748b] truncate'
                    }
                  >
                    {selectedInterest || placeholderText}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#1e293b] stroke-[2.2] transition-transform duration-200 shrink-0 ml-2 ${
                      dropdownOpen ? 'rotate-180 text-primary' : ''
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <ul
                    role="listbox"
                    className="absolute left-0 right-0 top-full mt-1.5 max-h-[280px] overflow-y-auto rounded-[6px] border border-slate-200 bg-white py-1.5 shadow-[0_12px_36px_-6px_rgba(0,0,0,0.16),0_4px_12px_rgba(0,0,0,0.06)] z-50 divide-y divide-slate-100"
                  >
                    {cleanOptions.map((opt, idx) => {
                      const isSelected = selectedInterest === opt;
                      return (
                        <li
                          key={idx}
                          role="option"
                          aria-selected={isSelected}
                          onClick={() => {
                            setSelectedInterest(opt);
                            setDropdownOpen(false);
                          }}
                          className={`flex items-center justify-between px-5 py-3 sm:py-3.5 text-[13.5px] sm:text-[14px] cursor-pointer transition-colors ${
                            isSelected
                              ? 'bg-primary/10 text-primary font-bold'
                              : 'text-[#1e293b] hover:bg-slate-50 hover:text-primary font-medium'
                          }`}
                        >
                          <span>{opt}</span>
                          {isSelected && <Check className="w-4 h-4 text-primary stroke-[2.5]" />}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              {/* Row 4: Message Textarea */}
              <div>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={form.message_placeholder}
                  className="w-full min-h-[140px] sm:min-h-[150px] p-5 rounded-[4px] border border-slate-200 bg-[#f8fafc] text-[14px] sm:text-[14.5px] text-[#1e293b] placeholder:text-[#64748b] focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/15 outline-none transition-all resize-y shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
                />
              </div>

              {/* Row 5: Submit Button */}
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 rounded-[4px] bg-primary hover:bg-primary-dark text-white font-heading font-bold text-[14.5px] sm:text-[15px] shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer disabled:opacity-70"
                >
                  <span>{status === 'sending' ? form.submitting_text : form.submit_text}</span>
                  <span className="text-[17px] leading-none">→</span>
                </button>
              </div>

              {/* Success Notification */}
              {status === 'sent' && (
                <div
                  role="status"
                  className="flex items-center gap-2.5 p-4 rounded-[4px] bg-[#f0fdf4] border border-[#bbf7d0] text-[#166534] text-[13.5px] sm:text-[14px] mt-2 shadow-xs"
                >
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span>{form.success_message}</span>
                </div>
              )}
            </form>
          </div>
        </div>

        {/* ========================================================
            3. THREE INFO CARDS (Address, Phone, Email)
           ======================================================== */}
        <div className="mt-12 sm:mt-16 lg:mt-20 pt-8 sm:pt-12 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {info_cards.map((card) => {
              const href =
                card.href ||
                (card.id === 'address'
                  ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      card.lines.join(' ')
                    )}`
                  : undefined);

              const CardWrapper = href ? 'a' : 'div';
              const wrapperProps = href
                ? {
                    href,
                    target: card.id === 'address' ? '_blank' : undefined,
                    rel: card.id === 'address' ? 'noopener noreferrer' : undefined,
                  }
                : {};

              return (
                <CardWrapper
                  key={card.id}
                  data-info-card
                  {...wrapperProps}
                  className="group relative flex items-start gap-4 sm:gap-4.5 p-5 sm:p-6 lg:p-6.5 rounded-2xl bg-white border border-slate-200/80 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(18,59,138,0.18)] hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer"
                >
                  {/* Subtle top primary highlight on hover */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-primary/20 via-primary to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Left Icon Badge with vibrant gradient & soft shadow */}
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-primary/10 text-primary flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-105 shadow-xs group-hover:shadow-md group-hover:shadow-primary/30">
                      {card.icon === 'phone' ? (
                        <Phone className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                      ) : card.icon === 'mail' ? (
                        <Mail className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                      ) : (
                        <MapPin className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.2]" />
                      )}
                    </div>
                  </div>

                  {/* Right Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-1 sm:mb-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                      <span className="font-heading font-bold text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] text-primary">
                        {card.label || card.title}
                      </span>
                    </div>

                    <div className="flex flex-col">
                      {card.lines.map((line, lIdx) => (
                        <span
                          key={lIdx}
                          className={`font-heading font-bold text-[#0f172a] group-hover:text-primary transition-colors leading-[1.35] ${
                            lIdx === 0
                              ? 'text-[14.5px] sm:text-[15.5px]'
                              : 'text-[13px] sm:text-[13.5px] text-[#64748b] font-medium mt-0.5'
                          }`}
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Subtle right action arrow button */}
                  {href && (
                    <div className="shrink-0 self-center w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-primary group-hover:text-white transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  )}
                </CardWrapper>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
