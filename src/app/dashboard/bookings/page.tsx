
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, ChevronRight, Loader2, ArrowLeft, Package, Home, Building2, XCircle } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

const STATUS_MAP: Record<number,{label:string,color:string,bg:string}> = {
  0:{label:'Pending',    color:'#d97706',bg:'rgba(245,158,11,0.08)'},
  1:{label:'Confirmed',  color:'#059669',bg:'rgba(16,185,129,0.08)'},
  2:{label:'Assigned',   color:'#2563eb',bg:'rgba(37,99,235,0.08)'},
  3:{label:'Collected',  color:'#7c3aed',bg:'rgba(124,58,237,0.08)'},
  4:{label:'Processing', color:'#0891b2',bg:'rgba(8,145,178,0.08)'},
  5:{label:'Ready',      color:'#1B4D3E',bg:'rgba(27,77,62,0.08)'},
  6:{label:'Delivered',  color:'#059669',bg:'rgba(16,185,129,0.1)'},
};

export default function BookingsPage() {
  const router = useRouter();
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    if (!token) { router.push('/auth/login'); return; }
    fetch(`${API}/v1/niramaya/bookings`, {
      headers:{'Authorization':'Bearer '+token}
    }).then(r=>r.json()).then(d=>setBookings(d.data||[])).catch(()=>{}).finally(()=>setLoading(false));
  },[router]);

  const filtered = filter==='all' ? bookings : bookings.filter(b=>
    filter==='active' ? (b.status??0)<6 : (b.status??0)>=6
  );

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <Link href="/dashboard" style={{display:'inline-flex',alignItems:'center',gap:'6px',
            color:'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'Inter,sans-serif',
            textDecoration:'none',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> Dashboard
          </Link>
          <h1 style={{fontSize:'28px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif'}}>
            My Bookings
          </h1>
          <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',marginTop:'4px'}}>
            {bookings.length} total bookings
          </p>
        </div>
      </div>

      <div style={{maxWidth:'800px',margin:'0 auto',padding:'24px'}}>
        {/* Filter tabs */}
        <div style={{display:'flex',gap:'8px',marginBottom:'20px'}}>
          {[['all','All'],['active','Active'],['done','Completed']].map(([v,l])=>(
            <button key={v} onClick={()=>setFilter(v)}
              style={{padding:'7px 16px',borderRadius:'8px',fontSize:'13px',fontWeight:500,
                fontFamily:'Inter,sans-serif',cursor:'pointer',
                background:filter===v?'#1B4D3E':'var(--bg-2)',
                color:filter===v?'white':'var(--text-3)',
                border:`1px solid ${filter===v?'#1B4D3E':'var(--border)'}`}}>
              {l}
            </button>
          ))}
        </div>

        {loading ? (
          <div style={{textAlign:'center',padding:'60px'}}>
            <Loader2 style={{width:'32px',height:'32px',color:'#F4B942',animation:'spin 1s linear infinite',margin:'0 auto'}} />
          </div>
        ) : filtered.length===0 ? (
          <div style={{textAlign:'center',padding:'60px',background:'var(--bg-2)',borderRadius:'16px',border:'1px solid var(--border)'}}>
            <Package style={{width:'40px',height:'40px',color:'var(--text-4)',margin:'0 auto 12px'}} />
            <p style={{fontSize:'15px',fontWeight:600,color:'var(--text-1)',fontFamily:'Inter,sans-serif',marginBottom:'8px'}}>
              No bookings found
            </p>
            <Link href="/tests" style={{display:'inline-flex',alignItems:'center',gap:'6px',
              background:'#1B4D3E',color:'white',fontWeight:600,fontSize:'13px',
              padding:'10px 20px',borderRadius:'8px',textDecoration:'none',fontFamily:'Inter,sans-serif',marginTop:'8px'}}>
              Book a Test
            </Link>
          </div>
        ) : (
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            {filtered.map((b:any)=>{
              const st = STATUS_MAP[b.status??0]||STATUS_MAP[0];
              const isPaid = b.pay_status===1||b.pay_status==='1';
              return (
                <Link key={b.id} href={`/dashboard/bookings/${b.id}`}
                  style={{display:'block',textDecoration:'none'}}>
                  <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',
                    borderRadius:'14px',padding:'16px 20px',
                    transition:'all 0.2s',cursor:'pointer'}}
                    onMouseEnter={e=>(e.currentTarget.style.borderColor='#1B4D3E')}
                    onMouseLeave={e=>(e.currentTarget.style.borderColor='var(--border)')}>
                    <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',gap:'12px'}}>
                      <div style={{flex:1,minWidth:0}}>
                        <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'4px'}}>
                          <p style={{fontSize:'14px',fontWeight:600,color:'var(--text-1)',
                            fontFamily:'Inter,sans-serif',margin:0,overflow:'hidden',
                            textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{b.name}</p>
                          <span style={{fontSize:'11px',fontWeight:700,padding:'2px 8px',
                            borderRadius:'100px',background:st.bg,color:st.color,
                            fontFamily:'Inter,sans-serif',flexShrink:0}}>{st.label}</span>
                        </div>
                        <div style={{display:'flex',flexWrap:'wrap',gap:'10px',alignItems:'center'}}>
                          <span style={{display:'flex',alignItems:'center',gap:'4px',
                            fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                            <Calendar style={{width:'12px',height:'12px'}} /> {b.s_date}
                          </span>
                          <span style={{display:'flex',alignItems:'center',gap:'4px',
                            fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                            {b.collection_type==='home'
                              ? <Home style={{width:'12px',height:'12px'}} />
                              : <Building2 style={{width:'12px',height:'12px'}} />}
                            {b.collection_type==='home'?'Home':'Centre'}
                          </span>
                          <span style={{fontSize:'12px',fontFamily:'monospace',color:'var(--text-4)'}}>
                            {b.ref_num||`#${b.id}`}
                          </span>
                        </div>
                      </div>
                      <div style={{textAlign:'right',flexShrink:0,display:'flex',flexDirection:'column',alignItems:'flex-end',gap:'6px'}}>
                        <p style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',
                          fontFamily:'Playfair Display,serif',margin:0}}>
                          ₹{Number(b.total_amount||0).toLocaleString()}
                        </p>
                        <span style={{fontSize:'11px',fontWeight:600,padding:'2px 8px',borderRadius:'100px',
                          fontFamily:'Inter,sans-serif',
                          background:isPaid?'rgba(16,185,129,0.08)':'rgba(245,158,11,0.08)',
                          color:isPaid?'#059669':'#d97706'}}>
                          {isPaid?'Paid':'Pending'}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
