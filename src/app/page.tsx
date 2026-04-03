import Link from 'next/link';
import { ArrowRight, Home, Star, Shield, Clock, Microscope, Package, Heart, Brain, Zap, Leaf, Activity, CheckCircle2, ChevronRight, FlaskConical } from 'lucide-react';
import SearchBar from '@/components/SearchBar';
import { api } from '@/lib/api';

const CATS = [
  { icon: Heart,      label: 'Heart & Cardiac', q: 'cardiac',   ic: '#ef4444', bg: '#fef2f2', dbg: 'rgba(239,68,68,0.12)' },
  { icon: Activity,   label: 'Diabetes',         q: 'diabetes',  ic: '#f59e0b', bg: '#fffbeb', dbg: 'rgba(245,158,11,0.12)' },
  { icon: Brain,      label: 'Thyroid',           q: 'thyroid',   ic: '#8b5cf6', bg: '#f5f3ff', dbg: 'rgba(139,92,246,0.12)' },
  { icon: Leaf,       label: 'Liver',             q: 'liver',     ic: '#10b981', bg: '#ecfdf5', dbg: 'rgba(16,185,129,0.12)' },
  { icon: Zap,        label: 'Kidney',            q: 'kidney',    ic: '#3b82f6', bg: '#eff6ff', dbg: 'rgba(59,130,246,0.12)' },
  { icon: Microscope, label: 'Blood CBC',         q: 'CBC',       ic: '#1B4D3E', bg: '#f0f7f4', dbg: 'rgba(27,77,62,0.15)' },
  { icon: Package,    label: 'Vitamins',          q: 'vitamin',   ic: '#F4B942', bg: '#fef9ee', dbg: 'rgba(244,185,66,0.12)' },
  { icon: Shield,     label: 'Full Body',         q: 'full body', ic: '#6366f1', bg: '#eef2ff', dbg: 'rgba(99,102,241,0.12)' },
];

const STEPS = [
  { n:'01', title:'Search & Book',       desc:'Find tests by name, symptom or condition. Book in under 2 minutes online.', icon: Microscope },
  { n:'02', title:'Home Collection',     desc:'Our certified phlebotomist arrives at your door, 7AM to 9PM daily.', icon: Home },
  { n:'03', title:'AI Report Ready',     desc:'Get digital reports with plain-language AI summary in 24 hours.', icon: Brain },
];

const TRUST = [
  { val:'663K+', label:'Patients Served',   sub:'Since 1999',     col:'#1B4D3E', textCol:'#fff', subCol:'rgba(255,255,255,0.6)' },
  { val:'490+',  label:'Partner Labs',      sub:'Delhi-NCR',      col:'#F4B942', textCol:'#0f172a', subCol:'rgba(15,23,42,0.6)' },
  { val:'1875+', label:'Tests Available',   sub:'All categories', col:null,       textCol:null,     subCol:null },
  { val:'24hr',  label:'Report Delivery',   sub:'Most tests',     col:null,       textCol:null,     subCol:null },
];

const WHY = [
  { icon: Shield,      title:'NABL Accredited',      desc:'MC-2140 — highest standard in diagnostic quality' },
  { icon: Home,        title:'Free Home Collection',  desc:'Certified phlebotomists, 7AM–9PM, no extra charge' },
  { icon: Brain,       title:'AI-Powered Reports',    desc:'GPT-4o explains your results in plain language' },
  { icon: Clock,       title:'24-Hour Turnaround',    desc:'Most reports ready within one business day' },
  { icon: FlaskConical,title:'NABL-Grade Accuracy',   desc:'99.2% accuracy across 1,875+ test parameters' },
  { icon: Star,        title:'25+ Years Trust',       desc:'Delhi-NCR\'s trusted pathology partner since 1999' },
];

async function getData() {
  const [t, p] = await Promise.all([
    api.tests.list('',8).catch(()=>({data:[]})),
    api.packages.list('',6).catch(()=>({data:[]})),
  ]);
  return { tests: t.data||[], packages: p.data||[] };
}

export default async function Page() {
  const { tests, packages } = await getData();

  return (
    <div className="min-h-screen" style={{background:'var(--bg)'}}>

      {/* ── HERO ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-10 pb-20" style={{background:'var(--bg)'}}>
        {/* Ambient glows — dark mode only */}
        <div className="dark:block hidden absolute top-[-100px] left-[-100px] w-[500px] h-[500px] pointer-events-none"
          style={{background:'radial-gradient(circle,rgba(27,77,62,0.18) 0%,transparent 70%)',borderRadius:'50%'}} />
        <div className="dark:block hidden absolute top-20 right-[-80px] w-[320px] h-[320px] pointer-events-none"
          style={{background:'radial-gradient(circle,rgba(244,185,66,0.07) 0%,transparent 70%)',borderRadius:'50%'}} />
        {/* Light mode — subtle green tint top-right */}
        <div className="dark:hidden absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
          style={{background:'radial-gradient(ellipse at top right,rgba(27,77,62,0.05) 0%,transparent 60%)'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            {/* Left */}
            <div>
              {/* NABL pill */}
              <div className="inline-flex items-center gap-2 mb-6 badge badge-green">
                <span className="w-1.5 h-1.5 rounded-full bg-green-800 dark:bg-green-400 animate-pulse" />
                NABL Accredited · ISO 15189:2012 Certified
              </div>

              <h1 className="font-display font-700 leading-[1.12] mb-5 text-[42px] sm:text-[52px]"
                style={{color:'var(--text-1)'}}>
                Diagnostic Tests<br />
                <span className="grad-text">at Your Doorstep</span>
              </h1>

              <p className="mb-7 text-[15px] max-w-lg" style={{color:'var(--text-3)',lineHeight:'1.75'}}>
                NABL-certified lab tests with home sample collection. AI-powered plain-language reports delivered in 24 hours. Trusted by 663,000+ patients across Delhi-NCR.
              </p>

              {/* Search */}
              <div className="mb-5 max-w-xl">
                <SearchBar large />
              </div>

              {/* Popular tags */}
              <div className="flex flex-wrap items-center gap-2 mb-8">
                <span className="text-[11px] font-body" style={{color:'var(--text-4)'}}>Popular:</span>
                {['CBC','HbA1c','Thyroid TSH','Vitamin D','Lipid Profile'].map(t => (
                  <Link key={t} href={`/tests?q=${t}`}
                    className="popular-tag text-[12px] font-body font-500 px-3 py-1 rounded-full transition-all"
                  >{t}</Link>
                ))}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href="/tests" className="btn btn-green text-[14px] px-7 py-3">
                  Browse All Tests <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/home-collection" className="btn btn-ghost text-[14px] px-6 py-3">
                  <Home className="w-4 h-4" /> Home Collection
                </Link>
              </div>
            </div>

            {/* Right — stat cards */}
            <div className="hidden lg:grid grid-cols-2 gap-3">
              {TRUST.map((s, i) => (
                <div key={s.label} className="lift rounded-[14px] p-6"
                  style={{
                    background: s.col ? s.col : 'var(--surface)',
                    border: s.col ? 'none' : '1px solid var(--border)',
                    boxShadow: s.col ? '0 4px 20px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
                    backdropFilter: !s.col ? 'blur(20px)' : undefined,
                  }}>
                  <p className="font-display font-700 text-[34px] leading-none mb-1.5"
                    style={{color: s.textCol ?? 'var(--text-1)'}}>
                    {s.val}
                  </p>
                  <p className="font-body font-600 text-[14px] mb-0.5"
                    style={{color: s.textCol ?? 'var(--text-2)'}}>
                    {s.label}
                  </p>
                  <p className="font-body text-[12px]"
                    style={{color: s.subCol ?? 'var(--text-4)'}}>
                    {s.sub}
                  </p>
                </div>
              ))}
              {/* Feature chips */}
              <div className="col-span-2 flex flex-wrap gap-2 mt-1">
                {['Home Collection','Certified Phlebotomists','Reports in 24hrs','AI Health Insights'].map(f => (
                  <span key={f} className="badge badge-green text-[11px]">
                    <CheckCircle2 className="w-3 h-3" /> {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────────── */}
      <section className="py-14" style={{background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="label mb-1.5">Browse by Health Concern</p>
              <h2 className="font-display text-[26px] font-700" style={{color:'var(--text-1)'}}>Find the Right Test</h2>
            </div>
            <Link href="/tests" className="hidden sm:flex items-center gap-1 text-[13px] font-body font-500 transition-colors"
              style={{color:'var(--text-3)'}}>
              All Tests <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {CATS.map(c => (
              <Link key={c.q} href={`/tests?q=${c.q}`}
                className="card lift flex flex-col items-center gap-2.5 p-4 text-center group cursor-pointer">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center transition-all"
                  style={{background: c.bg}}>
                  {/* Dark mode override */}
                  <c.icon className="w-5 h-5 dark:opacity-90" style={{color: c.ic}} />
                </div>
                <span className="font-body text-[12px] font-500 leading-tight" style={{color:'var(--text-2)'}}>
                  {c.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── POPULAR TESTS ──────────────────────────────── */}
      {tests.length > 0 && (
        <section className="py-14" style={{background:'var(--bg)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label mb-1.5">Most Booked</p>
                <h2 className="font-display text-[26px] font-700" style={{color:'var(--text-1)'}}>Popular Tests</h2>
              </div>
              <Link href="/tests" className="flex items-center gap-1 text-[13px] font-body font-500" style={{color:'var(--text-3)'}}>
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {tests.slice(0,8).map((t:any) => {
                const name = t.test_parameter?.split('\n')[0]?.trim() || 'Test';
                const isP = t.type==='PROFILE';
                return (
                  <div key={t.id} className="card lift p-5 flex flex-col">
                    <span className={`badge ${isP ? 'badge-gold' : 'badge-green'} self-start mb-3`}>
                      {isP ? 'Panel' : 'Test'}
                    </span>
                    <h3 className="font-body font-600 text-[13px] line-clamp-2 mb-auto leading-snug" style={{color:'var(--text-1)'}}>
                      {name}
                    </h3>
                    <div className="flex items-center justify-between mt-4 pt-4" style={{borderTop:'1px solid var(--border)'}}>
                      <span className="font-display font-700 text-[20px]" style={{color:'var(--text-1)'}}>₹{t.mrp}</span>
                      <Link href={`/tests/${t.id}`}
                        className="text-[12px] font-body font-600 flex items-center gap-1 transition-colors"
                        style={{color:'#1B4D3E'}}>
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

      {/* ── PACKAGES ───────────────────────────────────── */}
      {packages.length > 0 && (
        <section className="py-14" style={{background:'var(--bg-2)'}}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="label mb-1.5">Preventive Care</p>
                <h2 className="font-display text-[26px] font-700" style={{color:'var(--text-1)'}}>Health Packages</h2>
              </div>
              <Link href="/packages" className="flex items-center gap-1 text-[13px] font-body font-500" style={{color:'var(--text-3)'}}>
                All Packages <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {packages.slice(0,6).map((p:any) => {
                const name = p.test_parameter?.split('\n')[0]?.trim() || 'Health Package';
                const items = p.description?.replace(/\[X\]/g,'')?.split('\n')?.filter(Boolean).slice(0,4) || [];
                return (
                  <div key={p.id} className="card lift overflow-hidden flex flex-col">
                    <div className="h-[3px]" style={{background:'linear-gradient(90deg,#1B4D3E,#F4B942)'}} />
                    <div className="p-5 flex flex-col flex-1">
                      <span className="badge badge-gold self-start mb-3">Health Package</span>
                      <h3 className="font-body font-600 text-[14px] leading-snug mb-3" style={{color:'var(--text-1)'}}>{name}</h3>
                      {items.length > 0 && (
                        <ul className="space-y-1.5 mb-4 flex-1">
                          {items.map((item:string,i:number) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{color:'#1B4D3E'}} />
                              <span className="text-[12px] font-body leading-tight" style={{color:'var(--text-3)'}}>{item.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-4 mt-auto" style={{borderTop:'1px solid var(--border)'}}>
                        <span className="font-display font-700 text-[22px]" style={{color:'var(--text-1)'}}>₹{p.mrp}</span>
                        <Link href={`/tests/${p.id}`} className="btn btn-green text-[12px] py-2 px-4">
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

      {/* ── HOW IT WORKS ───────────────────────────────── */}
      <section className="py-16 relative overflow-hidden" style={{background:'#0D2B1E'}}>
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
          style={{background:'radial-gradient(ellipse,rgba(244,185,66,0.06) 0%,transparent 70%)'}} />
        {/* Subtle grid */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'48px 48px'}} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <p className="text-[11px] font-700 uppercase tracking-[0.12em] font-body mb-2" style={{color:'#F4B942'}}>Simple Process</p>
            <h2 className="font-display text-[28px] font-700 text-white">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STEPS.map((s,i) => (
              <div key={i} className="relative p-7 rounded-[16px] text-center"
                style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.08)',backdropFilter:'blur(20px)'}}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-4"
                  style={{background:'rgba(244,185,66,0.12)',border:'1px solid rgba(244,185,66,0.25)'}}>
                  <s.icon className="w-5 h-5" style={{color:'#F4B942'}} />
                </div>
                <div className="w-6 h-6 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{background:'#F4B942'}}>
                  <span className="text-[11px] font-700 font-body text-ink-900">{i+1}</span>
                </div>
                <h3 className="font-display text-[18px] font-700 text-white mb-2">{s.title}</h3>
                <p className="text-[13px] font-body leading-relaxed" style={{color:'rgba(255,255,255,0.55)'}}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY NHCARE ─────────────────────────────────── */}
      <section className="py-16" style={{background:'var(--bg)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-14 items-start">
            <div>
              <p className="label mb-2">Why Choose Us</p>
              <h2 className="font-display text-[32px] font-700 mb-5 leading-tight" style={{color:'var(--text-1)'}}>
                25+ Years of<br />Diagnostic Excellence
              </h2>
              <p className="text-[15px] mb-8 max-w-md" style={{color:'var(--text-3)',lineHeight:'1.75'}}>
                Niramaya Healthcare has been Delhi-NCR&apos;s trusted pathology partner since 1999.
                NHCare brings the same NABL-accredited excellence to your smartphone with AI-powered insights.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {WHY.map(w => (
                  <div key={w.title} className="flex items-start gap-3 p-4 rounded-xl"
                    style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{background:'var(--green-bg)'}}>
                      <w.icon className="w-4 h-4" style={{color:'#1B4D3E'}} />
                    </div>
                    <div>
                      <p className="font-body font-600 text-[13px] mb-0.5" style={{color:'var(--text-1)'}}>{w.title}</p>
                      <p className="text-[12px]" style={{color:'var(--text-3)'}}>{w.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* AI Card */}
              <div className="p-6 rounded-[14px]" style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderLeft:'4px solid #1B4D3E'}}>
                <div className="flex items-center gap-2.5 mb-3">
                  <FlaskConical className="w-5 h-5" style={{color:'#1B4D3E'}} />
                  <h3 className="font-display text-[18px] font-700" style={{color:'var(--text-1)'}}>AI Lab Report Analysis</h3>
                </div>
                <p className="text-[13px] leading-relaxed mb-3" style={{color:'var(--text-3)'}}>
                  Our AI reads your lab results and explains them in simple language — no medical degree needed. Know what&apos;s high, low, and what it means for you.
                </p>
                <Link href="/dashboard/reports"
                  className="inline-flex items-center gap-1 text-[12px] font-body font-600 transition-colors"
                  style={{color:'#1B4D3E'}}>
                  View Sample Report <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Home Collection Card */}
              <div className="p-6 rounded-[14px]" style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderLeft:'4px solid #F4B942'}}>
                <div className="flex items-center gap-2.5 mb-3">
                  <Home className="w-5 h-5" style={{color:'#d4971a'}} />
                  <h3 className="font-display text-[18px] font-700" style={{color:'var(--text-1)'}}>Free Home Collection</h3>
                </div>
                <p className="text-[13px] leading-relaxed mb-3" style={{color:'var(--text-3)'}}>
                  Enter your pincode to check same-day availability. Our phlebotomist brings all sterile equipment — completely free.
                </p>
                <Link href="/home-collection"
                  className="inline-flex items-center gap-1 text-[12px] font-body font-600"
                  style={{color:'#d4971a'}}>
                  Check Your Pincode <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Mini stats */}
              <div className="grid grid-cols-2 gap-3">
                {[{v:'99.2%',l:'Accuracy Rate'},{v:'Free',l:'Home Visit'}].map(s => (
                  <div key={s.l} className="p-4 rounded-xl text-center"
                    style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                    <p className="font-display font-700 text-[26px] mb-0.5" style={{color:'var(--text-1)'}}>{s.v}</p>
                    <p className="text-[12px] font-body" style={{color:'var(--text-3)'}}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ── SPECIAL OFFERS SECTION ─────────────────────── */}
      <section className="py-16" style={{background:'var(--bg-2)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="label mb-1.5">Limited Time</p>
              <h2 className="font-display font-700 leading-tight" style={{fontSize:'32px',color:'var(--text-1)'}}>
                Family Health Packages
              </h2>
              <p className="text-[14px] font-body mt-2" style={{color:'var(--text-3)'}}>
                9 packages · Up to 81% off · Free home collection
              </p>
            </div>
            <Link href="/special-offers" className="hidden sm:flex items-center gap-1.5 text-[13px] font-body font-600 transition-colors" style={{color:'#1B4D3E'}}>
              All 9 Packages <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Featured packages row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {[
              {emoji:'💑',name:'Couple Package',tests:224,price:4499,market:24000,slug:'couple-health-package',color:'#F4B942',badge:'🔥 NEW'},
              {emoji:'💪',name:'Male Health',tests:112,price:2999,market:12000,slug:'male-health-package',color:'#1B4D3E',badge:'PREMIUM'},
              {emoji:'🌸',name:'Female Health',tests:112,price:2999,market:12000,slug:'female-health-package',color:'#ec4899',badge:'PREMIUM'},
              {emoji:'👨‍👩‍👧‍👦',name:'Family Bundle',tests:500,price:9999,market:45000,slug:'family-bundle',color:'#1B4D3E',badge:'BEST DEAL'},
            ].map(p=>(
              <Link key={p.slug} href={`/special-offers/${p.slug}`}
                className="card lift overflow-hidden block" style={{textDecoration:'none'}}>
                <div style={{height:'3px',background:p.color}} />
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <span style={{fontSize:'11px',fontWeight:700,padding:'3px 10px',borderRadius:'100px',background:`${p.color}18`,color:p.color,border:`1px solid ${p.color}30`,fontFamily:'Inter,sans-serif'}}>{p.badge}</span>
                    <span style={{fontSize:'32px',lineHeight:1}} className="float-2">{p.emoji}</span>
                  </div>
                  <h3 className="font-body font-700 text-[14px] mb-1" style={{color:'var(--text-1)'}}>{p.name}</h3>
                  <p className="text-[11px] font-body mb-3" style={{color:'var(--text-4)'}}>{p.tests} tests covered</p>
                  <div className="flex items-center justify-between pt-3" style={{borderTop:'1px solid var(--border)'}}>
                    <div>
                      <p className="text-[11px] font-body line-through" style={{color:'var(--text-4)'}}>₹{p.market.toLocaleString()}</p>
                      <p className="font-display font-700 text-[22px]" style={{color:'var(--text-1)'}}>₹{p.price.toLocaleString()}</p>
                    </div>
                    <span style={{fontSize:'11px',fontWeight:700,background:'#dc2626',color:'white',padding:'2px 8px',borderRadius:'100px',fontFamily:'Inter,sans-serif'}}>{Math.round(((p.market-p.price)/p.market)*100)}% OFF</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Offer banner */}
          <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8"
            style={{background:'linear-gradient(135deg,#0D2B1E,#1B4D3E)'}}>
            <div style={{position:'absolute',top:'-40px',right:'-40px',width:'200px',height:'200px',background:'radial-gradient(circle,rgba(244,185,66,0.12) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
            {['💊','🩺','🔬','💉'].map((e,i)=>(
              <div key={i} className={`float-${(i%3)+1}`} style={{position:'absolute',fontSize:'20px',opacity:0.07,top:`${20+i*20}%`,left:`${i%2===0?2+i*3:82+i}%`,pointerEvents:'none'}}>{e}</div>
            ))}
            <div className="relative flex flex-col sm:flex-row items-center justify-between gap-5">
              <div>
                <p className="font-body font-700 text-[11px] uppercase tracking-widest mb-1" style={{color:'rgba(244,185,66,0.8)'}}>सर्वे सन्तु निरामयः · May all be free from illness</p>
                <h3 className="font-display font-700 text-white mb-1" style={{fontSize:'24px'}}>9 Family Packages — Up to 81% Off</h3>
                <p className="text-[13px] font-body" style={{color:'rgba(255,255,255,0.55)'}}>
                  Basic · Complete · Male · Female · <strong style={{color:'#F4B942'}}>Couple (NEW!)</strong> · Teen Boys · Teen Girls · Kids · Family Bundle
                </p>
              </div>
              <Link href="/special-offers" className="btn flex-shrink-0"
                style={{background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'14px',padding:'12px 28px',borderRadius:'10px',textDecoration:'none',whiteSpace:'nowrap',display:'inline-flex',alignItems:'center',gap:'8px'}}>
                View All Packages <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT US SECTION ───────────────────────────── */}
      <section className="py-16" style={{background:'var(--bg)'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left — story */}
            <div>
              <p className="label mb-2">Our Story</p>
              <h2 className="font-display font-700 leading-tight mb-4" style={{fontSize:'32px',color:'var(--text-1)'}}>
                9 Years of Diagnostic<br />Excellence
              </h2>
              <p className="text-[15px] font-body leading-relaxed mb-5" style={{color:'var(--text-3)'}}>
                NirAmaya Pathlabs — the diagnostic backbone of NHCare — was founded on one belief: every Indian family deserves access to world-class pathology services at honest prices. With our Sanskrit philosophy of <em style={{color:'#1B4D3E',fontStyle:'normal',fontWeight:600}}>सर्वे सन्तु निरामयः</em> (May all be free from illness), we have grown to serve 663,000+ patients across 15 states.
              </p>

              {/* Accreditation badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  {icon:'🏅',label:'NABL Accredited',sub:'MC-2140'},
                  {icon:'🧬',label:'ICMR Approved',sub:'Molecular'},
                  {icon:'⭐',label:'ISO 15189:2012',sub:'Certified'},
                  {icon:'🔬',label:'7 Departments',sub:'All Certified'},
                ].map(b=>(
                  <div key={b.label} className="flex items-center gap-2 px-3 py-2 rounded-xl"
                    style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                    <span style={{fontSize:'18px'}}>{b.icon}</span>
                    <div>
                      <p className="text-[12px] font-body font-700" style={{color:'var(--text-1)'}}>{b.label}</p>
                      <p className="text-[10px] font-body" style={{color:'var(--text-4)'}}>{b.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6">
                {[
                  {val:'663K+',label:'Patients Served'},
                  {val:'500+',label:'Corporate Clients'},
                  {val:'1000+',label:'Pincodes Covered'},
                  {val:'15',label:'States'},
                  {val:'200+',label:'Cities'},
                  {val:'9+',label:'Years Excellence'},
                ].map(s=>(
                  <div key={s.label} className="p-3 rounded-xl text-center"
                    style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                    <p className="font-display font-700 text-[20px]" style={{color:'#1B4D3E'}}>{s.val}</p>
                    <p className="text-[11px] font-body" style={{color:'var(--text-3)'}}>{s.label}</p>
                  </div>
                ))}
              </div>

              <Link href="/about" className="btn btn-green text-[14px] px-6 py-3">
                Our Full Story <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right — visual */}
            <div className="space-y-4">
              {/* Philosophy card */}
              <div className="relative overflow-hidden rounded-2xl p-8 text-center"
                style={{background:'linear-gradient(135deg,#1B4D3E,#0D2B1E)'}}>
                <div style={{position:'absolute',inset:0,opacity:0.04,backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
                <div className="relative">
                  <svg viewBox="0 0 100 80" style={{width:'80px',height:'64px',margin:'0 auto 12px',display:'block'}}>
                    <path d="M50 5C50 5 35 20 35 33C35 41.28 41.72 48 50 48C58.28 48 65 41.28 65 33C65 20 50 5 50 5Z" fill="none" stroke="#F4B942" strokeWidth="2.5" strokeLinecap="round"/>
                    <path d="M24 22C24 22 10 33 16 45C20 53 31 55 38 50C45 45 45 36 38 29C31 22 24 22 24 22Z" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
                    <path d="M76 22C76 22 90 33 84 45C80 53 69 55 62 50C55 45 55 36 62 29C69 22 76 22 76 22Z" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round" opacity="0.65"/>
                    <line x1="50" y1="48" x2="50" y2="72" stroke="#F4B942" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M38 69C38 69 50 74 62 69" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                  <p className="font-display text-[22px] text-white mb-0.5">niramaya · nhcare</p>
                  <p className="font-body text-[14px] mb-3" style={{color:'rgba(244,185,66,0.85)',fontStyle:'italic'}}>सर्वे सन्तु निरामयः</p>
                  <p className="font-body text-[13px]" style={{color:'rgba(255,255,255,0.45)'}}>"May all be free from illness"</p>
                </div>
              </div>

              {/* Client logos strip */}
              <div className="p-5 rounded-2xl" style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                <p className="text-[11px] font-body font-700 uppercase tracking-wider mb-3 text-center" style={{color:'var(--text-4)'}}>Trusted by 500+ clients including</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['TATA 1mg','MediBuddy','Panasonic','Samsung','HCL','Jio','EY','ICICI Lombard','Chaayos','Healthians'].map(c=>(
                    <span key={c} style={{fontSize:'11px',fontWeight:600,padding:'3px 10px',borderRadius:'100px',background:'var(--bg)',border:'1px solid var(--border)',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>{c}</span>
                  ))}
                  <span style={{fontSize:'11px',fontWeight:600,padding:'3px 10px',borderRadius:'100px',background:'var(--green-bg)',border:'1px solid var(--green-bd)',color:'#1B4D3E',fontFamily:'Inter,sans-serif'}}>+490 more</span>
                </div>
              </div>

              {/* Departments */}
              <div className="p-5 rounded-2xl" style={{background:'var(--bg-2)',border:'1px solid var(--border)'}}>
                <p className="text-[11px] font-body font-700 uppercase tracking-wider mb-3" style={{color:'var(--text-4)'}}>7 NABL Certified Departments</p>
                <div className="flex flex-wrap gap-2">
                  {[['🔴','Hematology'],['🛡️','Immunoassay'],['⚗️','Biochemistry'],['🔬','Serology'],['🦠','Microbiology'],['🧬','Molecular'],['🔭','Histopathology']].map(([e,n])=>(
                    <span key={n} style={{fontSize:'12px',fontWeight:500,padding:'4px 10px',borderRadius:'8px',background:'var(--bg)',border:'1px solid var(--border)',color:'var(--text-2)',fontFamily:'Inter,sans-serif',display:'inline-flex',alignItems:'center',gap:'4px'}}>
                      {e} {n}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOME COLLECTION CTA ─────────────────────────── */}
      <section className="py-12" style={{background:'#F4B942'}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-7">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{background:'rgba(15,23,42,0.12)'}}>
              <Home className="w-5 h-5" style={{color:'#0f172a'}} />
            </div>
            <div>
              <p className="font-body text-[11px] font-700 uppercase tracking-wider mb-0.5" style={{color:'rgba(15,23,42,0.6)'}}>
                Home Collection Available
              </p>
              <h2 className="font-display text-[22px] font-700 mb-1" style={{color:'#0f172a'}}>
                Sample Collected at Your Door
              </h2>
              <p className="text-[13px] font-body" style={{color:'rgba(15,23,42,0.65)'}}>
                Enter your pincode to check availability · 7AM–9PM · Certified Phlebotomists
              </p>
            </div>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/home-collection" className="btn btn-green text-[13px] px-7 py-3">
              Book Home Collection <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/centers"
              className="btn text-[13px] px-6 py-3 rounded-lg font-600"
              style={{background:'rgba(255,255,255,0.9)',color:'#0f172a'}}>
              <Star className="w-4 h-4" /> Our Centers
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
