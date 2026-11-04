'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  FileText, 
  FolderTree, 
  Briefcase, 
  PlusCircle, 
  ArrowRight, 
  Globe, 
  TrendingUp, 
  Search,
  Sparkles
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/posts').then(r => r.json()),
      fetch('/api/admin/categories').then(r => r.json())
    ]).then(([p, c]) => {
      setPosts(p || []);
      setCategories(c || []);
      setLoading(false);
    });
  }, []);

  const stats = [
    { label: 'Toplam Blog Yazısı', value: posts.length, icon: FileText, color: 'text-amber-400', href: '/admin/posts/' },
    { label: 'Aktif Kategoriler', value: categories.length, icon: FolderTree, color: 'text-emerald-400', href: '/admin/categories/' },
    { label: 'Mimari Projeler', value: 8, icon: Briefcase, color: 'text-blue-400', href: '/admin/projects/' },
    { label: 'Sabit Sayfalar', value: 14, icon: Globe, color: 'text-purple-400', href: '/admin/settings/' }
  ];

  return (
    <div className="space-y-8">
      
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-8 rounded-3xl bg-gradient-to-r from-brand-card via-[#16171f] to-brand-card border border-brand-border">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-brand-gold text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Yalçın Grup Mimarlık</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
            Hoş Geldiniz, Yönetici
          </h1>
          <p className="text-xs text-gray-400">
            Sitenizdeki tüm içerikleri, blog yazılarını, menüleri ve SEO ayarlarını buradan yönetebilirsiniz.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new/"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all shadow-lg"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Yeni Blog Yazısı</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <Link
              key={idx}
              href={s.href}
              className="p-6 rounded-2xl bg-brand-card border border-brand-border hover:border-brand-gold/40 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs text-gray-400">{s.label}</span>
                <Icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <div className="text-3xl font-bold font-display text-white group-hover:text-brand-gold transition-colors">
                {loading ? '...' : s.value}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Posts Table */}
      <div className="p-6 rounded-3xl bg-brand-card border border-brand-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-display text-white">
            Son Eklenen Blog Yazıları (100 Toplam)
          </h2>
          <Link
            href="/admin/posts/"
            className="text-xs text-brand-gold hover:text-white flex items-center gap-1 font-semibold"
          >
            <span>Tümünü Yönet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-brand-border/60 text-gray-400">
                <th className="pb-3 font-semibold">Başlık</th>
                <th className="pb-3 font-semibold">Kategori</th>
                <th className="pb-3 font-semibold">Tarih</th>
                <th className="pb-3 font-semibold text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/30">
              {posts.slice(0, 7).map((post) => (
                <tr key={post.id} className="hover:bg-brand-border/20 transition-colors">
                  <td className="py-3.5 pr-4 text-white font-medium max-w-md truncate">
                    {post.title}
                  </td>
                  <td className="py-3.5 text-brand-gold">
                    {post.categories?.[0] || 'Genel'}
                  </td>
                  <td className="py-3.5 text-gray-400">
                    {new Date(post.date).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-3.5 text-right space-x-2">
                    <Link
                      href={`/${post.slug}/`}
                      target="_blank"
                      className="text-gray-400 hover:text-white"
                    >
                      Önizle
                    </Link>
                    <Link
                      href={`/admin/posts/${post.id}/`}
                      className="text-brand-gold hover:underline font-semibold"
                    >
                      Düzenle
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
