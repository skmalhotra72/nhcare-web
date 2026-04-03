import Link from 'next/link';
import { ArrowRight, CheckCircle2, Home, Phone, Star, ArrowLeft, Zap } from 'lucide-react';
import { PACKAGES_DATA } from '@/lib/packages';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return PACKAGES_DATA.map(p => ({ slug: p.slug }));
}

export default function PackageDetailPage({ params }: { params: { slug: string } }) {
  const pkg = PACKAGES_DATA.find(p => p.slug === params.slug);
  if (!pkg) notFound();

  const disc = Math.round((pkg.savings / pkg.market) * 100);
  const isKids = pkg.gender === 'kids';
  const isCouple = pkg.gender === 'couple';
  const isFemale = pkg.gender === 'female' || pkg.gender === 'female-teen';
  const isMale = pkg.gender === 'male' || pkg.gender === 'male-teen';

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', overflow: 'hidden' }}>

      {/* ── HERO ──────────────────────────────── */}
      <div style={{ background: `linear-gradient(135deg, #070d14 0%, ${pkg.color}22 50%, #070d14 100%)`, padding: '80px 0 96px', position: 'relative', overflow: 'hidden' }}>
        {/* Animated floating emojis */}
        {[pkg.emoji, '✨', '🏥', '💊', '🔬', '⭐'].map((e, i) => (
          <div key={i} className={`float-${(i % 3) + 1}`} style={{ position: 'absolute', fontSize: i === 0 ? '80px' : '28px', opacity: i === 0 ? 0.08 : 0.06, top: `${8 + i * 14}%`, left: i % 2 === 0 ? `${3 + i * 2}%` : `${78 + i}%`, pointerEvents: 'none', userSelect: 'none' }}>{e}</div>
        ))}
        {/* Glow */}
        <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '400px', background: `radial-gradient(ellipse, ${pkg.color}18 0%, transparent 70%)`, pointerEvents: 'none' }} />
        {/* Grid pattern */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />

        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <Link href="/special-offers" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter,sans-serif', textDecoration: 'none', marginBottom: '32px' }}>
            <ArrowLeft style={{ width: '14px', height: '14px' }} /> All Packages
          </Link>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '40px', alignItems: 'center' }}>
            <div>
              {/* Badge */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: `${pkg.color}18`, border: `1px solid ${pkg.color}35`, borderRadius: '100px', padding: '5px 16px', marginBottom: '20px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: pkg.color, display: 'inline-block' }} />
                <span style={{ fontSize: '11px', fontWeight: 700, color: pkg.color, letterSpacing: '0.1em', fontFamily: 'Inter,sans-serif' }}>{pkg.badge} · {pkg.ageGroup}</span>
              </div>

              <div style={{ fontSize: '64px', marginBottom: '12px', lineHeight: 1 }} className="float-1">{pkg.emoji}</div>
              <h1 className="font-display" style={{ fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, lineHeight: 1.15, color: 'white', marginBottom: '12px' }}>{pkg.name}</h1>
              <p className="font-display" style={{ fontSize: 'clamp(18px,3vw,26px)', color: pkg.color, marginBottom: '20px', fontStyle: 'italic' }}>{pkg.tagline}</p>
              <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.65)', lineHeight: '1.8', maxWidth: '600px', marginBottom: '32px', fontFamily: 'Inter,sans-serif' }}>{pkg.heroLine}</p>

              {/* Symptom chips */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
                <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', fontFamily: 'Inter,sans-serif', alignSelf: 'center' }}>Ideal if you have:</span>
                {pkg.symptoms.map(s => (
                  <span key={s} style={{ fontSize: '12px', padding: '4px 12px', borderRadius: '100px', background: `${pkg.color}15`, border: `1px solid ${pkg.color}30`, color: pkg.color, fontFamily: 'Inter,sans-serif', fontWeight: 500 }}>{s}</span>
                ))}
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <a href="tel:+917042191854" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: pkg.color, color: isCouple ? '#0f172a' : 'white', fontWeight: 700, fontSize: '15px', padding: '14px 28px', borderRadius: '10px', textDecoration: 'none', fontFamily: 'Inter,sans-serif', boxShadow: `0 4px 24px ${pkg.color}50` }}>
                  📞 {pkg.cta}
                </a>
                <Link href="/home-collection" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.07)', color: 'white', fontWeight: 600, fontSize: '15px', padding: '14px 24px', borderRadius: '10px', textDecoration: 'none', fontFamily: 'Inter,sans-serif', border: '1px solid rgba(255,255,255,0.15)' }}>
                  <Home style={{ width: '16px', height: '16px' }} /> Home Collection
                </Link>
              </div>
            </div>

            {/* Price card */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', border: `1px solid ${pkg.color}30`, borderRadius: '20px', padding: '32px 28px', textAlign: 'center', backdropFilter: 'blur(20px)', minWidth: '200px' }}>
                <p style={{ fontSize: '13px', textDecoration: 'line-through', color: 'rgba(255,255,255,0.35)', fontFamily: 'Inter,sans-serif', marginBottom: '4px' }}>₹{pkg.market.toLocaleString()}</p>
                <div style={{ background: '#dc2626', color: 'white', fontSize: '12px', fontWeight: 700, padding: '3px 12px', borderRadius: '100px', display: 'inline-block', fontFamily: 'Inter,sans-serif', marginBottom: '12px' }}>{disc}% OFF</div>
                <p className="font-display" style={{ fontSize: '48px', fontWeight: 700, color: 'white', lineHeight: 1, marginBottom: '4px' }}>₹{pkg.offer.toLocaleString()}</p>
                <p style={{ fontSize: '12px', color: pkg.color, fontWeight: 600, fontFamily: 'Inter,sans-serif', marginBottom: '16px' }}>Save ₹{pkg.savings.toLocaleString()}</p>
                <div style={{ borderTop: `1px solid rgba(255,255,255,0.1)`, paddingTop: '16px' }}>
                  <p style={{ fontSize: '28px', fontWeight: 700, color: pkg.color, fontFamily: 'Playfair Display,serif', marginBottom: '4px' }}>{pkg.tests}</p>
                  <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter,sans-serif' }}>Tests Covered</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '64px 24px' }}>

        {/* ── WHY THIS PACKAGE ──────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'start', marginBottom: '72px' }}>
          <div>
            <p className="label" style={{ marginBottom: '10px' }}>Why This Package?</p>
            <h2 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '20px', lineHeight: '1.2' }}>
              Designed Specifically for {pkg.ageGroup}
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: '1.85', marginBottom: '16px', fontFamily: 'Inter,sans-serif' }}>{pkg.whyNow}</p>
            <p style={{ fontSize: '15px', color: 'var(--text-3)', lineHeight: '1.85', fontFamily: 'Inter,sans-serif' }}>{pkg.targetedMessage}</p>
          </div>

          {/* Fun facts */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <p className="label" style={{ marginBottom: '6px' }}>Did You Know?</p>
            {pkg.funFacts.map((f, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', padding: '16px', borderRadius: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)' }}>
                <span style={{ fontSize: '28px', lineHeight: 1, flexShrink: 0 }} className={`float-${(i % 3) + 1}`}>{f.emoji}</span>
                <p style={{ fontSize: '13px', color: 'var(--text-2)', lineHeight: '1.6', fontFamily: 'Inter,sans-serif', margin: 0 }}>{f.fact}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROFILES INCLUDED ─────────────────── */}
        <div style={{ marginBottom: '72px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <p className="label" style={{ marginBottom: '8px' }}>Complete Breakdown</p>
            <h2 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '10px' }}>
              All {pkg.profiles.length} Profiles Included
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-3)', fontFamily: 'Inter,sans-serif' }}>Every test explained in plain language — no medical degree needed</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(300px,1fr))', gap: '16px' }}>
            {pkg.profiles.map((profile, i) => (
              <div key={i} className="card" style={{ padding: '20px', position: 'relative', overflow: 'hidden' }}>
                {/* Accent line */}
                <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: pkg.color, borderRadius: '4px 0 0 4px' }} />
                <div style={{ paddingLeft: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                    <span style={{ fontSize: '24px' }} className="float-3">{profile.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-1)', margin: 0, fontFamily: 'Inter,sans-serif', lineHeight: '1.3' }}>{profile.name}</h3>
                      {profile.tests > 0 && (
                        <span style={{ fontSize: '11px', fontWeight: 600, color: pkg.color, fontFamily: 'Inter,sans-serif' }}>{profile.tests} test{profile.tests > 1 ? 's' : ''}</span>
                      )}
                    </div>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-3)', lineHeight: '1.6', margin: 0, fontFamily: 'Inter,sans-serif' }}>{profile.why}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── GUARANTEES ────────────────────────── */}
        <div style={{ marginBottom: '64px', padding: '48px', borderRadius: '24px', background: 'linear-gradient(135deg,#1B4D3E,#0D2B1E)', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '220px', height: '220px', background: `radial-gradient(circle,${pkg.color}15 0%,transparent 70%)`, borderRadius: '50%', pointerEvents: 'none' }} />
          <h2 className="font-display" style={{ fontSize: '28px', fontWeight: 700, color: 'white', textAlign: 'center', marginBottom: '32px' }}>Every Package Comes With</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
            {[
              { e: '🏠', t: 'Free Home Collection', d: 'Certified phlebotomist at your door, 7AM–9PM' },
              { e: '⚡', t: 'Reports in 24 Hours', d: 'Digital + AI-powered plain language summary' },
              { e: '🏆', t: 'NABL Certified Lab', d: 'MC-2140 · 10th NABL assessment completed' },
              { e: '🔬', t: 'Gold Standard Testing', d: 'Fully automated analyzers for maximum accuracy' },
              { e: '📱', t: 'Digital Reports', d: 'Directly to your phone in real time' },
              { e: '👨‍⚕️', t: 'Expert Review', d: 'All results reviewed by qualified pathologists' },
            ].map(g => (
              <div key={g.t} style={{ textAlign: 'center', padding: '20px 14px', background: 'rgba(255,255,255,0.04)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div style={{ fontSize: '28px', marginBottom: '10px' }} className="float-3">{g.e}</div>
                <p style={{ fontSize: '13px', fontWeight: 700, color: 'white', marginBottom: '4px', fontFamily: 'Inter,sans-serif' }}>{g.t}</p>
                <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', fontFamily: 'Inter,sans-serif', lineHeight: '1.5' }}>{g.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── RELATED PACKAGES ──────────────────── */}
        <div style={{ marginBottom: '64px' }}>
          <h2 className="font-display" style={{ fontSize: '26px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '20px' }}>Other Packages You Might Need</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(240px,1fr))', gap: '14px' }}>
            {PACKAGES_DATA.filter(p => p.slug !== pkg.slug).slice(0, 4).map(related => (
              <Link key={related.slug} href={`/special-offers/${related.slug}`}
                style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '14px', background: 'var(--bg-2)', border: '1px solid var(--border)', textDecoration: 'none', transition: 'all 0.2s' }}>
                <span style={{ fontSize: '28px' }}>{related.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-1)', margin: 0, fontFamily: 'Inter,sans-serif' }}>{related.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-3)', fontFamily: 'Inter,sans-serif', margin: '2px 0 0' }}>{related.tests} tests · ₹{related.offer.toLocaleString()}</p>
                </div>
                <ArrowRight style={{ width: '14px', height: '14px', color: 'var(--text-4)', flexShrink: 0 }} />
              </Link>
            ))}
          </div>
        </div>

        {/* ── FINAL CTA ─────────────────────────── */}
        <div style={{ textAlign: 'center', padding: '56px 40px', borderRadius: '24px', background: `linear-gradient(135deg, ${pkg.gradFrom}18, ${pkg.gradTo}10)`, border: `1px solid ${pkg.color}25` }}>
          <div style={{ fontSize: '56px', marginBottom: '16px' }} className="float-1">{pkg.emoji}</div>
          <h2 className="font-display" style={{ fontSize: '32px', fontWeight: 700, color: 'var(--text-1)', marginBottom: '12px' }}>{pkg.name}</h2>
          <p className="font-display" style={{ fontSize: '18px', color: pkg.color, marginBottom: '8px', fontStyle: 'italic' }}>{pkg.tagline}</p>
          <p style={{ fontSize: '14px', color: 'var(--text-3)', maxWidth: '440px', margin: '0 auto 24px', fontFamily: 'Inter,sans-serif', lineHeight: '1.7' }}>
            {pkg.tests} tests · ₹{pkg.offer.toLocaleString()} only · Free home collection · NABL certified · Reports in 24hrs
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
            <a href="tel:+917042191854" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: pkg.color, color: isCouple ? '#0f172a' : 'white', fontWeight: 700, fontSize: '16px', padding: '15px 36px', borderRadius: '10px', textDecoration: 'none', fontFamily: 'Inter,sans-serif', boxShadow: `0 6px 24px ${pkg.color}45` }}>
              📞 Book Now — ₹{pkg.offer.toLocaleString()} only
            </a>
            <Link href="/special-offers" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'var(--bg-2)', color: 'var(--text-2)', fontWeight: 600, fontSize: '15px', padding: '15px 28px', borderRadius: '10px', textDecoration: 'none', fontFamily: 'Inter,sans-serif', border: '1px solid var(--border)' }}>
              See All Packages
            </Link>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--text-4)', marginTop: '20px', fontFamily: 'Inter,sans-serif' }}>
            सर्वे सन्तु निरामयः · May all be free from illness
          </p>
        </div>
      </div>
    </div>
  );
}
