'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Calendar, FileText, User, LogOut, Activity, ArrowRight, Loader2, ChevronRight } from 'lucide-react';
import { api } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const [patient, setPatient] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    const p = localStorage.getItem('nhcare_patient');
    if (!token) { router.push('/auth/login'); return; }
    if (p) setPatient(JSON.parse(p));
    Promise.all([
      api.bookings.list(token).catch(() => ({ data: [] })),
      api.reports.list(token).catch(() => ({ data: [] })),
    ]).then(([b, r]) => {
      setBookings(b.data?.slice(0, 5) || []);
      setReports(r.data?.slice(0, 3) || []);
    }).finally(() => setLoading(false));
  }, [router]);

  const logout = () => {
    localStorage.removeItem('nhcare_token');
    localStorage.removeItem('nhcare_patient');
    router.push('/');
  };

  if (loading) return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-20 flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-8">
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div>
            <p className="font-body text-xs text-cream-100/50 mb-0.5">Welcome back</p>
            <h1 className="font-display text-2xl font-700 text-white">{patient?.name || 'Patient'}</h1>
            <p className="font-body text-xs text-gold-400/80 mt-0.5">+91 {patient?.mobile}</p>
          </div>
          <button onClick={logout} className="flex items-center gap-1.5 text-cream-100/50 hover:text-cream-100 transition-colors text-sm font-body">
            <LogOut className="w-4 h-4" /> Sign Out
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Quick nav */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
          {[
            { icon: Calendar, label: 'My Bookings', href: '/dashboard/bookings', count: bookings.length },
            { icon: FileText, label: 'My Reports', href: '/dashboard/reports', count: reports.length },
            { icon: Activity, label: 'Book Test', href: '/tests', count: null },
            { icon: User, label: 'My Profile', href: '/dashboard/profile', count: null },
          ].map(item => (
            <Link key={item.href} href={item.href}
              className="card-3d glass-card rounded-2xl p-4 flex flex-col items-center gap-2.5 hover:border-gold-400/30 transition-all text-center group">
              <div className="w-10 h-10 bg-forest-50 dark:bg-forest-900 rounded-xl flex items-center justify-center">
                <item.icon className="w-5 h-5 text-forest-700 dark:text-gold-400" />
              </div>
              <span className="font-body text-xs font-600 text-forest-800 dark:text-cream-200">{item.label}</span>
              {item.count !== null && <span className="font-mono text-xs text-forest-500 dark:text-forest-400">{item.count} total</span>}
            </Link>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Bookings */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between">
              <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100">Recent Bookings</h2>
              <Link href="/dashboard/bookings" className="font-body text-xs text-forest-500 dark:text-forest-400 hover:text-gold-500 flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="divide-y divide-forest-50 dark:divide-forest-900">
              {bookings.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="font-body text-sm text-forest-500 dark:text-forest-400 mb-3">No bookings yet</p>
                  <Link href="/tests" className="btn-gold text-forest-950 font-body font-600 text-xs px-4 py-2 rounded-xl inline-flex items-center gap-1">Book a Test <ArrowRight className="w-3 h-3" /></Link>
                </div>
              ) : bookings.map((b: any) => (
                <div key={b.id} className="px-5 py-3.5 flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-body text-sm font-600 text-forest-900 dark:text-cream-100 truncate">{b.name}</p>
                    <p className="font-body text-xs text-forest-500 dark:text-forest-400">{b.ref_num || `#${b.id}`} · {b.s_date}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-body text-sm font-600 text-forest-900 dark:text-gold-400">₹{b.total_amount}</p>
                    <span className={`font-body text-[10px] px-2 py-0.5 rounded-full ${b.pay_status === 1 ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                      {b.pay_status === 1 ? 'Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Reports */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="px-5 py-4 border-b border-forest-100 dark:border-forest-800 flex items-center justify-between">
              <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100">Lab Reports</h2>
              <Link href="/dashboard/reports" className="font-body text-xs text-forest-500 dark:text-forest-400 hover:text-gold-500 flex items-center gap-0.5">View all <ChevronRight className="w-3 h-3" /></Link>
            </div>
            <div className="divide-y divide-forest-50 dark:divide-forest-900">
              {reports.length === 0 ? (
                <div className="px-5 py-8 text-center">
                  <p className="font-body text-sm text-forest-500 dark:text-forest-400">No reports available yet</p>
                </div>
              ) : reports.map((r: any) => (
                <Link key={r.health_id} href={`/dashboard/reports/${r.health_id}`}
                  className="px-5 py-3.5 flex items-center justify-between gap-3 hover:bg-forest-50/50 dark:hover:bg-forest-900/30 transition-colors">
                  <div className="min-w-0">
                    <p className="font-body text-sm font-600 text-forest-900 dark:text-cream-100 truncate">{r.package_name || 'Lab Report'}</p>
                    <p className="font-body text-xs text-forest-500 dark:text-forest-400">{r.health_date} · {r.observation_count} parameters</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-body text-[10px] px-2 py-0.5 rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">Ready</span>
                    <ChevronRight className="w-3.5 h-3.5 text-forest-300 dark:text-forest-600" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
