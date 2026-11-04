'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Sparkles, Eye, Image as ImageIcon, Globe } from 'lucide-react';

export default function PostEditorPage({ params }: { params?: { id: string } }) {
  const router = useRouter();
  const isEdit = Boolean(params?.id && params.id !== 'new');

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('SİLİVRİDE VİLLA YAPIMI');
  const [featuredImage, setFeaturedImage] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [metaTitle, setMetaTitle] = useState('');
  const [metaDescription, setMetaDescription] = useState('');
  const [categories, setCategories] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(isEdit);

  useEffect(() => {
    // Fetch categories
    fetch('/api/admin/categories')
      .then(r => r.json())
      .then(c => setCategories(c || []));

    // If edit, fetch post
    if (isEdit) {
      fetch('/api/admin/posts')
        .then(r => r.json())
        .then((posts: any[]) => {
          const current = posts.find(p => String(p.id) === String(params?.id));
          if (current) {
            setTitle(current.title || '');
            setSlug(current.slug || '');
            setCategory(current.categories?.[0] || 'Genel');
            setFeaturedImage(current.featuredImage || '');
            setExcerpt(current.excerpt ? current.excerpt.replace(/<[^>]+>/g, '').trim() : '');
            setContent(current.content || '');
            setMetaTitle(current.metaTitle || current.title || '');
            setMetaDescription(current.metaDescription || (current.excerpt ? current.excerpt.replace(/<[^>]+>/g, '').trim().substring(0, 160) : ''));
          }
          setLoading(false);
        });
    }
  }, [isEdit, params?.id]);

  // Auto slug generation on new post
  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!isEdit) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/ğ/g, 'g')
        .replace(/ü/g, 'u')
        .replace(/ş/g, 's')
        .replace(/ı/g, 'i')
        .replace(/ö/g, 'o')
        .replace(/ç/g, 'c')
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
      setSlug(generatedSlug);
      if (!metaTitle) setMetaTitle(val);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !slug) {
      alert('Lütfen başlık ve slug giriniz');
      return;
    }
    setSaving(true);
    try {
      const res = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: isEdit ? params?.id : undefined,
          title,
          slug,
          categories: [category],
          featuredImage,
          excerpt,
          content,
          metaTitle: metaTitle || title,
          metaDescription: metaDescription || excerpt
        })
      });
      if (res.ok) {
        router.push('/admin/posts/');
      } else {
        alert('Kaydedilirken hata oluştu');
      }
    } catch (err) {
      alert('Bağlantı hatası');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-400">Yazı yükleniyor...</div>;
  }

  return (
    <div className="space-y-8 pb-16">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/posts/"
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Yazı Listesine Dön</span>
        </Link>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <Save className="w-4 h-4" />
          <span>{saving ? 'Kaydediliyor...' : 'Yazıyı Yayınla & Kaydet'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Form (Left 2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-5">
            <h2 className="text-lg font-bold font-display text-white">Yazı Bilgileri</h2>
            
            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Yazı Başlığı
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Örn: 2026 Silivri Müstakil Ev Maliyetleri"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-base font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                URL / Permalink (Slug)
              </label>
              <div className="flex items-center bg-[#121318] border border-brand-border rounded-xl px-3 text-xs text-gray-400">
                <span>domain.com/</span>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="yazi-linki"
                  required
                  className="w-full bg-transparent py-2.5 px-1 focus:outline-none text-brand-gold font-mono"
                />
                <span>/</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Kısa Özet (Excerpt)
              </label>
              <textarea
                rows={2}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Yazının arama sonuçlarında ve kartlarda görünecek kısa özeti..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Makale İçeriği (HTML / Metin)
              </label>
              <textarea
                rows={18}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Makale içeriği (H2, H3 başlıkları, paragraflar, listeler)..."
                className="w-full px-4 py-3 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs font-mono leading-relaxed resize-y"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Settings & SEO Simulator (Right col) */}
        <div className="space-y-6">
          
          {/* Metadata & Categories Card */}
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-5">
            <h3 className="text-sm font-bold font-display text-white border-l-2 border-brand-gold pl-2">
              Kategori & Kapak Görseli
            </h3>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Yazı Kategorisi
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.name}>{c.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Öne Çıkan Görsel URL
              </label>
              <input
                type="text"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                placeholder="https://... veya /uploads/..."
                className="w-full px-3 py-2.5 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
              {featuredImage && (
                <div className="mt-3 aspect-[16/9] rounded-lg overflow-hidden border border-brand-border bg-zinc-900">
                  <img src={featuredImage} alt="Önizleme" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* GOOGLE SERP SEO SIMULATOR (Critical for SEO Guarantee) */}
          <div className="p-6 rounded-2xl bg-brand-card border border-brand-border space-y-4">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Google SERP SEO Simülatörü</span>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-gray-400">SEO Başlığı</span>
                <span className={`font-mono ${metaTitle.length > 60 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {metaTitle.length} / 60
                </span>
              </div>
              <input
                type="text"
                value={metaTitle}
                onChange={(e) => setMetaTitle(e.target.value)}
                placeholder={title || 'Google başlığı'}
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
              />
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-gray-400">Meta Açıklaması</span>
                <span className={`font-mono ${metaDescription.length > 160 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {metaDescription.length} / 160
                </span>
              </div>
              <textarea
                rows={3}
                value={metaDescription}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Google arama sonuçlarında çıkacak açıklama..."
                className="w-full px-3 py-2 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs resize-none"
              />
            </div>

            {/* Live Google Search Card Preview */}
            <div className="pt-3 border-t border-brand-border/60">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest block mb-2">Canlı Google Görünümü</span>
              <div className="p-4 rounded-xl bg-[#202124] border border-[#303134] text-left space-y-1">
                <div className="text-[12px] text-[#bdc1c6] truncate flex items-center gap-1.5">
                  <span className="text-xs text-brand-gold">www.yalcingrupmimarlik.com</span>
                  <span className="text-zinc-500">› {slug || 'yazi-linki'}</span>
                </div>
                <div className="text-[16px] text-[#8ab4f8] hover:underline cursor-pointer font-medium leading-snug truncate">
                  {metaTitle || title || 'Örnek Makale Başlığı'}
                </div>
                <div className="text-[13px] text-[#bdc1c6] line-clamp-2 leading-relaxed">
                  {metaDescription || excerpt || 'Bu makale Yalçın Grup Mimarlık Silivri inşaat ve mimarlık rehberlerinden biridir...'}
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
