
'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Home, Building2, MapPin, Calendar, Clock, ArrowRight, ArrowLeft, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '@/lib/cart';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

export default function BookPage() {
  const router = useRouter();
  const { items, count, subtotal, token } = useCart();
  const [step, setStep] = useState(1); // 1=details 2=slot 3=review
  const [form, setForm] = useState({
    patient_name:'', patient_mobile:'', patient_age:'', patient_gender:'male',
    collection_type:'home', address:'', pincode:'', landmark:'',
    collection_date:'', collection_slot:'',
  });
  const [slots, setSlots] = useState<any[]>([]);
  const [slotsLoading, setSlotsLoading] = useState(false);
  const [pincodeStatus, setPincodeStatus] = useState<'idle'|'checking'|'ok'|'fail'>('idle');
  const [errors, setErrors] = useState<Record<string,string>>({});

  // Pre-fill from auth
  useEffect(() => {
    const p = localStorage.getItem('nhcare_patient');
    if (p) {
      const pat = JSON.parse(p);
      setForm(f => ({ ...f, patient_name: pat.name||'', patient_mobile: pat.mobile||'' }));
    }
  }, []);

  // Redirect if cart empty
  useEffect(() => { if (count === 0) router.push('/tests'); }, [count, router]);

  // Min date = tomorrow
  const minDate = new Date(); minDate.setDate(minDate.getDate()+1);
  const minDateStr = minDate.toISOString().split('T')[0];

  const checkPincode = async (pin: string) => {
    if (pin.length !== 6) return;
    setPincodeStatus('checking');
    try {
      const r = await fetch(`${API}/v1/niramaya/pincode/${pin}/check`);
      const d = await r.json();
      setPincodeStatus(d.data?.serviceable ? 'ok' : 'fail');
    } catch { setPincodeStatus('fail'); }
  };

  const loadSlots = async () => {
    if (!form.collection_date || !form.pincode) return;
    setSlotsLoading(true);
    try {
      const r = await fetch(`${API}/v1/home-collection/slots`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ pincode: form.collection_date ? form.pincode : '110001', date: form.collection_date })
      });
      const d = await r.json();
      setSlots(d.data?.slots || []);
    } finally { setSlotsLoading(false); }
  };

  useEffect(() => { if (form.collection_date) loadSlots(); }, [form.collection_date]);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.patient_name.trim()) e.patient_name = 'Name required';
    if (!/^[6-9]\d{9}$/.test(form.patient_mobile)) e.patient_mobile = 'Valid 10-digit mobile required';
    if (form.collection_type === 'home') {
      if (!form.address.trim()) e.address = 'Address required';
      if (!/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode required';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const goToSlot = () => { if (validate()) setStep(2); };

  const goToReview = () => {
    const e: Record<string,string> = {};
    if (!form.collection_date) e.collection_date = 'Select a date';
    if (!form.collection_slot) e.collection_slot = 'Select a time slot';
    setErrors(e);
    if (Object.keys(e).length === 0) setStep(3);
  };

  const inp = (field: string, val: string) => setForm(f => ({...f, [field]: val}));

  const inputStyle = (field: string) => ({
    width:'100%', padding:'12px 14px', borderRadius:'10px', fontSize:'14px',
    fontFamily:'Inter,sans-serif', color:'var(--text-1)', outline:'none',
    background:'var(--bg)', transition:'border-color 0.2s',
    border: `1.5px solid ${errors[field] ? '#dc2626' : 'var(--border)'}`,
  });

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      {/* Header */}
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'720px',margin:'0 auto',padding:'0 24px'}}>
          <Link href="/tests" style={{display:'inline-flex',alignItems:'center',gap:'6px',
            color:'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'Inter,sans-serif',
            textDecoration:'none',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> Back to Tests
          </Link>
          <h1 style={{fontSize:'28px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif',marginBottom:'8px'}}>
            Book Your Tests
          </h1>
          {/* Progress */}
          <div style={{display:'flex',gap:'8px',alignItems:'center'}}>
            {['Patient Details','Date & Slot','Review'].map((s,i) => (
              <div key={s} style={{display:'flex',alignItems:'center',gap:'8px'}}>
                <div style={{display:'flex',alignItems:'center',gap:'6px'}}>
                  <div style={{width:'24px',height:'24px',borderRadius:'50%',display:'flex',
                    alignItems:'center',justifyContent:'center',fontSize:'11px',fontWeight:700,
                    fontFamily:'Inter,sans-serif',
                    background: step>i+1?'#F4B942':step===i+1?'white':'rgba(255,255,255,0.2)',
                    color: step>i+1?'#0f172a':step===i+1?'#1B4D3E':'rgba(255,255,255,0.5)'}}>
                    {step>i+1?'✓':i+1}
                  </div>
                  <span style={{fontSize:'12px',fontFamily:'Inter,sans-serif',
                    color:step===i+1?'white':'rgba(255,255,255,0.5)',fontWeight:step===i+1?600:400}}>
                    {s}
                  </span>
                </div>
                {i<2 && <div style={{width:'24px',height:'1px',background:'rgba(255,255,255,0.2)'}} />}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{maxWidth:'720px',margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',gap:'24px',alignItems:'start'}}>

          {/* Main form */}
          <div>

            {/* STEP 1 — Patient Details */}
            {step === 1 && (
              <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
                  <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'20px'}}>
                    Patient Information
                  </h2>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'14px'}}>
                    <div style={{gridColumn:'1/-1'}}>
                      <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>
                        Full Name *
                      </label>
                      <input value={form.patient_name} onChange={e=>inp('patient_name',e.target.value)}
                        placeholder="As per ID" style={inputStyle('patient_name')} />
                      {errors.patient_name && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>{errors.patient_name}</p>}
                    </div>
                    <div>
                      <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Mobile *</label>
                      <input value={form.patient_mobile} onChange={e=>inp('patient_mobile',e.target.value.replace(/\D/g,'').slice(0,10))}
                        placeholder="10-digit number" style={inputStyle('patient_mobile')} type="tel" />
                      {errors.patient_mobile && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>{errors.patient_mobile}</p>}
                    </div>
                    <div>
                      <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Age</label>
                      <input value={form.patient_age} onChange={e=>inp('patient_age',e.target.value.replace(/\D/g,'').slice(0,3))}
                        placeholder="Years" style={inputStyle('patient_age')} type="tel" />
                    </div>
                    <div>
                      <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Gender</label>
                      <select value={form.patient_gender} onChange={e=>inp('patient_gender',e.target.value)}
                        style={{...inputStyle('patient_gender'),cursor:'pointer'}}>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Collection type */}
                <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
                  <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'16px'}}>
                    Sample Collection
                  </h2>
                  <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'16px'}}>
                    {[{val:'home',icon:Home,label:'Home Collection',sub:'FREE · 7AM–9PM'},
                      {val:'centre',icon:Building2,label:'Visit Centre',sub:'Walk-in anytime'}].map(opt=>(
                      <button key={opt.val} onClick={()=>inp('collection_type',opt.val)}
                        style={{padding:'16px',borderRadius:'12px',cursor:'pointer',textAlign:'left',
                          border:`2px solid ${form.collection_type===opt.val?'#1B4D3E':'var(--border)'}`,
                          background: form.collection_type===opt.val?'var(--green-bg)':'var(--bg)'}}>
                        <opt.icon style={{width:'20px',height:'20px',color:form.collection_type===opt.val?'#1B4D3E':'var(--text-3)',marginBottom:'6px'}} />
                        <p style={{fontSize:'13px',fontWeight:700,color:form.collection_type===opt.val?'#1B4D3E':'var(--text-1)',fontFamily:'Inter,sans-serif',margin:'0 0 2px'}}>{opt.label}</p>
                        <p style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',margin:0}}>{opt.sub}</p>
                      </button>
                    ))}
                  </div>

                  {form.collection_type === 'home' && (
                    <div style={{display:'flex',flexDirection:'column',gap:'12px'}}>
                      <div>
                        <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>
                          Pincode * <span style={{fontWeight:400,color:'var(--text-4)'}}>(for availability check)</span>
                        </label>
                        <div style={{position:'relative'}}>
                          <input value={form.pincode}
                            onChange={e=>{const v=e.target.value.replace(/\D/g,'').slice(0,6);inp('pincode',v);if(v.length===6)checkPincode(v);}}
                            placeholder="6-digit pincode" style={inputStyle('pincode')} type="tel" maxLength={6} />
                          {pincodeStatus==='checking' && <Loader2 style={{position:'absolute',right:'12px',top:'12px',width:'16px',height:'16px',color:'var(--text-4)',animation:'spin 1s linear infinite'}} />}
                          {pincodeStatus==='ok' && <span style={{position:'absolute',right:'12px',top:'10px',fontSize:'18px'}}>✅</span>}
                          {pincodeStatus==='fail' && <span style={{position:'absolute',right:'12px',top:'10px',fontSize:'18px'}}>❌</span>}
                        </div>
                        {pincodeStatus==='ok' && <p style={{color:'#059669',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>✓ Home collection available in your area</p>}
                        {pincodeStatus==='fail' && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>Home collection not available. Try centre visit.</p>}
                        {errors.pincode && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>{errors.pincode}</p>}
                      </div>
                      <div>
                        <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Full Address *</label>
                        <textarea value={form.address} onChange={e=>inp('address',e.target.value)}
                          placeholder="House/flat no, street, area..." rows={3}
                          style={{...inputStyle('address'),resize:'vertical'}} />
                        {errors.address && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>{errors.address}</p>}
                      </div>
                      <div>
                        <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Landmark (optional)</label>
                        <input value={form.landmark} onChange={e=>inp('landmark',e.target.value)}
                          placeholder="Near metro, school, etc." style={inputStyle('landmark')} />
                      </div>
                    </div>
                  )}
                </div>

                <button onClick={goToSlot}
                  style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                    background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'15px',
                    padding:'14px',borderRadius:'10px',border:'none',cursor:'pointer',
                    fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(27,77,62,0.35)'}}>
                  Continue to Date & Slot <ArrowRight style={{width:'16px',height:'16px'}} />
                </button>
              </div>
            )}

            {/* STEP 2 — Date & Slot */}
            {step === 2 && (
              <div style={{display:'flex',flexDirection:'column',gap:'20px'}}>
                <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
                  <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'20px'}}>
                    Choose Date & Time
                  </h2>
                  <div style={{marginBottom:'20px'}}>
                    <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'8px',fontFamily:'Inter,sans-serif'}}>
                      <Calendar style={{width:'14px',height:'14px',display:'inline',marginRight:'4px'}} /> Collection Date *
                    </label>
                    <input type="date" value={form.collection_date} min={minDateStr}
                      onChange={e=>inp('collection_date',e.target.value)}
                      style={{...inputStyle('collection_date'),cursor:'pointer'}} />
                    {errors.collection_date && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'4px',fontFamily:'Inter,sans-serif'}}>{errors.collection_date}</p>}
                  </div>

                  {form.collection_date && (
                    <div>
                      <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'10px',fontFamily:'Inter,sans-serif'}}>
                        <Clock style={{width:'14px',height:'14px',display:'inline',marginRight:'4px'}} /> Time Slot *
                      </label>
                      {slotsLoading ? (
                        <div style={{textAlign:'center',padding:'20px'}}>
                          <Loader2 style={{width:'24px',height:'24px',color:'#F4B942',animation:'spin 1s linear infinite'}} />
                        </div>
                      ) : (
                        <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))',gap:'8px'}}>
                          {slots.map(slot=>(
                            <button key={slot.id} onClick={()=>inp('collection_slot',slot.id)}
                              disabled={!slot.available}
                              style={{padding:'10px 12px',borderRadius:'8px',cursor:slot.available?'pointer':'not-allowed',
                                fontSize:'12px',fontFamily:'Inter,sans-serif',fontWeight:500,
                                border:`1.5px solid ${form.collection_slot===slot.id?'#1B4D3E':'var(--border)'}`,
                                background:form.collection_slot===slot.id?'#1B4D3E':slot.available?'var(--bg)':'var(--bg-2)',
                                color:form.collection_slot===slot.id?'white':slot.available?'var(--text-1)':'var(--text-4)',
                                opacity:slot.available?1:0.5}}>
                              {slot.label}
                            </button>
                          ))}
                        </div>
                      )}
                      {errors.collection_slot && <p style={{color:'#dc2626',fontSize:'11px',marginTop:'8px',fontFamily:'Inter,sans-serif'}}>{errors.collection_slot}</p>}
                    </div>
                  )}
                </div>

                <div style={{display:'flex',gap:'10px'}}>
                  <button onClick={()=>setStep(1)}
                    style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      background:'var(--bg-2)',color:'var(--text-2)',fontWeight:600,fontSize:'14px',
                      padding:'13px',borderRadius:'10px',border:'1.5px solid var(--border)',
                      cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                    <ArrowLeft style={{width:'16px',height:'16px'}} /> Back
                  </button>
                  <button onClick={goToReview}
                    style={{flex:2,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'14px',
                      padding:'13px',borderRadius:'10px',border:'none',cursor:'pointer',
                      fontFamily:'Inter,sans-serif'}}>
                    Review Booking <ArrowRight style={{width:'16px',height:'16px'}} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 — Review */}
            {step === 3 && (
              <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>
                <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
                  <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'16px'}}>
                    Booking Summary
                  </h2>
                  {[
                    {label:'Patient',val:`${form.patient_name}${form.patient_age?', '+form.patient_age+' yrs':''} · ${form.patient_gender}`},
                    {label:'Mobile',val:form.patient_mobile},
                    {label:'Collection',val:form.collection_type==='home'?'Home Collection':'Centre Visit'},
                    form.collection_type==='home'?{label:'Address',val:`${form.address}${form.landmark?', '+form.landmark:''}, ${form.pincode}`}:null,
                    {label:'Date',val:new Date(form.collection_date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})},
                    {label:'Slot',val:slots.find(s=>s.id===form.collection_slot)?.label||form.collection_slot},
                  ].filter(Boolean).map((row:any)=>(
                    <div key={row.label} style={{display:'flex',gap:'12px',padding:'8px 0',
                      borderBottom:'1px solid var(--border)'}}>
                      <span style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',width:'80px',flexShrink:0}}>{row.label}</span>
                      <span style={{fontSize:'13px',fontWeight:500,color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>{row.val}</span>
                    </div>
                  ))}
                </div>

                <div style={{display:'flex',gap:'10px'}}>
                  <button onClick={()=>setStep(2)}
                    style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      background:'var(--bg-2)',color:'var(--text-2)',fontWeight:600,fontSize:'14px',
                      padding:'13px',borderRadius:'10px',border:'1.5px solid var(--border)',
                      cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                    <ArrowLeft style={{width:'16px',height:'16px'}} /> Back
                  </button>
                  <button onClick={()=>{
                    const qs = new URLSearchParams({
                      ...form, subtotal: String(subtotal), cart_token: token
                    }).toString();
                    router.push('/checkout?'+qs);
                  }}
                    style={{flex:2,display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                      background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'14px',
                      padding:'13px',borderRadius:'10px',border:'none',cursor:'pointer',
                      fontFamily:'Inter,sans-serif'}}>
                    Proceed to Payment <ArrowRight style={{width:'16px',height:'16px'}} />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar — cart summary */}
          <div style={{position:'sticky',top:'80px'}}>
            <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'20px'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'14px'}}>
                Your Tests ({count})
              </h3>
              <div style={{display:'flex',flexDirection:'column',gap:'8px',marginBottom:'14px'}}>
                {items.map(item=>(
                  <div key={item.test_id} style={{display:'flex',justifyContent:'space-between',gap:'8px'}}>
                    <span style={{fontSize:'12px',color:'var(--text-2)',fontFamily:'Inter,sans-serif',lineHeight:'1.4',flex:1}}>
                      {item.test_name}
                    </span>
                    <span style={{fontSize:'12px',fontWeight:600,color:'var(--text-1)',fontFamily:'Inter,sans-serif',flexShrink:0}}>
                      ₹{Number(item.mrp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div style={{borderTop:'1px solid var(--border)',paddingTop:'12px'}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'4px'}}>
                  <span style={{fontSize:'12px',color:'var(--text-3)',fontFamily:'Inter,sans-serif'}}>Home Collection</span>
                  <span style={{fontSize:'12px',fontWeight:600,color:'#059669',fontFamily:'Inter,sans-serif'}}>FREE</span>
                </div>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                  <span style={{fontSize:'14px',fontWeight:600,color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>Total</span>
                  <span style={{fontSize:'22px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif'}}>
                    ₹{subtotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
