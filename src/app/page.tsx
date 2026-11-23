import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { 
  ArrowRight, 
  ArrowUpRight, 
  MapPin, 
  Calendar,
  Building2,
  ShieldCheck,
  Wrench,
  Home,
  Maximize2,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';
import { getPosts, getProjects, getSettings, getPrefabrikHouses } from '@/lib/db';
import { SILIVRI_NEIGHBORHOODS } from '@/lib/silivri-neighborhoods';
import CostCalculator from '@/components/CostCalculator';

export const metadata: Metadata = {
  title: 'Silivri İnşaat ve Mimarlık Firması | Villa & Prefabrik Ev Yapımı – Yalçın Grup Mimarlık',
  description: 'Silivri inşaat firması ve Silivri mimarlık ofisi Yalçın Grup Mimarlık. Silivri ve tüm 35 mahallesinde anahtar teslim müstakil villa, kentsel dönüşüm, mimari proje, ruhsat ve prefabrik ev yapımı.',
  alternates: {
    canonical: 'https://www.yalcingrupmimarlik.com/',
  },
};

const HOME_FAQS = [
  {
    q: 'Yalçın Grup Mimarlık Silivri’de hangi inşaat ve mimarlık hizmetlerini veriyor?',
    a: 'Silivri merkez ofisimizden anahtar teslim müstakil villa inşaatı, Silivri kentsel dönüşüm ve kat karşılığı inşaat, mimari ve statik proje çizimi, yapı ruhsatı takibi, radye temel ve Silivri’nin tüm 35 mahallesinde anahtar teslim prefabrik ev yapımı hizmetleri sunuyoruz.'
  },
  {
    q: 'Silivri’de arsama prefabrik ev veya müstakil villa yaptırmak için ilk adım nedir?',
    a: 'Öncelikle Silivri Belediyesi imar durumu ve zemin etüdü kontrolünü ücretsiz ön keşif kapsamında inceliyoruz. Ardından arsanızın emsal değerine göre mimari proje veya 184 hazır prefabrik/çelik ev modelimizden en uygun olanını seçip anahtar teslim maliyet tablosu çıkarıyoruz.'
  },
  {
    q: 'Silivri ve tüm mahallelerinde anahtar teslim prefabrik ev yapıyor musunuz?',
    a: 'Evet. Selimpaşa, Gümüşyaka, Çanta, Değirmenköy, Kavaklı, Ortaköy, Fener, Gazitepe, Semizkumlar, Alibey ve diğer tüm 35 Silivri mahallesinde fabrika kurulumuna ek olarak ruhsat, zemin betonu, şap, parke, fayans, mutfak dolabı, vitrifiye, nakliye ve JCB vinç işlerini anahtar teslim yapıyoruz.'
  },
  {
    q: 'Silivri inşaat maliyetleri nasıl hesaplanıyor?',
    a: 'İnşaat maliyetleri yapının toplam metrekaresine, taşıyıcı sistemine (betonarme, hafif çelik veya prefabrik), zemin etüdüne ve seçilen malzeme kalitesine göre belirlenir. Anasayfamızdaki 2026 Silivri İnşaat Maliyet Hesaplayıcı ile anında tahmini bütçe görebilir veya ücretsiz keşif talep edebilirsiniz.'
  }
];

export default function HomePage() {
  const settings = getSettings();
  const allPosts = getPosts();
  const projects = getProjects().slice(0, 4);
  const prefabrikHouses = getPrefabrikHouses().slice(0, 3);
  const featuredBlog = allPosts[0];
  const sideBlogs = allPosts.slice(1, 4);

  const pillars = [
    {
      num: "01",
      title: "İmar & Avan Projelendirme",
      desc: "Silivri Belediyesi imar planlarına tam uyumlu ruhsat, mimari avan ve fotogerçekçi 3D konsept tasarımlar.",
      slug: "mimari-projelendirme-ve-tasarim"
    },
    {
      num: "02",
      title: "Silivri Kentsel Dönüşüm",
      desc: "Deprem risk analizinden yıkıma, müteahhitlik taahhüdünden anahtar teslim sağlam yapılara eksiksiz dönüşüm.",
      slug: "silivri-kentsel-donusum-firmasi"
    },
    {
      num: "03",
      title: "Müstakil Villa & Konut İnşaatı",
      desc: "Radye temel, C35/40 sınıfı hazır beton ve 1. sınıf işçilikle arsanıza özel lüks müstakil yaşam alanları.",
      slug: "2026-silivri-mustakil-ev-ve-villa-yapim-maliyetleri-kalem-kalem-rehber"
    },
    {
      num: "04",
      title: "Endüstriyel & Çelik Yapılar",
      desc: "Sanayi tesisleri, fabrika binaları ve geniş açıklıklı çelik konstrüksiyon yapıların statik projelendirilmesi ve inşası.",
      slug: "endustriyel-ticari-yapilar"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Zemin & İmar Etüdü",
      desc: "Arsanızın topoğrafik ölçümleri, zemin taşıma katsayıları ve Silivri Belediyesi imar durumu resmi olarak incelenir."
    },
    {
      step: "02",
      title: "Mimari Avan & 3D Tasarım",
      desc: "İhtiyaçlarınıza özel kat planları, cephe tasarımları ve fotogerçekçi 3D renderlar onayınıza sunulur."
    },
    {
      step: "03",
      title: "Statik Proje & Ruhsat",
      desc: "Deprem yönetmeliğine tam uyumlu statik, mekanik ve elektrik projeleri çizilerek yapı ruhsatı alınır."
    },
    {
      step: "04",
      title: "Anahtar Teslim İnşaat",
      desc: "Temelden çatıya, şantiye şefi denetiminde 1. sınıf malzeme ile inşa edilerek iskânlı teslim edilir."
    }
  ];

  return (
    <div className="bg-[#090a0c] text-[#eae7e1] selection:bg-[#c5a059] selection:text-black space-y-32 pb-24">
      
      {/* 1. HERO - EDITORIAL ARCHITECTURAL SHOWCASE */}
      <section className="relative min-h-[92vh] flex items-center border-b border-white/[0.08] overflow-hidden pt-10 pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(197,160,89,0.12),rgba(255,255,255,0))]" />
        
        <div className="relative max-w-7xl mx-auto px-6 sm:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Headline (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[#c5a059]" />
                <span className="text-xs font-mono tracking-[0.3em] uppercase text-[#c5a059]">
                  SİLİVRİ • MİMARLIK & İNŞAAT FİRMASI
                </span>
              </div>

              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tight text-white leading-[1.1] font-display">
                Silivri İnşaat & Mimarlık: <br />
                <span className="font-semibold text-white">Statik Güç, Zamansız Mimari.</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-300 font-light max-w-xl leading-relaxed">
                <strong>Yalçın Grup Mimarlık</strong>; Silivri ve tüm 35 mahallesinde anahtar teslim müstakil villalar, <strong>Silivri prefabrik ev yapımı</strong>, depreme dayanıklı kentsel dönüşüm ve endüstriyel tesisler inşa eden tam kapsamlı <strong>Silivri mimarlık ve inşaat firmasıdır</strong>.
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
                <a
                  href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent('Merhaba, Silivri projemiz için mimari keşif ve teklif almak istiyoruz.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-xl hover:shadow-[#c5a059]/20"
                >
                  <span>Ücretsiz Keşif & Teklif</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <Link
                  href="/projeler/"
                  className="px-8 py-4 border border-white/15 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 bg-[#121317]/60"
                >
                  <span>Projeleri Keşfedin</span>
                  <ArrowRight className="w-4 h-4 text-[#c5a059]" />
                </Link>
              </div>

              {/* Architectural Key Figures */}
              <div className="pt-8 border-t border-white/[0.08] grid grid-cols-3 gap-6 font-mono">
                <div>
                  <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">15+</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Yıllık Tecrübe</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-light text-[#c5a059] tracking-tight">150+</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Mimari Proje</div>
                </div>
                <div>
                  <div className="text-2xl sm:text-3xl font-light text-white tracking-tight">%100</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wider mt-1">Deprem Güvenliği</div>
                </div>
              </div>

            </div>

            {/* Right Visual (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 group">
                <img
                  src="/uploads/hero-silivri-villa.jpg"
                  alt="Yalçın Grup Mimarlık Silivri Villa Projesi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 p-5 bg-[#0e1014]/90 backdrop-blur-md border border-white/10 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono text-[#c5a059] tracking-wider uppercase">
                    <span>SİLİVRİ VİLLA PROJESİ</span>
                    <span>2026 REFERANS</span>
                  </div>
                  <div className="text-sm font-semibold text-white font-display">
                    Modern Müstakil Villa & Peyzaj Uygulaması
                  </div>
                  <div className="text-xs text-gray-400 font-mono">
                    Alan: 380 m² • Taşıyıcı: Radye Temel & C35
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-[#121317] border border-white/10 px-3 py-1.5 text-[10px] font-mono text-gray-400 hidden sm:block">
                KOORDİNAT: 41.0742° N, 28.2464° E
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. ARCHITECTURAL PILLARS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-2">
              [ HİZMET DİSİPLİNLERİMİZ ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
              Mimariden Şantiyeye <span className="font-semibold text-white">Tek Elden Çözüm</span>
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-gray-400 max-w-md leading-relaxed font-light">
            Tasarım estetiğiyle şantiye mühendisliğini birleştirerek, zamanında ve taahhüt edilen bütçede teslim ediyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((item, idx) => (
            <Link
              key={idx}
              href={`/${item.slug}/`}
              className="group p-8 bg-[#111216] border border-white/[0.07] hover:border-[#c5a059]/60 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
            >
              <div className="space-y-6">
                <span className="text-3xl font-light font-mono text-[#c5a059]/40 group-hover:text-[#c5a059] transition-colors">
                  {item.num}
                </span>
                <h3 className="text-lg font-semibold text-white font-display group-hover:text-[#c5a059] transition-colors leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>

              <div className="pt-8 flex items-center gap-2 text-xs font-mono text-gray-400 group-hover:text-white transition-colors">
                <span>İNCELE</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#c5a059] group-hover:translate-x-1.5 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. INTERACTIVE 2026 SILIVRI COST CALCULATOR */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <CostCalculator phoneRaw={settings.phoneRaw} />
      </section>

      {/* 4. SELECTED PROJECTS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-2">
              [ PORTFOLYO ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
              Seçkin <span className="font-semibold text-white">Mimari Referanslar</span>
            </h2>
          </div>
          <Link
            href="/projeler/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] hover:text-white tracking-widest uppercase transition-colors"
          >
            <span>TÜM PROJELER ({getProjects().length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((proj, idx) => (
            <Link
              key={idx}
              href={`/portfolio/${proj.slug}/`}
              className="group block space-y-4"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-950 border border-white/10">
                <img
                  src={proj.featuredImage}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#c5a059] border border-white/10">
                  {proj.category}
                </div>
              </div>

              <div className="flex justify-between items-baseline pt-1">
                <div>
                  <h3 className="text-xl font-light text-white group-hover:text-[#c5a059] transition-colors font-display">
                    {proj.title}
                  </h3>
                  <div className="text-xs text-gray-400 font-mono mt-1 flex items-center gap-3">
                    <span>{proj.location || 'Silivri / İstanbul'}</span>
                    <span>•</span>
                    <span>{proj.area || '350 m²'}</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-gray-400 group-hover:border-[#c5a059] group-hover:text-[#c5a059] transition-colors">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4.5. PREFABRİK & ÇELİK EV ÇÖZÜM ORTAKLIĞI */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl bg-[#111216] border border-[#c5a059]/30 p-8 sm:p-12 lg:p-14 space-y-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a059]/5 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-white/[0.08] pb-8 relative">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2">
                <span className="h-[1px] w-6 bg-[#c5a059]" />
                <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase">
                  PREFABRİK EVİM & YALÇIN GRUP ÇÖZÜM ORTAKLIĞI
                </span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-display">
                Prefabrik & Çelik Ev Yapımı <br />
                <span className="font-semibold text-white">Anahtar Teslim Kurulum</span>
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                Yapı Prefabrik Evim tarafından üretilmektedir. <strong>Ruhsat + Zemin Betonu + Şap + Parke + Fayans + Mutfak Dolabı + Vitrifiye + Nakliye + JCB ile Montaj</strong> Yalçın Grup Mimarlık güvencesiyle tamamlanmaktadır.
              </p>
            </div>

            <Link
              href="/prefabrik-ev-yapimi/"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest transition-all shadow-xl hover:scale-[1.02] shrink-0"
            >
              <span>Tüm Kataloğu İncele ({getPrefabrikHouses().length} Model)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {prefabrikHouses.map((house, idx) => (
              <div
                key={idx}
                className="group rounded-2xl overflow-hidden bg-[#161820] border border-white/[0.08] hover:border-[#c5a059]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <Link href={`/prefabrik-ev-yapimi/${house.slug}/`} className="block relative aspect-[16/10] w-full bg-zinc-950 overflow-hidden">
                    <img
                      src={house.featuredImage || '/uploads/projects/modern-villa.jpg'}
                      alt={house.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-[#c5a059]">
                      {house.structureType}
                    </div>
                    {house.area && (
                      <div className="absolute bottom-3 right-3 bg-black/80 px-2.5 py-1 rounded text-[10px] font-mono text-white flex items-center gap-1">
                        <Maximize2 className="w-3 h-3 text-[#c5a059]" />
                        <span>{house.area} m²</span>
                      </div>
                    )}
                  </Link>

                  <div className="p-5 space-y-2">
                    <Link href={`/prefabrik-ev-yapimi/${house.slug}/`}>
                      <h3 className="text-base font-medium text-white group-hover:text-[#c5a059] transition-colors font-display line-clamp-1">
                        {house.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-400 font-light line-clamp-2">
                      {house.shortDescription}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-[#c5a059]">Anahtar Teslim</span>
                    <Link
                      href={`/prefabrik-ev-yapimi/${house.slug}/`}
                      className="text-xs font-mono text-white group-hover:text-[#c5a059] flex items-center gap-1"
                    >
                      <span>Fiyat Teklifi Alınız</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#c5a059]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. ARCHITECTURAL WORK PROCESS */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="rounded-3xl bg-[#111216] border border-white/[0.08] p-8 sm:p-14 lg:p-16 space-y-12">
          
          <div className="max-w-2xl space-y-3">
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase">
              [ ÇALIŞMA METODOLOJİSİ ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
              Fikirden İskâna <span className="font-semibold text-white">4 Aşamalı Süreç</span>
            </h2>
            <p className="text-sm text-gray-400 font-light leading-relaxed">
              İnşaat sürecinin her anında şeffaf bilgilendirme, sözleşmeye bağlı sabit bütçe ve yasal güvence sağlıyoruz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-4">
            {processSteps.map((p, idx) => (
              <div key={idx} className="space-y-4 border-l border-[#c5a059]/30 pl-6">
                <span className="text-2xl font-mono text-[#c5a059] block font-light">
                  {p.step}
                </span>
                <h3 className="text-base font-semibold text-white font-display">
                  {p.title}
                </h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. EDITORIAL BLOG & KNOWLEDGE REPOSITORY */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-b border-white/[0.08] pb-8">
          <div>
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block mb-2">
              [ SİLİVRİ BİLGİ BANKASI ]
            </span>
            <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
              Maliyet Analizleri & <span className="font-semibold text-white">Teknik Rehberler</span>
            </h2>
          </div>
          <Link
            href="/blog/"
            className="inline-flex items-center gap-2 text-xs font-mono text-[#c5a059] hover:text-white tracking-widest uppercase transition-colors"
          >
            <span>TÜM REHBERLER ({allPosts.length})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Featured Lead Story (7 cols) */}
          {featuredBlog && (
            <Link
              href={`/${featuredBlog.slug}/`}
              className="lg:col-span-7 group block space-y-4 bg-[#111216] border border-white/[0.08] p-6 sm:p-8 hover:border-[#c5a059]/60 transition-all duration-300"
            >
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-zinc-950 border border-white/5">
                {featuredBlog.featuredImage ? (
                  <img
                    src={featuredBlog.featuredImage}
                    alt={featuredBlog.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-zinc-700">
                    <Building2 className="w-12 h-12" />
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#c5a059] border border-white/10">
                  {featuredBlog.categories?.[0] || 'Öne Çıkan'}
                </div>
              </div>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-xs text-gray-400 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-[#c5a059]" />
                  <span>{new Date(featuredBlog.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span>•</span>
                  <span>Silivri 2026 İnşaat Rehberi</span>
                </div>
                <h3 className="text-2xl font-light text-white font-display group-hover:text-[#c5a059] transition-colors leading-snug">
                  {featuredBlog.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-light">
                  {featuredBlog.excerpt ? featuredBlog.excerpt.replace(/<[^>]+>/g, '').trim() : ''}
                </p>
                <div className="pt-2 flex items-center gap-2 text-xs font-mono text-[#c5a059] group-hover:text-white transition-colors">
                  <span>MAKALESİNİ OKU</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </Link>
          )}

          {/* Secondary List (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {sideBlogs.map((post) => (
              <Link
                key={post.id}
                href={`/${post.slug}/`}
                className="group p-5 bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 transition-all duration-300 block space-y-2"
              >
                <div className="flex items-center gap-2 text-[10px] font-mono text-[#c5a059]">
                  <span>{post.categories?.[0] || 'Rehber'}</span>
                  <span>•</span>
                  <span className="text-gray-400">{new Date(post.date).toLocaleDateString('tr-TR')}</span>
                </div>
                <h4 className="text-sm font-medium text-white group-hover:text-[#c5a059] transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h4>
                <div className="text-[11px] font-mono text-gray-500 group-hover:text-gray-300 flex items-center gap-1 pt-1">
                  <span>Devamını Oku</span>
                  <ArrowRight className="w-3 h-3 text-[#c5a059]" />
                </div>
              </Link>
            ))}
          </div>

        </div>
      </section>

      {/* 6B. SİLİVRİ & 35 MAHALLE HİZMET AĞI (LOKAL SEO) */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/[0.08] pb-8">
          <div className="space-y-2">
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase block">
              [ SİLİVRİ VE TÜM 35 MAHALLESİNDE HİZMET AĞI ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-display">
              Silivri Prefabrik Ev, İnşaat <br />
              <span className="font-semibold text-white">ve Mimarlık Bölgelerimiz</span>
            </h2>
          </div>
          <Link
            href="/silivri-prefabrik-ev-yapimi/"
            className="text-xs font-mono uppercase tracking-widest text-[#c5a059] hover:text-white transition-colors flex items-center gap-2"
          >
            <span>Tüm Silivri Mahalle Rehberi</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2.5">
          {SILIVRI_NEIGHBORHOODS.map((n) => (
            <Link
              key={n.slug}
              href={`/silivri-prefabrik-ev-yapimi/${n.slug}/`}
              className="px-3.5 py-2 rounded-lg bg-[#111216] border border-white/[0.08] hover:border-[#c5a059]/60 text-xs font-mono text-gray-300 hover:text-[#c5a059] transition-all flex items-center gap-1.5"
            >
              <MapPin className="w-3 h-3 text-[#c5a059]" />
              <span>{n.name} Prefabrik Ev</span>
            </Link>
          ))}
        </div>
      </section>

      {/* 6C. SIKÇA SORULAN SORULAR + FAQPage JSON-LD */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8 space-y-10">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: HOME_FAQS.map((item) => ({
                '@type': 'Question',
                name: item.q,
                acceptedAnswer: { '@type': 'Answer', text: item.a }
              }))
            })
          }}
        />
        <div className="space-y-2 border-b border-white/[0.08] pb-6">
          <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase flex items-center gap-2">
            <HelpCircle className="w-4 h-4" />
            <span>SIKÇA SORULAN SORULAR</span>
          </span>
          <h2 className="text-3xl sm:text-4xl font-light text-white tracking-tight font-display">
            Silivri İnşaat, Mimarlık ve Prefabrik Ev Hakkında
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {HOME_FAQS.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-[#111216] border border-white/[0.08] space-y-3">
              <h3 className="text-base font-medium text-white flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#c5a059] shrink-0 mt-1" />
                <span>{faq.q}</span>
              </h3>
              <p className="text-sm text-gray-400 font-light leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. REFINED CONTACT & STUDIO VISIT SECTION */}
      <section className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="border border-white/10 bg-[#111216] p-8 sm:p-14 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono text-[#c5a059] tracking-[0.25em] uppercase">
              [ SİLİVRİ MERKEZ OFİS & FİRMA ]
            </span>
            <h2 className="text-3xl sm:text-5xl font-light text-white tracking-tight font-display">
              Projenizi Birlikte <br />
              <span className="font-semibold text-white">Planlayalım.</span>
            </h2>
            <p className="text-sm text-gray-300 font-light max-w-lg leading-relaxed">
              Arsanızın imar durumunu incelemek, maliyet tablosu çıkarmak veya mevcut binanızın kentsel dönüşüm sürecini konuşmak için Silivri ofisimizde kahveye bekleriz.
            </p>
            <div className="space-y-2 text-xs font-mono text-gray-400 pt-2">
              <p><strong className="text-white">Adres:</strong> {settings.address}</p>
              <p><strong className="text-white">Telefon:</strong> {settings.phone}</p>
              <p><strong className="text-white">Çalışma Saatleri:</strong> {settings.workingHours}</p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <a
              href={`https://wa.me/${settings.phoneRaw || '905380828592'}?text=${encodeURIComponent('Merhaba, Silivri ofisinizde projemiz için yüz yüze görüşme randevusu almak istiyoruz.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-[#c5a059] hover:bg-[#d6b068] text-black font-mono font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl"
            >
              <span>Ofis Randevusu Al</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <Link
              href="/iletisim/"
              className="w-full py-4 border border-white/20 hover:border-[#c5a059] text-white font-mono text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all bg-[#0a0b0e]"
            >
              <span>İletişim Formunu Doldur</span>
              <ArrowRight className="w-4 h-4 text-[#c5a059]" />
            </Link>
          </div>

        </div>
      </section>

    </div>
  );
}
