'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Trash2, Edit3, ExternalLink, Calendar, Filter } from 'lucide-react';

export default function AdminPostsListPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const fetchPosts = () => {
    Promise.all([
      fetch('/api/admin/posts').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json())
    ]).then(([p, c]) => {
      setPosts(p || []);
      setCategories(c || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleDelete = async (id: any, title: string) => {
    if (!confirm(`"${title}" başlıklı yazıyı silmek istediğinizden emin misiniz?`)) return;
    const res = await fetch(`/api/admin/posts?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter(p => String(p.id) !== String(id)));
    } else {
      alert('Yazı silinirken hata oluştu');
    }
  };

  const filtered = posts.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCat === 'ALL' || (p.categories && p.categories.includes(selectedCat));
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold font-display text-white">Blog Yazıları Yönetimi</h1>
          <p className="text-xs text-gray-400 mt-0.5">Sistemde toplam {posts.length} adet blog rehberi mevcuttur.</p>
        </div>
        <Link
          href="/admin/posts/new/"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Yeni Yazı Ekle</span>
        </Link>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-brand-card border border-brand-border flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Yazı başlığı veya slug ara..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-gray-400 shrink-0" />
          <select
            value={selectedCat}
            onChange={(e) => setSelectedCat(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 rounded-xl bg-[#121318] border border-brand-border focus:border-brand-gold focus:outline-none text-white text-xs"
          >
            <option value="ALL">Tüm Kategoriler ({posts.length})</option>
            {categories.map((c) => (
              <option key={c.id} value={c.name}>{c.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-brand-card border border-brand-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border bg-[#14151b] text-gray-400">
                <th className="py-3 px-4 font-semibold">Görsel</th>
                <th className="py-3 px-4 font-semibold">Başlık & URL</th>
                <th className="py-3 px-4 font-semibold">Kategori</th>
                <th className="py-3 px-4 font-semibold">Tarih</th>
                <th className="py-3 px-4 font-semibold text-right">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/40">
              {filtered.map((post) => (
                <tr key={post.id} className="hover:bg-brand-border/10 transition-colors">
                  <td className="py-3 px-4 w-16">
                    {post.featuredImage ? (
                      <img
                        src={post.featuredImage}
                        alt=""
                        className="w-12 h-10 object-cover rounded-md bg-zinc-900 border border-brand-border"
                      />
                    ) : (
                      <div className="w-12 h-10 rounded-md bg-zinc-900 border border-brand-border flex items-center justify-center text-[10px] text-gray-600">
                        Yok
                      </div>
                    )}
                  </td>
                  <td className="py-3 px-4 max-w-md">
                    <span className="font-semibold text-white block line-clamp-1">{post.title}</span>
                    <span className="text-[11px] text-gray-500 font-mono block truncate">/{post.slug}/</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-brand-gold/10 text-brand-gold text-[10px] font-medium border border-brand-gold/20">
                      {post.categories?.[0] || 'Genel'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-400">
                    {new Date(post.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <Link
                      href={`/${post.slug}/`}
                      target="_blank"
                      className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-zinc-800 text-gray-300 hover:text-white"
                      title="Sitede Gör"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/`}
                      className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-black transition-colors"
                      title="Düzenle"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.id, post.title)}
                      className="inline-flex items-center gap-1 p-1.5 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500 hover:text-white transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-gray-500">
                    Aramanızla eşleşen yazı bulunamadı.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
