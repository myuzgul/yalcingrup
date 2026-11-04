'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 600);
  };

  if (sent) {
    return (
      <div className="p-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-center space-y-3">
        <CheckCircle2 className="w-10 h-10 mx-auto" />
        <h3 className="font-bold text-white text-lg font-display">Talebiniz Alındı</h3>
        <p className="text-xs text-gray-300">
          Mesajınız bize ulaştı. Mimar ve mühendis ekibimiz en kısa sürede sizinle iletişime geçecektir.
        </p>
      </div>
    );
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Adınız ve Soyadınız
        </label>
        <input
          type="text"
          placeholder="Ahmet Yılmaz"
          required
          className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            Telefon Numaranız
          </label>
          <input
            type="tel"
            placeholder="05XX XXX XX XX"
            required
            className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
            E-Posta Adresiniz
          </label>
          <input
            type="email"
            placeholder="ahmet@example.com"
            className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm"
          />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Hizmet Türü
        </label>
        <select className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm">
          <option>Villa / Müstakil Ev İnşaatı</option>
          <option>Silivri Kentsel Dönüşüm</option>
          <option>Mimari Projelendirme & Ruhsat</option>
          <option>Kat Karşılığı İnşaat</option>
          <option>İç Mimarlık & Dekorasyon</option>
          <option>Diğer</option>
        </select>
      </div>
      <div>
        <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
          Proje Detayları / Notunuz
        </label>
        <textarea
          rows={4}
          placeholder="Arsa metrekaresi, konum ve aklınızdaki proje..."
          className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-sm resize-none"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-xl flex items-center justify-center gap-2"
      >
        <span>{loading ? 'Gönderiliyor...' : 'Mesajı Gönder'}</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
