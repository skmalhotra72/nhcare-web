import { api } from '@/lib/api';
import Link from 'next/link';
import { Clock, Droplets, Microscope, ArrowLeft, ShoppingCart, CheckCircle, FlaskConical, Star } from 'lucide-react';

export default async function TestDetailPage({ params }: { params: { id: string } }) {
  let test: any = null;
  try { test = await api.tests.get(parseInt(params.id)); test = test.data; } catch {}

  if (!test) return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-20 flex items-center justify-center">
      <div className="text-center">
        <p className="font-display text-2xl text-forest-900 dark:text-cream-100 mb-4">Test not found</p>
        <Link href="/tests" className="btn-forest text-white px-6 py-2.5 rounded-xl font-body font-500">Back to Tests</Link>
      </div>
    </div>
  );

  const name = test.test_parameter?.split('\n')[0]?.trim() || test.description || 'Test';

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/tests" className="inline-flex items-center gap-1.5 text-cream-100/60 hover:text-cream-100 font-body text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Tests
          </Link>
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <span className="inline-block text-[10px] font-body font-600 px-2.5 py-1 rounded-full bg-gold-400/20 text-gold-400 uppercase tracking-wide mb-3">
                {test.type === 'PROFILE' ? 'Panel / Profile' : 'Individual Test'}
              </span>
              <h1 className="font-display text-2xl sm:text-3xl font-700 text-white leading-tight">{name}</h1>
              {test.testcode && <p className="font-mono text-xs text-cream-100/40 mt-1">Code: {test.testcode}</p>}
            </div>
            <div className="text-right">
              <p className="font-display text-4xl font-800 text-gold-400">₹{test.mrp}</p>
              <p className="font-body text-xs text-cream-100/50 mt-0.5">Inclusive of all charges</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {/* Quick info */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { icon: Clock, label: 'TAT', value: test.tat ? `${test.tat} Day${test.tat > 1 ? 's' : ''}` : 'Same Day' },
                { icon: Droplets, label: 'Fasting', value: test.fasting_required || 'Not Required' },
                { icon: FlaskConical, label: 'Tested At', value: test.tested_at || 'NABL Lab' },
                { icon: Star, label: 'Schedule', value: test.schedule || 'Daily' },
              ].map(i => (
                <div key={i.label} className="glass-card rounded-xl p-3 text-center">
                  <i.icon className="w-4 h-4 text-gold-500 mx-auto mb-1.5" />
                  <p className="font-body text-[10px] text-forest-500 dark:text-forest-400 uppercase tracking-wide">{i.label}</p>
                  <p className="font-body text-xs font-600 text-forest-900 dark:text-cream-100 truncate">{i.value}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            {test.description && (
              <div className="glass-card rounded-2xl p-5">
                <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100 mb-3">About This Test</h2>
                <p className="font-body text-sm text-forest-600 dark:text-forest-300 leading-relaxed whitespace-pre-line">{test.description.replace(/\[X\]/g,'✓').trim()}</p>
              </div>
            )}

            {/* Methodology */}
            {test.methodology && (
              <div className="glass-card rounded-2xl p-5">
                <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100 mb-2">Methodology</h2>
                <p className="font-body text-sm text-forest-600 dark:text-forest-300">{test.methodology.split(',')[0].trim()}</p>
              </div>
            )}

            {/* Observations */}
            {test.observations && test.observations.length > 0 && (
              <div className="glass-card rounded-2xl p-5">
                <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100 mb-4">Parameters Measured</h2>
                <div className="space-y-2">
                  {test.observations.map((o: any, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-forest-50 dark:border-forest-800 last:border-0">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-forest-500" />
                        <span className="font-body text-sm text-forest-800 dark:text-cream-100">{o.observation_name}</span>
                      </div>
                      {o.method && <span className="font-body text-xs text-forest-400 dark:text-forest-500">{o.method}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 glass-card rounded-2xl p-5 space-y-4">
              <h3 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100">Book This Test</h3>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl font-800 text-forest-900 dark:text-gold-400">₹{test.mrp}</span>
                <span className="font-body text-xs text-forest-500">total</span>
              </div>
              <ul className="space-y-2">
                {[['✓ Home collection available',''],['✓ Report in 24 hours',''],['✓ NABL certified lab',''],['✓ Free report consultation','']].map(([l]) => (
                  <li key={l} className="font-body text-xs text-forest-600 dark:text-forest-300">{l}</li>
                ))}
              </ul>
              <Link href="/auth/login"
                className="w-full btn-gold text-forest-950 font-body font-700 py-3.5 rounded-xl flex items-center justify-center gap-2 text-sm">
                <ShoppingCart className="w-4 h-4" /> Book Now
              </Link>
              <Link href="/auth/login"
                className="w-full border border-forest-200 dark:border-forest-700 text-forest-700 dark:text-cream-200 font-body font-500 py-3 rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-forest-50 dark:hover:bg-forest-900/30 transition-colors">
                Add to Cart
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
