'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SortAsc, Grid, List, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import TestCard from '@/components/TestCard';
import { api } from '@/lib/api';

function TestsContent() {
  const sp = useSearchParams();
  const [tests, setTests] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [type, setType] = useState('');
  const limit = 12;
  const q = sp.get('q') || '';

  useEffect(() => {
    setLoading(true);
    api.tests.list(q, limit, page * limit)
      .then(r => { setTests(r.data || []); setTotal(r.total || 0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q, page, type]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <SearchBar />
      </div>
      {q && <p className="font-body text-sm text-forest-600 dark:text-forest-400 mb-4">Showing <strong>{total}</strong> results for &ldquo;<strong>{q}</strong>&rdquo;</p>}

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[['', 'All'],['TEST', 'Individual Tests'],['PROFILE', 'Panels & Profiles'],['SERVICE', 'Services']].map(([v, l]) => (
          <button key={v} onClick={() => { setType(v); setPage(0); }}
            className={`px-4 py-2 rounded-full text-sm font-body font-500 transition-all border ${type === v ? 'bg-forest-900 text-white border-forest-900 dark:bg-gold-400 dark:text-forest-950 dark:border-gold-400' : 'bg-white dark:bg-forest-900/40 text-forest-700 dark:text-cream-200 border-forest-200 dark:border-forest-700 hover:border-forest-400'}`}>
            {l}
          </button>
        ))}
        <div className="ml-auto font-body text-xs text-forest-500 dark:text-forest-400 flex items-center">{total} tests found</div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 text-gold-400 animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {tests.map(t => <TestCard key={t.id} test={t} />)}
          </div>
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button onClick={() => setPage(p => Math.max(0, p-1))} disabled={page === 0}
                className="p-2 rounded-lg border border-forest-200 dark:border-forest-700 disabled:opacity-40 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors">
                <ChevronLeft className="w-4 h-4 text-forest-700 dark:text-cream-200" />
              </button>
              {Array.from({length: Math.min(5, pages)}, (_, i) => i + Math.max(0, page - 2)).map(i => (
                <button key={i} onClick={() => setPage(i)}
                  className={`w-9 h-9 rounded-lg text-sm font-body font-500 transition-all ${page === i ? 'bg-forest-900 text-white dark:bg-gold-400 dark:text-forest-950' : 'border border-forest-200 dark:border-forest-700 text-forest-700 dark:text-cream-200 hover:bg-forest-50 dark:hover:bg-forest-900'}`}>
                  {i + 1}
                </button>
              ))}
              <button onClick={() => setPage(p => Math.min(pages-1, p+1))} disabled={page >= pages-1}
                className="p-2 rounded-lg border border-forest-200 dark:border-forest-700 disabled:opacity-40 hover:bg-forest-50 dark:hover:bg-forest-900 transition-colors">
                <ChevronRight className="w-4 h-4 text-forest-700 dark:text-cream-200" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default function TestsPage() {
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-body text-xs font-600 text-gold-400 uppercase tracking-widest mb-1">Diagnostic Tests</p>
          <h1 className="font-display text-3xl font-700 text-white">All Tests & Profiles</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 text-gold-400 animate-spin" /></div>}>
        <TestsContent />
      </Suspense>
    </div>
  );
}
