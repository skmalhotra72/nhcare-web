'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, ArrowLeft, Brain, TrendingUp, TrendingDown, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { api } from '@/lib/api';

export default function ReportDetailPage({ params }:{params:{id:string}}) {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(()=>{
    const token=localStorage.getItem('nhcare_token');
    if(!token){router.push('/auth/login');return;}
    api.reports.get(parseInt(params.id),token).then(r=>setReport(r.data)).catch(()=>{}).finally(()=>setLoading(false));
  },[params.id,router]);

  const downloadPdf=()=>{
    const t=localStorage.getItem('nhcare_token')||'';
    window.open(`https://api.uat.medibridge24x7.com/api/v1/niramaya/reports/${params.id}/pdf`,'_blank');
  };
  const loadAI=async()=>{
    const token=localStorage.getItem('nhcare_token');
    if(!token||aiLoading)return;
    setAiLoading(true);
    try{const r=await api.reports.aiSummary(parseInt(params.id),token);setAiSummary(r.ai_summary||'');}
    catch{setAiSummary('AI summary unavailable at this time.');}
    finally{setAiLoading(false);}
  };

  const toggleTest=(name:string)=>setExpanded(e=>e.includes(name)?e.filter(x=>x!==name):[...e,name]);
  const flagStyle=(flag:string)=>{
    if(flag==='HIGH')return{bg:'rgba(239,68,68,0.08)',color:'#dc2626',border:'rgba(239,68,68,0.2)'};
    if(flag==='LOW')return{bg:'rgba(59,130,246,0.08)',color:'#2563eb',border:'rgba(59,130,246,0.2)'};
    return{bg:'rgba(16,185,129,0.08)',color:'#059669',border:'rgba(16,185,129,0.2)'};
  };

  if(loading)return<div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}><Loader2 className="w-7 h-7 animate-spin" style={{color:'#F4B942'}}/></div>;
  if(!report)return<div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}><p style={{color:'var(--text-3)'}}>Report not found</p></div>;

  const{header,tests,summary}=report;
  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/dashboard/reports" className="inline-flex items-center gap-1.5 mb-4 text-[13px] font-body" style={{color:'rgba(255,255,255,0.5)'}}>
            <ArrowLeft className="w-4 h-4"/> My Reports
          </Link>
          <h1 className="font-display font-700 text-white mb-1" style={{fontSize:'24px'}}>{header.package_name||'Lab Report'}</h1>
          <div className="flex flex-wrap gap-3 text-[12px] font-body" style={{color:'rgba(255,255,255,0.5)'}}>
            <span>{header.patient_name}</span><span>·</span>
            <span>{header.gender}, {header.age} yrs</span><span>·</span>
            <span>{header.health_date}</span><span>·</span>
            <span>{header.pcc_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-5">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            {label:'Total Parameters',val:summary.total_observations,col:null},
            {label:'Normal',val:summary.normal_count,col:{bg:'rgba(16,185,129,0.08)',border:'rgba(16,185,129,0.2)',text:'#059669'}},
            {label:'Abnormal',val:summary.abnormal_count,col:{bg:'rgba(239,68,68,0.08)',border:'rgba(239,68,68,0.2)',text:'#dc2626'}},
          ].map(s=>(
            <div key={s.label} className="rounded-xl p-4 text-center"
              style={{background:s.col?(s.col as any).bg:'var(--bg-2)',border:`1px solid ${s.col?(s.col as any).border:'var(--border)'}`}}>
              <p className="font-display font-700 text-[28px]" style={{color:s.col?(s.col as any).text:'var(--text-1)'}}>{s.val}</p>
              <p className="text-[11px] font-body mt-0.5" style={{color:'var(--text-3)'}}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:'1px solid var(--border)',background:'var(--bg-2)'}}>
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5" style={{color:'#1B4D3E'}} />
              <h2 className="font-display font-700 text-[18px]" style={{color:'var(--text-1)'}}>AI Health Summary</h2>
            </div>
            <div style={{display:'flex',gap:'8px'}}>
              {!aiSummary && (
              <button onClick={loadAI} disabled={aiLoading} className="btn btn-green text-[12px] py-2 px-4">
                {aiLoading?<><Loader2 className="w-3.5 h-3.5 animate-spin"/>Analysing...</>:<>✦ Generate</>}
              </button>
              )}
              <button onClick={downloadPdf}
                style={{display:'inline-flex',alignItems:'center',gap:'4px',padding:'7px 12px',
                  borderRadius:'8px',border:'1px solid var(--border)',background:'var(--bg)',
                  color:'var(--text-2)',fontSize:'12px',fontWeight:600,cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                ⬇ PDF
              </button>
            </div>
          </div>
          <div className="p-5">
            {aiSummary
              ? <p className="text-[14px] font-body leading-relaxed whitespace-pre-wrap" style={{color:'var(--text-2)'}}>{aiSummary}</p>
              : <p className="text-[13px] font-body text-center py-4" style={{color:'var(--text-4)'}}>Click &ldquo;Generate&rdquo; for an AI-powered plain language explanation of your results</p>}
          </div>
        </div>

        {/* Test results */}
        {tests?.map((t:any)=>{
          const fs=flagStyle('');
          const hasAbnormal=t.observations?.some((o:any)=>o.flag!=='NORMAL');
          return (
            <div key={t.test_name} className="card overflow-hidden">
              <button onClick={()=>toggleTest(t.test_name)}
                className="w-full px-5 py-4 flex items-center justify-between gap-3 transition-all"
                style={{background: expanded.includes(t.test_name)?'var(--bg-2)':'transparent'}}
                onMouseEnter={e=>(e.currentTarget.style.background='var(--bg-2)')}
                onMouseLeave={e=>(e.currentTarget.style.background=expanded.includes(t.test_name)?'var(--bg-2)':'transparent')}>
                <div className="flex items-center gap-2 text-left">
                  <h3 className="font-display font-700 text-[15px]" style={{color:'var(--text-1)'}}>{t.test_name}</h3>
                  <span className="text-[11px] font-body" style={{color:'var(--text-4)'}}>({t.observations?.length})</span>
                  {hasAbnormal && <span className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />}
                </div>
                {expanded.includes(t.test_name)
                  ? <ChevronUp className="w-4 h-4 flex-shrink-0" style={{color:'var(--text-4)'}} />
                  : <ChevronDown className="w-4 h-4 flex-shrink-0" style={{color:'var(--text-4)'}} />}
              </button>
              {expanded.includes(t.test_name) && (
                <div style={{borderTop:'1px solid var(--border)',overflowX:'auto'}}>
                  <table style={{width:'100%',borderCollapse:'collapse'}}>
                    <thead>
                      <tr style={{background:'var(--bg-2)'}}>
                        {['Parameter','Result','Unit','Reference','Status'].map(h=>(
                          <th key={h} style={{padding:'10px 16px',textAlign:'left',fontSize:'10px',fontWeight:700,color:'var(--text-4)',textTransform:'uppercase',letterSpacing:'0.06em',fontFamily:'Inter,sans-serif'}}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {t.observations?.map((o:any,i:number)=>{
                        const s=flagStyle(o.flag);
                        return (
                          <tr key={i} style={{borderTop:'1px solid var(--border)'}}>
                            <td style={{padding:'10px 16px',fontSize:'13px',color:'var(--text-2)',fontFamily:'Inter,sans-serif'}}>{o.obs_name}</td>
                            <td style={{padding:'10px 16px',fontSize:'13px',fontWeight:700,color:'var(--text-1)',fontFamily:'monospace'}}>{o.value}</td>
                            <td style={{padding:'10px 16px',fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>{o.unit}</td>
                            <td style={{padding:'10px 16px',fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>{o.range_min}–{o.range_max}</td>
                            <td style={{padding:'10px 16px'}}>
                              <span style={{display:'inline-flex',alignItems:'center',gap:'4px',fontSize:'11px',fontWeight:600,padding:'2px 8px',borderRadius:'100px',background:s.bg,color:s.color,border:`1px solid ${s.border}`,fontFamily:'Inter,sans-serif'}}>
                                {o.flag==='HIGH'?<TrendingUp style={{width:'11px',height:'11px'}}/>:o.flag==='LOW'?<TrendingDown style={{width:'11px',height:'11px'}}/>:<Minus style={{width:'11px',height:'11px'}}/>}
                                {o.flag}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
