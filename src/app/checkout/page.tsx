
'use client';
import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { ArrowLeft, Loader2, Tag, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useCart } from '@/lib/cart';

const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';

function CheckoutContent() {
  const router = useRouter();
  const sp = useSearchParams();
  const { items, subtotal, token, clearCart } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [discountMsg, setDiscountMsg] = useState('');
  const [discountValid, setDiscountValid] = useState(false);
  const [discLoading, setDiscLoading] = useState(false);
  const [payLoading, setPayLoading] = useState(false);
  const [error, setError] = useState('');
  const rzpRef = useRef<any>(null);

  const bookingData = {
    patient_name:    sp.get('patient_name')||'',
    patient_mobile:  sp.get('patient_mobile')||'',
    collection_type: sp.get('collection_type')||'home',
    collection_date: sp.get('collection_date')||'',
    collection_slot: sp.get('collection_slot')||'',
    address:         sp.get('address')||'',
    pincode:         sp.get('pincode')||'',
    cart_token:      sp.get('cart_token')||token,
  };

  const finalAmount = Math.max(0, subtotal - discount);

  useEffect(() => {
    if (items.length === 0) router.push('/tests');
  }, [items, router]);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.body.appendChild(script);
    return () => { document.body.removeChild(script); };
  }, []);

  const applyDiscount = async () => {
    if (!discountCode.trim()) return;
    setDiscLoading(true); setDiscountMsg('');
    try {
      const r = await fetch(`${API}/v1/discounts/validate`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ code: discountCode, order_amount: subtotal })
      });
      const d = await r.json();
      if (d.valid) {
        setDiscount(d.discount); setDiscountValid(true);
        setDiscountMsg(d.message);
      } else {
        setDiscount(0); setDiscountValid(false);
        setDiscountMsg(d.message||'Invalid code');
      }
    } finally { setDiscLoading(false); }
  };

  const handlePayment = async () => {
    setPayLoading(true); setError('');
    try {
      // Create Razorpay order
      const r = await fetch(`${API}/v1/payment/razorpay/create`, {
        method:'POST', headers:{'Content-Type':'application/json'},
        body: JSON.stringify({
          ...bookingData,
          discount_code: discountValid ? discountCode : undefined,
        })
      });
      const orderData = await r.json();
      if (orderData.status !== 'ok') throw new Error(orderData.message||'Order creation failed');

      // Open Razorpay checkout
      const options = {
        key:         orderData.key,
        amount:      orderData.amount,
        currency:    orderData.currency,
        name:        'NHCare Pathlabs',
        description: `${items.length} test${items.length>1?'s':''} · Home collection`,
        order_id:    orderData.order_id,
        prefill:     orderData.prefill,
        theme:       { color: '#1B4D3E' },
        handler: async (response: any) => {
          // Verify payment
          const verifyR = await fetch(`${API}/v1/payment/razorpay/verify`, {
            method:'POST', headers:{'Content-Type':'application/json'},
            body: JSON.stringify({ ...response, cart_token: bookingData.cart_token })
          });
          const verifyData = await verifyR.json();
          if (verifyData.status === 'ok') {
            await clearCart();
            router.push(`/booking/confirmed?booking_id=${verifyData.booking_id}&order_id=${verifyData.order_id}&amount=${orderData.amount/100}&name=${encodeURIComponent(bookingData.patient_name)}&date=${bookingData.collection_date}&slot=${bookingData.collection_slot}&payment_id=${response.razorpay_payment_id}`);
          } else {
            setError('Payment verified but booking failed. Please contact support.');
          }
        },
        modal: { ondismiss: () => { setPayLoading(false); } }
      };

      rzpRef.current = new (window as any).Razorpay(options);
      rzpRef.current.open();
    } catch (e: any) {
      setError(e.message||'Payment failed. Please try again.');
      setPayLoading(false);
    }
  };

  return (
    <div style={{background:'var(--bg)',minHeight:'100vh'}}>
      <div style={{background:'#1B4D3E',padding:'32px 0 40px'}}>
        <div style={{maxWidth:'680px',margin:'0 auto',padding:'0 24px'}}>
          <button onClick={()=>router.back()}
            style={{display:'inline-flex',alignItems:'center',gap:'6px',color:'rgba(255,255,255,0.5)',
              fontSize:'13px',fontFamily:'Inter,sans-serif',background:'none',border:'none',cursor:'pointer',marginBottom:'16px'}}>
            <ArrowLeft style={{width:'14px',height:'14px'}} /> Back
          </button>
          <h1 style={{fontSize:'28px',fontWeight:700,color:'white',fontFamily:'Playfair Display,serif'}}>
            Payment
          </h1>
        </div>
      </div>

      <div style={{maxWidth:'680px',margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'flex',flexDirection:'column',gap:'16px'}}>

          {/* Order summary */}
          <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'24px'}}>
            <h2 style={{fontSize:'18px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif',marginBottom:'16px'}}>
              Order Summary
            </h2>
            {items.map(item=>(
              <div key={item.test_id} style={{display:'flex',justifyContent:'space-between',
                padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:'13px',color:'var(--text-2)',fontFamily:'Inter,sans-serif',flex:1,paddingRight:'12px'}}>
                  {item.test_name}
                </span>
                <span style={{fontSize:'14px',fontWeight:600,color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>
                  ₹{Number(item.mrp).toLocaleString()}
                </span>
              </div>
            ))}
            <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
              <span style={{fontSize:'13px',color:'var(--text-2)',fontFamily:'Inter,sans-serif'}}>Home Collection</span>
              <span style={{fontSize:'13px',fontWeight:600,color:'#059669',fontFamily:'Inter,sans-serif'}}>FREE</span>
            </div>
            {discount > 0 && (
              <div style={{display:'flex',justifyContent:'space-between',padding:'10px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:'13px',color:'#059669',fontFamily:'Inter,sans-serif'}}>Discount ({discountCode})</span>
                <span style={{fontSize:'13px',fontWeight:600,color:'#059669',fontFamily:'Inter,sans-serif'}}>− ₹{discount}</span>
              </div>
            )}
            <div style={{display:'flex',justifyContent:'space-between',paddingTop:'14px',alignItems:'center'}}>
              <span style={{fontSize:'16px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>Total Payable</span>
              <span style={{fontSize:'28px',fontWeight:700,color:'var(--text-1)',fontFamily:'Playfair Display,serif'}}>
                ₹{finalAmount.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Discount code */}
          <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'20px'}}>
            <h3 style={{fontSize:'15px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif',
              display:'flex',alignItems:'center',gap:'6px',marginBottom:'12px'}}>
              <Tag style={{width:'16px',height:'16px',color:'#1B4D3E'}} /> Apply Discount Code
            </h3>
            <div style={{display:'flex',gap:'8px'}}>
              <input value={discountCode} onChange={e=>setDiscountCode(e.target.value.toUpperCase())}
                placeholder="Try NHCARE20, FLAT100, FIRST50"
                onKeyDown={e=>e.key==='Enter'&&applyDiscount()}
                style={{flex:1,padding:'10px 14px',borderRadius:'8px',fontSize:'13px',
                  fontFamily:'Inter,sans-serif',border:'1.5px solid var(--border)',
                  background:'var(--bg)',color:'var(--text-1)',outline:'none',letterSpacing:'0.05em'}} />
              <button onClick={applyDiscount} disabled={discLoading}
                style={{padding:'10px 18px',background:'#1B4D3E',color:'white',fontWeight:600,
                  fontSize:'13px',borderRadius:'8px',border:'none',cursor:'pointer',
                  fontFamily:'Inter,sans-serif',whiteSpace:'nowrap',opacity:discLoading?0.7:1}}>
                {discLoading?<Loader2 style={{width:'14px',height:'14px',animation:'spin 1s linear infinite'}}/>:'Apply'}
              </button>
            </div>
            {discountMsg && (
              <p style={{marginTop:'8px',fontSize:'12px',fontFamily:'Inter,sans-serif',
                color:discountValid?'#059669':'#dc2626',display:'flex',alignItems:'center',gap:'4px'}}>
                {discountValid?<CheckCircle2 style={{width:'12px',height:'12px'}}/>:null} {discountMsg}
              </p>
            )}
          </div>

          {/* Booking details recap */}
          <div style={{background:'var(--bg-2)',border:'1px solid var(--border)',borderRadius:'16px',padding:'20px'}}>
            <h3 style={{fontSize:'15px',fontWeight:700,color:'var(--text-1)',fontFamily:'Inter,sans-serif',marginBottom:'12px'}}>
              Collection Details
            </h3>
            {[
              {l:'Patient', v:bookingData.patient_name},
              {l:'Mobile', v:bookingData.patient_mobile},
              {l:'Date', v:new Date(bookingData.collection_date).toLocaleDateString('en-IN',{weekday:'long',day:'numeric',month:'long'})},
              {l:'Slot', v:bookingData.collection_slot},
              bookingData.collection_type==='home'?{l:'Address', v:`${bookingData.address}, ${bookingData.pincode}`}:{l:'Collection', v:'Centre Visit'},
            ].filter(Boolean).map((row:any)=>(
              <div key={row.l} style={{display:'flex',gap:'12px',padding:'6px 0',borderBottom:'1px solid var(--border)'}}>
                <span style={{fontSize:'12px',color:'var(--text-4)',fontFamily:'Inter,sans-serif',width:'70px',flexShrink:0}}>{row.l}</span>
                <span style={{fontSize:'13px',color:'var(--text-1)',fontFamily:'Inter,sans-serif'}}>{row.v}</span>
              </div>
            ))}
          </div>

          {error && (
            <div style={{padding:'12px 16px',borderRadius:'10px',background:'rgba(220,38,38,0.08)',
              border:'1px solid rgba(220,38,38,0.2)',color:'#dc2626',fontSize:'13px',fontFamily:'Inter,sans-serif'}}>
              ⚠️ {error}
            </div>
          )}

          {/* Pay button */}
          <button onClick={handlePayment} disabled={payLoading}
            style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'10px',
              background:payLoading?'#2d6b60':'#1B4D3E',color:'white',fontWeight:700,fontSize:'16px',
              padding:'16px',borderRadius:'12px',border:'none',cursor:payLoading?'not-allowed':'pointer',
              fontFamily:'Inter,sans-serif',boxShadow:'0 4px 20px rgba(27,77,62,0.4)',transition:'all 0.2s'}}>
            {payLoading
              ? <><Loader2 style={{width:'18px',height:'18px',animation:'spin 1s linear infinite'}}/>Processing...</>
              : <>🔒 Pay ₹{finalAmount.toLocaleString()} Securely</>}
          </button>

          <div style={{textAlign:'center',display:'flex',alignItems:'center',justifyContent:'center',
            gap:'6px',color:'var(--text-4)',fontSize:'12px',fontFamily:'Inter,sans-serif'}}>
            <ShieldCheck style={{width:'14px',height:'14px'}} />
            Secured by Razorpay · UPI · Cards · NetBanking · Wallets
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return <Suspense fallback={<div style={{display:'flex',justifyContent:'center',padding:'80px'}}><Loader2 style={{width:'32px',height:'32px',color:'#F4B942',animation:'spin 1s linear infinite'}}/></div>}>
    <CheckoutContent />
  </Suspense>;
}
