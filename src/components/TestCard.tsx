'use client';
import Link from 'next/link';
import { Clock, Droplets, ArrowRight, ShoppingCart, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface Test { id: number; test_parameter: string; description: string; mrp: number; net?: string; tat?: string; fasting_required?: string; type: string; sample?: string; }

export default function TestCard({ test }: { test: Test }) {
  const [added, setAdded] = useState(false);
  const name = test.test_parameter?.split('\n')[0]?.trim() || test.description?.split('\n')[0]?.trim() || 'Test';

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    setAdded(true);
    const cart = JSON.parse(localStorage.getItem('nhcare_cart') || '[]');
    if (!cart.find((c: Test) => c.id === test.id)) {
      cart.push(test);
      localStorage.setItem('nhcare_cart', JSON.stringify(cart));
    }
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="card-3d glass-card rounded-2xl overflow-hidden group">
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex-1 min-w-0">
            <span className={`inline-block text-[10px] font-body font-600 px-2 py-0.5 rounded-full mb-2 uppercase tracking-wide ${test.type === 'PROFILE' ? 'bg-gold-50 text-gold-600 dark:bg-gold-500/20 dark:text-gold-400' : 'bg-forest-50 text-forest-700 dark:bg-forest-900/50 dark:text-forest-300'}`}>
              {test.type === 'PROFILE' ? 'Panel' : 'Test'}
            </span>
            <h3 className="font-body font-600 text-sm text-forest-900 dark:text-cream-100 line-clamp-2 leading-snug">{name}</h3>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display font-700 text-lg text-forest-900 dark:text-gold-400">₹{test.mrp}</p>
            {test.net && test.net !== '0' && test.net !== '' && (
              <p className="text-xs text-forest-400 line-through">₹{parseFloat(test.net).toFixed(0)}</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-3 mb-4">
          {test.tat && (
            <span className="flex items-center gap-1 text-xs font-body text-forest-500 dark:text-forest-400">
              <Clock className="w-3 h-3" />{test.tat}d TAT
            </span>
          )}
          {test.fasting_required && test.fasting_required !== 'NO' && (
            <span className="flex items-center gap-1 text-xs font-body text-amber-600 dark:text-amber-400">
              <Droplets className="w-3 h-3" />Fasting
            </span>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/tests/${test.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 border border-forest-200 dark:border-forest-700 rounded-xl text-sm font-body font-500 text-forest-700 dark:text-cream-200 hover:bg-forest-50 dark:hover:bg-forest-900/30 transition-all">
            Details <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <button onClick={handleAdd}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-sm font-body font-600 transition-all ${added ? 'bg-green-500 text-white' : 'btn-gold text-forest-950'}`}>
            {added ? (<><CheckCircle className="w-3.5 h-3.5" />Added</>) : (<><ShoppingCart className="w-3.5 h-3.5" />Add</>)}
          </button>
        </div>
      </div>
    </div>
  );
}
