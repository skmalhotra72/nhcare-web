import Link from 'next/link';
import { CheckCircle2, ArrowRight, Home } from 'lucide-react';
import { PACKAGES_DATA } from '@/lib/packages';

export default function SpecialOffersPage() {
  return (
    <div style={{background:'var(--bg)',minHeight:'100vh',overflow:'hidden'}}>

      {/* HERO */}
      <div style={{background:'linear-gradient(135deg,#0D2B1E 0%,#1B4D3E 50%,#163d31 100%)',position:'relative',overflow:'hidden',padding:'80px 0 100px'}}>
        {['💊','🩺','❤️','🔬','💉','🏥','⚕️','🧬'].map((e,i)=>(
          <div key={i} className={`float-${(i%3)+1}`} style={{position:'absolute',fontSize:i%2===0?'32px':'24px',opacity:0.1,top:`${10+i*10}%`,left:`${i%2===0?5+i*3:75+i*2}%`,pointerEvents:'none',userSelect:'none'}}>{e}</div>
        ))}
        <div style={{position:'absolute',top:'-80px',left:'10%',width:'400px',height:'400px',background:'radial-gradient(circle,rgba(244,185,66,0.12) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',textAlign:'center',position:'relative'}}>
          <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(244,185,66,0.15)',border:'1px solid rgba(244,185,66,0.4)',borderRadius:'100px',padding:'6px 20px',marginBottom:'24px'}}>
            <span style={{width:'8px',height:'8px',borderRadius:'50%',background:'#F4B942',display:'inline-block',animation:'glow-pulse 1.5s ease-in-out infinite'}} />
            <span style={{fontSize:'12px',fontWeight:700,color:'#F4B942',letterSpacing:'0.1em',fontFamily:'Inter,sans-serif'}}>9 FAMILY HEALTH PACKAGES — LIMITED TIME OFFER</span>
          </div>
          <h1 className="font-display" style={{fontSize:'clamp(36px,6vw,68px)',fontWeight:700,lineHeight:1.1,marginBottom:'20px',color:'white'}}>
            Complete Family<br /><span className="shimmer-gold">Health Packages</span>
          </h1>
          <p style={{fontSize:'17px',color:'rgba(255,255,255,0.65)',maxWidth:'600px',margin:'0 auto 32px',lineHeight:'1.7',fontFamily:'Inter,sans-serif'}}>
            NABL-certified tests for every family member. Save up to <strong style={{color:'#F4B942'}}>81% off</strong> market prices. Home collection included. New <strong style={{color:'#F4B942'}}>Couple Package</strong> — 224 tests for ₹4,499!
          </p>
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:'12px',marginBottom:'36px'}}>
            {[{val:'9 Packages',label:'For Every Age Group'},{val:'Up to 81%',label:'Off Market Price'},{val:'224 Tests',label:'In Couple Package'},{val:'Free',label:'Home Collection'}].map(s=>(
              <div key={s.label} style={{padding:'12px 24px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',borderRadius:'12px',backdropFilter:'blur(10px)'}}>
                <p style={{fontSize:'20px',fontWeight:700,color:'#F4B942',margin:0,fontFamily:'Playfair Display,serif'}}>{s.val}</p>
                <p style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',margin:0,fontFamily:'Inter,sans-serif'}}>{s.label}</p>
              </div>
            ))}
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <a href="tel:+917042191854" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',boxShadow:'0 4px 20px rgba(244,185,66,0.4)'}}>📞 Call to Book Now</a>
            <Link href="/home-collection" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.08)',color:'white',fontWeight:600,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',border:'1px solid rgba(255,255,255,0.2)'}}>
              <Home className="w-4 h-4" /> Home Collection
            </Link>
          </div>
        </div>
      </div>

      {/* SAVINGS BANNER */}
      <div style={{background:'#F4B942',padding:'14px 24px',textAlign:'center'}}>
        <p style={{margin:0,fontFamily:'Inter,sans-serif',fontSize:'14px',fontWeight:700,color:'#0f172a'}}>
          🎉 Total family savings: <span style={{fontSize:'18px'}}>₹35,000+</span> · &nbsp;
          <span style={{fontWeight:400}}>Free home collection · NABL certified · AI reports in 24hrs · NEW: Couple Package ₹4,499 for 224 tests</span>
        </p>
      </div>

      {/* PACKAGES GRID */}
      <div style={{maxWidth:'1200px',margin:'0 auto',padding:'64px 24px'}}>
        <div style={{textAlign:'center',marginBottom:'48px'}}>
          <p className="label" style={{marginBottom:'8px'}}>9 Family Health Packages 2026</p>
          <h2 className="font-display" style={{fontSize:'34px',fontWeight:700,color:'var(--text-1)',marginBottom:'12px'}}>Choose the Right Package for Your Family</h2>
          <p style={{fontSize:'15px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>Every package designed by expert pathologists. Click any package to see all tests included.</p>
        </div>

        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(340px,1fr))',gap:'24px'}}>
          {PACKAGES_DATA.map((pkg,idx)=>{
            const disc=Math.round((pkg.savings/pkg.market)*100);
            return (
              <div key={pkg.id} className="offer-card card" style={{animationDelay:`${idx*0.1}s`}}>
                <div style={{height:'4px',background:`linear-gradient(90deg,${pkg.gradFrom},${pkg.gradTo})`}} />
                <div style={{padding:'24px'}}>
                  <div style={{display:'flex',alignItems:'flex-start',justifyContent:'space-between',marginBottom:'16px'}}>
                    <span style={{fontSize:'11px',fontWeight:700,padding:'4px 12px',borderRadius:'100px',background:`${pkg.color}18`,color:pkg.color,border:`1px solid ${pkg.color}30`,fontFamily:'Inter,sans-serif',letterSpacing:'0.05em'}}>{pkg.badge}</span>
                    <span style={{fontSize:'40px',lineHeight:1}} className="float-2">{pkg.emoji}</span>
                  </div>
                  <h3 className="font-display" style={{fontSize:'22px',fontWeight:700,color:'var(--text-1)',marginBottom:'4px',lineHeight:'1.2'}}>{pkg.name}</h3>
                  <p style={{fontSize:'12px',color:'var(--text-4)',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Age Group: <strong style={{color:'var(--text-3)'}}>{pkg.ageGroup}</strong></p>
                  <p style={{fontSize:'13px',color:'var(--text-3)',marginBottom:'16px',fontFamily:'Inter,sans-serif',fontStyle:'italic'}}>{pkg.tagline}</p>
                  <div style={{display:'inline-flex',alignItems:'center',gap:'6px',background:`${pkg.color}10`,border:`1px solid ${pkg.color}25`,borderRadius:'8px',padding:'6px 12px',marginBottom:'16px'}}>
                    <span style={{fontSize:'18px',fontWeight:700,color:pkg.color,fontFamily:'Playfair Display,serif'}}>{pkg.tests}</span>
                    <span style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>Tests Covered</span>
                  </div>

                  {/* Top 5 profiles */}
                  <ul style={{listStyle:'none',padding:0,margin:'0 0 4px',display:'flex',flexDirection:'column',gap:'6px'}}>
                    {pkg.profiles.slice(0,5).map((profile,i)=>(
                      <li key={i} style={{display:'flex',alignItems:'flex-start',gap:'8px'}}>
                        <CheckCircle2 style={{width:'14px',height:'14px',color:pkg.color,flexShrink:0,marginTop:'2px'}} />
                        <span style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',lineHeight:'1.4'}}>{profile.name}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Link to detail page */}
                  <Link href={`/special-offers/${pkg.slug}`}
                    style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',marginTop:'12px',marginBottom:'16px',fontSize:'12px',fontWeight:700,color:pkg.color,background:`${pkg.color}10`,border:`1px solid ${pkg.color}30`,borderRadius:'8px',padding:'8px 12px',textDecoration:'none',transition:'all 0.2s',width:'100%'}}>
                    👁 View all {pkg.profiles.length} profiles included <ArrowRight style={{width:'12px',height:'12px'}} />
                  </Link>

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
                      <p style={{fontSize:'11px',color:'#059669',fontFamily:'Inter,sans-serif',margin:'2px 0 0',fontWeight:600}}>You save ₹{pkg.savings.toLocaleString()}</p>
                    </div>
                    <a href="tel:+917042191854"
                      style={{display:'inline-flex',alignItems:'center',gap:'6px',background:`linear-gradient(135deg,${pkg.gradFrom},${pkg.gradTo})`,color:pkg.id===9?'#0f172a':'white',fontWeight:700,fontSize:'13px',padding:'10px 18px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',boxShadow:`0 4px 16px ${pkg.color}40`,whiteSpace:'nowrap'}}>
                      Book Now <ArrowRight style={{width:'14px',height:'14px'}} />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why NHCare */}
        <div style={{marginTop:'64px',padding:'48px',borderRadius:'24px',background:'linear-gradient(135deg,#1B4D3E,#0D2B1E)',position:'relative',overflow:'hidden'}}>
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <h2 className="font-display" style={{fontSize:'28px',fontWeight:700,color:'white',marginBottom:'6px'}}>Why Book with NHCare?</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:'16px'}}>
            {[{e:'🏆',t:'NABL Accredited',d:'10th assessment across 7 departments'},{e:'🏠',t:'Free Home Collection',d:'Certified phlebotomist, 7AM–9PM'},{e:'⚡',t:'Reports in 24 Hours',d:'AI-powered plain language summary'},{e:'🔬',t:'Gold Standard Testing',d:'Fully automated analyzers'},{e:'📱',t:'Digital Reports',d:'Real-time reports to your phone'},{e:'💰',t:'Lowest Price Guaranteed',d:'Up to 81% savings vs market'}].map(w=>(
              <div key={w.t} style={{textAlign:'center',padding:'20px 14px',background:'rgba(255,255,255,0.05)',borderRadius:'14px',border:'1px solid rgba(255,255,255,0.08)'}}>
                <div style={{fontSize:'28px',marginBottom:'10px'}} className="float-3">{w.e}</div>
                <p style={{fontSize:'13px',fontWeight:700,color:'white',marginBottom:'4px',fontFamily:'Inter,sans-serif'}}>{w.t}</p>
                <p style={{fontSize:'11px',color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif',lineHeight:'1.5'}}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={{textAlign:'center',marginTop:'48px',padding:'48px',borderRadius:'24px',background:'var(--bg-2)',border:'1px solid var(--border)'}}>
          <div style={{fontSize:'48px',marginBottom:'16px'}} className="float-1">👨‍👩‍👧‍👦</div>
          <h2 className="font-display" style={{fontSize:'28px',fontWeight:700,color:'var(--text-1)',marginBottom:'12px'}}>Gift Your Family Good Health</h2>
          <p style={{fontSize:'15px',color:'var(--text-3)',maxWidth:'480px',margin:'0 auto 24px',fontFamily:'Inter,sans-serif',lineHeight:'1.7'}}>
            9 packages · Free home collection · NABL certified · AI reports · <strong>Couple Package ₹4,499</strong>
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <a href="tel:+917042191854" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>📞 Call +91 70421 91854</a>
            <Link href="/home-collection" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
              Book Home Collection <ArrowRight style={{width:'16px',height:'16px'}} />
            </Link>
          </div>
          <p style={{fontSize:'12px',color:'var(--text-4)',marginTop:'16px',fontFamily:'Inter,sans-serif'}}>सर्वे सन्तु निरामयः · May all be free from illness</p>
        </div>
      </div>
    </div>
  );
}
