import { api } from '@/lib/api';
import Link from 'next/link';
import { Clock, Droplets, ArrowLeft, FlaskConical, CheckCircle2, ShoppingCart } from 'lucide-react';

export default async function TestDetailPage({ params }:{params:{id:string}}) {
  let test:any=null;
  try{ const r=await api.tests.get(parseInt(params.id)); test=r.data; } catch{}
  if(!test) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}>
      <div className="text-center">
        <p className="font-display text-[24px] mb-4" style={{color:'var(--text-1)'}}>Test not found</p>
        <Link href="/tests" className="btn btn-green">Back to Tests</Link>
      </div>
    </div>
  );
  const name = test.test_parameter?.split('\n')[0]?.trim() || test.description || 'Test';
  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <Link href="/tests" className="inline-flex items-center gap-1.5 mb-4 text-[13px] font-body transition-colors"
            style={{color:'rgba(255,255,255,0.55)'}}>
            <ArrowLeft className="w-4 h-4" /> Back to Tests
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className={`badge ${test.type==='PROFILE'?'badge-gold':'badge-green'} mb-3`}>
                {test.type==='PROFILE'?'Panel / Profile':'Individual Test'}
              </span>
              <h1 className="font-display font-700 text-white" style={{fontSize:'28px',lineHeight:'1.2'}}>{name}</h1>
              {test.testcode && <p className="text-[11px] mt-1 font-mono" style={{color:'rgba(255,255,255,0.4)'}}>Code: {test.testcode}</p>}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-display font-700" style={{fontSize:'40px',color:'#F4B942',lineHeight:'1'}}>₹{test.mrp}</p>
              <p className="text-[11px] mt-1" style={{color:'rgba(255,255,255,0.45)'}}>Inclusive of all charges</p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Quick info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                {icon:Clock,label:'TAT',value:test.tat?`${test.tat} Day${test.tat>1?'s':''}`:'Same Day'},
                {icon:Droplets,label:'Fasting',value:test.fasting_required||'Not Required'},
                {icon:FlaskConical,label:'Sample',value:test.tested_at||'NABL Lab'},
                {icon:CheckCircle2,label:'Schedule',value:test.schedule||'Daily'},
              ].map(item=>(
                <div key={item.label} className="card p-4 text-center">
                  <item.icon className="w-4 h-4 mx-auto mb-1.5" style={{color:'#1B4D3E'}} />
                  <p className="text-[10px] font-body uppercase tracking-wide mb-1" style={{color:'var(--text-4)'}}>{item.label}</p>
                  <p className="text-[12px] font-body font-600 truncate" style={{color:'var(--text-1)'}}>{item.value}</p>
                </div>
              ))}
            </div>
            {test.description && (
              <div className="card p-6">
                <h2 className="font-display font-700 mb-3" style={{fontSize:'18px',color:'var(--text-1)'}}>About This Test</h2>
                <p className="text-[14px] font-body leading-relaxed whitespace-pre-line" style={{color:'var(--text-3)'}}>
                  {test.description.replace(/\[X\]/g,'✓').trim()}
                </p>
              </div>
            )}
            {test.methodology && (
              <div className="card p-6">
                <h2 className="font-display font-700 mb-2" style={{fontSize:'18px',color:'var(--text-1)'}}>Methodology</h2>
                <p className="text-[14px] font-body" style={{color:'var(--text-3)'}}>{test.methodology.split(',')[0].trim()}</p>
              </div>
            )}
            {test.observations && test.observations.length > 0 && (
              <div className="card p-6">
                <h2 className="font-display font-700 mb-4" style={{fontSize:'18px',color:'var(--text-1)'}}>
                  Parameters Measured <span className="text-[14px] font-body font-400" style={{color:'var(--text-4)'}}>({test.observations.length})</span>
                </h2>
                <div className="space-y-0">
                  {test.observations.map((o:any,i:number)=>(
                    <div key={i} className="flex items-center justify-between py-2.5"
                      style={{borderBottom: i<test.observations.length-1?'1px solid var(--border)':'none'}}>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" style={{color:'#1B4D3E'}} />
                        <span className="text-[13px] font-body" style={{color:'var(--text-2)'}}>{o.observation_name}</span>
                      </div>
                      {o.method && <span className="text-[11px] font-body" style={{color:'var(--text-4)'}}>{o.method}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          {/* Booking sidebar */}
          <div>
            <div className="card p-5 sticky top-20">
              <h3 className="font-display font-700 mb-3" style={{fontSize:'18px',color:'var(--text-1)'}}>Book This Test</h3>
              <p className="font-display font-700 mb-4" style={{fontSize:'36px',color:'var(--text-1)'}}>₹{test.mrp}</p>
              <ul className="space-y-2 mb-5">
                {['✓ Home collection available','✓ Report in 24 hours','✓ NABL certified lab','✓ Free report consultation'].map(l=>(
                  <li key={l} className="text-[12px] font-body" style={{color:'var(--text-3)'}}>{l}</li>
                ))}
              </ul>
              <Link href="/auth/login" className="btn btn-green w-full justify-center mb-2.5">
                <ShoppingCart className="w-4 h-4" /> Book Now
              </Link>
              <Link href="/auth/login" className="btn btn-ghost w-full justify-center text-[13px]">
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
