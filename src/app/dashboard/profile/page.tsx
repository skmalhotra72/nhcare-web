
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, User, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

export default function ProfilePage() {
  const router = useRouter();
  const [form, setForm] = useState({name:'',email:'',age:'',gender:'male',address:''});
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    const p = localStorage.getItem('nhcare_patient');
    if (!token) { router.push('/auth/login'); return; }
    if (p) {
      const pat = JSON.parse(p);
      setMobile(pat.mobile||'');
      setForm({name:pat.name||'',email:pat.email||'',age:pat.age||'',gender:pat.gender||'male',address:pat.address||''});
    }
    fetch(`${API}/v1/auth/profile`,{headers:{'Authorization':'Bearer '+token}})
      .then(r=>r.json()).then(d=>{
        if(d.status==='ok'&&d.data){
          const p=d.data;
          setMobile(p.mobile||'');
          setForm({name:p.name||'',email:p.email||'',age:p.age||'',gender:p.gender||'male',address:p.address||''});
        }
      }).catch(()=>{}).finally(()=>setLoading(false));
  },[router]);

  const save = async () => {
    const token = localStorage.getItem('nhcare_token');
    if (!token||!form.name.trim()) { setError('Name is required'); return; }
    setSaving(true); setError('');
    try {
      const r = await fetch(`${API}/v1/auth/profile`,{
        method:'PUT',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token},
        body:JSON.stringify(form)
      });
      const d = await r.json();
      if (d.status==='ok') {
        localStorage.setItem('nhcare_patient',JSON.stringify({...JSON.parse(localStorage.getItem('nhcare_patient')||'{}'),...form,mobile}));
        setSaved(true); setTimeout(()=>setSaved(false),3000);
      } else setError(d.message||'Update failed');
    } catch { setError('Network error. Please try again.'); }
    finally { setSaving(false); }
  };

  const inp = (f:string,v:string) => setForm(p=>({...p,[f]:v}));
  const inputStyle = {
    width:'100%',padding:'12px 14px',borderRadius:'10px',fontSize:'14px',
    fontFamily:'Inter,sans-serif',color:'var(--text-1)',outline:'none',
    border:'1.5px solid var(--border)',background:'var(--bg)',
    boxSizing:'border-box' as const,
  };

  if (loading) return (
    <div style={{minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center',background:'var(--bg)'}}>
      <Loader2 style={{width:'32px',height:'32px',color:'#F4B942',animation:'spin 1s linear infinite'}} />
    </div>
  );

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'600px',margin:'0 auto',padding:'0 24px'}}>
          <Link href="/dashboard" style={{display:'inline-flex',alignItems:'center',gap:'6px',
            color:'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'Inter,sans-serif',
            textDecoration:'none',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> Dashboard
          </Link>
          <h1 style={{fontSize:'28px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif'}}>
            My Profile
          </h1>
        </div>
      </div>

      <div style={{maxWidth:'600px',margin:'0 auto',padding:'24px'}}>
        {/* Mobile — read only */}
        <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',
          padding:'20px',marginBottom:'16px',display:'flex',alignItems:'center',gap:'12px'}}>
          <div style={{width:'40px',height:'40px',borderRadius:'12px',background:'var(--green-bg)',
            display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
            <Phone style={{width:'18px',height:'18px',color:'#1B4D3E'}} />
          </div>
          <div>
            <p style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',margin:0}}>Mobile (login)</p>
            <p style={{fontSize:'16px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif',margin:'2px 0 0'}}>
              +91 {mobile}
            </p>
          </div>
          <span style={{marginLeft:'auto',fontSize:'11px',background:'var(--green-bg)',
            color:'#1B4D3E',padding:'3px 10px',borderRadius:'100px',fontFamily:'Inter,sans-serif'}}>
            Verified ✓
          </span>
        </div>

        {/* Edit form */}
        <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px',display:'flex',flexDirection:'column',gap:'16px'}}>
          <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',margin:0}}>
            Personal Information
          </h2>

          <div>
            <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>
              Full Name *
            </label>
            <input value={form.name} onChange={e=>inp('name',e.target.value)}
              placeholder="Your full name" style={inputStyle} />
          </div>

          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px'}}>
            <div>
              <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Age</label>
              <input value={form.age} onChange={e=>inp('age',e.target.value.replace(/\D/g,'').slice(0,3))}
                placeholder="Years" style={inputStyle} type="tel" />
            </div>
            <div>
              <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>Gender</label>
              <select value={form.gender} onChange={e=>inp('gender',e.target.value)}
                style={{...inputStyle,cursor:'pointer'}}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>
              Email
            </label>
            <input value={form.email} onChange={e=>inp('email',e.target.value)}
              placeholder="your@email.com" style={inputStyle} type="email" />
          </div>

          <div>
            <label style={{fontSize:'12px',fontWeight:600,color:'var(--text-2)',display:'block',marginBottom:'6px',fontFamily:'Inter,sans-serif'}}>
              Address
            </label>
            <textarea value={form.address} onChange={e=>inp('address',e.target.value)}
              placeholder="Your home address" rows={3}
              style={{...inputStyle,resize:'vertical'}} />
          </div>

          {error && (
            <div style={{padding:'10px 14px',borderRadius:'8px',background:'rgba(220,38,38,0.08)',
              border:'1px solid rgba(220,38,38,0.2)',color:'#dc2626',fontSize:'13px',fontFamily:'Inter,sans-serif'}}>
              {error}
            </div>
          )}
          {saved && (
            <div style={{padding:'10px 14px',borderRadius:'8px',background:'rgba(16,185,129,0.08)',
              border:'1px solid rgba(16,185,129,0.2)',display:'flex',alignItems:'center',gap:'8px'}}>
              <CheckCircle2 style={{width:'16px',height:'16px',color:'#059669'}} />
              <span style={{color:'#059669',fontSize:'13px',fontFamily:'Inter,sans-serif'}}>Profile updated successfully!</span>
            </div>
          )}

          <button onClick={save} disabled={saving}
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
              background:saving?'#2d6b60':'#1B4D3E',color:'white',fontWeight:700,fontSize:'15px',
              padding:'13px',borderRadius:'10px',border:'none',cursor:saving?'not-allowed':'pointer',
              fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(27,77,62,0.3)'}}>
            {saving
              ? <><Loader2 style={{width:'16px',height:'16px',animation:'spin 1s linear infinite'}}/>Saving...</>
              : <><Save style={{width:'16px',height:'16px'}}/>Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}
