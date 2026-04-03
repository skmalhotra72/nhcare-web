'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight, Microscope, Package, Activity } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Result { id: number; test_parameter: string; description: string; mrp: number; type: string; }

export default function SearchBar({ large = false }: { large?: boolean }) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  useEffect(() => {
    clearTimeout(timer.current);
    if (!q.trim() || q.length < 2) { setResults([]); setOpen(false); return; }
    setLoading(true);
    timer.current = setTimeout(async () => {
      try {
        const res = await api.tests.list(q, 8);
        setResults(res.data || []);
        setOpen(true);
      } catch { setResults([]); } finally { setLoading(false); }
    }, 300);
  }, [q]);

  const typeIcon = (type: string) => {
    if (type === 'PROFILE') return <Package className="w-3.5 h-3.5 text-gold-500" />;
    return <Microscope className="w-3.5 h-3.5 text-forest-600" />;
  };

  return (
    <div ref={ref} className="relative w-full">
      <div className={`search-glow flex items-center gap-3 bg-white dark:bg-forest-900 border border-forest-200/60 dark:border-forest-700 rounded-2xl transition-all ${large ? 'px-5 py-4' : 'px-4 py-3'}`}>
        {loading ? <Loader2 className="w-5 h-5 text-gold-500 animate-spin flex-shrink-0" /> : <Search className="w-5 h-5 text-forest-500 dark:text-forest-400 flex-shrink-0" />}
        <input
          value={q}
          onChange={e => setQ(e.target.value)}
          onFocus={() => q.length >= 2 && setOpen(true)}
          placeholder="Search tests, packages, health checks..."
          className={`flex-1 bg-transparent outline-none font-body text-forest-900 dark:text-cream-100 placeholder:text-forest-400 dark:placeholder:text-forest-500 ${large ? 'text-base' : 'text-sm'}`}
        />
        {q && <button onClick={() => { setQ(''); setResults([]); setOpen(false); }} className="text-forest-400 hover:text-forest-700 transition-colors"><X className="w-4 h-4" /></button>}
        {large && (
          <Link href={`/tests?q=${encodeURIComponent(q)}`}
            className="btn-gold text-forest-950 font-body font-600 text-sm px-5 py-2.5 rounded-xl whitespace-nowrap flex items-center gap-1.5">
            Search <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-forest-950 border border-forest-100 dark:border-forest-800 rounded-2xl shadow-3d overflow-hidden z-50">
          <div className="p-2">
            {results.map(r => (
              <Link key={r.id} href={`/tests/${r.id}`} onClick={() => setOpen(false)}
                className="flex items-center gap-3 px-3 py-3 hover:bg-forest-50 dark:hover:bg-forest-900/50 rounded-xl transition-colors group">
                <div className="w-8 h-8 bg-forest-50 dark:bg-forest-900 rounded-lg flex items-center justify-center flex-shrink-0">
                  {typeIcon(r.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-body font-500 text-forest-900 dark:text-cream-100 truncate">
                    {r.test_parameter || r.description || 'Test'}
                  </p>
                  <p className="text-xs text-forest-500 dark:text-forest-400">{r.type === 'PROFILE' ? 'Panel/Profile' : 'Individual Test'}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-body font-600 text-forest-900 dark:text-gold-400">₹{r.mrp}</p>
                  <ArrowRight className="w-3.5 h-3.5 text-forest-300 group-hover:text-gold-500 transition-colors ml-auto mt-0.5" />
                </div>
              </Link>
            ))}
          </div>
          <div className="border-t border-forest-50 dark:border-forest-900 px-4 py-2.5">
            <Link href={`/tests?q=${encodeURIComponent(q)}`} onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-sm font-body font-500 text-forest-600 dark:text-gold-400 hover:text-forest-900 dark:hover:text-gold-300 transition-colors">
              See all results for &ldquo;{q}&rdquo; <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
