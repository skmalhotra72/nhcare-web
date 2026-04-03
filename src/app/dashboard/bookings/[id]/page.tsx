
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, FileText, CheckCircle2, Circle, Loader2, Home, Phone, Calendar, Clock, MapPin } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

const STEP_ICONS: Record<string,any> = {
  check:CheckCircle2, payment:CheckCircle2, person:CheckCircle2,
  vial:CheckCircle2, lab:CheckCircle2, report:FileText, delivered:CheckCircle2
};

export default function BookingDetailPage({ params }:{params:{id:string}}) {
  const router = useRouter();
  const [booking, setBooking] = useState<any>(null);
  const [steps, setSteps] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    if (!token) { router.push('/auth/login'); return; }
    fetch(`${API}/v1/niramaya/bookings/${params.id}/tracking`, {
      headers:{'Authorization':'Bearer '+token}
    }).then(r=>r.json()).then(d=>{
      if (d.status==='ok') { setBooking(d.data.booking); setSteps(d.data.tracking_steps||[]); }
    }).catch(()=>{}).finally(()=>setLoading(false));
  },[params.id,router]);

  const downloadInvoice = () => {
    const token = localStorage.getItem('nhcare_token');
    window.open(`${API}/v1/niramaya/bookings/${params.id}/invoice?token=${token}`,'_blank');
  };

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
      <Loader2 style={{width:'32px',height:'32px',color:'#F4B942',animation:'spin 1s linear infinite'}} />
    </div>
  );

  if (!booking) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
      <div style={{textAlign:'center'}}>
        <p style={{color:'var(--text-3)',fontFamily:'Inter,sans-serif',marginBottom:'16px'}}>Booking not found</p>
        <Link href="/dashboard/bookings" style={{color:'#1B4D3E',fontFamily:'Inter,sans-serif',fontSize:'14px'}}>← Back to bookings</Link>
      </div>
    </div>
  );

  const refNum = booking.ref_num||`NHC${String(booking.id).padStart(6,'0')}`;
  const isPaid = booking.pay_status===1||booking.pay_status==='1';
  const currentStep = steps.filter((s:any)=>s.done).length;

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      {/* Header */}
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'720px',margin:'0 auto',padding:'0 24px'}}>
          <Link href="/dashboard/bookings" style={{display:'inline-flex',alignItems:'center',gap:'6px',
            color:'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'Inter,sans-serif',
            textDecoration:'none',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> My Bookings
          </Link>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
            <div>
              <h1 style={{fontSize:'24px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif',marginBottom:'4px'}}>
                {booking.name}
              </h1>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',fontFamily:'monospace'}}>
                Ref: {refNum}
              </p>
            </div>
            <div style={{textAlign:'right'}}>
              <p style={{fontSize:'28px',fontWeight:700,color:'#F4B942',fontFamily:'Playfair Display,serif',margin:0}}>
                ₹{Number(booking.total_amount||0).toLocaleString()}
              </p>
              <span style={{fontSize:'11px',fontWeight:700,padding:'2px 10px',borderRadius:'100px',
                fontFamily:'Inter,sans-serif',
                background:isPaid?'rgba(74,222,128,0.2)':'rgba(251,191,36,0.2)',
                color:isPaid?'#4ade80':'#fbbf24'}}>{isPaid?'Paid':'Pending'}</span>
            </div>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'720px',margin:'0 auto',padding:'24px',display:'flex',flexDirection:'column',gap:'16px'}}>

        {/* Tracking stepper */}
        <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'20px'}}>
            Booking Status
          </h2>
          <div style={{position:'relative'}}>
            {/* Progress line */}
            <div style={{position:'absolute',left:'15px',top:'8px',bottom:'8px',width:'2px',
              background:'var(--border)',zIndex:0}} />
            <div style={{position:'absolute',left:'15px',top:'8px',width:'2px',zIndex:1,
              background:'#1B4D3E',height:`${Math.max(0,(currentStep-1)/(steps.length-1)*100)}%`,
              transition:'height 0.5s ease'}} />
            <div style={{display:'flex',flexDirection:'column',gap:'16px',position:'relative'}}>
              {steps.map((step:any,i:number)=>(
                <div key={step.id} style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',flexShrink:0,
                    display:'flex',alignItems:'center',justifyContent:'center',zIndex:2,
                    background:step.done?'#1B4D3E':'var(--bg)',
                    border:`2px solid ${step.done?'#1B4D3E':'var(--border)'}`,
                    transition:'all 0.3s'}}>
                    {step.done
                      ? <CheckCircle2 style={{width:'16px',height:'16px',color:'white'}} />
                      : <Circle style={{width:'14px',height:'14px',color:'var(--text-4)'}} />}
                  </div>
                  <div style={{paddingTop:'4px'}}>
                    <p style={{fontSize:'14px',fontWeight:step.done?600:400,
                      color:step.done?'var(--text-1)':'var(--text-4)',
                      fontFamily:'Inter,sans-serif',margin:0}}>
                      {step.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Booking details */}
        <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
          <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'16px'}}>
            Collection Details
          </h2>
          {[
            {icon:Calendar,label:'Date',val:booking.s_date},
            {icon:Home,label:'Type',val:booking.collection_type==='home'?'Home Collection':'Centre Visit'},
            ...(booking.address?[{icon:MapPin,label:'Address',val:`${booking.address}${booking.pin?', '+booking.pin:''}`}]:[]),
            {icon:Phone,label:'Mobile',val:booking.mobile},
          ].map((row:any)=>(
            <div key={row.label} style={{display:'flex',gap:'12px',alignItems:'flex-start',
              padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'var(--green-bg)',
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                <row.icon style={{width:'15px',height:'15px',color:'#1B4D3E'}} />
              </div>
              <div>
                <p style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',margin:0}}>{row.label}</p>
                <p style={{fontSize:'14px',fontWeight:500,color:'var(--text-1)',fontFamily:'Inter,sans-serif',margin:'2px 0 0'}}>{row.val}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px'}}>
          <Link href="/dashboard/reports"
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
              background:'#1B4D3E',color:'white',fontWeight:600,fontSize:'13px',padding:'12px',
              borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
            <FileText style={{width:'15px',height:'15px'}} /> View Reports
          </Link>
          <button onClick={downloadInvoice}
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
              background:'var(--bg-2)',color:'var(--text-2)',fontWeight:600,fontSize:'13px',
              padding:'12px',borderRadius:'10px',cursor:'pointer',fontFamily:'Inter,sans-serif',
              border:'1.5px solid var(--border)'}}>
            <Download style={{width:'15px',height:'15px'}} /> Invoice
          </button>
        </div>

        {/* Help */}
        <div style={{textAlign:'center',padding:'16px',borderRadius:'12px',
          background:'var(--bg-2)',border:'1px solid var(--border)'}}>
          <p style={{fontSize:'13px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',margin:0}}>
            Need help? Call <strong>+91 70421 91854</strong> with ref: <strong style={{fontFamily:'monospace'}}>{refNum}</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
