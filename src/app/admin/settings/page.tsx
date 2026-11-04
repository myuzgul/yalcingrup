'use client';

import React, { useEffect, useState } from 'react';
import { Save, Settings, Phone, Mail, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(s => setSettings(s));
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });
      if (res.ok) {
        setMessage('Ayarlar başarıyla güncellendi!');
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Site & SEO Ayarları</h1>
          <p className="text-xs text-gray-400 mt-0.5">İletişim bilgileri, WhatsApp hattı, Google doğrulama ve analiz kodları.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Kaydediliyor...' : 'Ayarları Kaydet'}</span>
        </button>
      </div>

      {message && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{message}</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General & SEO */}
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4">
          <h2 className="text-sm font-bold font-display text-white border-l-2 border-brand-gold pl-2">
            Genel Site ve SEO Tanımları
          </h2>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Site Başlığı (Varsayılan Title)
            </label>
            <input
              type="text"
              value={settings.siteTitle || ''}
              onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Site Açıklaması (Meta Description)
            </label>
            <textarea
              rows={2}
              value={settings.siteDescription || ''}
              onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs resize-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Google Search Console Kodu
              </label>
              <input
                type="text"
                value={settings.googleSiteVerification || ''}
                onChange={(e) => setSettings({ ...settings, googleSiteVerification: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Google Analytics / GTM ID
              </label>
              <input
                type="text"
                value={settings.gtmId || ''}
                onChange={(e) => setSettings({ ...settings, gtmId: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4">
          <h2 className="text-sm font-bold font-display text-white border-l-2 border-brand-gold pl-2">
            İletişim & Ofis Bilgileri
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Telefon Numarası
              </label>
              <input
                type="text"
                value={settings.phone || ''}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                WhatsApp Numarası (Ülke koduyla, örn: 905380828592)
              </label>
              <input
                type="text"
                value={settings.phoneRaw || ''}
                onChange={(e) => setSettings({ ...settings, phoneRaw: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                E-Posta Adresi
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Instagram Hesabı Linki
              </label>
              <input
                type="text"
                value={settings.instagram || ''}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Ofis Adresi (Silivri)
            </label>
            <input
              type="text"
              value={settings.address || ''}
              onChange={(e) => setSettings({ ...settings, address: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
              Çalışma Saatleri
            </label>
            <input
              type="text"
              value={settings.workingHours || ''}
              onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
            />
          </div>
        </div>

      </form>
    </div>
  );
}
