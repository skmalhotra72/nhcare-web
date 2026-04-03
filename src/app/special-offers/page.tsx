import Link from 'next/link';
import { CheckCircle2, ArrowRight, Clock, Home, Star, Shield, Zap, Heart, User, Users } from 'lucide-react';

const PACKAGES = [
  {
    id: 1, name: 'Basic Health Checkup',
    emoji: '🌱', ageGroup: 'All Ages', tests: 84,
    market: 4000, offer: 999, savings: 3001,
    highlight: 'Perfect for your first annual checkup',
    color: '#10b981', gradFrom: '#10b981', gradTo: '#059669',
    icon: Shield,
    includes: ['Blood Glucose Fasting','Thyroid (T3 T4 TSH) — 3 Tests','Heart Risk Profile — 9 Tests','Liver Function (LFT) — 12 Tests','Kidney Function — 6 Tests','Complete Blood Count (CBC) — 25 Tests','Urine Analysis — 20 Tests','Iron Studies — 5 Tests','Healthy Bone Profile — 3 Tests'],
    badge: 'MOST POPULAR',
  },
  {
    id: 2, name: 'Complete Health Checkup',
    emoji: '⚡', ageGroup: '20 to 34 Years', tests: 89,
    market: 6500, offer: 1399, savings: 5101,
    highlight: 'Complete organ & diabetes screening for adults',
    color: '#3b82f6', gradFrom: '#3b82f6', gradTo: '#2563eb',
    icon: Zap,
    includes: ['Diabetes Screening (HbA1c)','Thyroid (T3 T4 TSH) — 3 Tests','Heart Risk Profile — 9 Tests','Liver Function (LFT) — 12 Tests','Kidney Function — 6 Tests','Complete Blood Count — 25 Tests','Vital Vitamins (D & B12) — 5 Tests','Iron Studies — 5 Tests','Bone Profile — 3 Tests'],
    badge: 'BEST VALUE',
  },
  {
    id: 3, name: 'Male Health Package',
    emoji: '💪', ageGroup: '35 to 60 Years', tests: 112,
    market: 12000, offer: 2999, savings: 9001,
    highlight: 'Comprehensive protection for working men',
    color: '#1B4D3E', gradFrom: '#1B4D3E', gradTo: '#2d6b60',
    icon: User,
    includes: ['Complete Diabetes Monitoring (7 Tests)','Heart Risk Profile — 9 Tests','Liver & Kidney Function','Thyroid + FT3 + FT4 (5 Tests)','Arthritis Screen (RA-Factor)','Vital Vitamins D & B12 (7 Tests)','Electrolyte Profile — 4 Tests','Infection Screening (Hepatitis & ESR)','Insulin Fasting + Folate','Peripheral Blood Smear'],
    badge: 'PREMIUM',
  },
  {
    id: 4, name: 'Female Health Package',
    emoji: '🌸', ageGroup: '35 to 60 Years', tests: 112,
    market: 12000, offer: 2999, savings: 9001,
    highlight: 'Complete women\'s health & hormonal screening',
    color: '#ec4899', gradFrom: '#ec4899', gradTo: '#db2777',
    icon: Heart,
    includes: ['Complete Diabetes Monitoring (7 Tests)','Heart Risk Profile — 9 Tests','Liver & Kidney Function','Thyroid + FT3 + FT4 (5 Tests)','CA125 — Ovarian Cancer Marker','Hormones: LH, FSH, Prolactin','Arthritis Screen (RA-Factor)','Vital Vitamins D & B12 (7 Tests)','Insulin Fasting + Folate','Infection Screening'],
    badge: 'PREMIUM',
  },
  {
    id: 5, name: 'Teen Boys Package',
    emoji: '🏃', ageGroup: '13 to 19 Years', tests: 96,
    market: 9000, offer: 2250, savings: 6750,
    highlight: 'Hormonal & lifestyle checkup for teenage boys',
    color: '#f59e0b', gradFrom: '#f59e0b', gradTo: '#d97706',
    icon: Zap,
    includes: ['Diabetes Screening (HbA1c)','Testosterone Level','Heart Risk Profile — 9 Tests','Liver & Kidney Function','Complete Blood Count — 25 Tests','Vitamins D & B12','Hormones: LH, FSH, TSH','Electrolyte Profile — 4 Tests','Iron Studies — 5 Tests','Insulin Fasting + Folate'],
    badge: 'FOR TEENS',
  },
  {
    id: 6, name: 'Teen Girls Package',
    emoji: '🌺', ageGroup: '13 to 19 Years', tests: 96,
    market: 9000, offer: 2250, savings: 6750,
    highlight: 'Hormonal health for teenage girls',
    color: '#8b5cf6', gradFrom: '#8b5cf6', gradTo: '#7c3aed',
    icon: Heart,
    includes: ['Diabetes Screening (HbA1c)','Hormones: LH, FSH, Prolactin','Thyroid Stimulating Hormone (TSH)','Heart Risk Profile — 9 Tests','Liver & Kidney Function','Complete Blood Count — 25 Tests','Vitamins D & B12','Iron Studies — 5 Tests','Insulin Fasting + Folate','Bone Profile — 3 Tests'],
    badge: 'FOR TEENS',
  },
  {
    id: 7, name: 'Kids Health Package',
    emoji: '🌈', ageGroup: '5 to 12 Years', tests: 60,
    market: 5000, offer: 1299, savings: 3701,
    highlight: 'Essential screening for growing children',
    color: '#06b6d4', gradFrom: '#06b6d4', gradTo: '#0891b2',
    icon: Star,
    includes: ['Diabetes Screening (HbA1c)','Complete Blood Count — 25 Tests','Urine Analysis — 20 Tests','Iron Studies — 5 Tests','Vital Vitamins D & B12','Healthy Bone Profile — 3 Tests','Folate (Vitamin B9)'],
    badge: 'FOR KIDS',
  },
  {
    id: 8, name: 'Family Bundle',
    emoji: '👨‍👩‍👧‍👦', ageGroup: 'Whole Family', tests: 500,
    market: 45000, offer: 9999, savings: 35001,
    highlight: 'All 7 packages for the entire family',
    color: '#F4B942', gradFrom: '#F4B942', gradTo: '#d4971a',
    icon: Users,
    includes: ['Basic + Complete + Male + Female Packages','Teen Boys + Teen Girls + Kids Packages','Home collection for all members','Priority report delivery','Dedicated health advisor','AI report summary for all','Free follow-up consultation','Valid for 12 months'],
    badge: '🔥 BEST DEAL',
  },
];

export default function SpecialOffersPage() {
  const totalSavings = 35001;

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh',overflow:'hidden'}}>

      {/* ── HERO ─────────────────────────────────── */}
      <div style={{background:'linear-gradient(135deg,#0D2B1E 0%,#1B4D3E 50%,#163d31 100%)',position:'relative',overflow:'hidden',padding:'80px 0 100px'}}>
        {/* Floating emojis */}
        {['💊','🩺','❤️','🔬','💉','🏥','⚕️','🧬'].map((e,i)=>(
          <div key={i} className={`float-${(i%3)+1}`} style={{
            position:'absolute',fontSize:i%2===0?'32px':'24px',opacity:0.15,
            top:`${10+i*10}%`,left:`${i%2===0?5+i*3:75+i*2}%`,
            pointerEvents:'none',userSelect:'none',
          }}>{e}</div>
        ))}
        {/* Glow orbs */}
        <div style={{position:'absolute',top:'-80px',left:'10%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(244,185,66,0.12) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:'-60px',right:'5%',width:'300px',height:'300px',background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />

        <div style={{maxWidth:'1200px',margin:'0 auto',padding:'0 24px',textAlign:'center',position:'relative'}}>
          {/* Limited time badge */}
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(244,185,66,0.15)',border:'1px solid rgba(244,185,66,0.4)',borderRadius:'100px',padding:'6px 20px',marginBottom:'24px'}}>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#F4B942',display:'inline-block',animation:'glow-pulse 1.5s ease-in-out infinite'}} />
            <span style={{fontSize:'12px',fontWeight:700,color:'#F4B942',letterSpacing:'0.1em',fontFamily:'Inter,sans-serif'}}>LIMITED TIME FAMILY HEALTH OFFER</span>
          </div>

          <h1 className="font-display" style={{fontSize:'clamp(36px,6vw,72px)',fontWeight:700,lineHeight:1.1,marginBottom:'20px',color:'white'}}>
            Complete Family<br />
            <span className="shimmer-gold">Health Packages</span>
          </h1>

          <p style={{fontSize:'18px',color:'rgba(255,255,255,0.65)',maxWidth:'600px',margin:'0 auto 32px',lineHeight:'1.7',fontFamily:'Inter,sans-serif'}}>
            NABL-certified tests for every family member — from kids to grandparents.
            Save up to <strong style={{color:'#F4B942'}}>75% off</strong> market prices.
            Home collection included.
          </p>

          {/* Stats row */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'16px',marginBottom:'40px'}}>
            {[
              {val:'7 Packages',label:'For Every Age Group'},
              {val:'Up to 75%',label:'Off Market Price'},
              {val:'500+ Tests',label:'Covered in Family Bundle'},
              {val:'Free',label:'Home Collection'},
            ].map(s=>(
              <div key={s.label} style={{padding:'12px 24px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',backdropFilter:'blur(10px)'}}>
                <p style={{fontSize:'20px',fontWeight:700,color:'#F4B942',margin:0,fontFamily:'Playfair Display,serif'}}>{s.val}</p>
                <p style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',margin:0,fontFamily:'Inter,sans-serif'}}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <a href="tel:+917042191854" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 20px rgba(244,185,66,0.4)'}}>
              📞 Call to Book Now
            </a>
            <Link href="/home-collection" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.08)',color:'white',fontWeight:600,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',border:'1px solid rgba(255,255,255,0.2)'}}>
              <Home className="w-4 h-4" /> Home Collection
            </Link>
          </div>
        </div>
      </div>

      {/* ── SAVINGS BANNER ─────────────────────── */}
      <div style={{background:'#F4B942',padding:'16px 24px',textAlign:'center'}}>
        <p style={{margin:0,fontFamily:'Inter,sans-serif',fontSize:'15px',fontWeight:700,color:'#0f172a'}}>
          🎉 Total family savings: <span style={{fontSize:'20px'}}>₹{totalSavings.toLocaleString()}+</span> · 
          <span style={{fontWeight:400}}> &nbsp;All packages include FREE home sample collection · NABL certified lab · Digital reports in 24hrs</span>
        </p>
      </div>

      {/* ── PACKAGES GRID ──────────────────────── */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'64px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p className="label" style={{marginBottom:'8px'}}>Family Health Packages 2026</p>
          <h2 className="font-display" style={{fontSize:'36px',fontWeight:700,color:'var(--text-1)',marginBottom:'12px'}}>
            Choose the Right Package for Your Family
          </h2>
          <p style={{fontSize:'15px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>
            Every package designed by expert pathologists. Same-day home collection. AI-powered report insights.
          </p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'24px'}}>
          {PACKAGES.map((pkg,idx)=>{
            const disc = Math.round((pkg.savings/pkg.market)*100);
            return (
              <div key={pkg.id} className="offer-card card"
                style={{animationDelay:`${idx*0.1}s`}}>
                {/* Card top gradient bar */}
                <div style={{height:'4px',background:`linear-gradient(90deg,${pkg.gradFrom},${pkg.gradTo})`}} />

                <div style={{padding:'24px'}}>
                  {/* Badge + emoji */}
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'16px'}}>
                    <span style={{fontSize:'11px',fontWeight:700,padding:'4px 12px',borderRadius:'100px',background:`${pkg.color}18`,color:pkg.color,border:`1px solid ${pkg.color}30`,fontFamily:'Inter,sans-serif',letterSpacing:'0.05em'}}>
                      {pkg.badge}
                    </span>
                    <span style={{fontSize:'40px',lineHeight:1}} className="float-2">{pkg.emoji}</span>
                  </div>

                  {/* Name + age */}
                  <h3 className="font-display" style={{fontSize:'22px',fontWeight:700,color:'var(--text-1)',marginBottom:'4px',lineHeight:'1.2'}}>{pkg.name}</h3>
                  <p style={{fontSize:'12px',color:'var(--text-4)',marginBottom:'8px',fontFamily:'Inter,sans-serif'}}>Age Group: <strong style={{color:'var(--text-3)'}}>{pkg.ageGroup}</strong></p>
                  <p style={{fontSize:'13px',color:'var(--text-3)',marginBottom:'16px',fontFamily:'Inter,sans-serif',fontStyle:'italic'}}>{pkg.highlight}</p>

                  {/* Test count */}
                  <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:`${pkg.color}10`,border:`1px solid ${pkg.color}25`,borderRadius:'8px',padding:'6px 12px',marginBottom:'16px'}}>
                    <span style={{fontSize:'18px',fontWeight:700,color:pkg.color,fontFamily:'Playfair Display,serif'}}>{pkg.tests}</span>
                    <span style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>Tests Covered</span>
                  </div>

                  {/* Includes */}
                  <ul style={{listStyle:'none',padding:0,margin:'0 0 20px',display:'flex',flexDirection:'column',gap:'6px'}}>
                    {pkg.includes.slice(0,5).map((item,i)=>(
                      <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
                        <CheckCircle2 style={{width:'14px',height:'14px',color:pkg.color,flexShrink:0,marginTop:'2px'}} />
                        <span style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',lineHeight:'1.4'}}>{item}</span>
                      </li>
                    ))}
                    {pkg.includes.length > 5 && (
                      <li style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',paddingLeft:'22px'}}>
                        +{pkg.includes.length-5} more tests included
                      </li>
                    )}
                  </ul>

                  {/* Pricing */}
                  <div style={{borderTop:'1px solid var(--border)',paddingTop:'16px',display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
                    <div>
                      <div style={{display:'flex',alignItems:'center',gap:'8px',marginBottom:'2px'}}>
                        <span style={{fontSize:'13px',textDecoration:'line-through',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>₹{pkg.market.toLocaleString()}</span>
                        <span style={{fontSize:'11px',fontWeight:700,background:'#dc2626',color:'white',padding:'2px 8px',borderRadius:'100px',fontFamily:'Inter,sans-serif'}}>{disc}% OFF</span>
                      </div>
                      <div style={{display:'flex',alignItems:'baseline',gap:'4px'}}>
                        <span className="font-display" style={{fontSize:'32px',fontWeight:700,color:'var(--text-1)',lineHeight:1}}>₹{pkg.offer.toLocaleString()}</span>
                        <span style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>only</span>
                      </div>
                      <p style={{fontSize:'11px',color:'#059669',fontFamily:'Inter,sans-serif',margin:'2px 0 0',fontWeight:600}}>
                        You save ₹{pkg.savings.toLocaleString()}
                      </p>
                    </div>
                    <a href="tel:+917042191854"
                      style={{display:'inline-flex',alignItems:'center',gap:'6px',background:`linear-gradient(135deg,${pkg.gradFrom},${pkg.gradTo})`,color:'white',fontWeight:700,fontSize:'13px',padding:'10px 18px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',boxShadow:`0 4px 16px ${pkg.color}40`,whiteSpace:'nowrap'}}>
                      Book Now <ArrowRight style={{width:'14px',height:'14px'}} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why choose section */}
        <div style={{marginTop:'64px',padding:'48px',borderRadius:'24px',background:'linear-gradient(135deg,#1B4D3E,#0D2B1E)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-40px',right:'-40px',width:'200px',height:'200px',background:'radial-gradient(circle,rgba(244,185,66,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
          <div style={{textAlign:'center',marginBottom:'40px',position:'relative'}}>
            <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'white',marginBottom:'8px'}}>Why Book with NHCare?</h2>
            <p style={{color:'rgba(255,255,255,0.6)',fontFamily:'Inter,sans-serif'}}>Every package includes these guarantees</p>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:'20px',position:'relative'}}>
            {[
              {e:'🏆',t:'NABL Accredited',d:'10th NABL assessment completed across 7 departments'},
              {e:'🏠',t:'Free Home Collection',d:'Certified phlebotomist at your doorstep, 7AM-9PM'},
              {e:'⚡',t:'Reports in 24 Hours',d:'Digital reports with AI-powered plain language summary'},
              {e:'🔬',t:'Gold Standard Equipment',d:'Fully automated analyzers for accurate results'},
              {e:'📱',t:'Digital Reports',d:'Real-time online reports direct to your phone'},
              {e:'💰',t:'Guaranteed Lowest Price',d:'Up to 75% savings vs market price'},
            ].map(w=>(
              <div key={w.t} style={{textAlign:'center',padding:'24px 16px',background:'rgba(255,255,255,0.05)',borderRadius:'16px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'32px',marginBottom:'12px'}} className="float-3">{w.e}</div>
                <p style={{fontSize:'14px',fontWeight:700,color:'white',marginBottom:'4px',fontFamily:'Inter,sans-serif'}}>{w.t}</p>
                <p style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',lineHeight:'1.5'}}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div style={{textAlign:'center',marginTop:'56px',padding:'48px',borderRadius:'24px',background:'var(--bg-2)',border:'1px solid var(--border)'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}} className="float-1">👨‍👩‍👧‍👦</div>
          <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'var(--text-1)',marginBottom:'12px'}}>
            Gift Your Family Good Health
          </h2>
          <p style={{fontSize:'15px',color:'var(--text-3)',maxWidth:'500px',margin:'0 auto 28px',fontFamily:'Inter,sans-serif',lineHeight:'1.7'}}>
            Book the Family Bundle and give every member the gift of comprehensive health monitoring.
            Home collection · NABL certified · AI-powered reports.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <a href="tel:+917042191854"
              style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 20px rgba(27,77,62,0.35)'}}>
              📞 Call +91 70421 91854
            </a>
            <Link href="/home-collection"
              style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
              Book Home Collection <ArrowRight style={{width:'16px',height:'16px'}} />
            </Link>
          </div>
          <p style={{fontSize:'12px',color:'var(--text-4)',marginTop:'16px',fontFamily:'Inter,sans-serif'}}>
            सर्वे सन्तु निरामयः · May all be free from illness
          </p>
        </div>
      </div>
    </div>
  );
}
