'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Phone, ArrowRight, Loader2, CheckCircle, Shield, RefreshCw } from 'lucide-react';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'mobile' | 'otp'>('mobile');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [debugOtp, setDebugOtp] = useState('');

  const sendOtp = async () => {
    if (mobile.length !== 10) { setError('Enter valid 10-digit mobile number'); return; }
    setLoading(true); setError('');
    try {
      const res = await api.auth.sendOtp(mobile);
      if (res.status === 'ok') {
        setStep('otp');
        if (res.debug_otp) setDebugOtp(String(res.debug_otp));
      }
    } catch { setError('Failed to send OTP. Please try again.'); }
    finally { setLoading(false); }
  };

  const verifyOtp = async () => {
    if (otp.length !== 6) { setError('Enter valid 6-digit OTP'); return; }
    setLoading(true); setError('');
    try {
      const res = await api.auth.verifyOtp(mobile, otp);
      if (res.token) {
        localStorage.setItem('nhcare_token', res.token);
        localStorage.setItem('nhcare_patient', JSON.stringify(res.patient));
        router.push('/dashboard');
      }
    } catch { setError('Invalid OTP. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gold-400/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-forest-700/20 rounded-full blur-3xl" />
      </div>
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 bg-forest-800 border border-gold-400/30 rounded-xl flex items-center justify-center">
              <span className="font-display text-gold-400 font-800 text-sm">N</span>
            </div>
            <div className="text-left">
              <span className="font-display text-xl font-700 text-white">nhcare</span>
              <span className="block text-[9px] text-gold-400 tracking-widest uppercase -mt-1">pathlabs</span>
            </div>
          </Link>
        </div>

        <div className="glass-card rounded-3xl p-8">
          {step === 'mobile' ? (
            <>
              <h1 className="font-display text-2xl font-700 text-forest-900 dark:text-white mb-1">Sign In</h1>
              <p className="font-body text-sm text-forest-500 dark:text-forest-300 mb-6">Enter your mobile number to receive OTP</p>
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-600 text-forest-700 dark:text-cream-200 uppercase tracking-wide mb-1.5 block">Mobile Number</label>
                  <div className="flex items-center gap-2 bg-forest-50 dark:bg-forest-900/50 border border-forest-200 dark:border-forest-700 rounded-xl px-4 py-3">
                    <span className="font-body text-sm font-600 text-forest-600 dark:text-forest-400">+91</span>
                    <div className="w-px h-4 bg-forest-300 dark:bg-forest-700" />
                    <input value={mobile} onChange={e => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))}
                      placeholder="9XXXXXXXXX" maxLength={10} type="tel"
                      className="flex-1 bg-transparent outline-none font-body text-sm text-forest-900 dark:text-cream-100 placeholder:text-forest-400"
                      onKeyDown={e => e.key === 'Enter' && sendOtp()} />
                    <Phone className="w-4 h-4 text-forest-400" />
                  </div>
                </div>
                {error && <p className="font-body text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>}
                <button onClick={sendOtp} disabled={loading || mobile.length !== 10}
                  className="w-full btn-gold text-forest-950 font-body font-700 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Send OTP <ArrowRight className="w-4 h-4" /></>}
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1">
                <button onClick={() => { setStep('mobile'); setOtp(''); setError(''); }}
                  className="text-forest-500 hover:text-forest-700 dark:text-forest-400 dark:hover:text-cream-200 transition-colors">←</button>
                <h1 className="font-display text-2xl font-700 text-forest-900 dark:text-white">Verify OTP</h1>
              </div>
              <p className="font-body text-sm text-forest-500 dark:text-forest-300 mb-6">
                OTP sent to <strong className="text-forest-700 dark:text-cream-200">+91 {mobile}</strong>
              </p>
              {debugOtp && (
                <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl">
                  <p className="font-body text-xs text-amber-700 dark:text-amber-400">Dev mode — OTP: <strong>{debugOtp}</strong></p>
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs font-600 text-forest-700 dark:text-cream-200 uppercase tracking-wide mb-1.5 block">Enter 6-digit OTP</label>
                  <input value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                    placeholder="• • • • • •" maxLength={6} type="tel"
                    className="w-full bg-forest-50 dark:bg-forest-900/50 border border-forest-200 dark:border-forest-700 rounded-xl px-4 py-3.5 font-mono text-center text-xl tracking-[0.4em] text-forest-900 dark:text-cream-100 outline-none focus:border-gold-400 transition-colors"
                    onKeyDown={e => e.key === 'Enter' && verifyOtp()} />
                </div>
                {error && <p className="font-body text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">{error}</p>}
                <button onClick={verifyOtp} disabled={loading || otp.length !== 6}
                  className="w-full btn-gold text-forest-950 font-body font-700 py-3.5 rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><CheckCircle className="w-4 h-4" /> Verify & Continue</>}
                </button>
                <button onClick={sendOtp} className="w-full flex items-center justify-center gap-1.5 text-sm font-body text-forest-500 dark:text-forest-400 hover:text-forest-700 dark:hover:text-cream-200 transition-colors py-2">
                  <RefreshCw className="w-3.5 h-3.5" /> Resend OTP
                </button>
              </div>
            </>
          )}

          <div className="mt-6 flex items-center gap-2 justify-center">
            <Shield className="w-3.5 h-3.5 text-forest-400" />
            <p className="font-body text-xs text-forest-400">Your data is protected by 256-bit encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
}
