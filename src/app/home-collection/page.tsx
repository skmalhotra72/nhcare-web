'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, CheckCircle2, Clock, Shield, Star, ArrowRight, MapPin, Loader2, Phone } from 'lucide-react';
import { api } from '@/lib/api';

export default function HomeCollectionPage() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (pincode.length !== 6) return;
    setLoading(true);
    try { const r = await api.labs.pincodeCheck(pincode); setResult(r); }
    catch { setResult({ serviceable: false, count: 0 }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>
      {/* Hero */}
      <div style={{background:'#1B4D3E',padding:'56px 0 64px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-60px',right:'-60px',width:'300px',height:'300px',background:'radial-gradient(circle,rgba(244,185,66,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-5"
            style={{background:'rgba(244,185,66,0.15)',border:'1px solid rgba(244,185,66,0.3)'}}>
            <Home className="w-7 h-7" style={{color:'#F4B942'}} />
          </div>
          <h1 className="font-display font-700 text-white mb-3" style={{fontSize:'36px'}}>Home Sample Collection</h1>
          <p className="text-[15px] mb-8 max-w-xl mx-auto" style={{color:'rgba(255,255,255,0.6)'}}>
            Our certified phlebotomists come to your home. Book before 10AM for same-day collection across Delhi-NCR.
          </p>
          {/* Pincode checker */}
          <div className="max-w-md mx-auto p-5 rounded-2xl" style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.12)',backdropFilter:'blur(20px)'}}>
            <p className="text-[13px] font-body font-600 text-white mb-3">Check availability in your area</p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 px-4 rounded-xl" style={{background:'rgba(255,255,255,0.08)',border:'1px solid rgba(255,255,255,0.15)'}}>
                <MapPin className="w-4 h-4 flex-shrink-0" style={{color:'rgba(255,255,255,0.4)'}} />
                <input value={pincode} onChange={e=>setPincode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="Enter 6-digit pincode" maxLength={6} type="tel"
                  className="flex-1 py-3 text-[14px] outline-none font-body"
                  style={{background:'transparent',border:'none',color:'white'}}
                  onKeyDown={e=>e.key==='Enter'&&check()} />
              </div>
              <button onClick={check} disabled={loading||pincode.length!==6}
                className="btn btn-gold disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
              </button>
            </div>
            {result && (
              <div className={`mt-3 p-3 rounded-xl text-[13px] font-body font-500 ${result.serviceable ? 'text-green-400' : 'text-red-400'}`}
                style={{background: result.serviceable ? 'rgba(74,222,128,0.1)' : 'rgba(248,113,113,0.1)',border:`1px solid ${result.serviceable?'rgba(74,222,128,0.2)':'rgba(248,113,113,0.2)'}`}}>
                {result.serviceable
                  ? `✓ Home collection available! ${result.count} labs serve pincode ${pincode}.`
                  : `Sorry, home collection not yet available for pincode ${pincode}.`}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14">
        {/* Steps */}
        <h2 className="font-display font-700 text-center mb-10" style={{fontSize:'28px',color:'var(--text-1)'}}>How Home Collection Works</h2>
        <div className="grid md:grid-cols-4 gap-5 mb-14">
          {[
            {n:'1',title:'Book Online',desc:'Choose tests, pick a time slot, enter your address'},
            {n:'2',title:'Confirmation',desc:'Receive booking confirmation via SMS and WhatsApp'},
            {n:'3',title:'We Arrive',desc:'Certified phlebotomist reaches your door on time'},
            {n:'4',title:'Get Reports',desc:'Digital reports with AI summary in 24 hours'},
          ].map(s=>(
            <div key={s.n} className="card p-5 text-center">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3 font-display font-700 text-[18px] text-white"
                style={{background:'#1B4D3E'}}>{s.n}</div>
              <h3 className="font-display font-700 text-[15px] mb-1" style={{color:'var(--text-1)'}}>{s.title}</h3>
              <p className="text-[12px] font-body leading-relaxed" style={{color:'var(--text-3)'}}>{s.desc}</p>
            </div>
          ))}
        </div>
        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {[
            [Shield,'NABL Certified','All samples processed in our accredited lab'],
            [Clock,'7AM to 9PM','Morning and evening slots, 7 days a week'],
            [Star,'Verified Phlebotomists','Trained, background-verified professionals'],
            [CheckCircle2,'Free Home Visit','No extra charge for home collection'],
            [Home,'Safe & Hygienic','Sealed, sterile, single-use collection kits'],
            [Phone,'24/7 Support','Call or WhatsApp us anytime for help'],
          ].map(([Icon,title,desc]:any)=>(
            <div key={title} className="flex items-start gap-3 p-4 rounded-xl"
              style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{background:'var(--green-bg)'}}>
                <Icon className="w-4 h-4" style={{color:'#1B4D3E'}} />
              </div>
              <div>
                <p className="font-body font-600 text-[13px] mb-0.5" style={{color:'var(--text-1)'}}>{title}</p>
                <p className="text-[12px] font-body" style={{color:'var(--text-3)'}}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/tests" className="btn btn-green text-[15px] px-8 py-3.5">
            Book Home Collection Now <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
