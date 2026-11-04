import React from 'react';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getPosts, getCategories } from '@/lib/db';
import { Calendar, ArrowRight, Home } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog & Mimarlık Rehberleri | Yalçın Grup Mimarlık',
  description: 'Silivri villa inşaat maliyetleri, kentsel dönüşüm mevzuatı ve mimari tasarım üzerine en güncel rehberler ve makaleler.',
};

export default function BlogListingPage() {
  const posts = getPosts();
  const categories = getCategories();

  return (
    <div className="py-16 bg-[#0d0e12] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Bilgi Bankası</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            Silivri İnşaat & Mimarlık Blogu
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
            Arsa yatırımı, müstakil ev maliyetleri, tadilat ve kentsel dönüşüm süreçlerinde rehber niteliğindeki tüm yazılarımız.
          </p>
        </div>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
          <Link
            href="/blog/"
            className="px-3.5 py-1.5 rounded-lg bg-brand-gold text-black font-semibold text-xs transition-colors"
          >
            Tümü ({posts.length})
          </Link>
          {categories.slice(0, 10).map((cat) => (
            <Link
              key={cat.id}
              href={`/category/${cat.slug}/`}
              className="px-3.5 py-1.5 rounded-lg bg-brand-card hover:bg-brand-border border border-brand-border text-gray-300 text-xs transition-colors"
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Post Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={`/${post.slug}/`}
              className="group rounded-2xl overflow-hidden bg-brand-card border border-brand-border hover:border-brand-gold/60 transition-all flex flex-col"
            >
              <div className="relative aspect-[16/10] w-full bg-zinc-900 overflow-hidden">
                {post.featuredImage ? (
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-600">
                    <Home className="w-12 h-12" />
                  </div>
                )}
                {post.categories && post.categories.length > 0 && (
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded text-[11px] font-medium text-brand-gold border border-white/10">
                    {post.categories[0]}
                  </div>
                )}
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h2 className="font-bold text-lg text-white font-display group-hover:text-brand-gold transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                    {post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').trim() : ''}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-gold font-semibold">
                  <span>Rehberi İncele</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </div>
  );
}
