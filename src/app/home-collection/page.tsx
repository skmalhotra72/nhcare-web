'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Home, CheckCircle, Clock, Shield, Star, ArrowRight, MapPin, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export default function HomeCollectionPage() {
  const [pincode, setPincode] = useState('');
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const check = async () => {
    if (pincode.length !== 6) return;
    setLoading(true);
    try {
      const res = await api.labs.pincodeCheck(pincode);
      setResult(res);
    } catch { setResult({ serviceable: false, labs: [], count: 0 }); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-br from-forest-900 via-forest-800 to-forest-900 py-16 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(#F4B942 1px,transparent 1px),linear-gradient(90deg,#F4B942 1px,transparent 1px)',backgroundSize:'40px 40px'}} />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-gold-400/20 border border-gold-400/40 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Home className="w-8 h-8 text-gold-400" />
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-800 text-white mb-3">Home Sample Collection</h1>
          <p className="font-body text-cream-100/70 text-base mb-8 max-w-xl mx-auto">Our certified phlebotomists come to your home. Book before 10am for same-day collection across Delhi-NCR.</p>

          {/* Pincode check */}
          <div className="bg-white dark:bg-forest-900 rounded-2xl p-6 max-w-md mx-auto shadow-3d">
            <p className="font-body text-sm font-600 text-forest-800 dark:text-cream-200 mb-3">Check availability in your area</p>
            <div className="flex gap-2">
              <div className="flex-1 flex items-center gap-2 bg-forest-50 dark:bg-forest-800 border border-forest-200 dark:border-forest-700 rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 text-forest-400 flex-shrink-0" />
                <input value={pincode} onChange={e => setPincode(e.target.value.replace(/\D/g,'').slice(0,6))}
                  placeholder="Enter 6-digit pincode" maxLength={6} type="tel"
                  className="flex-1 bg-transparent outline-none font-body text-sm text-forest-900 dark:text-cream-100 placeholder:text-forest-400"
                  onKeyDown={e => e.key === 'Enter' && check()} />
              </div>
              <button onClick={check} disabled={loading || pincode.length !== 6}
                className="btn-gold text-forest-950 font-body font-700 px-5 py-3 rounded-xl disabled:opacity-50">
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Check'}
              </button>
            </div>
            {result && (
              <div className={`mt-3 p-3 rounded-xl text-sm font-body ${result.serviceable ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
                {result.serviceable ? `✓ Home collection available! ${result.count} labs serve pincode ${pincode}.` : `Sorry, home collection not available for pincode ${pincode} yet.`}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* How it works */}
        <h2 className="font-display text-2xl font-700 text-forest-900 dark:text-cream-100 text-center mb-8">How Home Collection Works</h2>
        <div className="grid md:grid-cols-4 gap-5 mb-12">
          {[
            { n:'1', title:'Book Online', desc:'Choose tests, pick a time slot, enter your address' },
            { n:'2', title:'Confirmation', desc:'Receive booking confirmation via SMS and WhatsApp' },
            { n:'3', title:'Phlebotomist Arrives', desc:'Certified professional arrives at your door' },
            { n:'4', title:'Get Reports', desc:'Digital reports with AI summary in 24 hours' },
          ].map(s => (
            <div key={s.n} className="card-3d glass-card rounded-2xl p-5 text-center">
              <div className="w-10 h-10 bg-gradient-to-br from-forest-700 to-forest-900 text-gold-400 font-display font-800 text-lg rounded-xl flex items-center justify-center mx-auto mb-3">{s.n}</div>
              <h3 className="font-display text-sm font-700 text-forest-900 dark:text-cream-100 mb-1">{s.title}</h3>
              <p className="font-body text-xs text-forest-500 dark:text-forest-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {[
            [Shield,'NABL Certified','All samples processed in our accredited lab'],
            [Clock,'7AM to 9PM','Morning and evening slots available daily'],
            [Star,'Certified Phlebotomists','Trained, background-verified professionals'],
            [CheckCircle,'Free Home Visit','No extra charge for home collection'],
            [Home,'Safe & Hygienic','Sealed, sterile collection equipment'],
            [ArrowRight,'Quick Booking','Book in under 2 minutes'],
          ].map(([Icon, title, desc]: any) => (
            <div key={title} className="flex items-start gap-3 p-4 glass-card rounded-xl">
              <div className="w-8 h-8 bg-gold-50 dark:bg-gold-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-gold-500" />
              </div>
              <div>
                <p className="font-body text-sm font-600 text-forest-900 dark:text-cream-100">{title}</p>
                <p className="font-body text-xs text-forest-500 dark:text-forest-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link href="/tests" className="btn-gold text-forest-950 font-body font-700 px-8 py-4 rounded-xl inline-flex items-center gap-2 text-base">
            Book Home Collection Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
