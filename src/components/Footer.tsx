import Link from 'next/link';
import { Phone, Mail, MapPin, ArrowRight, Share2, AtSign, Rss, Play } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-forest-950 text-cream-100">
      {/* CTA Banner */}
      <div className="bg-gradient-to-r from-forest-900 via-forest-800 to-forest-900 border-y border-gold-400/20">
        <div className="max-w-7xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-700 text-white mb-1">Ready to book your test?</h3>
            <p className="font-body text-cream-200/70 text-sm">Sample collection at home. NABL certified. Reports in 24 hours.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/tests" className="btn-gold text-forest-950 font-body font-700 px-6 py-3 rounded-xl flex items-center gap-2">
              Book Now <ArrowRight className="w-4 h-4" />
            </Link>
            <a href="tel:+917042191854" className="border border-gold-400/40 text-gold-400 font-body font-500 px-6 py-3 rounded-xl hover:bg-gold-400/10 transition-colors flex items-center gap-2">
              <Phone className="w-4 h-4" /> Call Us
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gold-400 rounded-full flex items-center justify-center">
                <span className="font-display text-forest-950 font-800 text-xs">N</span>
              </div>
              <div>
                <span className="font-display text-lg font-700 text-white">nhcare</span>
                <span className="block text-[8px] text-gold-400 tracking-widest uppercase -mt-0.5">pathlabs</span>
              </div>
            </div>
            <p className="font-body text-cream-200/60 text-sm leading-relaxed mb-4">
              NHCare Pathlabs — the digital platform of Niramaya Healthcare. 25+ years of diagnostic excellence with NABL accreditation.
            </p>
            <div className="flex gap-3">
              {[Share2, AtSign, Rss, Play].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-forest-900 hover:bg-gold-400/20 border border-forest-800 hover:border-gold-400/50 rounded-lg flex items-center justify-center transition-all">
                  <Icon className="w-3.5 h-3.5 text-cream-200/60 hover:text-gold-400" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body font-600 text-white mb-4 text-sm uppercase tracking-wider">Our Services</h4>
            <ul className="space-y-2.5">
              {[['Individual Tests', '/tests'],['Health Packages', '/packages'],['Home Collection', '/home-collection'],['Corporate Wellness', '/tests?type=corporate'],['COVID Tests', '/tests?q=covid'],['Prescription Analysis', '/prescription']].map(([l, h]) => (
                <li key={h}><Link href={h} className="font-body text-cream-200/60 hover:text-gold-400 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Patient */}
          <div>
            <h4 className="font-body font-600 text-white mb-4 text-sm uppercase tracking-wider">Patient</h4>
            <ul className="space-y-2.5">
              {[['My Bookings', '/dashboard/bookings'],['My Reports', '/dashboard/reports'],['AI Report Summary', '/dashboard/reports'],['Track Sample', '/dashboard'],['Download Report', '/dashboard/reports'],['Contact Support', '/contact']].map(([l, h]) => (
                <li key={h}><Link href={h} className="font-body text-cream-200/60 hover:text-gold-400 text-sm transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-body font-600 text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-gold-400 mt-0.5 flex-shrink-0" />
                <span className="font-body text-cream-200/60 text-sm">Niramaya Pathlabs, Paschim Vihar, New Delhi — 110063</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="tel:+917042191854" className="font-body text-cream-200/60 hover:text-gold-400 text-sm transition-colors">+91 70421 91854</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-gold-400 flex-shrink-0" />
                <a href="mailto:care@nhcare.in" className="font-body text-cream-200/60 hover:text-gold-400 text-sm transition-colors">care@nhcare.in</a>
              </li>
            </ul>
            <div className="mt-5 p-3 bg-forest-900/50 rounded-xl border border-forest-800">
              <p className="font-body text-xs text-cream-200/50 mb-1">NABL Accredited Lab</p>
              <p className="font-body text-xs text-gold-400 font-500">MC-2140 | ISO 15189:2012</p>
            </div>
          </div>
        </div>

        <div className="border-t border-forest-900 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="font-body text-cream-200/40 text-xs">© 2026 NHCare Pathlabs. All rights reserved. A unit of Niramaya Healthcare Pvt. Ltd.</p>
          <div className="flex gap-4">
            {[['Privacy Policy', '/privacy'],['Terms', '/terms'],['Refund Policy', '/refunds']].map(([l, h]) => (
              <Link key={h} href={h} className="font-body text-cream-200/40 hover:text-cream-200/70 text-xs transition-colors">{l}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
