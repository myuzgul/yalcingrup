import React from 'react';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/db';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'İletişim & Ofis | Yalçın Grup Mimarlık',
  description: 'Silivri mimari projelendirme, kentsel dönüşüm ve villa inşaatı için bizimle iletişime geçin veya ofisimizi ziyaret edin.',
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="py-16 bg-[#0d0e12] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Bize Ulaşın</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            İletişim & Proje Danışmanlığı
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Arsanız, projeniz veya kentsel dönüşüm talepleriniz için bize ulaşabilir, ofisimizde yüz yüze görüşebilirsiniz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Info Card */}
          <div className="space-y-8 p-8 rounded-2xl bg-brand-card border border-brand-border">
            <h2 className="text-2xl font-bold font-display text-white border-l-2 border-brand-gold pl-3">
              Yalçın Grup Mimarlık Ofisi
            </h2>
            <ul className="space-y-6 text-sm text-gray-300">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Adres</strong>
                  <span>{settings.address}</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Telefon</strong>
                  <a href={`tel:${settings.phoneRaw}`} className="hover:text-brand-gold transition-colors">
                    {settings.phone}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">E-Posta</strong>
                  <a href={`mailto:${settings.email}`} className="hover:text-brand-gold transition-colors">
                    {settings.email}
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white mb-0.5">Çalışma Saatleri</strong>
                  <span>{settings.workingHours}</span>
                </div>
              </li>
            </ul>

            <div className="pt-4 border-t border-brand-border">
              <a
                href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent('Merhaba, Silivri projemiz için bilgi almak istiyoruz.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Doğrudan WhatsApp İle Yazın</span>
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 rounded-2xl bg-brand-card border border-brand-border space-y-6">
            <h2 className="text-2xl font-bold font-display text-white">
              Hızlı Teklif & Mesaj Formu
            </h2>
            <ContactForm />
          </div>

        </div>

      </div>
    </div>
  );
}
