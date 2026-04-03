'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Search, Phone, Globe, Moon, Sun, ChevronDown, User } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('English');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  const nav = [
    { label: 'Tests', href: '/tests' },
    { label: 'Packages', href: '/packages' },
    { label: 'Home Collection', href: '/home-collection' },
    { label: 'Centers', href: '/centers' },
    { label: 'Reports', href: '/dashboard/reports' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 dark:bg-forest-950/95 backdrop-blur-md shadow-forest/10 shadow-lg' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9">
              <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                <circle cx="20" cy="20" r="20" fill="#1B4D3E"/>
                <path d="M20 8C20 8 14 14 14 20C14 23.314 16.686 26 20 26C23.314 26 26 23.314 26 20C26 14 20 8 20 8Z" fill="#F4B942" opacity="0.9"/>
                <path d="M12 16C12 16 8 19 10 23C11.5 26 15 26.5 17 25C19 23.5 19 20 17 18C15 16 12 16 12 16Z" fill="#F4B942" opacity="0.6"/>
                <path d="M28 16C28 16 32 19 30 23C28.5 26 25 26.5 23 25C21 23.5 21 20 23 18C25 16 28 16 28 16Z" fill="#F4B942" opacity="0.6"/>
                <path d="M20 26C20 26 20 30 20 32" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M16 30C16 30 20 32 24 30" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <span className="font-display text-xl font-700 text-forest-900 dark:text-cream-100 tracking-tight">nhcare</span>
              <span className="block text-[9px] font-body font-500 text-gold-500 tracking-[0.2em] uppercase -mt-1">pathlabs</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {nav.map(n => (
              <Link key={n.href} href={n.href}
                className="px-3.5 py-2 text-sm font-body font-500 text-forest-900/80 dark:text-cream-200/80 hover:text-forest-900 dark:hover:text-gold-400 hover:bg-forest-50 dark:hover:bg-forest-900/30 rounded-lg transition-all">
                {n.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-2">
            <a href="tel:+917042191854" className="flex items-center gap-1.5 text-sm font-body text-forest-700 dark:text-cream-200 hover:text-gold-500 transition-colors px-2">
              <Phone className="w-3.5 h-3.5" />
              <span className="font-500">+91 70421 91854</span>
            </a>
            {/* Language */}
            <div className="relative">
              <button onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-body text-forest-700 dark:text-cream-200 hover:bg-forest-50 dark:hover:bg-forest-900/30 transition-all border border-forest-200/50 dark:border-forest-700/50">
                <Globe className="w-3.5 h-3.5" />
                <span className="max-w-16 truncate">{currentLang}</span>
                <ChevronDown className="w-3 h-3 opacity-60" />
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-forest-950 border border-forest-100 dark:border-forest-800 rounded-xl shadow-3d overflow-hidden z-50">
                  <div className="max-h-64 overflow-y-auto p-1">
                    {LANGUAGES.map(l => (
                      <button key={l.code} onClick={() => { setCurrentLang(l.native); setLangOpen(false); }}
                        className="w-full text-left px-3 py-2 text-sm hover:bg-forest-50 dark:hover:bg-forest-900 rounded-lg transition-colors flex justify-between items-center">
                        <span className="font-body text-forest-900 dark:text-cream-100">{l.native}</span>
                        <span className="text-xs text-forest-500 dark:text-forest-400">{l.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <button onClick={() => setDark(!dark)}
              className="p-2 rounded-lg hover:bg-forest-50 dark:hover:bg-forest-900/30 transition-colors text-forest-700 dark:text-cream-200">
              {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Link href="/auth/login"
              className="flex items-center gap-1.5 btn-forest text-white text-sm font-body font-500 px-4 py-2 rounded-xl">
              <User className="w-3.5 h-3.5" />
              Sign In
            </Link>
          </div>

          {/* Mobile menu button */}
          <button onClick={() => setOpen(!open)} className="md:hidden p-2 rounded-lg text-forest-900 dark:text-cream-100">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white dark:bg-forest-950 border-t border-forest-100 dark:border-forest-800 px-4 pb-4">
          {nav.map(n => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className="block py-3 text-forest-900 dark:text-cream-100 font-body font-500 border-b border-forest-50 dark:border-forest-900">
              {n.label}
            </Link>
          ))}
          <div className="pt-3 flex gap-2">
            <Link href="/auth/login" className="flex-1 btn-forest text-white text-center py-2.5 rounded-xl font-body font-500 text-sm">Sign In</Link>
            <Link href="/auth/login" className="flex-1 btn-gold text-forest-950 text-center py-2.5 rounded-xl font-body font-600 text-sm">Book Now</Link>
          </div>
        </div>
      )}
    </header>
  );
}
