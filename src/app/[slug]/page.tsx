import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  getPostBySlug, 
  getPageBySlug, 
  getPosts, 
  getPages, 
  getSettings 
} from '@/lib/db';
import { 
  Calendar, 
  User, 
  Folder, 
  Share2, 
  PhoneCall, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface Props {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const posts = getPosts();
  const pages = getPages();
  const postParams = posts.map(p => ({ slug: p.slug }));
  const pageParams = pages.filter(pg => pg.slug !== 'blog' && pg.slug !== 'projeler' && pg.slug !== 'iletisim').map(pg => ({ slug: pg.slug }));
  return [...postParams, ...pageParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const page = getPageBySlug(slug);
  const item = post || page;

  if (!item) {
    return {
      title: 'Sayfa Bulunamadı | Yalçın Grup Mimarlık',
    };
  }

  const cleanExcerpt = (item as any).excerpt ? (item as any).excerpt.replace(/<[^>]+>/g, '').trim().substring(0, 160) : 'Silivri mimari projelendirme, kentsel dönüşüm ve inşaat hizmetleri.';
  const absoluteImg = item.featuredImage
    ? (item.featuredImage.startsWith('http') ? item.featuredImage : `https://www.yalcingrupmimarlik.com${item.featuredImage}`)
    : 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg';

  return {
    title: item.title,
    description: cleanExcerpt,
    alternates: {
      canonical: `https://www.yalcingrupmimarlik.com/${slug}/`,
    },
    openGraph: {
      title: item.title,
      description: cleanExcerpt,
      url: `https://www.yalcingrupmimarlik.com/${slug}/`,
      type: post ? 'article' : 'website',
      images: [{ url: absoluteImg }],
    }
  };
}

export default function DynamicSlugPage({ params }: Props) {
  const slug = params.slug;
  const post = getPostBySlug(slug);
  const page = getPageBySlug(slug);
  const settings = getSettings();

  if (!post && !page) {
    notFound();
  }

  // A) RENDER AS BLOG POST
  if (post) {
    const allPosts = getPosts();
    const relatedPosts = allPosts.filter(p => p.slug !== post.slug).slice(0, 3);
    const readingTime = Math.max(3, Math.ceil(post.content.split(/\s+/).length / 180));
    const absolutePostImg = post.featuredImage
      ? (post.featuredImage.startsWith('http') ? post.featuredImage : `https://www.yalcingrupmimarlik.com${post.featuredImage}`)
      : 'https://www.yalcingrupmimarlik.com/uploads/hero-silivri-villa.jpg';

    // Article Structured Data
    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: post.title,
      image: absolutePostImg,
      datePublished: post.date,
      dateModified: post.modified || post.date,
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `https://www.yalcingrupmimarlik.com/${post.slug}/`
      },
      author: {
        '@type': 'Organization',
        name: 'Yalçın Grup Mimarlık',
        url: 'https://www.yalcingrupmimarlik.com'
      },
      publisher: {
        '@type': 'Organization',
        name: 'Yalçın Grup Mimarlık',
        logo: {
          '@type': 'ImageObject',
          url: 'https://www.yalcingrupmimarlik.com/logo.png'
        }
      },
      description: post.excerpt ? post.excerpt.replace(/<[^>]+>/g, '').trim().substring(0, 160) : post.title
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Anasayfa', item: 'https://www.yalcingrupmimarlik.com/' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.yalcingrupmimarlik.com/blog/' },
        { '@type': 'ListItem', position: 3, name: post.title, item: `https://www.yalcingrupmimarlik.com/${post.slug}/` }
      ]
    };

    return (
      <article className="py-12 bg-[#0d0e12] min-h-screen">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 overflow-x-auto whitespace-nowrap">
            <Link href="/" className="hover:text-brand-gold transition-colors">Anasayfa</Link>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
            <Link href="/blog/" className="hover:text-brand-gold transition-colors">Blog</Link>
            {post.categories && post.categories[0] && (
              <>
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
                <span className="text-brand-gold">{post.categories[0]}</span>
              </>
            )}
          </nav>

          {/* Post Header */}
          <header className="space-y-6 mb-10">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.categories.map((cat, i) => (
                  <span key={i} className="px-3 py-1 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-semibold tracking-wide">
                    {cat}
                  </span>
                ))}
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white leading-tight">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-xs text-gray-400 pt-2 border-y border-brand-border/60 py-3">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-brand-gold" />
                <span>{new Date(post.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-gold" />
                <span>{readingTime} dk okuma süresi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-brand-gold" />
                <span>Yalçın Grup Mimarlık</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-2xl overflow-hidden mb-12 border border-brand-border bg-zinc-950 aspect-[16/9] relative">
              <img
                src={post.featuredImage}
                alt={post.altText || post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Article Body */}
          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* Consultation CTA Card */}
          <div className="my-16 p-8 rounded-2xl bg-gradient-to-r from-brand-card to-[#121319] border border-brand-gold/30 shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-brand-gold text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>Silivri Bölgesinde Projeniz mi Var?</span>
            </div>
            <h3 className="text-2xl font-bold font-display text-white">
              Arsanız İçin Ücretsiz Mimari ve Maliyet Danışmanlığı
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              Bu yazıda bahsettiğimiz kriterleri kendi arsanız veya binanız için değerlendirmek ister misiniz? Mimar ve mühendis kadromuzla iletişime geçin.
            </p>
            <div className="pt-2">
              <a
                href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent(`Merhaba, "${post.title}" yazınızı okudum. Projemiz için danışmak istiyoruz.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold hover:bg-brand-goldHover text-black font-bold text-xs uppercase tracking-wider transition-all"
              >
                <PhoneCall className="w-4 h-4" />
                <span>WhatsApp İle İletişime Geç</span>
              </a>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <section className="pt-12 border-t border-brand-border">
              <h2 className="text-2xl font-bold font-display text-white mb-6">
                İlginizi Çekebilecek Diğer Rehberler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map(rel => (
                  <Link
                    key={rel.id}
                    href={`/${rel.slug}/`}
                    className="p-5 rounded-xl bg-brand-card border border-brand-border hover:border-brand-gold/50 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <span className="text-[11px] text-brand-gold font-semibold">
                        {rel.categories?.[0] || 'Rehber'}
                      </span>
                      <h3 className="font-bold text-sm text-white group-hover:text-brand-gold transition-colors mt-2 line-clamp-2">
                        {rel.title}
                      </h3>
                    </div>
                    <div className="mt-4 flex items-center gap-1 text-xs text-brand-gray group-hover:text-white transition-colors">
                      <span>Devamını Oku</span>
                      <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

        </div>
      </article>
    );
  }

  // B) RENDER AS CORPORATE PAGE (Hakkımızda, Hizmetler vb.)
  return (
    <div className="py-16 bg-[#0d0e12] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8">
          <Link href="/" className="hover:text-brand-gold transition-colors">Anasayfa</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-brand-gold">{page!.title}</span>
        </nav>

        {/* Page Header */}
        <div className="mb-12 border-b border-brand-border pb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white">
            {page!.title}
          </h1>
          <p className="text-sm text-brand-gold mt-2 font-medium">
            Yalçın Grup Mimarlık & Mühendislik Hizmetleri
          </p>
        </div>

        {/* Page Content */}
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: page!.content }}
        />

        {/* Contact CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-brand-card border border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white font-display">Hemen Bilgi Almak İster misiniz?</h3>
            <p className="text-xs text-gray-400">Silivri ofisimizle iletişime geçin, projenizi birlikte planlayalım.</p>
          </div>
          <a
            href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent(`Merhaba, "${page!.title}" hakkında bilgi almak istiyoruz.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-brand-gold text-black font-bold text-xs uppercase tracking-wider shrink-0 hover:bg-brand-goldHover transition-all"
          >
            Hızlı Teklif Al
          </a>
        </div>

      </div>
    </div>
  );
}
