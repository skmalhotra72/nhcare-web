import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, Droplets } from 'lucide-react';
import { api } from '@/lib/api';

async function getData() {
  try {
    const res = await api.packages.list('', 50);
    return res.data || [];
  } catch { return []; }
}

export default async function PackagesPage() {
  const packages = await getData();
  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <p className="font-body text-xs font-600 text-gold-400 uppercase tracking-widest mb-2">Preventive Healthcare</p>
          <h1 className="font-display text-3xl font-700 text-white mb-2">Health Packages</h1>
          <p className="font-body text-cream-100/60 text-sm max-w-xl">Comprehensive health checkup packages for every life stage. NABL certified. Home collection available.</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {packages.map((p: any) => {
            const name = p.test_parameter?.split('\n')[0]?.trim() || 'Health Package';
            const desc = p.description?.replace(/\[X\]/g,'')?.split('\n')?.filter(Boolean).slice(0,5) || [];
            return (
              <div key={p.id} className="card-3d bg-white dark:bg-forest-900/40 rounded-2xl border border-forest-100 dark:border-forest-800 overflow-hidden flex flex-col">
                <div className="h-1.5 bg-gradient-to-r from-forest-600 via-gold-400 to-forest-600" />
                <div className="p-5 flex flex-col flex-1">
                  <span className="inline-block text-[10px] font-body font-600 px-2 py-0.5 rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400 uppercase tracking-wide mb-2 self-start">Health Package</span>
                  <h3 className="font-display font-700 text-base text-forest-900 dark:text-cream-100 mb-1 leading-snug">{name}</h3>
                  {desc.length > 0 && (
                    <ul className="space-y-1 mb-4 flex-1">
                      {desc.map((d: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle className="w-3 h-3 text-forest-500 mt-0.5 flex-shrink-0" />
                          <span className="font-body text-xs text-forest-600 dark:text-forest-300 leading-tight">{d.trim()}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                    {p.tat && <span className="flex items-center gap-1 text-xs font-body text-forest-500 dark:text-forest-400"><Clock className="w-3 h-3" />{p.tat}d TAT</span>}
                    {p.fasting_required && p.fasting_required !== 'NO' && <span className="flex items-center gap-1 text-xs font-body text-amber-600 dark:text-amber-400"><Droplets className="w-3 h-3" />Fasting</span>}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-forest-50 dark:border-forest-800">
                    <p className="font-display font-800 text-2xl text-forest-900 dark:text-gold-400">₹{p.mrp}</p>
                    <Link href={`/tests/${p.id}`} className="btn-gold text-forest-950 font-body font-700 text-sm px-5 py-2.5 rounded-xl flex items-center gap-1.5">
                      Book <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
