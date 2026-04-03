import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Award, Microscope, Heart, Users, Clock, MapPin, Star, Zap, Brain } from 'lucide-react';

const STATS = [
  { val:'663K+', label:'Patients Served', sub:'Across India' },
  { val:'9+', label:'Years of Excellence', sub:'Since 2015' },
  { val:'490+', label:'Partner Labs', sub:'Delhi-NCR & Beyond' },
  { val:'1000+', label:'Pincodes Covered', sub:'15 States, 200+ Cities' },
  { val:'1875+', label:'Tests Available', sub:'All Categories' },
  { val:'500+', label:'Corporate Clients', sub:'Including Fortune 500' },
];

const DEPTS = [
  { name:'Hematology', icon:'🔴', desc:'Complete blood analysis & cell morphology' },
  { name:'Immunoassay', icon:'🛡️', desc:'Hormones, vitamins & biomarker testing' },
  { name:'Clinical Biochemistry', icon:'⚗️', desc:'Organ function & metabolic panels' },
  { name:'Serology', icon:'🔬', desc:'Infectious disease & antibody testing' },
  { name:'Microbiology', icon:'🦠', desc:'Culture & sensitivity, infection diagnosis' },
  { name:'Molecular', icon:'🧬', desc:'PCR, DNA/RNA testing, ICMR approved' },
  { name:'Histopathology', icon:'🔭', desc:'Tissue analysis & biopsy examination' },
];

const CLIENTS = [
  'TATA 1mg', 'MediBuddy', 'Healthians', 'NetMeds', 'Panasonic', 'CASIO', 'Samsung', 'HCL', 'EY', 'Jio', 'Chaayos', 'Care Health Insurance', 'ICICI Lombard', 'Zoylo', 'DiagRight',
];

const VALUES = [
  { icon: Shield, title: 'Accuracy First', desc: '100% quality assurance with 360° quality policy. Raw analyzer data available for every test.' },
  { icon: Heart, title: 'Patient-Centric', desc: 'Best-in-class patient care from sample collection to report delivery with complete transparency.' },
  { icon: Zap, title: 'Technology-Led', desc: 'Gold standard fully automated analyzers, real-time tracking, and AI-powered report insights.' },
  { icon: Brain, title: 'Always Innovating', desc: 'Working with health-tech startups on machine learning tools for deeper diagnostic insights.' },
];

export default function AboutPage() {
  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>

      {/* ── HERO ──────────────────────────────── */}
      <div style={{background:'linear-gradient(135deg,#0D2B1E 0%,#1B4D3E 60%,#163d31 100%)',padding:'80px 0 96px',position:'relative',overflow:'hidden'}}>
        <div style={{position:'absolute',top:'-100px',right:'-80px',width:'500px',height:'500px',background:'radial-gradient(circle,rgba(244,185,66,0.08) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
        <div style={{position:'absolute',bottom:'-60px',left:'-40px',width:'300px',height:'300px',background:'radial-gradient(circle,rgba(16,185,129,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
        <div style={{position:'absolute',inset:0,opacity:0.03,backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'48px 48px',pointerEvents:'none'}} />

        <div style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px',position:'relative'}}>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'60px',alignItems:'center'}}>
            <div>
              <div style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(244,185,66,0.12)',border:'1px solid rgba(244,185,66,0.3)',borderRadius:'100px',padding:'6px 18px',marginBottom:'24px'}}>
                <span style={{fontSize:'12px',fontWeight:700,color:'#F4B942',letterSpacing:'0.1em',fontFamily:'Inter,sans-serif'}}>NABL ACCREDITED · ICMR APPROVED</span>
              </div>
              <h1 className="font-display" style={{fontSize:'48px',fontWeight:700,lineHeight:1.15,color:'white',marginBottom:'20px'}}>
                May All Be<br />
                <span style={{color:'#F4B942'}}>Free From Illness</span>
              </h1>
              <p style={{fontSize:'16px',color:'rgba(255,255,255,0.65)',lineHeight:'1.8',marginBottom:'24px',fontFamily:'Inter,sans-serif'}}>
                <em style={{fontFamily:'serif',fontSize:'18px',color:'rgba(255,255,255,0.5)'}}>सर्वे सन्तु निरामयः</em>
                <br />
                This ancient Sanskrit philosophy is at the heart of everything we do at Niramaya Pathlabs.
                Founded to provide elite, accessible diagnostics to every Indian family.
              </p>
              <div style={{display:'flex',gap:'12px',flexWrap:'wrap'}}>
                <Link href="/special-offers" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'14px',padding:'12px 24px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
                  View Health Packages <ArrowRight style={{width:'16px',height:'16px'}} />
                </Link>
                <Link href="/home-collection" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.08)',color:'white',fontWeight:600,fontSize:'14px',padding:'12px 24px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',border:'1px solid rgba(255,255,255,0.2)'}}>
                  Book Home Collection
                </Link>
              </div>
            </div>

            {/* Right — accreditations */}
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
              {[
                {icon:'🏅',title:'10th NABL Assessment',sub:'Completed this year'},
                {icon:'🧬',title:'ICMR Approved',sub:'For Molecular & COVID testing'},
                {icon:'⭐',title:'ISO 15189:2012',sub:'Quality management certified'},
                {icon:'🔬',title:'7 Departments',sub:'All NABL certified'},
              ].map(c=>(
                <div key={c.title} style={{padding:'20px',borderRadius:'14px',background:'rgba(255,255,255,0.06)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(10px)',textAlign:'center'}}>
                  <div style={{fontSize:'28px',marginBottom:'8px'}}>{c.icon}</div>
                  <p style={{fontSize:'13px',fontWeight:700,color:'white',marginBottom:'2px',fontFamily:'Inter,sans-serif'}}>{c.title}</p>
                  <p style={{fontSize:'11px',color:'rgba(255,255,255,0.45)',fontFamily:'Inter,sans-serif'}}>{c.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── STATS ──────────────────────────────── */}
      <div style={{background:'#F4B942',padding:'40px 24px'}}>
        <div style={{maxWidth:'1100px',margin:'0 auto',display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(150px,1fr))',gap:'16px',textAlign:'center'}}>
          {STATS.map(s=>(
            <div key={s.label}>
              <p className="font-display" style={{fontSize:'32px',fontWeight:700,color:'#0f172a',margin:0}}>{s.val}</p>
              <p style={{fontSize:'13px',fontWeight:700,color:'#0f172a',margin:'2px 0 0',fontFamily:'Inter,sans-serif'}}>{s.label}</p>
              <p style={{fontSize:'11px',color:'rgba(15,23,42,0.6)',margin:0,fontFamily:'Inter,sans-serif'}}>{s.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── STORY ──────────────────────────────── */}
      <div style={{maxWidth:'1100px',margin:'0 auto',padding:'72px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'64px',alignItems:'center',marginBottom:'72px'}}>
          <div>
            <p className="label" style={{marginBottom:'8px'}}>Our Story</p>
            <h2 className="font-display" style={{fontSize:'36px',fontWeight:700,color:'var(--text-1)',marginBottom:'20px',lineHeight:'1.2'}}>
              Built on a Vision of Accessible, Accurate Diagnostics
            </h2>
            <p style={{color:'var(--text-3)',lineHeight:'1.8',marginBottom:'16px',fontFamily:'Inter,sans-serif'}}>
              NirAmaya Pathlabs was founded with one mission: to provide every Indian family access to world-class diagnostic services at affordable prices. From our NABL-accredited lab in Paschim Vihar, New Delhi, we serve patients across 15 states and 200+ cities.
            </p>
            <p style={{color:'var(--text-3)',lineHeight:'1.8',marginBottom:'24px',fontFamily:'Inter,sans-serif'}}>
              With 9+ years of excellence, we have completed our 10th NABL assessment — the highest validation in Indian pathology. We serve corporate giants like Panasonic, Samsung, HCL, Jio, and healthcare platforms like Tata 1mg, MediBuddy, and Healthians.
            </p>
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {['NABL Accredited across all 7 departments','ICMR approved for Molecular & COVID testing','360° quality assurance policy','Gold standard fully automated analyzers','Real-time 10-step tracking for every test','Best-in-class cold chain logistics'].map(item=>(
                <div key={item} style={{display:'flex',alignItems:'flex-start',gap:'10px'}}>
                  <CheckCircle2 style={{width:'16px',height:'16px',color:'#1B4D3E',flexShrink:0,marginTop:'2px'}} />
                  <span style={{fontSize:'14px',color:'var(--text-2)',fontFamily:'Inter,sans-serif'}}>{item}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Visual — lotus + philosophy */}
          <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
            <div style={{padding:'40px',borderRadius:'24px',background:'linear-gradient(135deg,#1B4D3E,#0D2B1E)',textAlign:'center',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',inset:0,opacity:0.05,backgroundImage:'linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)',backgroundSize:'30px 30px'}} />
              {/* Lotus SVG */}
              <svg viewBox="0 0 120 100" style={{width:'120px',height:'100px',margin:'0 auto 16px',display:'block'}}>
                <path d="M60 10C60 10 42 28 42 45C42 54.94 50.06 63 60 63C69.94 63 78 54.94 78 45C78 28 60 10 60 10Z" fill="none" stroke="#F4B942" strokeWidth="2.5" strokeLinecap="round"/>
                <path d="M30 30C30 30 14 44 20 58C25 68 38 70 46 64C54 58 54 46 46 38C38 30 30 30 30 30Z" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                <path d="M90 30C90 30 106 44 100 58C95 68 82 70 74 64C66 58 66 46 74 38C82 30 90 30 90 30Z" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round" opacity="0.7"/>
                <path d="M16 52C16 52 6 66 14 76C20 83 33 84 40 78" fill="none" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                <path d="M104 52C104 52 114 66 106 76C100 83 87 84 80 78" fill="none" stroke="#F4B942" strokeWidth="1.5" strokeLinecap="round" opacity="0.5"/>
                <line x1="60" y1="63" x2="60" y2="90" stroke="#F4B942" strokeWidth="2" strokeLinecap="round"/>
                <path d="M45 87C45 87 60 93 75 87" fill="none" stroke="#F4B942" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <p className="font-display" style={{fontSize:'22px',color:'white',marginBottom:'4px'}}>niramaya</p>
              <p style={{fontSize:'13px',letterSpacing:'0.3em',color:'rgba(255,255,255,0.6)',fontFamily:'Inter,sans-serif',marginBottom:'16px'}}>PATHLABS</p>
              <p style={{fontSize:'16px',color:'#F4B942',fontFamily:'serif',fontStyle:'italic',marginBottom:'4px'}}>सर्वे सन्तु निरामयः</p>
              <p style={{fontSize:'12px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif'}}>"May all be free from illness"</p>
            </div>
            {/* Address */}
            <div style={{padding:'20px',borderRadius:'16px',background:'var(--bg-2)',border:'1px solid var(--border)'}}>
              <div style={{display:'flex',gap:'12px',alignItems:'flex-start'}}>
                <div style={{width:'36px',height:'36px',borderRadius:'10px',background:'var(--green-bg)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
                  <MapPin style={{width:'18px',height:'18px',color:'#1B4D3E'}} />
                </div>
                <div>
                  <p style={{fontSize:'13px',fontWeight:700,color:'var(--text-1)',marginBottom:'4px',fontFamily:'Inter,sans-serif'}}>B-4, New Multan Nagar</p>
                  <p style={{fontSize:'12px',color:'var(--text-3)',lineHeight:'1.6',fontFamily:'Inter,sans-serif'}}>Near Paschim Vihar Metro, Pillar No. 233<br />New Delhi — 110056</p>
                  <p style={{fontSize:'12px',color:'#1B4D3E',marginTop:'6px',fontFamily:'Inter,sans-serif',fontWeight:600}}>+91 70421 91854 · care@nhcare.in</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── NABL DEPARTMENTS ─────────────────── */}
        <div style={{marginBottom:'72px'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <p className="label" style={{marginBottom:'8px'}}>10th NABL Assessment Completed</p>
            <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'var(--text-1)'}}>NABL Certified Departments</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'16px'}}>
            {DEPTS.map(d=>(
              <div key={d.name} className="card" style={{padding:'20px',display:'flex',alignItems:'flex-start',gap:'14px'}}>
                <div style={{fontSize:'28px',flexShrink:0}} className="float-3">{d.icon}</div>
                <div>
                  <p style={{fontSize:'14px',fontWeight:700,color:'var(--text-1)',marginBottom:'4px',fontFamily:'Inter,sans-serif'}}>{d.name}</p>
                  <p style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',lineHeight:'1.5'}}>{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── OUR VALUES ───────────────────────── */}
        <div style={{marginBottom:'72px'}}>
          <div style={{textAlign:'center',marginBottom:'40px'}}>
            <p className="label" style={{marginBottom:'8px'}}>What Drives Us</p>
            <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'var(--text-1)'}}>Our Core Values</h2>
          </div>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(240px,1fr))',gap:'20px'}}>
            {VALUES.map(v=>(
              <div key={v.title} className="card" style={{padding:'24px',textAlign:'center'}}>
                <div style={{width:'48px',height:'48px',borderRadius:'14px',background:'var(--green-bg)',display:'flex',alignItems:'center',justifyContent:'center',margin:'0 auto 16px'}}>
                  <v.icon style={{width:'22px',height:'22px',color:'#1B4D3E'}} />
                </div>
                <h3 className="font-display" style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',marginBottom:'8px'}}>{v.title}</h3>
                <p style={{fontSize:'13px',color:'var(--text-3)',lineHeight:'1.6',fontFamily:'Inter,sans-serif'}}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CLIENT LOGOS ─────────────────────── */}
        <div style={{marginBottom:'64px'}}>
          <div style={{textAlign:'center',marginBottom:'32px'}}>
            <p className="label" style={{marginBottom:'8px'}}>Our Clients</p>
            <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'var(--text-1)'}}>500+ Clients in 9 Years</h2>
            <p style={{fontSize:'14px',color:'var(--text-3)',marginTop:'8px',fontFamily:'Inter,sans-serif'}}>Corporates · Insurers · Health-Tech · Startups</p>
          </div>
          <div style={{display:'flex',flexWrap:'wrap',gap:'10px',justifyContent:'center'}}>
            {CLIENTS.map(c=>(
              <div key={c} style={{padding:'8px 20px',borderRadius:'100px',background:'var(--bg-2)',border:'1px solid var(--border)',fontSize:'13px',fontWeight:600,color:'var(--text-2)',fontFamily:'Inter,sans-serif'}}>
                {c}
              </div>
            ))}
            <div style={{padding:'8px 20px',borderRadius:'100px',background:'var(--green-bg)',border:'1px solid var(--green-bd)',fontSize:'13px',fontWeight:600,color:'#1B4D3E',fontFamily:'Inter,sans-serif'}}>
              + 485 more
            </div>
          </div>
        </div>

        {/* ── CTA ─────────────────────────────── */}
        <div style={{textAlign:'center',padding:'56px 40px',borderRadius:'24px',background:'linear-gradient(135deg,#1B4D3E,#0D2B1E)',position:'relative',overflow:'hidden'}}>
          <div style={{position:'absolute',top:'-40px',right:'-40px',width:'200px',height:'200px',background:'radial-gradient(circle,rgba(244,185,66,0.1) 0%,transparent 70%)',borderRadius:'50%',pointerEvents:'none'}} />
          <h2 className="font-display" style={{fontSize:'32px',fontWeight:700,color:'white',marginBottom:'12px'}}>
            Experience the NHCare Difference
          </h2>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,0.6)',maxWidth:'500px',margin:'0 auto 28px',fontFamily:'Inter,sans-serif',lineHeight:'1.7'}}>
            Book your health checkup today. NABL-certified accuracy, home collection, AI-powered reports, and 9 years of trust.
          </p>
          <div style={{display:'flex',flexWrap:'wrap',gap:'12px',justifyContent:'center'}}>
            <Link href="/special-offers" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
              View Health Packages <ArrowRight style={{width:'16px',height:'16px'}} />
            </Link>
            <Link href="/tests" style={{display:'inline-flex',alignItems:'center',gap:'8px',background:'rgba(255,255,255,0.08)',color:'white',fontWeight:600,fontSize:'15px',padding:'14px 32px',borderRadius:'10px',textDecoration:'none',fontFamily:'Inter,sans-serif',border:'1px solid rgba(255,255,255,0.2)'}}>
              Browse All Tests
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
