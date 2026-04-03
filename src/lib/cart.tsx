
'use client';
import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface CartItem {
  id?: number; test_id: number; test_name: string; mrp: number; quantity: number; collection_type: string;
}
interface CartCtx {
  items: CartItem[]; count: number; subtotal: number; token: string;
  addItem: (item: Omit<CartItem,'id'>) => Promise<void>;
  removeItem: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  loading: boolean;
}
const API = process.env.NEXT_PUBLIC_API_URL || 'https://api.uat.medibridge24x7.com/api';
const CartContext = createContext<CartCtx>({} as CartCtx);

function getToken(): string {
  if (typeof window === 'undefined') return '';
  const t = localStorage.getItem('nhcare_token');
  if (t) return t;
  let g = localStorage.getItem('nhcare_cart_token');
  if (!g) { g = 'guest_'+Date.now()+'_'+Math.random().toString(36).slice(2,8); localStorage.setItem('nhcare_cart_token', g); }
  return g;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');

  const headers = useCallback((t: string) => {
    const h: Record<string,string> = {'Content-Type':'application/json','X-Cart-Token':t};
    const authToken = typeof window !== 'undefined' ? localStorage.getItem('nhcare_token') : null;
    if (authToken) h['Authorization'] = 'Bearer '+authToken;
    return h;
  }, []);

  const refreshCart = useCallback(async () => {
    const t = getToken(); setToken(t);
    if (!t) return;
    try {
      const r = await fetch(`${API}/v1/cart?cart_token=${t}`, { headers: headers(t) });
      const data = await r.json();
      if (data.status === 'ok') setItems(data.data.items || []);
    } catch {}
  }, [headers]);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  const addItem = async (item: Omit<CartItem,'id'>) => {
    const t = getToken(); setToken(t); setLoading(true);
    try {
      const r = await fetch(`${API}/v1/cart`, {
        method:'POST', headers: headers(t),
        body: JSON.stringify({ ...item, cart_token: t })
      });
      const data = await r.json();
      if (data.status === 'ok') await refreshCart();
    } finally { setLoading(false); }
  };

  const removeItem = async (id: number) => {
    const t = getToken(); setLoading(true);
    try {
      await fetch(`${API}/v1/cart/${id}?cart_token=${t}`, { method:'DELETE', headers: headers(t) });
      await refreshCart();
    } finally { setLoading(false); }
  };

  const clearCart = async () => {
    const t = getToken(); setLoading(true);
    try {
      await fetch(`${API}/v1/cart?cart_token=${t}`, { method:'DELETE', headers: headers(t) });
      setItems([]);
    } finally { setLoading(false); }
  };

  const subtotal = items.reduce((s, i) => s + (Number(i.mrp) * i.quantity), 0);
  const count = items.length;

  return (
    <CartContext.Provider value={{ items, count, subtotal, token, addItem, removeItem, clearCart, refreshCart, loading }}>
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => useContext(CartContext);
