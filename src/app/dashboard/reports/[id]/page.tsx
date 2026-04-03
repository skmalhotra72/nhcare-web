'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Sparkles, TrendingUp, TrendingDown, Minus, Brain, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';
import { api } from '@/lib/api';

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [report, setReport] = useState<any>(null);
  const [aiSummary, setAiSummary] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('nhcare_token');
    if (!token) { router.push('/auth/login'); return; }
    api.reports.get(parseInt(params.id), token)
      .then(r => setReport(r.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [params.id, router]);

  const loadAI = async () => {
    const token = localStorage.getItem('nhcare_token');
    if (!token || aiLoading) return;
    setAiLoading(true);
    try {
      const res = await api.reports.aiSummary(parseInt(params.id), token);
      setAiSummary(res.ai_summary || '');
    } catch { setAiSummary('AI summary unavailable at this time.'); }
    finally { setAiLoading(false); }
  };

  const toggleTest = (name: string) => setExpanded(e => e.includes(name) ? e.filter(x => x !== name) : [...e, name]);

  const flagColor = (flag: string) => {
    if (flag === 'HIGH') return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
    if (flag === 'LOW') return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
    return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
  };

  const FlagIcon = ({ flag }: { flag: string }) => {
    if (flag === 'HIGH') return <TrendingUp className="w-3.5 h-3.5" />;
    if (flag === 'LOW') return <TrendingDown className="w-3.5 h-3.5" />;
    return <Minus className="w-3.5 h-3.5" />;
  };

  if (loading) return <div className="min-h-screen pt-20 flex items-center justify-center bg-cream-50 dark:bg-forest-950"><Loader2 className="w-8 h-8 text-gold-400 animate-spin" /></div>;
  if (!report) return <div className="min-h-screen pt-20 flex items-center justify-center bg-cream-50 dark:bg-forest-950"><p className="font-body text-forest-700 dark:text-cream-200">Report not found</p></div>;

  const { header, tests, summary } = report;

  return (
    <div className="min-h-screen bg-cream-50 dark:bg-forest-950 pt-16">
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <Link href="/dashboard/reports" className="inline-flex items-center gap-1.5 text-cream-100/50 hover:text-cream-100 font-body text-sm mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" /> My Reports
          </Link>
          <h1 className="font-display text-xl sm:text-2xl font-700 text-white mb-1">{header.package_name || 'Lab Report'}</h1>
          <div className="flex flex-wrap gap-3 text-xs font-body text-cream-100/50">
            <span>{header.patient_name}</span>
            <span>·</span><span>{header.gender}, {header.age} yrs</span>
            <span>·</span><span>{header.health_date}</span>
            <span>·</span><span>{header.pcc_name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-5">
        {/* Summary stats */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'Total Parameters', val: summary.total_observations, col: 'bg-forest-50 dark:bg-forest-900/40' },
            { label: 'Normal', val: summary.normal_count, col: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400' },
            { label: 'Abnormal', val: summary.abnormal_count, col: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400' },
          ].map(s => (
            <div key={s.label} className={`${s.col} rounded-2xl p-4 text-center`}>
              <p className="font-display text-2xl font-700 text-forest-900 dark:text-cream-100">{s.val}</p>
              <p className="font-body text-xs text-forest-500 dark:text-forest-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* AI Summary */}
        <div className="glass-card rounded-2xl overflow-hidden">
          <div className="px-5 py-4 bg-gradient-to-r from-forest-900/5 to-gold-400/5 dark:from-forest-800/30 dark:to-gold-400/10 border-b border-forest-100 dark:border-forest-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-gold-500" />
                <h2 className="font-display text-lg font-700 text-forest-900 dark:text-cream-100">AI Health Summary</h2>
              </div>
              {!aiSummary && (
                <button onClick={loadAI} disabled={aiLoading}
                  className="btn-gold text-forest-950 font-body font-600 text-xs px-4 py-2 rounded-xl flex items-center gap-1.5">
                  {aiLoading ? <><Loader2 className="w-3.5 h-3.5 animate-spin" /> Analyzing...</> : <><Sparkles className="w-3.5 h-3.5" /> Generate</>}
                </button>
              )}
            </div>
          </div>
          <div className="p-5">
            {aiSummary ? (
              <div className="font-body text-sm text-forest-700 dark:text-forest-300 leading-relaxed whitespace-pre-wrap">{aiSummary}</div>
            ) : (
              <p className="font-body text-sm text-forest-400 dark:text-forest-500 text-center py-4">Click &ldquo;Generate&rdquo; for AI-powered plain language explanation of your results</p>
            )}
          </div>
        </div>

        {/* Test Results */}
        {tests?.map((t: any) => (
          <div key={t.test_name} className="glass-card rounded-2xl overflow-hidden">
            <button onClick={() => toggleTest(t.test_name)}
              className="w-full px-5 py-4 flex items-center justify-between gap-3 hover:bg-forest-50/50 dark:hover:bg-forest-900/20 transition-colors">
              <div className="flex items-center gap-2">
                <h3 className="font-display text-sm font-700 text-forest-900 dark:text-cream-100 text-left">{t.test_name}</h3>
                <span className="font-body text-xs text-forest-400">({t.observations?.length} params)</span>
              </div>
              <div className="flex items-center gap-2">
                {t.observations?.some((o: any) => o.flag !== 'NORMAL') && (
                  <span className="w-2 h-2 bg-red-400 rounded-full" />
                )}
                {expanded.includes(t.test_name) ? <ChevronUp className="w-4 h-4 text-forest-400" /> : <ChevronDown className="w-4 h-4 text-forest-400" />}
              </div>
            </button>

            {expanded.includes(t.test_name) && (
              <div className="border-t border-forest-50 dark:border-forest-800 overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-forest-50/50 dark:bg-forest-900/30">
                      {['Parameter', 'Result', 'Unit', 'Reference', 'Status'].map(h => (
                        <th key={h} className="px-4 py-2.5 text-left font-body text-[10px] font-600 text-forest-500 dark:text-forest-400 uppercase tracking-wide">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-forest-50 dark:divide-forest-900">
                    {t.observations?.map((o: any, i: number) => (
                      <tr key={i} className="hover:bg-forest-50/30 dark:hover:bg-forest-900/20 transition-colors">
                        <td className="px-4 py-3 font-body text-xs text-forest-800 dark:text-cream-200">{o.obs_name}</td>
                        <td className="px-4 py-3 font-mono text-xs font-600 text-forest-900 dark:text-cream-100">{o.value}</td>
                        <td className="px-4 py-3 font-body text-xs text-forest-500 dark:text-forest-400">{o.unit}</td>
                        <td className="px-4 py-3 font-body text-xs text-forest-500 dark:text-forest-400">{o.range_min}–{o.range_max}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 font-body text-[10px] font-600 px-2 py-0.5 rounded-full ${flagColor(o.flag)}`}>
                            <FlagIcon flag={o.flag} />{o.flag}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
