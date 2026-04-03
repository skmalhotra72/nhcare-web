
'use client';
import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2, Calendar, Clock, Home, FileText, ArrowRight, Download } from 'lucide-react';

function ConfirmedContent() {
  const sp = useSearchParams();
  const bookingId = sp.get('booking_id');
  const orderId   = sp.get('order_id')||'';
  const amount    = sp.get('amount')||'0';
  const name      = sp.get('name')||'Patient';
  const date      = sp.get('date')||'';
  const slot      = sp.get('slot')||'';
  const paymentId = sp.get('payment_id')||'';
  const refNum    = 'NHC'+orderId.slice(-6).toUpperCase();

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'24px'}}>
      {/* Success card */}
      <div style={{maxWidth:'560px',width:'100%'}}>
        {/* Green checkmark hero */}
        <div style={{textAlign:'center',marginBottom:'32px'}}>
          <div style={{width:'80px',height:'80px',borderRadius:'50%',background:'rgba(16,185,129,0.12)',
            display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px',
            border:'2px solid rgba(16,185,129,0.3)'}}>
            <CheckCircle2 style={{width:'40px',height:'40px',color:'#059669'}} />
          </div>
          <h1 style={{fontSize:'28px',fontWeight:700,color:'var(--text-1)',
            fontFamily:'Playfair Display,serif',marginBottom:'8px'}}>
            Booking Confirmed! 🎉
          </h1>
          <p style={{fontSize:'15px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>
            Thank you {name}! Your tests have been booked successfully.
          </p>
        </div>

        {/* Booking details card */}
        <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'20px',
          overflow:'hidden',marginBottom:'16px'}}>
          {/* Green header */}
          <div style={{background:'#1B4D3E',padding:'20px 24px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
              <div>
                <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',marginBottom:'2px'}}>Booking Reference</p>
                <p style={{fontSize:'20px',fontWeight:700,color:'#F4B942',fontFamily:'monospace',letterSpacing:'0.1em'}}>{refNum}</p>
              </div>
              <div style={{textAlign:'right'}}>
                <p style={{fontSize:'11px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',marginBottom:'2px'}}>Amount Paid</p>
                <p style={{fontSize:'24px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif'}}>₹{Number(amount).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Details */}
          <div style={{padding:'20px 24px'}}>
            {[
              {icon:Calendar,label:'Collection Date',val:date?new Date(date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):''},
              {icon:Clock,label:'Time Slot',val:slot},
              {icon:Home,label:'Collection',val:'Home collection · Certified phlebotomist'},
              {icon:FileText,label:'Reports',val:'Digital reports + AI summary in 24 hours'},
            ].map(row=>(
              <div key={row.label} style={{display:'flex',gap:'12px',alignItems:'flex-start',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <div style={{width:'32px',height:'32px',borderRadius:'8px',background:'var(--green-bg)',
                  display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <row.icon style={{width:'15px',height:'15px',color:'#1B4D3E'}} />
                </div>
                <div>
                  <p style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',marginBottom:'2px'}}>{row.label}</p>
                  <p style={{fontSize:'13px',fontWeight:500,color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>{row.val}</p>
                </div>
              </div>
            ))}
            {paymentId && (
              <div style={{paddingTop:'10px'}}>
                <p style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                  Payment ID: <span style={{fontFamily:'monospace',color:'var(--text-2)'}}>{paymentId}</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* What next */}
        <div style={{background:'rgba(244,185,66,0.08)',border:'1px solid rgba(244,185,66,0.25)',
          borderRadius:'16px',padding:'20px',marginBottom:'20px'}}>
          <h3 style={{fontSize:'14px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif',marginBottom:'12px'}}>
            What happens next?
          </h3>
          {['Our phlebotomist will call 30 mins before arriving',
            'Keep 6–8 hour fast ready if any tests require it',
            'Keep your Aadhaar or any ID ready',
            'Your digital reports will be ready within 24 hours',
            'AI-powered report summary will be sent to your mobile'].map((step,i)=>(
            <div key={i} style={{display:'flex',gap:'10px',marginBottom:'8px',alignItems:'flex-start'}}>
              <div style={{width:'20px',height:'20px',borderRadius:'50%',background:'#F4B942',
                display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,marginTop:'1px'}}>
                <span style={{fontSize:'10px',fontWeight:700,color:'#0f172a',fontFamily:'Inter,sans-serif'}}>{i+1}</span>
              </div>
              <p style={{fontSize:'13px',color:'var(--text-2)',fontFamily:'Inter,sans-serif',lineHeight:'1.5',margin:0}}>{step}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div style={{display:'flex',gap:'10px'}}>
          <Link href="/dashboard/reports"
            style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
              background:'#1B4D3E',color:'white',fontWeight:600,fontSize:'14px',padding:'13px',
              borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
            <FileText style={{width:'16px',height:'16px'}} /> My Reports
          </Link>
          <Link href="/tests"
            style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
              background:'var(--bg-2)',color:'var(--text-2)',fontWeight:600,fontSize:'14px',padding:'13px',
              borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',
              border:'1.5px solid var(--border)'}}>
            Book More Tests
          </Link>
        </div>
        <p style={{textAlign:'center',fontSize:'12px',color:'var(--text-4)',marginTop:'16px',fontFamily:'Inter,sans-serif'}}>
          Need help? Call us at <strong>+91 70421 91854</strong> · 7AM – 9PM
        </p>
      </div>
    </div>
  );
}

export default function BookingConfirmedPage() {
  return <Suspense fallback={<div style={{display:'flex',justifyContent:'center',padding:'80px'}}><CheckCircle2 style={{width:'32px',height:'32px',color:'#059669'}}/></div>}>
    <ConfirmedContent />
  </Suspense>;
}
