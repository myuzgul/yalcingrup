import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories, getPosts } from '@/lib/db';
import { Calendar, ArrowRight, Home } from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const cats = getCategories();
  return cats.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const cats = getCategories();
  const cat = cats.find(c => c.slug === params.slug);
  if (!cat) return { title: 'Kategori Bulunamadı' };

  return {
    title: `${cat.name} Yazıları ve Rehberleri | Yalçın Grup Mimarlık`,
    description: `Silivri ${cat.name} konulu güncel blog yazıları, maliyet analizleri ve rehberler.`,
    alternates: {
      canonical: `https://www.yalcingrupmimarlik.com/category/${cat.slug}/`
    }
  };
}

export default function CategoryArchivePage({ params }: Props) {
  const cats = getCategories();
  const cat = cats.find(c => c.slug === params.slug);
  if (!cat) notFound();

  const allPosts = getPosts();
  const filteredPosts = allPosts.filter(p => 
    p.categories && p.categories.some(cName => cName.toLowerCase() === cat.name.toLowerCase() || p.slug.includes(cat.slug))
  );

  return (
    <div className="py-16 bg-[#0d0e12] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-brand-gold">Kategori Arşivi</span>
          <h1 className="text-4xl sm:text-5xl font-bold font-display text-white">
            {cat.name}
          </h1>
          <p className="text-gray-400 text-sm">
            Bu kategoride toplam {filteredPosts.length > 0 ? filteredPosts.length : allPosts.length} yazı bulunmaktadır.
          </p>
        </div>

        {/* Posts */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {(filteredPosts.length > 0 ? filteredPosts : allPosts.slice(0, 9)).map((post) => (
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
              </div>
              <div className="p-6 flex-grow flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-brand-gold" />
                    <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  </div>
                  <h2 className="font-bold text-lg text-white font-display group-hover:text-brand-gold transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </div>
                <div className="mt-6 pt-4 border-t border-brand-border flex items-center justify-between text-xs text-brand-gold font-semibold">
                  <span>Yazıyı Oku</span>
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
