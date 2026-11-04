'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2, Save, MoveUp, MoveDown } from 'lucide-react';

export default function AdminMenusPage() {
  const [menus, setMenus] = useState<any>({ header: [], footerQuickLinks: [], footerServices: [] });
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/menus')
      .then(r => r.json())
      .then(m => setMenus(m));
  }, []);

  const handleAddHeaderItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel || !newUrl) return;
    const updated = {
      ...menus,
      header: [...menus.header, { label: newLabel, url: newUrl }]
    };
    setMenus(updated);
    setNewLabel('');
    setNewUrl('');
  };

  const handleRemoveHeaderItem = (index: number) => {
    const updated = {
      ...menus,
      header: menus.header.filter((_: any, i: number) => i !== index)
    };
    setMenus(updated);
  };

  const handleSave = async () => {
    setSaving(true);
    await fetch('/api/admin/menus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menus)
    });
    setSaving(false);
    alert('Menü başarıyla güncellendi!');
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Menü & Gezinme Yönetimi</h1>
          <p className="text-xs text-gray-400 mt-0.5">Sitenin üst menü (Header) ve alt menü (Footer) linklerini özelleştirin.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Kaydediliyor...' : 'Menüyü Kaydet'}</span>
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-6">
        <h2 className="text-sm font-bold font-display text-white border-l-2 border-brand-gold pl-2">
          Ana Menü Linkleri (Header Navigation)
        </h2>

        <div className="space-y-3">
          {menus.header.map((item: any, idx: number) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-[#121318] border border-brand-border flex items-center justify-between gap-4"
            >
              <div className="flex-1">
                <span className="font-semibold text-white text-xs">{item.label}</span>
                <span className="text-[11px] text-gray-500 font-mono ml-3">{item.url}</span>
              </div>
              <button
                onClick={() => handleRemoveHeaderItem(idx)}
                className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                title="Kaldır"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new item */}
        <form onSubmit={handleAddHeaderItem} className="pt-4 border-t border-brand-border/60 flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Menü Başlığı (Örn: Hakkımızda)"
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
          />
          <input
            type="text"
            placeholder="Link / URL (Örn: /hakkimizda/)"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            className="flex-1 px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-zinc-800 hover:bg-brand-gold hover:text-black text-white text-xs font-bold transition-all shrink-0"
          >
            Öğe Ekle
          </button>
        </form>
      </div>

    </div>
  );
}
