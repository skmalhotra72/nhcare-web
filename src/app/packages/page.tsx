import Link from 'next/link';
import { ArrowRight, CheckCircle2, Clock, Droplets } from 'lucide-react';
import { api } from '@/lib/api';

async function getData() {
  try { const r = await api.packages.list('', 50); return r.data || []; } catch { return []; }
}

export default async function PackagesPage() {
  const packages = await getData();
  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="label mb-1.5" style={{color:'rgba(244,185,66,0.9)'}}>Preventive Healthcare</p>
          <h1 className="font-display font-700 text-white" style={{fontSize:'32px'}}>Health Packages</h1>
          <p className="mt-2 text-[14px]" style={{color:'rgba(255,255,255,0.55)'}}>Comprehensive checkups for every life stage. NABL certified. Home collection available.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p:any) => {
            const name = p.test_parameter?.split('\n')[0]?.trim() || 'Health Package';
            const items = p.description?.replace(/\[X\]/g,'')?.split('\n')?.filter(Boolean).slice(0,5) || [];
            return (
              <div key={p.id} className="card lift overflow-hidden flex flex-col">
                <div style={{height:'3px',background:'linear-gradient(90deg,#1B4D3E,#F4B942)'}} />
                <div className="p-5 flex flex-col flex-1">
                  <span className="badge badge-gold self-start mb-3">Health Package</span>
                  <h3 className="font-body font-600 text-[14px] leading-snug mb-3" style={{color:'var(--text-1)'}}>{name}</h3>
                  {items.length > 0 && (
                    <ul className="space-y-1.5 mb-4 flex-1">
                      {items.map((item:string,i:number) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{color:'#1B4D3E'}} />
                          <span className="text-[12px] font-body leading-tight" style={{color:'var(--text-3)'}}>{item.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-3 mb-4">
                    {p.tat && <span className="flex items-center gap-1 text-[11px] font-body" style={{color:'var(--text-4)'}}><Clock className="w-3 h-3" />{p.tat}d TAT</span>}
                    {p.fasting_required && p.fasting_required!=='NO' && <span className="flex items-center gap-1 text-[11px] font-body" style={{color:'#d97706'}}><Droplets className="w-3 h-3" />Fasting</span>}
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-auto" style={{borderTop:'1px solid var(--border)'}}>
                    <span className="font-display font-700 text-[24px]" style={{color:'var(--text-1)'}}>₹{p.mrp}</span>
                    <Link href={`/tests/${p.id}`} className="btn btn-green text-[12px] py-2 px-4">
                      Book <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
