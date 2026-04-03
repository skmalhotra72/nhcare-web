'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, ChevronRight, Loader2, Sparkles, Calendar } from 'lucide-react';
import { api } from '@/lib/api';

export default function ReportsPage() {
  const router = useRouter();
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    if (!token) { router.push('/auth/login'); return; }
    api.reports.list(token)
      .then(r => setReports(r.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/dashboard" className="text-cream-100/50 hover:text-cream-100 font-body text-sm mb-3 inline-block">← Dashboard</Link>
          <h1 className="font-display text-2xl font-700 text-white">My Lab Reports</h1>
        </div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-24"><Loader2 className="w-8 h-8 text-gold-400 animate-spin" /></div>
        ) : reports.length === 0 ? (
          <div className="text-center py-16">
            <FileText className="w-12 h-12 text-forest-300 dark:text-forest-700 mx-auto mb-4" />
            <p className="font-display text-xl text-forest-900 dark:text-cream-100 mb-2">No reports yet</p>
            <Link href="/tests" className="btn-gold text-forest-950 font-body font-600 px-6 py-2.5 rounded-xl inline-flex items-center gap-1.5">Book a Test</Link>
          </div>
        ) : (
          <div className="space-y-3">
            {reports.map((r: any) => (
              <Link key={`${r.health_id}-${r.package_name}`} href={`/dashboard/reports/${r.health_id}`}
                className="card-3d glass-card rounded-2xl p-5 flex items-center justify-between gap-4 hover:border-gold-400/30 transition-all">
                <div className="w-10 h-10 bg-forest-50 dark:bg-forest-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FileText className="w-5 h-5 text-forest-600 dark:text-gold-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-body font-600 text-sm text-forest-900 dark:text-cream-100 truncate">{r.package_name || 'Lab Report'}</p>
                  <div className="flex items-center gap-3 mt-0.5">
                    <span className="font-body text-xs text-forest-500 dark:text-forest-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{r.health_date}</span>
                    <span className="font-body text-xs text-forest-500 dark:text-forest-400">{r.observation_count} parameters</span>
                    <span className="font-body text-xs text-forest-500 dark:text-forest-400">{r.pcc_name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="hidden sm:flex items-center gap-1 font-body text-xs text-gold-600 dark:text-gold-400 bg-gold-50 dark:bg-gold-400/10 px-2.5 py-1 rounded-full">
                    <Sparkles className="w-3 h-3" /> AI Summary
                  </span>
                  <ChevronRight className="w-4 h-4 text-forest-300 dark:text-forest-600" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
