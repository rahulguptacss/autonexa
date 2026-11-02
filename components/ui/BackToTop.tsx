'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import type { BackToTopData, BackToTopProps } from '../types';

export default function BackToTop({ data }: BackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 16, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label={data.aria_label}
          className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-[3px] bg-primary text-white shadow-xl shadow-primary/30 transition-colors duration-300 hover:bg-primary-dark cursor-pointer"
        >
          <ArrowUp className="h-5 w-5 stroke-[2.25]" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

