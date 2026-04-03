'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, Loader2, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mobile'|'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  const sendOtp = async () => {
    if (mobile.length!==10){setError('Enter valid 10-digit mobile number');return;}
    setLoading(true);setError('');
    try {
      const res = await api.auth.sendOtp(mobile);
      if (res.status==='ok'){setStep('otp');if(res.debug_otp)setDebugOtp(String(res.debug_otp));}
    } catch{setError('Failed to send OTP. Please try again.');}
    finally{setLoading(false);}
  };

  const verifyOtp = async () => {
    if (otp.length!==6){setError('Enter valid 6-digit OTP');return;}
    setLoading(true);setError('');
    try {
      const res = await api.auth.verifyOtp(mobile,otp);
      if (res.token){
        localStorage.setItem('nhcare_token',res.token);
        localStorage.setItem('nhcare_patient',JSON.stringify(res.patient));
        router.push('/dashboard');
      }
    } catch{setError('Invalid OTP. Please try again.');}
    finally{setLoading(false);}
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative" style={{background:'var(--bg)'}}>
      {/* Ambient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{background:'radial-gradient(ellipse,rgba(27,77,62,0.08) 0%,transparent 70%)'}} />
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{background:'#1B4D3E'}}>
              <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6">
                <path d="M12 2C12 2 7 7 7 11C7 13.761 9.239 16 12 16C14.761 16 17 13.761 17 11C17 7 12 2 12 2Z" fill="#F4B942"/>
                <path d="M6 8C6 8 3 11 4.5 14C5.5 16 8 16.5 9.5 15C11 13.5 11 11 9.5 9.5C8 8 6 8 6 8Z" fill="#F4B942" opacity="0.6"/>
                <path d="M18 8C18 8 21 11 19.5 14C18.5 16 16 16.5 14.5 15C13 13.5 13 11 14.5 9.5C16 8 18 8 18 8Z" fill="#F4B942" opacity="0.6"/>
                <line x1="12" y1="16" x2="12" y2="22" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M9 21C9 21 12 22.5 15 21" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="text-left">
              <p className="font-display font-700 leading-none" style={{fontSize:'20px',color:'var(--text-1)'}}>nhcare</p>
              <p className="font-body font-700 tracking-[0.2em] uppercase" style={{fontSize:'8px',color:'#1B4D3E'}}>PATHLABS</p>
            </div>
          </Link>
        </div>

        <div className="card p-8">
          {step==='mobile' ? (
            <>
              <h1 className="font-display font-700 mb-1" style={{fontSize:'24px',color:'var(--text-1)'}}>Sign In</h1>
              <p className="text-[14px] font-body mb-6" style={{color:'var(--text-3)'}}>Enter your mobile number to receive OTP</p>
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-body font-700 uppercase tracking-wide mb-1.5" style={{color:'var(--text-2)'}}>Mobile Number</label>
                  <div className="search-wrap">
                    <span className="font-body text-[14px] font-600 pl-4 pr-2 flex-shrink-0" style={{color:'var(--text-3)'}}>+91</span>
                    <div style={{width:'1px',height:'18px',background:'var(--border)',flexShrink:0}} />
                    <input value={mobile} onChange={e=>setMobile(e.target.value.replace(/\D/g,'').slice(0,10))}
                      placeholder="9XXXXXXXXX" maxLength={10} type="tel"
                      className="search-input" onKeyDown={e=>e.key==='Enter'&&sendOtp()} />
                    <Phone className="w-4 h-4 mr-4 flex-shrink-0" style={{color:'var(--text-4)'}} />
                  </div>
                </div>
                {error && <p className="text-[12px] font-body px-3 py-2 rounded-lg" style={{background:'rgba(239,68,68,0.08)',color:'#dc2626',border:'1px solid rgba(239,68,68,0.2)'}}>{error}</p>}
                <button onClick={sendOtp} disabled={loading||mobile.length!==10}
                  className="btn btn-green w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <button onClick={()=>{setStep('mobile');setOtp('');setError('');}}
                  className="font-body text-[20px] transition-colors" style={{color:'var(--text-4)'}}>←</button>
                <h1 className="font-display font-700" style={{fontSize:'24px',color:'var(--text-1)'}}>Verify OTP</h1>
              </div>
              <p className="text-[14px] font-body mb-6" style={{color:'var(--text-3)'}}>
                OTP sent to <strong style={{color:'var(--text-1)'}}>+91 {mobile}</strong>
              </p>
              {debugOtp && (
                <div className="mb-4 p-3 rounded-xl text-[12px] font-body" style={{background:'rgba(244,185,66,0.08)',border:'1px solid rgba(244,185,66,0.2)',color:'#92620a'}}>
                  Dev mode — OTP: <strong>{debugOtp}</strong>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-[11px] font-body font-700 uppercase tracking-wide mb-1.5" style={{color:'var(--text-2)'}}>6-digit OTP</label>
                  <input value={otp} onChange={e=>setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                    placeholder="• • • • • •" maxLength={6} type="tel"
                    className="w-full py-4 text-center font-mono text-[24px] tracking-[0.5em] rounded-xl outline-none transition-all"
                    style={{background:'var(--bg-2)',border:'1.5px solid var(--border)',color:'var(--text-1)'}}
                    onFocus={e=>{e.currentTarget.style.borderColor='#1B4D3E';e.currentTarget.style.boxShadow='0 0 0 3px rgba(27,77,62,0.1)'}}
                    onBlur={e=>{e.currentTarget.style.borderColor='var(--border)';e.currentTarget.style.boxShadow='none'}}
                    onKeyDown={e=>e.key==='Enter'&&verifyOtp()} />
                </div>
                {error && <p className="text-[12px] font-body px-3 py-2 rounded-lg" style={{background:'rgba(239,68,68,0.08)',color:'#dc2626',border:'1px solid rgba(239,68,68,0.2)'}}>{error}</p>}
                <button onClick={verifyOtp} disabled={loading||otp.length!==6}
                  className="btn btn-green w-full justify-center py-3 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4" />Verify & Continue</>}
                </button>
                <button onClick={sendOtp} className="w-full flex items-center justify-center gap-1.5 py-2 font-body text-[13px] transition-colors" style={{color:'var(--text-4)'}}>
                  <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                </button>
              </div>
            </>
          )}
          <div className="mt-6 flex items-center justify-center gap-2">
            <Shield className="w-3.5 h-3.5" style={{color:'var(--text-4)'}} />
            <p className="text-[11px] font-body" style={{color:'var(--text-4)'}}>256-bit encrypted · Your data is safe</p>
          </div>
        </div>

        <p className="text-center mt-5 text-[12px] font-body" style={{color:'var(--text-4)'}}>
          By signing in you agree to our <Link href="/terms" style={{color:'#1B4D3E'}}>Terms</Link> & <Link href="/privacy" style={{color:'#1B4D3E'}}>Privacy Policy</Link>
        </p>
      </div>
    </div>
  );
}
