'use client';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
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
      .then(r => { setTests(r.data||[]); setTotal(r.total||0); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [q, page, type]);

  const pages = Math.ceil(total / limit);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="mb-6"><SearchBar /></div>
      {q && <p className="text-[13px] mb-5 font-body" style={{color:'var(--text-3)'}}>
        <strong style={{color:'var(--text-1)'}}>{total}</strong> results for &ldquo;<strong style={{color:'var(--text-1)'}}>{q}</strong>&rdquo;
      </p>}
      {/* Filter pills */}
      <div className="flex flex-wrap gap-2 mb-7">
        {[['','All Tests'],['TEST','Individual Tests'],['PROFILE','Panels & Profiles']].map(([v,l])=>(
          <button key={v} onClick={()=>{setType(v);setPage(0);}}
            className="text-[13px] font-body font-500 px-4 py-2 rounded-full transition-all"
            style={{
              background: type===v ? '#1B4D3E' : 'var(--bg-2)',
              color: type===v ? '#fff' : 'var(--text-3)',
              border: `1px solid ${type===v ? '#1B4D3E' : 'var(--border)'}`,
            }}>{l}</button>
        ))}
        <span className="ml-auto text-[12px] font-body self-center" style={{color:'var(--text-4)'}}>
          {total.toLocaleString()} tests
        </span>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-24">
          <Loader2 className="w-7 h-7 animate-spin" style={{color:'#F4B942'}} />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {tests.map(t => {
              const name = t.test_parameter?.split('\n')[0]?.trim() || t.description?.split('\n')[0]?.trim() || 'Test';
              const isP = t.type==='PROFILE';
              return (
                <div key={t.id} className="card lift p-5 flex flex-col cursor-pointer"
                  onClick={()=>window.location.href=`/tests/${t.id}`}>
                  <span className={`badge ${isP?'badge-gold':'badge-green'} self-start mb-3`}>
                    {isP?'Panel':'Test'}
                  </span>
                  <h3 className="text-[13px] font-body font-600 line-clamp-2 mb-auto leading-snug"
                    style={{color:'var(--text-1)'}}>{name}</h3>
                  <div className="flex items-center justify-between mt-4 pt-3"
                    style={{borderTop:'1px solid var(--border)'}}>
                    <span className="font-display font-700 text-[20px]" style={{color:'var(--text-1)'}}>₹{t.mrp}</span>
                    <button className="btn btn-green text-[11px] py-1.5 px-3">Book</button>
                  </div>
                </div>
              );
            })}
          </div>
          {pages > 1 && (
            <div className="flex items-center justify-center gap-2">
              <button onClick={()=>setPage(p=>Math.max(0,p-1))} disabled={page===0}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{border:'1px solid var(--border)',color:'var(--text-2)'}}>
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({length:Math.min(5,pages)},(_,i)=>Math.max(0,page-2)+i)
                .filter(i=>i<pages).map(i=>(
                <button key={i} onClick={()=>setPage(i)}
                  className="w-9 h-9 rounded-lg text-[13px] font-body font-500 transition-all"
                  style={{
                    background: page===i?'#1B4D3E':'transparent',
                    color: page===i?'#fff':'var(--text-3)',
                    border: `1px solid ${page===i?'#1B4D3E':'var(--border)'}`,
                  }}>{i+1}</button>
              ))}
              <button onClick={()=>setPage(p=>Math.min(pages-1,p+1))} disabled={page>=pages-1}
                className="p-2 rounded-lg transition-all disabled:opacity-30"
                style={{border:'1px solid var(--border)',color:'var(--text-2)'}}>
                <ChevronRight className="w-4 h-4" />
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
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="label mb-1.5" style={{color:'rgba(244,185,66,0.9)'}}>Browse Catalogue</p>
          <h1 className="font-display font-700 text-white" style={{fontSize:'32px'}}>All Tests & Profiles</h1>
        </div>
      </div>
      <Suspense fallback={<div className="flex items-center justify-center py-24"><Loader2 className="w-7 h-7 animate-spin" style={{color:'#F4B942'}}/></div>}>
        <TestsContent />
      </Suspense>
    </div>
  );
}
