
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { X, ShoppingCart, Trash2, ArrowRight, Loader2, Plus, Minus } from 'lucide-react';
import { useCart } from '@/lib/cart';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, count, subtotal, removeItem, loading } = useCart();

  return (
    <>
      {/* Trigger button */}
      <button onClick={() => setOpen(true)}
        style={{position:'relative',display:'inline-flex',alignItems:'center',gap:'6px',
          padding:'8px 14px',borderRadius:'8px',border:'1px solid var(--border)',
          background:'var(--bg-2)',color:'var(--text-2)',cursor:'pointer',fontSize:'13px',fontFamily:'Inter,sans-serif'}}>
        <ShoppingCart style={{width:'16px',height:'16px'}} />
        {count > 0 && (
          <span style={{position:'absolute',top:'-6px',right:'-6px',background:'#1B4D3E',
            color:'white',fontSize:'10px',fontWeight:700,width:'18px',height:'18px',
            borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center'}}>
            {count}
          </span>
        )}
      </button>

      {/* Overlay */}
      {open && (
        <div style={{position:'fixed',inset:0,zIndex:999}} onClick={() => setOpen(false)}>
          <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.5)',backdropFilter:'blur(4px)'}} />
        </div>
      )}

      {/* Drawer */}
      <div style={{position:'fixed',top:0,right:0,bottom:0,width:'min(420px,100vw)',
        background:'var(--bg)',zIndex:1000,transform:open?'translateX(0)':'translateX(100%)',
        transition:'transform 0.3s ease',display:'flex',flexDirection:'column',
        boxShadow:'-4px 0 40px rgba(0,0,0,0.15)'}}>

        {/* Header */}
        <div style={{padding:'20px',display:'flex',alignItems:'center',justifyContent:'space-between',
          borderBottom:'1px solid var(--border)'}}>
          <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
            <ShoppingCart style={{width:'18px',height:'18px',color:'#1B4D3E'}} />
            <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',margin:0}}>
              My Cart
            </h2>
            {count > 0 && (
              <span style={{background:'var(--green-bg)',color:'#1B4D3E',fontSize:'12px',
                fontWeight:700,padding:'2px 8px',borderRadius:'100px',fontFamily:'Inter,sans-serif'}}>
                {count} test{count>1?'s':''}
              </span>
            )}
          </div>
          <button onClick={() => setOpen(false)} style={{background:'none',border:'none',cursor:'pointer',
            color:'var(--text-3)',padding:'4px'}}>
            <X style={{width:'20px',height:'20px'}} />
          </button>
        </div>

        {/* Items */}
        <div style={{flex:1,overflowY:'auto',padding:'16px'}}>
          {items.length === 0 ? (
            <div style={{textAlign:'center',padding:'60px 20px'}}>
              <ShoppingCart style={{width:'48px',height:'48px',color:'var(--text-4)',margin:'0 auto 16px'}} />
              <p style={{fontSize:'15px',fontWeight:600,color:'var(--text-1)',marginBottom:'8px',fontFamily:'Inter,sans-serif'}}>
                Your cart is empty
              </p>
              <p style={{fontSize:'13px',color:'var(--text-3)',fontFamily:'Inter,sans-serif',marginBottom:'20px'}}>
                Add tests to get started
              </p>
              <Link href="/tests" onClick={() => setOpen(false)}
                style={{display:'inline-flex',alignItems:'center',gap:'6px',background:'#1B4D3E',
                  color:'white',fontWeight:600,fontSize:'13px',padding:'10px 20px',
                  borderRadius:'8px',textDecoration:'none',fontFamily:'Inter,sans-serif'}}>
                Browse Tests <ArrowRight style={{width:'14px',height:'14px'}} />
              </Link>
            </div>
          ) : (
            <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
              {items.map(item => (
                <div key={item.id||item.test_id}
                  style={{padding:'14px',borderRadius:'12px',border:'1px solid var(--border)',
                    background:'var(--bg-2)',display:'flex',alignItems:'flex-start',gap:'10px'}}>
                  <div style={{flex:1,minWidth:0}}>
                    <p style={{fontSize:'13px',fontWeight:600,color:'var(--text-1)',
                      marginBottom:'4px',fontFamily:'Inter,sans-serif',lineHeight:'1.3'}}>
                      {item.test_name}
                    </p>
                    <div style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <span style={{fontSize:'16px',fontWeight:700,color:'var(--text-1)',
                        fontFamily:'Playfair Display,serif'}}>
                        ₹{Number(item.mrp).toLocaleString()}
                      </span>
                      <span style={{fontSize:'11px',color:'var(--text-4)',fontFamily:'Inter,sans-serif'}}>
                        · {item.collection_type === 'home' ? '🏠 Home' : '🏥 Centre'}
                      </span>
                    </div>
                  </div>
                  <button onClick={() => item.id && removeItem(item.id)}
                    disabled={loading}
                    style={{background:'none',border:'none',cursor:'pointer',
                      color:'var(--text-4)',padding:'4px',flexShrink:0}}>
                    <Trash2 style={{width:'15px',height:'15px'}} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div style={{padding:'16px',borderTop:'1px solid var(--border)'}}>
            {/* Free home collection badge */}
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
              marginBottom:'8px',padding:'8px 12px',borderRadius:'8px',
              background:'var(--green-bg)',border:'1px solid var(--green-bd)'}}>
              <span style={{fontSize:'12px',color:'#1B4D3E',fontFamily:'Inter,sans-serif'}}>
                🏠 Free home collection included
              </span>
              <span style={{fontSize:'12px',fontWeight:700,color:'#1B4D3E',fontFamily:'Inter,sans-serif'}}>
                FREE
              </span>
            </div>
            {/* Subtotal */}
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:'14px'}}>
              <span style={{fontSize:'14px',color:'var(--text-2)',fontFamily:'Inter,sans-serif'}}>Subtotal</span>
              <span style={{fontSize:'22px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif'}}>
                ₹{subtotal.toLocaleString()}
              </span>
            </div>
            <Link href="/book" onClick={() => setOpen(false)}
              style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
                background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'15px',
                padding:'14px',borderRadius:'10px',textDecoration:'none',
                fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(27,77,62,0.35)'}}>
              Proceed to Book <ArrowRight style={{width:'16px',height:'16px'}} />
            </Link>
            <p style={{textAlign:'center',fontSize:'11px',color:'var(--text-4)',
              marginTop:'10px',fontFamily:'Inter,sans-serif'}}>
              NABL certified · Reports in 24hrs · AI-powered summary
            </p>
          </div>
        )}
      </div>
    </>
  );
}
