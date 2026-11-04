'use client';

import React, { useEffect, useState } from 'react';
import { PlusCircle, Trash2, FolderTree, ArrowRight } from 'lucide-react';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchCats = () => {
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(c => {
        setCategories(c || []);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCats();
  }, []);

  const handleNameChange = (val: string) => {
    setNewName(val);
    const slug = val
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-');
    setNewSlug(slug);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newSlug) return;
    const res = await fetch('/api/admin/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: Date.now(), name: newName, slug: newSlug })
    });
    if (res.ok) {
      setNewName('');
      setNewSlug('');
      fetchCats();
    }
  };

  const handleDelete = async (slug: string, name: string) => {
    if (!confirm(`"${name}" kategorisini silmek istiyor musunuz?`)) return;
    await fetch(`/api/admin/categories?slug=${slug}`, { method: 'DELETE' });
    setCategories(categories.filter(c => c.slug !== slug));
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-display text-white">Kategori Yönetimi</h1>
        <p className="text-xs text-gray-400 mt-0.5">Sitedeki blog ve proje kategorilerini ekleyin veya düzenleyin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4">
          <h2 className="text-sm font-bold font-display text-white border-l-2 border-brand-gold pl-2">
            Yeni Kategori Ekle
          </h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Kategori Adı
              </label>
              <input
                type="text"
                placeholder="Örn: Silivri Kentsel Dönüşüm"
                value={newName}
                onChange={(e) => handleNameChange(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Kategori Slug
              </label>
              <input
                type="text"
                placeholder="silivri-kentsel-donusum"
                value={newSlug}
                onChange={(e) => setNewSlug(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-brand-gold font-mono text-xs"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Kategoriyi Kaydet</span>
            </button>
          </form>
        </div>

        {/* Categories List */}
        <div className="lg:col-span-2 rounded-2xl bg-brand-card border border-brand-border p-6 space-y-4">
          <h2 className="text-sm font-bold font-display text-white">
            Mevcut Kategoriler ({categories.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {categories.map((cat) => (
              <div
                key={cat.id || cat.slug}
                className="p-3.5 rounded-xl bg-[#121318] border border-brand-border flex items-center justify-between"
              >
                <div>
                  <span className="font-semibold text-white text-xs block">{cat.name}</span>
                  <span className="text-[11px] text-gray-500 font-mono">/category/{cat.slug}/</span>
                </div>
                <button
                  onClick={() => handleDelete(cat.slug, cat.name)}
                  className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                  title="Sil"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
