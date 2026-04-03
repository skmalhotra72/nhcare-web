'use client';
import { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2, ArrowRight, Microscope, Package } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

interface Result { id:number; test_parameter:string; description:string; mrp:number; type:string; }

export default function SearchBar({ large=false }:{large?:boolean}) {
  const [q, setQ] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const h=(e:MouseEvent)=>{ if(ref.current&&!ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown',h);
    return ()=>document.removeEventListener('mousedown',h);
  },[]);

  useEffect(() => {
    clearTimeout(timer.current);
    if(!q.trim()||q.length<2){setResults([]);setOpen(false);return;}
    setLoading(true);
    timer.current=setTimeout(async()=>{
      try{ const r=await api.tests.list(q,8); setResults(r.data||[]); setOpen(true); }
      catch{ setResults([]); } finally{ setLoading(false); }
    },300);
  },[q]);

  return (
    <div ref={ref} className="relative w-full">
      <div className="search-wrap" style={{borderRadius:'10px',overflow:'visible'}}>
        {loading ? <Loader2 className="w-4 h-4 animate-spin ml-4 flex-shrink-0" style={{color:'#F4B942'}} />
          : <Search className="w-4 h-4 ml-4 flex-shrink-0" style={{color:'var(--text-4)'}} />}
        <input value={q} onChange={e=>setQ(e.target.value)}
          onFocus={()=>q.length>=2&&setOpen(true)}
          placeholder="Search tests, packages, health checks..."
          className="search-input"
          style={{fontSize: large ? '15px' : '14px'}} />
        {q && <button onClick={()=>{setQ('');setResults([]);setOpen(false);}} className="mr-3 flex-shrink-0" style={{color:'var(--text-4)'}}>
          <X className="w-4 h-4" />
        </button>}
        {large && (
          <Link href={`/tests?q=${encodeURIComponent(q)}`}
            className="btn btn-gold mr-1.5 my-1.5 text-[13px] py-2 px-5 flex-shrink-0">
            Search <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-50"
          style={{background:'var(--bg)',border:'1px solid var(--border)',boxShadow:'0 16px 40px rgba(0,0,0,0.12)'}}>
          <div className="p-1.5">
            {results.map(r => {
              const name = r.test_parameter?.split('\n')[0]?.trim() || r.description?.split('\n')[0]?.trim() || 'Test';
              return (
                <Link key={r.id} href={`/tests/${r.id}`} onClick={()=>setOpen(false)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group"
                  style={{color:'var(--text-1)'}}
                  onMouseEnter={e=>(e.currentTarget.style.background='var(--bg-2)')}
                  onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{background:'var(--green-bg)'}}>
                    {r.type==='PROFILE'
                      ? <Package className="w-3.5 h-3.5" style={{color:'#F4B942'}} />
                      : <Microscope className="w-3.5 h-3.5" style={{color:'#1B4D3E'}} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-body font-500 truncate" style={{color:'var(--text-1)'}}>{name}</p>
                    <p className="text-[11px]" style={{color:'var(--text-4)'}}>{r.type==='PROFILE'?'Panel/Profile':'Individual Test'}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-[13px] font-display font-700" style={{color:'var(--text-1)'}}>₹{r.mrp}</p>
                  </div>
                </Link>
              );
            })}
          </div>
          <div style={{borderTop:'1px solid var(--border)',padding:'10px 16px'}}>
            <Link href={`/tests?q=${encodeURIComponent(q)}`} onClick={()=>setOpen(false)}
              className="flex items-center justify-center gap-1.5 text-[12px] font-body font-600 transition-colors"
              style={{color:'#1B4D3E'}}>
              See all results for &ldquo;{q}&rdquo; <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
