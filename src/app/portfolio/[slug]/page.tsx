import React from 'react';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getProjectBySlug, getProjects, getSettings } from '@/lib/db';
import { 
  ChevronRight, 
  MapPin, 
  Calendar, 
  Maximize2, 
  Layers, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowUpRight, 
  MessageSquare,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const projects = getProjects();
  return projects.map(p => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: 'Proje Bulunamadı' };

  return {
    title: `${project.title} | Yalçın Grup Mimarlık`,
    description: `${project.title} mimari tasarım ve inşaat detayları. Silivri Yalçın Grup Mimarlık.`,
    alternates: {
      canonical: `https://www.yalcingrupmimarlik.com/portfolio/${project.slug}/`
    },
    openGraph: {
      title: `${project.title} | Yalçın Grup Mimarlık`,
      description: project.concept ? project.concept.substring(0, 160) : `${project.title} mimari projesi.`,
      images: project.featuredImage ? [{ url: project.featuredImage }] : undefined,
    }
  };
}

export default function PortfolioDetailPage({ params }: Props) {
  const project = getProjectBySlug(params.slug);
  const settings = getSettings();
  const allProjects = getProjects();
  const otherProjects = allProjects.filter(p => p.slug !== params.slug).slice(0, 3);

  if (!project) notFound();

  const specs = [
    { label: "LOKASYON", value: project.location || "Silivri / İstanbul", icon: MapPin },
    { label: "KAPALI ALAN", value: project.area || "350 m²", icon: Maximize2 },
    { label: "TAMAMLANMA", value: project.year || "2025", icon: Calendar },
    { label: "TİPOLOJİ", value: project.category, icon: Layers },
    { label: "HİZMET KAPSAMI", value: project.scope || "Mimari & Taahhüt", icon: ShieldCheck }
  ];

  return (
    <article className="py-12 bg-[#090a0c] text-[#eae7e1] min-h-screen space-y-16">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 space-y-12">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-gray-400">
          <Link href="/" className="hover:text-[#c5a059] transition-colors">ANASAYFA</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <Link href="/projeler/" className="hover:text-[#c5a059] transition-colors">PROJELER</Link>
          <ChevronRight className="w-3.5 h-3.5 text-zinc-600" />
          <span className="text-[#c5a059]">{project.title.toUpperCase()}</span>
        </nav>

        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 border-b border-white/[0.08] pb-10">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2.5">
              <span className="h-[1px] w-6 bg-[#c5a059]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#c5a059] uppercase">
                {project.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white font-display">
              {project.title}
            </h1>
            <p className="text-sm sm:text-base text-gray-300 font-light leading-relaxed">
              {project.location} aksında hayata geçirilen, statik güvenlik ve çağdaş mimari dilin kusursuz birleşimi.
            </p>
          </div>

          <div className="shrink-0">
            <a
              href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent(`Merhaba, "${project.title}" projenizi inceledim. Kendi arsamız için benzer bir çalışma ve maliyet tablosu rica ediyoruz.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02]"
            >
              <span>Benzer Proje İçin Teklif Al</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Hero Featured Photograph */}
        <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950">
          <img
            src={project.featuredImage}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Architectural Specifications Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 sm:p-8 rounded-2xl bg-[#111216] border border-white/[0.08] font-mono text-xs">
          {specs.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="space-y-1.5 border-l border-white/10 pl-4">
                <div className="text-[10px] text-[#c5a059] tracking-wider uppercase flex items-center gap-1.5">
                  <Icon className="w-3 h-3" />
                  <span>{item.label}</span>
                </div>
                <div className="text-sm font-semibold text-white tracking-tight">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>

        {/* Narrative & Engineering Details (Two Columns) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-6">
          
          {/* Left Column: Concept & Engineering */}
          <div className="lg:col-span-7 space-y-10">
            
            {/* Concept */}
            <div className="space-y-4">
              <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block">
                [ 01 • MİMARİ KONSEPT ]
              </span>
              <h2 className="text-2xl font-light text-white font-display">
                Mekan Kurgusu ve Doğal Işık Dengesi
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {project.concept || "Silivri'nin yerel coğrafi koşulları ve arsanın yönelimine göre şekillenen bu projede, iç mekanların gün boyu kesintisiz doğal ışıktan yararlanması ve ferah yaşam alanları hedeflenmiştir."}
              </p>
            </div>

            {/* Engineering */}
            <div className="space-y-4 pt-6 border-t border-white/[0.08]">
              <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block">
                [ 02 • STATİK VE DEPREM GÜVENLİĞİ ]
              </span>
              <h2 className="text-2xl font-light text-white font-display">
                Mühendislik Standartları ve Taşıyıcı Sistem
              </h2>
              <p className="text-sm text-gray-300 leading-relaxed font-light">
                {project.engineering || "Zemin etüdü raporlarına göre radye jeneral temel ve C35 sınıfı betonarme perde sistemle inşa edilmiştir. 2018 Türkiye Bina Deprem Yönetmeliği kriterlerine tam uyum sağlanmıştır."}
              </p>
            </div>

          </div>

          {/* Right Column: Materials & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-8 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-6">
              <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block">
                [ 03 • MALZEME & DONATI SEÇİMİ ]
              </span>
              <h3 className="text-lg font-semibold text-white font-display">
                1. Sınıf Uygulama Detayları
              </h3>

              <div className="space-y-3.5 text-xs text-gray-300 font-light">
                {(project.materials && project.materials.length > 0 ? project.materials : [
                  "Radye jeneral temel ve C35/40 hazır betonarme karkas",
                  "Isı ve ses yalıtımlı lamine konfor ısıcam alüminyum doğramalar",
                  "Taşyünü ve sinterflex porselen havalandırmalı dış cephe",
                  "Yerden ısıtma ve akıllı ev otomasyon altyapısı"
                ]).map((mat, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-0.5" />
                    <span>{mat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-white/10">
                <a
                  href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent(`Merhaba, "${project.title}" projeniz hakkında detaylı bilgi ve arsamız için ücretsiz keşif almak istiyoruz.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Mimarımızla Görüşün</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Project Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="space-y-8 pt-10 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                  [ PROJE GALERİSİ ]
                </span>
                <h2 className="text-2xl sm:text-3xl font-light text-white font-display">
                  Tasarım ve Uygulama Fotoğrafları
                </h2>
              </div>
              <span className="text-xs font-mono text-gray-400">
                {project.gallery.length} Görsel
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.gallery.map((imgUrl, i) => (
                <div 
                  key={i} 
                  className="rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 aspect-[4/3] group relative"
                >
                  <img
                    src={imgUrl}
                    alt={`${project.title} Detay Görseli ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Other Projects Recommendations */}
        {otherProjects.length > 0 && (
          <div className="space-y-8 pt-16 border-t border-white/[0.08]">
            <div className="flex justify-between items-end">
              <div>
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-1">
                  [ DİĞER REFERANSLAR ]
                </span>
                <h2 className="text-2xl font-light text-white font-display">
                  Benzer Mimari Projelerimiz
                </h2>
              </div>
              <Link 
                href="/projeler/"
                className="text-xs font-mono text-[#c5a059] hover:text-white uppercase tracking-wider flex items-center gap-1"
              >
                <span>Tümü</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {otherProjects.map((p, i) => (
                <Link
                  key={i}
                  href={`/portfolio/${p.slug}/`}
                  className="group block space-y-3"
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                    <img
                      src={p.featuredImage}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex justify-between items-baseline pt-1">
                    <div>
                      <span className="text-[10px] font-mono text-[#c5a059] uppercase block">{p.category}</span>
                      <h4 className="text-base font-light text-white group-hover:text-[#c5a059] transition-colors">{p.title}</h4>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-[#c5a059] transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
