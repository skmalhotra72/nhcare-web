import Link from 'next/link';
import { ArrowRight, Home, Star, Shield, Clock, Microscope, Package, Heart, Brain, Zap, Leaf, Activity, ChevronRight, Phone, CheckCircle2 } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { api } from '@/lib/api';

const CATEGORIES = [
  { icon: Heart, label: 'Heart & Cardiac', color: 'text-rose-500', bg: 'bg-rose-50 dark:bg-rose-900/20', q: 'cardiac' },
  { icon: Activity, label: 'Diabetes & Sugar', color: 'text-amber-500', bg: 'bg-amber-50 dark:bg-amber-900/20', q: 'diabetes' },
  { icon: Brain, label: 'Thyroid Tests', color: 'text-purple-500', bg: 'bg-purple-50 dark:bg-purple-900/20', q: 'thyroid' },
  { icon: Leaf, label: 'Liver Function', color: 'text-green-500', bg: 'bg-green-50 dark:bg-green-900/20', q: 'liver' },
  { icon: Zap, label: 'Kidney Function', color: 'text-blue-500', bg: 'bg-blue-50 dark:bg-blue-900/20', q: 'kidney' },
  { icon: Microscope, label: 'Complete Blood', color: 'text-forest-600', bg: 'bg-forest-50 dark:bg-forest-900/40', q: 'CBC' },
  { icon: Package, label: 'Vitamin Tests', color: 'text-gold-500', bg: 'bg-gold-50 dark:bg-gold-900/20', q: 'vitamin' },
  { icon: Shield, label: 'Full Body Check', color: 'text-indigo-500', bg: 'bg-indigo-50 dark:bg-indigo-900/20', q: 'full body' },
];

const STATS = [
  { value: '663K+', label: 'Patients Served' },
  { value: '490+', label: 'Partner Labs' },
  { value: '1875+', label: 'Tests Available' },
  { value: '25+', label: 'Years Excellence' },
];

const STEPS = [
  { n: '01', title: 'Search & Book', desc: 'Find your test, choose home collection or lab visit, pick a slot', icon: Microscope },
  { n: '02', title: 'Sample Collection', desc: 'Our certified phlebotomist collects sample at your doorstep', icon: Home },
  { n: '03', title: 'AI-Powered Report', desc: 'Get digital report with plain-language AI summary in 24hrs', icon: Brain },
];

async function getPopularTests() {
  try {
    const res = await api.tests.list('', 8);
    return res.data || [];
  } catch { return []; }
}

async function getPackages() {
  try {
    const res = await api.packages.list('', 6);
    return res.data || [];
  } catch { return []; }
}

export default async function HomePage() {
  const [tests, packages] = await Promise.all([getPopularTests(), getPackages()]);

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-forest-950 via-forest-900 to-forest-800 pt-16">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gold-400/5 rounded-full blur-3xl animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-forest-700/30 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay:'1.5s'}} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-forest-800/20 to-transparent rounded-full" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(#F4B942 1px, transparent 1px), linear-gradient(90deg, #F4B942 1px, transparent 1px)', backgroundSize:'60px 60px'}} />
        </div>

        {/* Floating 3D lotus */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block animate-float">
          <svg viewBox="0 0 280 280" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-64 h-64 opacity-20">
            <circle cx="140" cy="140" r="120" stroke="#F4B942" strokeWidth="1" strokeDasharray="4 8"/>
            <circle cx="140" cy="140" r="80" stroke="#F4B942" strokeWidth="0.5" strokeDasharray="2 6"/>
            <path d="M140 60C140 60 110 90 110 120C110 136.569 123.431 150 140 150C156.569 150 170 136.569 170 120C170 90 140 60 140 60Z" stroke="#F4B942" strokeWidth="2" fill="none"/>
            <path d="M80 100C80 100 60 120 65 145C68.5 162 83 170 97 166C111 162 115 148 108 135C101 122 80 100 80 100Z" stroke="#F4B942" strokeWidth="2" fill="none"/>
            <path d="M200 100C200 100 220 120 215 145C211.5 162 197 170 183 166C169 162 165 148 172 135C179 122 200 100 200 100Z" stroke="#F4B942" strokeWidth="2" fill="none"/>
            <path d="M60 145C60 145 50 170 60 190C67 204 82 208 93 202C104 196 104 182 96 173C88 164 60 145 60 145Z" stroke="#F4B942" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <path d="M220 145C220 145 230 170 220 190C213 204 198 208 187 202C176 196 176 182 184 173C192 164 220 145 220 145Z" stroke="#F4B942" strokeWidth="1.5" fill="none" opacity="0.6"/>
            <line x1="140" y1="150" x2="140" y2="220" stroke="#F4B942" strokeWidth="2"/>
            <path d="M115 205C115 205 140 220 165 205" stroke="#F4B942" strokeWidth="1.5" fill="none"/>
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gold-400/10 border border-gold-400/30 rounded-full px-4 py-1.5 mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
              <span className="font-body text-xs font-500 text-gold-400 tracking-wide">NABL Accredited · ISO 15189:2012 Certified</span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-800 text-white leading-[1.1] mb-6 animate-fade-up">
              Your Health,
              <br />
              <span className="text-gold-400">Understood</span>
              <br />
              <span className="text-cream-100/80 text-3xl sm:text-4xl lg:text-5xl">at Home</span>
            </h1>

            <p className="font-body text-cream-100/70 text-base sm:text-lg leading-relaxed mb-8 animate-fade-up anim-delay-1">
              NABL-certified lab tests delivered to your doorstep. AI-powered plain-language reports. 663,000+ patients trust NHCare across Delhi-NCR.
            </p>

            {/* Search */}
            <div className="mb-6 animate-fade-up anim-delay-2">
              <SearchBar large />
            </div>

            {/* Popular searches */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-up anim-delay-3">
              <span className="font-body text-xs text-cream-100/40">Popular:</span>
              {['CBC', 'HbA1c', 'Thyroid (TSH)', 'Vitamin D', 'Lipid Profile'].map(t => (
                <Link key={t} href={`/tests?q=${t}`}
                  className="font-body text-xs text-cream-100/60 hover:text-gold-400 bg-white/5 hover:bg-gold-400/10 border border-white/10 hover:border-gold-400/30 px-3 py-1 rounded-full transition-all">
                  {t}
                </Link>
              ))}
            </div>

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 animate-fade-up anim-delay-3">
              <Link href="/tests" className="btn-gold text-forest-950 font-body font-700 px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base">
                Book a Test <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="tel:+917042191854"
                className="border border-white/20 text-cream-100 font-body font-500 px-7 py-3.5 rounded-xl flex items-center justify-center gap-2 text-base hover:bg-white/5 transition-colors">
                <Phone className="w-4 h-4" /> Call Now
              </a>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-forest-950/80 backdrop-blur-sm border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-display text-xl font-700 text-gold-400">{s.value}</p>
                  <p className="font-body text-xs text-cream-100/50">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="py-16 bg-cream-50 dark:bg-forest-950">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="font-body text-xs font-600 text-gold-500 uppercase tracking-widest mb-1">Browse By Category</p>
              <h2 className="font-display text-2xl sm:text-3xl font-700 text-forest-900 dark:text-cream-100">Find Tests by Health Concern</h2>
            </div>
            <Link href="/tests" className="hidden sm:flex items-center gap-1 text-sm font-body font-500 text-forest-600 dark:text-forest-400 hover:text-gold-500 transition-colors">
              All Tests <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATEGORIES.map(c => (
              <Link key={c.q} href={`/tests?q=${c.q}`}
                className="card-3d group flex flex-col items-center gap-2.5 p-4 bg-white dark:bg-forest-900/40 rounded-2xl border border-forest-100/60 dark:border-forest-800/60 hover:border-gold-400/40 transition-all text-center">
                <div className={`w-11 h-11 ${c.bg} rounded-xl flex items-center justify-center`}>
                  <c.icon className={`w-5 h-5 ${c.color}`} />
                </div>
                <span className="font-body text-xs font-500 text-forest-800 dark:text-cream-200 leading-tight">{c.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* POPULAR TESTS */}
      {tests.length > 0 && (
        <section className="py-16 bg-white dark:bg-forest-900/20">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-xs font-600 text-gold-500 uppercase tracking-widest mb-1">Most Booked</p>
                <h2 className="font-display text-2xl sm:text-3xl font-700 text-forest-900 dark:text-cream-100">Popular Tests</h2>
              </div>
              <Link href="/tests" className="flex items-center gap-1 text-sm font-body font-500 text-forest-600 dark:text-forest-400 hover:text-gold-500 transition-colors">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tests.slice(0, 8).map((t: any) => {
                const name = t.test_parameter?.split('\n')[0]?.trim() || t.description?.split('\n')[0]?.trim() || 'Test';
                return (
                  <div key={t.id} className="card-3d glass-card rounded-2xl p-5 group">
                    <span className={`inline-block text-[10px] font-body font-600 px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide ${t.type === 'PROFILE' ? 'bg-gold-50 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400' : 'bg-forest-50 text-forest-700 dark:bg-forest-900/50 dark:text-forest-300'}`}>
                      {t.type === 'PROFILE' ? 'Panel' : 'Test'}
                    </span>
                    <h3 className="font-body font-600 text-sm text-forest-900 dark:text-cream-100 line-clamp-2 mb-2">{name}</h3>
                    <div className="flex items-center justify-between mt-3">
                      <p className="font-display font-700 text-lg text-forest-900 dark:text-gold-400">₹{t.mrp}</p>
                      <Link href={`/tests/${t.id}`} className="text-xs font-body font-500 text-forest-600 dark:text-forest-400 hover:text-gold-500 flex items-center gap-0.5">
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

      {/* PACKAGES */}
      {packages.length > 0 && (
        <section className="py-16 bg-cream-50 dark:bg-forest-950">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="font-body text-xs font-600 text-gold-500 uppercase tracking-widest mb-1">Preventive Care</p>
                <h2 className="font-display text-2xl sm:text-3xl font-700 text-forest-900 dark:text-cream-100">Health Packages</h2>
              </div>
              <Link href="/packages" className="flex items-center gap-1 text-sm font-body font-500 text-forest-600 dark:text-forest-400 hover:text-gold-500 transition-colors">
                All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.slice(0, 6).map((p: any) => {
                const name = p.test_parameter?.split('\n')[0]?.trim() || 'Health Package';
                return (
                  <div key={p.id} className="card-3d bg-white dark:bg-forest-900/40 rounded-2xl border border-forest-100 dark:border-forest-800 overflow-hidden group">
                    <div className="h-1.5 bg-gradient-to-r from-forest-600 to-gold-400" />
                    <div className="p-5">
                      <span className="inline-block text-[10px] font-body font-600 px-2 py-0.5 rounded-full bg-gold-50 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400 uppercase tracking-wide mb-2">Package</span>
                      <h3 className="font-body font-600 text-sm text-forest-900 dark:text-cream-100 line-clamp-2 mb-1">{name}</h3>
                      {p.description && (
                        <p className="font-body text-xs text-forest-500 dark:text-forest-400 line-clamp-2 mb-3">{p.description.replace(/\[X\]/g,'').trim()}</p>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-forest-50 dark:border-forest-800">
                        <p className="font-display font-700 text-xl text-forest-900 dark:text-gold-400">₹{p.mrp}</p>
                        <Link href={`/packages/${p.id}`} className="btn-gold text-forest-950 font-body font-600 text-xs px-4 py-2 rounded-xl flex items-center gap-1">
                          Book <ArrowRight className="w-3 h-3" />
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

      {/* HOW IT WORKS */}
      <section className="py-16 bg-gradient-to-br from-forest-900 to-forest-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{backgroundImage:'linear-gradient(#F4B942 1px, transparent 1px), linear-gradient(90deg, #F4B942 1px, transparent 1px)', backgroundSize:'40px 40px'}} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-600 text-gold-400 uppercase tracking-widest mb-2">Simple Process</p>
            <h2 className="font-display text-2xl sm:text-3xl font-700 text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((s, i) => (
              <div key={i} className="relative">
                {i < 2 && <div className="hidden md:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-gold-400/40 to-transparent z-10" />}
                <div className="glass-card rounded-2xl p-6 text-center">
                  <div className="w-14 h-14 bg-gold-400/10 border border-gold-400/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <s.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  <span className="font-display text-3xl font-800 text-gold-400/20">{s.n}</span>
                  <h3 className="font-display text-lg font-700 text-white mt-1 mb-2">{s.title}</h3>
                  <p className="font-body text-sm text-cream-100/60 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY NHCARE */}
      <section className="py-16 bg-white dark:bg-forest-900/20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="font-body text-xs font-600 text-gold-500 uppercase tracking-widest mb-2">Why Choose Us</p>
              <h2 className="font-display text-3xl sm:text-4xl font-700 text-forest-900 dark:text-cream-100 mb-6">Diagnostic Excellence for 25+ Years</h2>
              <p className="font-body text-forest-600 dark:text-forest-300 text-base leading-relaxed mb-8">Niramaya Healthcare has been Delhi-NCR&apos;s trusted pathology partner since 1999. Now NHCare brings the same NABL-accredited excellence to your smartphone — with AI-powered insights.</p>
              <ul className="space-y-4">
                {[
                  ['NABL Accredited Lab', 'MC-2140 — highest quality pathology standards'],
                  ['Home Sample Collection', 'Certified phlebotomists at your doorstep, 7am-9pm'],
                  ['AI-Powered Reports', 'Plain language explanations by GPT-4o'],
                  ['24-Hour Turnaround', 'Most reports ready within one business day'],
                  ['490+ Partner Labs', 'Coverage across entire Delhi-NCR'],
                ].map(([title, desc]) => (
                  <li key={title} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-body font-600 text-sm text-forest-900 dark:text-cream-100">{title}</p>
                      <p className="font-body text-xs text-forest-500 dark:text-forest-400">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: '663K+', label: 'Happy Patients', col: 'from-forest-600 to-forest-800' },
                { val: '24hr', label: 'Report Delivery', col: 'from-gold-400 to-gold-600' },
                { val: '490+', label: 'Partner Labs', col: 'from-forest-700 to-forest-900' },
                { val: '99.2%', label: 'Accuracy Rate', col: 'from-gold-500 to-amber-600' },
              ].map(s => (
                <div key={s.label} className={`card-3d bg-gradient-to-br ${s.col} rounded-2xl p-6 text-center`}>
                  <p className="font-display text-3xl font-800 text-white mb-1">{s.val}</p>
                  <p className="font-body text-xs text-white/70">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOME COLLECTION CTA */}
      <section className="py-16 bg-gradient-to-r from-gold-400 via-amber-400 to-gold-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage:'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 20%, white 0%, transparent 40%)'}} />
        <div className="relative max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Home className="w-5 h-5 text-forest-900" />
              <span className="font-body text-sm font-600 text-forest-900 uppercase tracking-wider">Home Collection Available</span>
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-800 text-forest-950 mb-2">Sample Collected at Your Door</h2>
            <p className="font-body text-forest-800/80 text-sm">Enter your pincode to check availability · 7AM–9PM · Certified Phlebotomists</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Link href="/home-collection" className="btn-forest text-white font-body font-700 px-7 py-3.5 rounded-xl flex items-center gap-2">
              Book Home Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/centers" className="bg-white text-forest-900 font-body font-600 px-7 py-3.5 rounded-xl flex items-center gap-2 hover:bg-forest-50 transition-colors">
              <Star className="w-4 h-4" /> Our Centers
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
