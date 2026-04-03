'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, ChevronRight, Loader2, ArrowLeft, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    if (!token){router.push('/auth/login');return;}
    api.reports.list(token).then(r=>setReports(r.data||[])).catch(()=>{}).finally(()=>setLoading(false));
  },[router]);

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <Link href="/dashboard" className="inline-flex items-center gap-1.5 mb-4 text-[13px] font-body transition-colors"
            style={{color:'rgba(255,255,255,0.5)'}}>
            <ArrowLeft className="w-4 h-4" /> Dashboard
          </Link>
          <h1 className="font-display font-700 text-white" style={{fontSize:'28px'}}>My Lab Reports</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-7 h-7 animate-spin" style={{color:'#F4B942'}} />
          </div>
        ) : reports.length===0 ? (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 mx-auto mb-4" style={{color:'var(--text-4)'}} />
            <p className="font-display text-[20px] mb-2" style={{color:'var(--text-1)'}}>No reports yet</p>
            <Link href="/tests" className="btn btn-green mt-4">Book a Test</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r:any)=>(
              <Link key={`${r.health_id}-${r.package_name}`} href={`/dashboard/reports/${r.health_id}`}
                className="card lift flex items-center gap-4 p-5 block">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{background:'var(--green-bg)'}}>
                  <FileText className="w-5 h-5" style={{color:'#1B4D3E'}} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-600 text-[14px] truncate" style={{color:'var(--text-1)'}}>{r.package_name||'Lab Report'}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-0.5">
                    <span className="flex items-center gap-1 text-[12px] font-body" style={{color:'var(--text-4)'}}>
                      <Calendar className="w-3 h-3" />{r.health_date}
                    </span>
                    <span className="text-[12px] font-body" style={{color:'var(--text-4)'}}>{r.observation_count} parameters</span>
                    {r.pcc_name && <span className="text-[12px] font-body truncate" style={{color:'var(--text-4)'}}>{r.pcc_name}</span>}
                  </div>
                </div>
                <div className="flex items-center gap-2.5 flex-shrink-0">
                  <span className="badge badge-green text-[11px]">✦ AI Summary</span>
                  <ChevronRight className="w-4 h-4" style={{color:'var(--text-4)'}} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
