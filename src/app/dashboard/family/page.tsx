
'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Loader2, Users, User, Edit2, X, Check } from 'lucide-react';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';
const RELATIONS = ['Spouse','Father','Mother','Son','Daughter','Brother','Sister','Grandfather','Grandmother','Other'];

export default function FamilyPage() {
  const router = useRouter();
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({name:'',relation:'Spouse',age:'',gender:'male'});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    const token = localStorage.getItem('nhcare_token');
    if (!token) { router.push('/auth/login'); return; }
    fetch(`${API}/v1/patients/family`,{headers:{'Authorization':'Bearer '+token}})
      .then(r=>r.json()).then(d=>setMembers(d.data||[])).catch(()=>{}).finally(()=>setLoading(false));
  };

  useEffect(()=>{ load(); },[]);

  const addMember = async () => {
    if (!form.name.trim()||!form.relation) { setError('Name and relation required'); return; }
    const token = localStorage.getItem('nhcare_token');
    setSaving(true); setError('');
    try {
      const r = await fetch(`${API}/v1/patients/family`,{
        method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer '+token||''},
        body:JSON.stringify(form)
      });
      const d = await r.json();
      if (d.status==='ok') {
        setMembers(m=>[...m,d.data]);
        setForm({name:'',relation:'Spouse',age:'',gender:'male'});
        setShowForm(false);
      } else setError(d.message||'Failed to add');
    } catch { setError('Network error'); }
    finally { setSaving(false); }
  };

  const removeMember = async (id:number) => {
    const token = localStorage.getItem('nhcare_token');
    try {
      await fetch(`${API}/v1/patients/family/${id}`,{method:'DELETE',headers:{'Authorization':'Bearer '+token||''}});
      setMembers(m=>m.filter(x=>x.id!==id));
    } catch {}
  };

  const inp = (f:string,v:string) => setForm(p=>({...p,[f]:v}));
  const inputStyle = {
    width:'100%',padding:'10px 14px',borderRadius:'8px',fontSize:'14px',
    fontFamily:'Inter,sans-serif',color:'var(--text-1)',outline:'none',
    border:'1.5px solid var(--border)',background:'var(--bg)',boxSizing:'border-box' as const,
  };

  const RELATION_COLORS: Record<string,string> = {
    Spouse:'#ec4899',Father:'#1B4D3E',Mother:'#7c3aed',Son:'#2563eb',
    Daughter:'#d97706',Brother:'#0891b2',Sister:'#be185d',Other:'#64748b'
  };

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 24px'}}>
          <Link href="/dashboard" style={{display:'inline-flex',alignItems:'center',gap:'6px',
            color:'rgba(255,255,255,0.5)',fontSize:'13px',fontFamily:'Inter,sans-serif',
            textDecoration:'none',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> Dashboard
          </Link>
          <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div>
              <h1 style={{fontSize:'28px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif'}}>
                Family Members
              </h1>
              <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',fontFamily:'Inter,sans-serif',marginTop:'4px'}}>
                Book tests for your family — up to 10 members
              </p>
            </div>
            <button onClick={()=>setShowForm(true)}
              style={{display:'flex',alignItems:'center',gap:'6px',background:'#F4B942',
                color:'#0f172a',fontWeight:700,fontSize:'13px',padding:'10px 18px',
                borderRadius:'10px',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
              <Plus style={{width:'15px',height:'15px'}} /> Add
            </button>
          </div>
        </div>
      </div>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'24px'}}>
        {/* Add form */}
        {showForm && (
          <div style={{background:'var(--bg-2)',border:'1px solid #1B4D3E',borderRadius:'16px',
            padding:'20px',marginBottom:'16px'}}>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'16px'}}>
              <h3 style={{fontSize:'16px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif',margin:0}}>
                Add Family Member
              </h3>
              <button onClick={()=>{setShowForm(false);setError('');}}
                style={{background:'none',border:'none',cursor:'pointer',color:'var(--text-4)'}}>
                <X style={{width:'18px',height:'18px'}} />
              </button>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'12px',marginBottom:'12px'}}>
              <div style={{gridColumn:'1/-1'}}>
                <input value={form.name} onChange={e=>inp('name',e.target.value)}
                  placeholder="Full name *" style={inputStyle} />
              </div>
              <div>
                <select value={form.relation} onChange={e=>inp('relation',e.target.value)} style={{...inputStyle,cursor:'pointer'}}>
                  {RELATIONS.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <select value={form.gender} onChange={e=>inp('gender',e.target.value)} style={{...inputStyle,cursor:'pointer'}}>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div style={{gridColumn:'1/-1'}}>
                <input value={form.age} onChange={e=>inp('age',e.target.value.replace(/\D/g,'').slice(0,3))}
                  placeholder="Age (optional)" style={inputStyle} type="tel" />
              </div>
            </div>
            {error && <p style={{color:'#dc2626',fontSize:'12px',fontFamily:'Inter,sans-serif',marginBottom:'10px'}}>{error}</p>}
            <div style={{display:'flex',gap:'8px'}}>
              <button onClick={addMember} disabled={saving}
                style={{flex:1,display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
                  background:'#1B4D3E',color:'white',fontWeight:600,fontSize:'14px',padding:'11px',
                  borderRadius:'8px',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
                {saving?<Loader2 style={{width:'15px',height:'15px',animation:'spin 1s linear infinite'}}/>:<><Check style={{width:'15px',height:'15px'}}/>Add Member</>}
              </button>
            </div>
          </div>
        )}

        {loading ? (
          <div style={{textAlign:'center',padding:'60px'}}>
            <Loader2 style={{width:'32px',height:'32px',color:'#F4B942',animation:'spin 1s linear infinite',margin:'0 auto'}} />
          </div>
        ) : members.length===0 && !showForm ? (
          <div style={{textAlign:'center',padding:'60px',background:'var(--bg-2)',
            borderRadius:'16px',border:'1px solid var(--border)'}}>
            <Users style={{width:'48px',height:'48px',color:'var(--text-4)',margin:'0 auto 12px'}} />
            <p style={{fontSize:'15px',fontWeight:600,color:'var(--text-1)',fontFamily:'Inter,sans-serif',marginBottom:'6px'}}>
              No family members added yet
            </p>
            <p style={{fontSize:'13px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',marginBottom:'16px'}}>
              Add family members to book tests for them
            </p>
            <button onClick={()=>setShowForm(true)}
              style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#1B4D3E',
                color:'white',fontWeight:600,fontSize:'13px',padding:'10px 20px',
                borderRadius:'8px',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
              <Plus style={{width:'15px',height:'15px'}} /> Add First Member
            </button>
          </div>
        ) : (
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:'12px'}}>
            {members.map((m:any)=>{
              const relColor = RELATION_COLORS[m.relation]||'#64748b';
              return (
                <div key={m.id} style={{background:'var(--bg-2)',border:'1px solid var(--border)',
                  borderRadius:'14px',padding:'18px',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,left:0,right:0,height:'3px',background:relColor}} />
                  <div style={{display:'flex',alignItems:'flex-start',gap:'12px'}}>
                    <div style={{width:'44px',height:'44px',borderRadius:'12px',flexShrink:0,
                      display:'flex',alignItems:'center',justifyContent:'center',
                      background:`${relColor}15`,border:`1px solid ${relColor}25`}}>
                      <User style={{width:'20px',height:'20px',color:relColor}} />
                    </div>
                    <div style={{flex:1,minWidth:0}}>
                      <p style={{fontSize:'15px',fontWeight:700,color:'var(--text-1)',
                        fontFamily:'Inter,sans-serif',margin:'0 0 2px',overflow:'hidden',
                        textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{m.name}</p>
                      <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                        <span style={{fontSize:'11px',fontWeight:600,padding:'2px 8px',borderRadius:'100px',
                          background:`${relColor}12`,color:relColor,fontFamily:'Inter,sans-serif'}}>
                          {m.relation}
                        </span>
                        {m.age && <span style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                          {m.age} yrs
                        </span>}
                        {m.gender && <span style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                          · {m.gender}
                        </span>}
                      </div>
                    </div>
                    <button onClick={()=>removeMember(m.id)}
                      style={{background:'none',border:'none',cursor:'pointer',
                        color:'var(--text-4)',padding:'4px',flexShrink:0}}>
                      <Trash2 style={{width:'15px',height:'15px'}} />
                    </button>
                  </div>
                  <Link href={`/tests?for=${encodeURIComponent(m.name)}`}
                    style={{display:'flex',alignItems:'center',justifyContent:'center',
                      marginTop:'14px',padding:'8px',borderRadius:'8px',
                      background:relColor,color:'white',fontWeight:600,fontSize:'12px',
                      textDecoration:'none',fontFamily:'Inter,sans-serif',gap:'4px'}}>
                    Book Test for {m.name.split(' ')[0]}
                  </Link>
                </div>
              );
            })}
          </div>
        )}

        {members.length>0 && (
          <p style={{textAlign:'center',fontSize:'12px',color:'var(--text-4)',
            fontFamily:'Inter,sans-serif',marginTop:'16px'}}>
            {members.length}/10 family members added
          </p>
        )}
      </div>
    </div>
  );
}
