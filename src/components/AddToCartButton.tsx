
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, CheckCircle2, Loader2 } from 'lucide-react';
import { useCart } from '@/lib/cart';

interface Props { testId: number; testName: string; mrp: number; }

export default function AddToCartButton({ testId, testName, mrp }: Props) {
  const { addItem, items, loading } = useCart();
  const [added, setAdded] = useState(false);
  const router = useRouter();
  const inCart = items.some(i => i.test_id === testId);

  const handleAdd = async () => {
    await addItem({ test_id: testId, test_name: testName, mrp, quantity: 1, collection_type: 'home' });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (inCart) return (
    <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'6px',
        padding:'12px',borderRadius:'10px',background:'rgba(16,185,129,0.08)',
        border:'1px solid rgba(16,185,129,0.25)'}}>
        <CheckCircle2 style={{width:'16px',height:'16px',color:'#059669'}} />
        <span style={{fontSize:'13px',fontWeight:600,color:'#059669',fontFamily:'Inter,sans-serif'}}>
          Added to cart
        </span>
      </div>
      <button onClick={() => router.push('/book')}
        style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
          background:'#1B4D3E',color:'white',fontWeight:700,fontSize:'14px',
          padding:'13px',borderRadius:'10px',border:'none',cursor:'pointer',
          fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(27,77,62,0.35)'}}>
        <ShoppingCart style={{width:'16px',height:'16px'}} /> Proceed to Book
      </button>
    </div>
  );

  return (
    <div style={{display:'flex',flexDirection:'column',gap:'8px'}}>
      <button onClick={handleAdd} disabled={loading}
        style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
          background: added ? '#059669' : '#1B4D3E',
          color:'white',fontWeight:700,fontSize:'14px',padding:'13px',
          borderRadius:'10px',border:'none',cursor:loading?'not-allowed':'pointer',
          fontFamily:'Inter,sans-serif',boxShadow:'0 4px 16px rgba(27,77,62,0.35)',
          transition:'background 0.2s'}}>
        {loading ? <Loader2 style={{width:'16px',height:'16px',animation:'spin 1s linear infinite'}} />
         : added ? <><CheckCircle2 style={{width:'16px',height:'16px'}} /> Added!</>
         : <><ShoppingCart style={{width:'16px',height:'16px'}} /> Add to Cart</>}
      </button>
      <button onClick={() => { handleAdd(); setTimeout(() => router.push('/book'), 300); }}
        disabled={loading}
        style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',
          background:'#F4B942',color:'#0f172a',fontWeight:700,fontSize:'14px',padding:'12px',
          borderRadius:'10px',border:'none',cursor:'pointer',fontFamily:'Inter,sans-serif'}}>
        Book Now
      </button>
    </div>
  );
}
