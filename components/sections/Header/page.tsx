'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowUpRight, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { HeaderData, HeaderProps, NavItem } from '../../types';
import PrimaryButton from '../../ui/PrimaryButton';

/** Desktop nav link — orange text + underline when active, supports one dropdown level */
function DesktopNavItem({ item, active, isActive }: { item: NavItem; active: boolean; isActive: (href: string) => boolean }) {
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const linkClass = `group/nav relative inline-flex items-center gap-1 px-2 xl:px-3 py-2 font-heading text-[13.5px] xl:text-[14.5px] font-semibold transition-colors duration-200 ${
    active ? 'text-primary' : 'text-ink/80 hover:text-primary'
  }`;

  const underline = active ? (
    <motion.span
      layoutId="nav-active-line"
      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
      className="absolute left-2 right-2 xl:left-3 xl:right-3 -bottom-0.5 h-[2px] bg-primary"
    />
  ) : (
    <span className="absolute left-2 right-2 xl:left-3 xl:right-3 -bottom-0.5 h-[2px] bg-primary scale-x-0 origin-left transition-transform duration-300 group-hover/nav:scale-x-100" />
  );

  if (!hasChildren) {
    return (
      <Link href={item.href} className={linkClass}>
        <span>{item.name}</span>
        {underline}
      </Link>
    );
  }

  return (
    <div className="group/drop relative">
      <Link href={item.href} className={linkClass}>
        <span>{item.name}</span>
        <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform duration-200 group-hover/drop:rotate-180" />
        {underline}
      </Link>
      <div className="pointer-events-none absolute left-0 top-full z-50 pt-2 opacity-0 translate-y-1.5 transition-all duration-200 group-hover/drop:pointer-events-auto group-hover/drop:opacity-100 group-hover/drop:translate-y-0">
        <ul className="min-w-[220px] border-t-2 border-primary bg-white p-2 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.25)]">
          {item.children?.map((sub) => (
            <li key={sub.name}>
              <Link
                href={sub.href}
                className={`block px-3.5 py-2 text-[13.5px] font-medium transition-colors ${
                  isActive(sub.href) ? 'bg-soft text-primary' : 'text-ink/80 hover:bg-soft hover:text-primary'
                }`}
              >
                {sub.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Mobile drawer link with optional accordion for children */
function MobileNavItem({ item, isActive, onClose }: { item: NavItem; isActive: (href: string) => boolean; onClose: () => void }) {
  const [expanded, setExpanded] = useState(false);
  const hasChildren = Boolean(item.children && item.children.length > 0);
  const active = isActive(item.href);
  const rowClass = `group flex items-center justify-between border-l-2 px-4 py-3.5 font-heading text-lg font-semibold transition-colors ${
    active ? 'border-primary bg-soft text-primary' : 'border-transparent text-ink hover:bg-soft hover:text-primary'
  }`;

  if (!hasChildren) {
    return (
      <Link href={item.href} onClick={onClose} className={rowClass}>
        {item.name}
        <ArrowUpRight className="h-4 w-4 opacity-40 transition-all group-hover:opacity-100 group-hover:rotate-45" />
      </Link>
    );
  }

  return (
    <div className="flex flex-col">
      <div className={rowClass}>
        <Link href={item.href} onClick={onClose} className="flex-1">
          {item.name}
        </Link>
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          aria-label={`Toggle ${item.name} sub-menu`}
          aria-expanded={expanded}
          className="flex h-9 w-9 items-center justify-center text-primary cursor-pointer"
        >
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} />
        </button>
      </div>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden pl-6 pb-2"
          >
            {item.children?.map((sub) => (
              <li key={sub.name}>
                <Link href={sub.href} onClick={onClose} className="block px-3 py-2 text-[15px] font-medium text-ink/75 hover:text-primary transition-colors">
                  {sub.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Header({ data }: HeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      if (window.scrollY < 200) {
        setActiveSection('#');
        return;
      }
      const sectionIds = ['about', 'capabilities', 'solutions', 'quality', 'why-choose-us', 'clients', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 160) {
            setActiveSection(`#${id}`);
            return;
          }
        }
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll + close on Escape while the mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '#' || href === '/') return activeSection === '#' || activeSection === '';
    if (href.startsWith('#')) return href === activeSection;
    return href === '/' ? pathname === '/' : pathname.startsWith(href);
  };

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-white/95 backdrop-blur-md shadow-[0_8px_30px_-14px_rgba(0,0,0,0.22)] py-2.5' : 'bg-white py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 flex items-center justify-between gap-6">
          {/* Logo — larger artwork with negative vertical margin so the header height stays the same */}
          <Link href="/" aria-label={`${data.logo_text} ${data.logo_subtext}`} className="shrink-0">
            <div
              className={`relative transition-all duration-300 ${
                isScrolled
                  ? 'w-48 h-[52px] -my-1.5 sm:w-60 sm:h-[66px] sm:-my-[13px]'
                  : 'w-[220px] h-[60px] -my-[10px] sm:w-[280px] sm:h-[76px] sm:-my-[14px] lg:w-[250px] lg:h-[68px] lg:-my-[10px] xl:w-[300px] xl:h-[82px] xl:-my-[17px]'
              }`}
            >
              <Image src={data.logo} alt={`${data.logo_text} ${data.logo_subtext}`} fill priority sizes="300px" className="object-contain object-left" />
            </div>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center" aria-label="Main navigation">
            {data.links.map((link) => (
              <DesktopNavItem key={link.name} item={link} active={isActive(link.href)} isActive={isActive} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {data.button_text && data.button_link && (
              <PrimaryButton href={data.button_link} text={data.button_text} className="hidden sm:inline-flex lg:hidden xl:inline-flex !px-5 !py-3.5" />
            )}

            {/* Mobile menu toggle */}
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              aria-label={data.menu_aria_label}
              aria-expanded={isOpen}
              className="lg:hidden flex h-11 w-11 items-center justify-center rounded-[3px] border border-ink/15 text-ink transition-colors hover:border-primary hover:text-primary cursor-pointer"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Spacer so fixed header doesn't overlap content (matches header height: 76px mobile / 80px sm+) */}
      <div aria-hidden="true" className="h-[76px] sm:h-[80px]" />

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-dark/60 lg:hidden"
            />
            <motion.aside
              key="drawer"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={{ left: 0.05, right: 0.7 }}
              onDragEnd={(_e, info) => {
                if (info.offset.x > 75 || info.velocity.x > 250) {
                  setIsOpen(false);
                }
              }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[86%] max-w-sm bg-white shadow-2xl flex flex-col lg:hidden touch-pan-y"
            >
              {/* Drag indicator pill for mobile touch */}
              <div className="pt-2 pb-1 flex justify-center cursor-grab active:cursor-grabbing">
                <div className="w-12 h-1.5 rounded-full bg-slate-300" />
              </div>

              <div className="flex items-center justify-between px-6 py-4 border-b border-line">
                <div className="relative w-36 h-10">
                  <Image src={data.logo} alt={data.logo_text} fill sizes="144px" className="object-contain object-left" />
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label={data.close_aria_label}
                  className="flex h-10 w-10 items-center justify-center rounded-[3px] bg-primary text-white transition-transform hover:rotate-90 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-1">
                {data.links.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + idx * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <MobileNavItem item={link} isActive={isActive} onClose={() => setIsOpen(false)} />
                  </motion.div>
                ))}
              </nav>

              {data.button_text && data.button_link && (
                <div className="p-6 border-t border-line">
                  <PrimaryButton href={data.button_link} text={data.button_text} onClick={() => setIsOpen(false)} className="w-full" />
                </div>
              )}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

