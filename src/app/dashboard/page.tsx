'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, FileText, Activity, User, LogOut, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    const p = localStorage.getItem('nhcare_patient');
    if (!token){router.push('/auth/login');return;}
    if (p) setPatient(JSON.parse(p));
    Promise.all([
      api.bookings.list(token).catch(()=>({data:[]})),
      api.reports.list(token).catch(()=>({data:[]})),
    ]).then(([b,r])=>{
      setBookings(b.data?.slice(0,5)||[]);
      setReports(r.data?.slice(0,3)||[]);
    }).finally(()=>setLoading(false));
  },[router]);

  const logout=()=>{localStorage.removeItem('nhcare_token');localStorage.removeItem('nhcare_patient');router.push('/');};

  if(loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{background:'var(--bg)'}}>
      <Loader2 className="w-7 h-7 animate-spin" style={{color:'#F4B942'}} />
    </div>
  );

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      {/* Header */}
      <div style={{background:'#1B4D3E',padding:'40px 0 48px'}}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          <div>
            <p className="text-[12px] font-body mb-0.5" style={{color:'rgba(255,255,255,0.5)'}}>Welcome back</p>
            <h1 className="font-display font-700 text-white" style={{fontSize:'28px'}}>{patient?.name||'Patient'}</h1>
            <p className="text-[13px] font-body mt-0.5" style={{color:'rgba(244,185,66,0.8)'}}>+91 {patient?.mobile}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-[13px] font-body transition-colors"
            style={{color:'rgba(255,255,255,0.5)'}}>
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Quick nav */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            {icon:Calendar, label:'My Bookings', href:'/dashboard/bookings', count:bookings.length},
            {icon:FileText, label:'My Reports', href:'/dashboard/reports', count:reports.length},
            {icon:Activity, label:'Book Test', href:'/tests', count:null},
            {icon:User, label:'My Profile', href:'/dashboard/profile', count:null},
          ].map(item=>(
            <Link key={item.href} href={item.href} className="card lift flex flex-col items-center gap-2.5 p-5 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'var(--green-bg)'}}>
                <item.icon className="w-5 h-5" style={{color:'#1B4D3E'}} />
              </div>
              <span className="font-body font-600 text-[13px]" style={{color:'var(--text-1)'}}>{item.label}</span>
              {item.count!==null && <span className="font-mono text-[11px]" style={{color:'var(--text-4)'}}>{item.count} total</span>}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:'1px solid var(--border)'}}>
              <h2 className="font-display font-700 text-[18px]" style={{color:'var(--text-1)'}}>Recent Bookings</h2>
              <Link href="/dashboard/bookings" className="flex items-center gap-1 text-[12px] font-body" style={{color:'var(--text-4)'}}>
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {bookings.length===0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-[14px] font-body mb-4" style={{color:'var(--text-3)'}}>No bookings yet</p>
                <Link href="/tests" className="btn btn-green text-[13px] py-2 px-5">
                  Book a Test <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : bookings.map((b:any)=>(
              <div key={b.id} className="px-5 py-3.5 flex items-center justify-between gap-3"
                style={{borderBottom:'1px solid var(--border)'}}>
                <div className="min-w-0">
                  <p className="font-body font-600 text-[13px] truncate" style={{color:'var(--text-1)'}}>{b.name}</p>
                  <p className="font-body text-[11px]" style={{color:'var(--text-4)'}}>{b.ref_num||`#${b.id}`} · {b.s_date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="font-body font-600 text-[13px]" style={{color:'var(--text-1)'}}>₹{b.total_amount}</p>
                  <span className="badge text-[10px] py-0.5 px-2"
                    style={{background: b.pay_status===1?'rgba(16,185,129,0.1)':'rgba(245,158,11,0.1)',
                      color: b.pay_status===1?'#059669':'#d97706',
                      border:`1px solid ${b.pay_status===1?'rgba(16,185,129,0.2)':'rgba(245,158,11,0.2)'}`}}>
                    {b.pay_status===1?'Paid':'Pending'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Reports */}
          <div className="card overflow-hidden">
            <div className="px-5 py-4 flex items-center justify-between" style={{borderBottom:'1px solid var(--border)'}}>
              <h2 className="font-display font-700 text-[18px]" style={{color:'var(--text-1)'}}>Lab Reports</h2>
              <Link href="/dashboard/reports" className="flex items-center gap-1 text-[12px] font-body" style={{color:'var(--text-4)'}}>
                View all <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            {reports.length===0 ? (
              <div className="px-5 py-10 text-center">
                <p className="text-[14px] font-body" style={{color:'var(--text-3)'}}>No reports available yet</p>
              </div>
            ) : reports.map((r:any)=>(
              <Link key={r.health_id} href={`/dashboard/reports/${r.health_id}`}
                className="px-5 py-3.5 flex items-center justify-between gap-3 block transition-all"
                style={{borderBottom:'1px solid var(--border)'}}
                onMouseEnter={e=>(e.currentTarget.style.background='var(--bg-2)')}
                onMouseLeave={e=>(e.currentTarget.style.background='transparent')}>
                <div className="min-w-0">
                  <p className="font-body font-600 text-[13px] truncate" style={{color:'var(--text-1)'}}>{r.package_name||'Lab Report'}</p>
                  <p className="font-body text-[11px]" style={{color:'var(--text-4)'}}>{r.health_date} · {r.observation_count} parameters</p>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="badge badge-green text-[10px] py-0.5">Ready</span>
                  <ChevronRight className="w-3.5 h-3.5" style={{color:'var(--text-4)'}} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
