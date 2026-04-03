'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Phone, Globe, Moon, Sun, ChevronDown, User } from 'lucide-react';
import { LANGUAGES } from '@/lib/i18n';

const NAV = [
  {label:'Tests',href:'/tests'},
  {label:'Packages',href:'/packages'},
  {label:'Home Collection',href:'/home-collection'},
  {label:'Special Offers',href:'/special-offers',special:true},
  {label:'About Us',href:'/about'},
  {label:'Reports',href:'/dashboard/reports'},
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [lang, setLang] = useState('EN');

  useEffect(() => {
    const s = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', s);
    return () => window.removeEventListener('scroll', s);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);

  return (
    <>
      {/* Accreditation bar */}
      <div className="bg-green-800 dark:bg-ink-950 border-b border-green-900 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-[11px] font-body font-500 text-white/70">NABL Accredited · MC-2140 · ISO 15189:2012</span>
          </div>
          <a href="tel:+917042191854" className="hidden sm:flex items-center gap-1.5 text-[11px] font-body text-white/60 hover:text-white transition-colors">
            <Phone className="w-3 h-3" /> +91 70421 91854 · 7AM–9PM
          </a>
        </div>
      </div>

      {/* Main nav */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 dark:bg-ink-950/95 backdrop-blur-xl border-b border-ink-200 dark:border-white/8 shadow-sm'
          : 'bg-white dark:bg-ink-950 border-b border-ink-200 dark:border-white/6'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
              <div className="relative w-9 h-9">
                <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-9 h-9">
                  <rect width="40" height="40" rx="9" fill="#1B4D3E"/>
                  <path d="M20 7C20 7 13.5 13.5 13.5 19.5C13.5 23.09 16.41 26 20 26C23.59 26 26.5 23.09 26.5 19.5C26.5 13.5 20 7 20 7Z" fill="#F4B942"/>
                  <path d="M12 15C12 15 7.5 19 9.5 23.5C10.8 26.5 14.5 27 16.5 25.5C18.5 24 18.5 21 16.5 19C14.5 17 12 15 12 15Z" fill="#F4B942" opacity="0.6"/>
                  <path d="M28 15C28 15 32.5 19 30.5 23.5C29.2 26.5 25.5 27 23.5 25.5C21.5 24 21.5 21 23.5 19C25.5 17 28 15 28 15Z" fill="#F4B942" opacity="0.6"/>
                  <line x1="20" y1="26" x2="20" y2="33" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M16 31.5C16 31.5 20 33.5 24 31.5" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <div className="leading-none">
                <p className="font-display text-[18px] font-700 text-green-800 dark:text-white">nhcare</p>
                <p className="font-body text-[8px] font-700 tracking-[0.22em] text-green-600 dark:text-green-200/60 uppercase">pathlabs</p>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} className="nav-a">{n.label}</Link>
              ))}
            </nav>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-1.5">
              {/* Lang picker */}
              <div className="relative">
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1.5 h-8 px-3 text-[13px] font-body font-500 text-ink-500 dark:text-ink-400 hover:text-ink-800 dark:hover:text-white hover:bg-ink-100 dark:hover:bg-white/6 rounded-lg transition-all border border-ink-200 dark:border-white/10">
                  <Globe className="w-3.5 h-3.5" />
                  <span>{lang}</span>
                  <ChevronDown className="w-3 h-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-full mt-1 w-52 bg-white dark:bg-ink-900 border border-ink-200 dark:border-white/10 rounded-xl shadow-xl overflow-hidden z-50">
                    <div className="max-h-64 overflow-y-auto">
                      {LANGUAGES.map(l => (
                        <button key={l.code} onClick={() => { setLang(l.code.toUpperCase()); setLangOpen(false); }}
                          className="w-full text-left px-4 py-2.5 text-[13px] hover:bg-ink-50 dark:hover:bg-white/5 transition-colors flex justify-between items-center">
                          <span className="font-body text-ink-800 dark:text-ink-200">{l.native}</span>
                          <span className="text-[10px] text-ink-400 font-mono">{l.code.toUpperCase()}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button onClick={() => setDark(!dark)}
                className="h-8 w-8 flex items-center justify-center rounded-lg hover:bg-ink-100 dark:hover:bg-white/6 transition-colors text-ink-500 dark:text-ink-400">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              <Link href="/auth/login" className="btn btn-ghost h-8 py-0 px-4 text-[13px]">
                <User className="w-3.5 h-3.5" /> Sign In
              </Link>
              <Link href="/tests" className="btn btn-gold h-8 py-0 px-5 text-[13px]">
                Book Test
              </Link>
            </div>

            {/* Mobile controls */}
            <div className="flex lg:hidden items-center gap-1">
              <button onClick={() => setDark(!dark)} className="p-2 text-ink-500 dark:text-ink-400">
                {dark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              <button onClick={() => setOpen(!open)} className="p-2 text-ink-700 dark:text-ink-200">
                {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="lg:hidden border-t border-ink-100 dark:border-white/8 bg-white dark:bg-ink-950">
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">
              {NAV.map(n => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className="block px-3 py-3 text-[14px] font-500 text-ink-700 dark:text-ink-200 hover:bg-ink-50 dark:hover:bg-white/5 rounded-lg transition-colors">
                  {n.label}
                </Link>
              ))}
              <div className="pt-3 border-t border-ink-100 dark:border-white/8 flex gap-2">
                <Link href="/auth/login" onClick={() => setOpen(false)} className="btn btn-ghost flex-1 justify-center py-2.5 text-[13px]">Sign In</Link>
                <Link href="/tests" onClick={() => setOpen(false)} className="btn btn-gold flex-1 justify-center py-2.5 text-[13px]">Book Test</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
