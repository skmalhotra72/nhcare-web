import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-slate-300">
      {/* CTA Strip */}
      <div className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-5">
          <div>
            <h3 className="font-display text-xl font-600 text-white mb-1">Ready to book your test?</h3>
            <p className="text-sm text-slate-400">Home collection · NABL certified · AI-powered reports</p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/tests" className="btn-gold text-sm">Book Now <ArrowRight className="w-4 h-4" /></Link>
            <a href="tel:+917042191854" className="btn-outline text-sm border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white hover:border-slate-600">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-forest-800 rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5">
                  <path d="M12 2C12 2 8 6 8 10C8 12.209 9.791 14 12 14C14.209 14 16 12.209 16 10C16 6 12 2 12 2Z" fill="#F4B942"/>
                  <path d="M6 7C6 7 3 10 4.5 13C5.5 15 8 15.5 9 14.5C10 13.5 10 11.5 9 10C8 8.5 6 7 6 7Z" fill="#F4B942" opacity="0.6"/>
                  <path d="M18 7C18 7 21 10 19.5 13C18.5 15 16 15.5 15 14.5C14 13.5 14 11.5 15 10C16 8.5 18 7 18 7Z" fill="#F4B942" opacity="0.6"/>
                  <line x1="12" y1="14" x2="12" y2="20" stroke="#F4B942" strokeWidth="1.2" strokeLinecap="round"/>
                  <path d="M9.5 19C9.5 19 12 20.5 14.5 19" stroke="#F4B942" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
              </div>
              <div>
                <span className="font-display text-lg font-700 text-white leading-none block">nhcare</span>
                <span className="text-[8px] font-body font-600 text-forest-400 tracking-[0.25em] uppercase">PATHLABS</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">NHCare is the digital platform of Niramaya Healthcare. 25+ years of diagnostic excellence with NABL accreditation serving Delhi-NCR.</p>
            <div className="flex gap-2">
              {['fb', 'ig', 'tw', 'yt'].map(s => (
                <a key={s} href="#" className="w-8 h-8 bg-slate-800 hover:bg-forest-800 border border-slate-700 hover:border-forest-600 rounded-lg flex items-center justify-center transition-all">
                  <span className="text-xs text-slate-400 hover:text-white font-mono uppercase">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-600 text-white uppercase tracking-wider mb-4 font-body">Our Services</h4>
            <ul className="space-y-2.5">
              {[['Individual Tests','/tests'],['Health Packages','/packages'],['Home Collection','/home-collection'],['Corporate Wellness','/tests?type=corporate'],['COVID Tests','/tests?q=covid'],['AI Report Summary','/dashboard/reports']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Patient */}
          <div>
            <h4 className="text-xs font-600 text-white uppercase tracking-wider mb-4 font-body">Patient</h4>
            <ul className="space-y-2.5">
              {[['My Bookings','/dashboard/bookings'],['My Reports','/dashboard/reports'],['AI Report Summary','/dashboard/reports'],['Track Sample','/dashboard'],['Download Report','/dashboard/reports'],['Contact Support','/contact']].map(([l,h]) => (
                <li key={h}><Link href={h} className="text-sm text-slate-400 hover:text-white transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-600 text-white uppercase tracking-wider mb-4 font-body">Contact</h4>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-slate-400">Niramaya Pathlabs, Paschim Vihar, New Delhi — 110063</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <a href="tel:+917042191854" className="text-sm text-slate-400 hover:text-white transition-colors">+91 70421 91854</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                <a href="mailto:care@nhcare.in" className="text-sm text-slate-400 hover:text-white transition-colors">care@nhcare.in</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-slate-800 rounded-lg border border-slate-700">
              <p className="text-xs text-slate-500 mb-1">NABL Accredited Laboratory</p>
              <p className="text-xs text-gold-400 font-600">MC-2140 · ISO 15189:2012</p>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-500">© 2026 NHCare Pathlabs. A unit of Niramaya Healthcare Pvt. Ltd. All rights reserved.</p>
          <div className="flex gap-5">
            {[['Privacy Policy','/privacy'],['Terms','/terms'],['Refund Policy','/refunds']].map(([l,h]) => (
              <Link key={h} href={h} className="text-xs text-slate-500 hover:text-slate-300 transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
