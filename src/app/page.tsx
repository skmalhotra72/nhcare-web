import Link from 'next/link';
import { ArrowRight, Home, Star, Shield, Clock, Microscope, Package, Heart, Brain, Zap, Leaf, Activity, Phone, CheckCircle2, ChevronRight, MapPin, Droplets, FlaskConical } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { api } from '@/lib/api';

const CATEGORIES = [
  { icon: Heart, label: 'Heart & Cardiac', q: 'cardiac', color: '#ef4444', bg: '#fef2f2' },
  { icon: Activity, label: 'Diabetes', q: 'diabetes', color: '#f59e0b', bg: '#fffbeb' },
  { icon: Brain, label: 'Thyroid', q: 'thyroid', color: '#8b5cf6', bg: '#f5f3ff' },
  { icon: Leaf, label: 'Liver', q: 'liver', color: '#10b981', bg: '#ecfdf5' },
  { icon: Zap, label: 'Kidney', q: 'kidney', color: '#3b82f6', bg: '#eff6ff' },
  { icon: Microscope, label: 'Blood CBC', q: 'CBC', color: '#1B4D3E', bg: '#f0f7f4' },
  { icon: Package, label: 'Vitamins', q: 'vitamin', color: '#F4B942', bg: '#fffbeb' },
  { icon: Shield, label: 'Full Body', q: 'full body', color: '#6366f1', bg: '#eef2ff' },
];

const STEPS = [
  { n: '1', title: 'Search & Book', desc: 'Find tests by name, symptom or health condition. Book in under 2 minutes.', icon: Microscope },
  { n: '2', title: 'Sample Collection', desc: 'Certified phlebotomist arrives at your home between 7AM–9PM.', icon: Home },
  { n: '3', title: 'AI-Powered Report', desc: 'Digital report with plain-language AI summary delivered in 24 hours.', icon: Brain },
];

const TRUST = [
  { val: '663K+', label: 'Patients Served', sub: 'Since 1999' },
  { val: '490+', label: 'Partner Labs', sub: 'Delhi-NCR' },
  { val: '1875+', label: 'Tests Available', sub: 'All categories' },
  { val: '24hr', label: 'Report Delivery', sub: 'Most tests' },
];

async function getTests() {
  try { const r = await api.tests.list('', 8); return r.data || []; } catch { return []; }
}
async function getPackages() {
  try { const r = await api.packages.list('', 6); return r.data || []; } catch { return []; }
}

export default async function HomePage() {
  const [tests, packages] = await Promise.all([getTests(), getPackages()]);
  return (
    <div className="min-h-screen">

      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 bg-white dark:bg-slate-900 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-forest-50 dark:bg-forest-950/30 rounded-full -translate-y-32 translate-x-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gold-400/5 rounded-full translate-y-16 -translate-x-16 pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* NABL badge */}
              <div className="inline-flex items-center gap-2 bg-forest-50 dark:bg-forest-950 border border-forest-100 dark:border-forest-800 rounded-full px-4 py-1.5 mb-6">
                <div className="w-2 h-2 bg-forest-600 rounded-full" />
                <span className="text-xs font-600 text-forest-700 dark:text-forest-300 font-body tracking-wide">NABL Accredited · ISO 15189:2012 Certified</span>
              </div>

              <h1 className="font-display text-4xl sm:text-5xl font-700 text-slate-900 dark:text-white leading-tight mb-5">
                Diagnostic Tests<br />
                <span className="text-forest-800 dark:text-forest-300">at Your Doorstep</span>
              </h1>
              <p className="text-base text-slate-500 dark:text-slate-400 leading-relaxed mb-8 max-w-lg">
                NABL-certified lab tests with home sample collection. Get AI-powered plain-language reports in 24 hours. Trusted by 663,000+ patients across Delhi-NCR since 1999.
              </p>

              {/* Search */}
              <div className="mb-6 max-w-xl">
                <SearchBar large />
              </div>

              {/* Popular searches */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-xs text-slate-400 font-body">Popular:</span>
                {['CBC', 'HbA1c', 'Thyroid TSH', 'Vitamin D', 'Lipid Profile'].map(t => (
                  <Link key={t} href={`/tests?q=${t}`}
                    className="text-xs font-500 text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 hover:bg-forest-50 dark:hover:bg-forest-950 hover:text-forest-700 dark:hover:text-forest-300 px-3 py-1 rounded-full transition-all border border-slate-200 dark:border-slate-700">
                    {t}
                  </Link>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/tests" className="btn-primary text-sm px-6 py-3">
                  Browse All Tests <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/home-collection" className="btn-outline text-sm px-6 py-3">
                  <Home className="w-4 h-4" /> Home Collection
                </Link>
              </div>
            </div>

            {/* Hero visual — stats card grid */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-4">
                {TRUST.map((s, i) => (
                  <div key={s.label} className={`card p-6 ${i === 0 ? 'bg-forest-800 border-forest-700' : i === 1 ? 'bg-gold-400 border-gold-500' : ''}`}>
                    <p className={`stat-num mb-1 ${i === 0 ? '!text-white' : i === 1 ? '!text-slate-900' : ''}`}>{s.val}</p>
                    <p className={`text-sm font-600 font-body mb-0.5 ${i === 0 ? 'text-forest-100' : i === 1 ? 'text-slate-800' : 'text-slate-700 dark:text-slate-200'}`}>{s.label}</p>
                    <p className={`text-xs ${i === 0 ? 'text-forest-300' : i === 1 ? 'text-slate-700' : 'text-slate-400'}`}>{s.sub}</p>
                  </div>
                ))}
              </div>
              {/* Feature badges */}
              <div className="flex flex-wrap gap-2 mt-4">
                {['Home Collection Available','Certified Phlebotomists','Reports in 24hrs','AI Health Insights'].map(f => (
                  <span key={f} className="flex items-center gap-1.5 text-xs font-500 text-forest-700 dark:text-forest-300 bg-forest-50 dark:bg-forest-950 border border-forest-100 dark:border-forest-800 px-3 py-1.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────────────── */}
      <section className="py-14 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="section-label mb-1">Browse by Health Concern</p>
              <h2 className="font-display text-2xl font-700 text-slate-900 dark:text-white">Find the Right Test</h2>
            </div>
            <Link href="/tests" className="hidden sm:flex items-center gap-1 text-sm font-500 text-forest-700 dark:text-forest-300 hover:underline">
              All Tests <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(c => (
              <Link key={c.q} href={`/tests?q=${c.q}`}
                className="card flex flex-col items-center gap-2.5 p-4 hover:border-forest-200 dark:hover:border-forest-700 text-center group">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{background: c.bg}}>
                  <c.icon className="w-5 h-5" style={{color: c.color}} />
                </div>
                <span className="text-xs font-500 text-slate-700 dark:text-slate-300 leading-tight">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TESTS ─────────────────────────────────────── */}
      {tests.length > 0 && (
        <section className="py-14 bg-white dark:bg-slate-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-1">Most Booked</p>
                <h2 className="font-display text-2xl font-700 text-slate-900 dark:text-white">Popular Tests</h2>
              </div>
              <Link href="/tests" className="flex items-center gap-1 text-sm font-500 text-forest-700 dark:text-forest-300 hover:underline">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tests.slice(0, 8).map((t: any) => {
                const name = t.test_parameter?.split('\n')[0]?.trim() || t.description?.split('\n')[0]?.trim() || 'Test';
                const isProfile = t.type === 'PROFILE';
                return (
                  <div key={t.id} className="card p-5 flex flex-col">
                    <span className={`badge self-start mb-3 ${isProfile ? 'badge-gold' : 'badge-green'}`}>
                      {isProfile ? 'Panel' : 'Test'}
                    </span>
                    <h3 className="text-sm font-600 text-slate-800 dark:text-slate-200 line-clamp-2 mb-2 flex-1 font-body leading-snug">{name}</h3>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="font-display text-xl font-700 text-forest-800 dark:text-forest-300">₹{t.mrp}</span>
                      <Link href={`/tests/${t.id}`}
                        className="text-xs font-600 text-forest-700 dark:text-forest-300 hover:text-forest-900 dark:hover:text-forest-100 flex items-center gap-1 transition-colors">
                        Book <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── PACKAGES ──────────────────────────────────────────── */}
      {packages.length > 0 && (
        <section className="py-14 bg-slate-50 dark:bg-slate-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="section-label mb-1">Preventive Care</p>
                <h2 className="font-display text-2xl font-700 text-slate-900 dark:text-white">Health Packages</h2>
              </div>
              <Link href="/packages" className="flex items-center gap-1 text-sm font-500 text-forest-700 dark:text-forest-300 hover:underline">
                All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.slice(0, 6).map((p: any) => {
                const name = p.test_parameter?.split('\n')[0]?.trim() || 'Health Package';
                const items = p.description?.replace(/\[X\]/g,'')?.split('\n')?.filter(Boolean).slice(0,4) || [];
                return (
                  <div key={p.id} className="card overflow-hidden flex flex-col">
                    <div className="h-1 bg-forest-800" />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="badge badge-gold self-start mb-3">Health Package</span>
                      <h3 className="text-sm font-600 text-slate-800 dark:text-slate-200 mb-2 font-body leading-snug">{name}</h3>
                      {items.length > 0 && (
                        <ul className="space-y-1.5 mb-4 flex-1">
                          {items.map((item: string, i: number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-forest-600 mt-0.5 flex-shrink-0" />
                              <span className="text-xs text-slate-500 dark:text-slate-400 leading-tight">{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800 mt-auto">
                        <span className="font-display text-2xl font-700 text-forest-800 dark:text-forest-300">₹{p.mrp}</span>
                        <Link href={`/tests/${p.id}`} className="btn-primary text-xs py-2 px-4">
                          Book <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────── */}
      <section className="py-14 bg-forest-800 dark:bg-forest-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <p className="text-xs font-600 text-gold-400 uppercase tracking-wider font-body mb-2">Simple Process</p>
            <h2 className="font-display text-2xl font-700 text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s, i) => (
              <div key={i} className="relative text-center p-6 rounded-xl bg-white/5 border border-white/10">
                <div className="w-12 h-12 bg-gold-400/20 border border-gold-400/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <s.icon className="w-5 h-5 text-gold-400" />
                </div>
                <div className="w-7 h-7 bg-gold-400 rounded-full flex items-center justify-center mx-auto mb-3 -mt-2">
                  <span className="text-xs font-700 text-slate-900 font-body">{s.n}</span>
                </div>
                <h3 className="font-display text-lg font-600 text-white mb-2">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NHCARE ────────────────────────────────────────── */}
      <section className="py-14 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="section-label mb-2">Why Choose Us</p>
              <h2 className="font-display text-3xl font-700 text-slate-900 dark:text-white mb-5">
                25+ Years of Diagnostic Excellence
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 leading-relaxed">
                Niramaya Healthcare has been Delhi-NCR&apos;s trusted pathology partner since 1999. NHCare brings the same NABL-accredited excellence to your smartphone, with AI-powered insights that help you understand your health better.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Shield, title: 'NABL Accredited Lab', desc: 'MC-2140 certified — the highest standard in diagnostic quality' },
                  { icon: Home, title: 'Home Sample Collection', desc: 'Certified phlebotomists visit your home, 7AM to 9PM daily' },
                  { icon: Brain, title: 'AI-Powered Reports', desc: 'Plain-language explanation of your results powered by GPT-4o' },
                  { icon: Clock, title: '24-Hour Turnaround', desc: 'Most test reports ready within one business day' },
                  { icon: MapPin, title: '490+ Partner Labs', desc: 'Wide coverage across all Delhi-NCR pincodes' },
                ].map(item => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-forest-50 dark:bg-forest-950 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-forest-700 dark:text-forest-400" />
                    </div>
                    <div>
                      <p className="text-sm font-600 text-slate-800 dark:text-slate-200 font-body">{item.title}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              {/* Feature highlight cards */}
              <div className="card p-6 border-l-4 border-l-forest-600">
                <div className="flex items-center gap-3 mb-2">
                  <FlaskConical className="w-5 h-5 text-forest-600" />
                  <h3 className="font-display text-lg font-600 text-slate-900 dark:text-white">AI Lab Report Analysis</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Our AI reads your lab results and explains them in simple language — no medical degree needed. Know what&apos;s high, low, and what it means for you.</p>
                <Link href="/dashboard/reports" className="inline-flex items-center gap-1 text-xs font-600 text-forest-700 dark:text-forest-300 mt-3 hover:underline">
                  View Sample Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="card p-6 border-l-4 border-l-gold-400">
                <div className="flex items-center gap-3 mb-2">
                  <Home className="w-5 h-5 text-gold-500" />
                  <h3 className="font-display text-lg font-600 text-slate-900 dark:text-white">Home Collection</h3>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Enter your pincode to check same-day home collection availability. Our phlebotomist brings all sterile equipment — completely free of charge.</p>
                <Link href="/home-collection" className="inline-flex items-center gap-1 text-xs font-600 text-gold-600 dark:text-gold-400 mt-3 hover:underline">
                  Check Your Pincode <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[{val:'99.2%',label:'Accuracy Rate'},{val:'Free',label:'Home Visit'}].map(s=>(
                  <div key={s.label} className="card p-4 text-center">
                    <p className="font-display text-2xl font-700 text-forest-800 dark:text-forest-300">{s.val}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-body">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOME COLLECTION CTA ───────────────────────────────── */}
      <section className="py-12 bg-gold-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-slate-900/10 rounded-xl flex items-center justify-center flex-shrink-0">
              <Home className="w-6 h-6 text-slate-900" />
            </div>
            <div>
              <p className="text-xs font-600 text-slate-700 uppercase tracking-wider font-body mb-0.5">Home Collection Available</p>
              <h2 className="font-display text-2xl font-700 text-slate-900 mb-1">Sample Collected at Your Door</h2>
              <p className="text-sm text-slate-700">Enter your pincode to check availability · 7AM–9PM · Certified Phlebotomists</p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/home-collection" className="btn-primary text-sm px-6 py-3 whitespace-nowrap">
              Book Home Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/centers" className="bg-white text-slate-800 font-600 text-sm px-6 py-3 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2 whitespace-nowrap">
              <Star className="w-4 h-4" /> Our Centers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
