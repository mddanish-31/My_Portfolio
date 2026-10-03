'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';
import { navLinks } from '@/data/navigation';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection matching exact page order
      const sections = navLinks.map((item) => item.id);
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'bg-background/90 backdrop-blur-md border-white/[0.08] py-3 shadow-lg'
          : 'bg-transparent border-white/[0.04] py-4 sm:py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link
          href="#home"
          className="flex items-center gap-1.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-crimson rounded-sm shrink-0"
          aria-label="MD Danish Home"
        >
          <span className="text-base sm:text-lg lg:text-xl font-bold tracking-tight text-white uppercase font-poster group-hover:text-neutral-200 transition-colors">
            {portfolioData.personal.fullName}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-crimson inline-block animate-pulse" />
        </Link>

        {/* Center Desktop Navigation */}
        <nav
          className="hidden lg:flex items-center space-x-0.5 xl:space-x-1"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={cn(
                  'px-2 xl:px-2.5 py-1.5 text-[11px] xl:text-xs uppercase tracking-wider font-semibold transition-all duration-200 relative group',
                  isActive ? 'text-white' : 'text-neutral-400 hover:text-white'
                )}
              >
                <span>{link.name}</span>
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-crimson rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA / Status */}
        <div className="hidden sm:flex items-center gap-3 lg:gap-4 shrink-0">
          <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.03] border border-white/[0.06]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-semibold tracking-wider text-neutral-300 uppercase">
              {portfolioData.personal.status}
            </span>
          </div>

          <Button href="#contact" variant="primary" size="sm">
            Let&apos;s Talk
          </Button>
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-crimson rounded-sm"
          aria-expanded={isOpen}
          aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 top-[60px] bg-background/95 backdrop-blur-xl z-40 flex flex-col justify-between p-6 border-t border-white/[0.08] animate-in fade-in slide-in-from-top-4 duration-200 overflow-y-auto">
          <nav className="flex flex-col space-y-2 pt-2" aria-label="Mobile Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'text-lg sm:text-xl font-bold uppercase tracking-wide py-2 border-b border-white/[0.05] font-poster transition-colors flex items-center justify-between',
                  activeSection === link.id
                    ? 'text-crimson'
                    : 'text-neutral-200 hover:text-crimson'
                )}
              >
                <span>{link.name}</span>
                {activeSection === link.id && (
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-4 pb-8 border-t border-white/[0.08] pt-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold tracking-wider text-neutral-300 uppercase">
                {portfolioData.personal.status}
              </span>
            </div>
            <Button
              href="#contact"
              variant="primary"
              size="lg"
              className="w-full"
              onClick={() => setIsOpen(false)}
            >
              Let&apos;s Talk
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
